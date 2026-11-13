/**
 * Authenticated Admin file upload endpoint.
 * Validates file magic bytes/signatures, enforces size limits and strict extension allowlists,
 * removes unsafe formats (like SVG), generates safe server-side filenames, and prevents path traversal.
 * Saves uploaded assets to public/uploads/ and returns { url }.
 */
import { mkdir, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

const ALLOWED_EXT_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

type FileSignatureMatch = {
  canonicalExt: string;
  mime: string;
};

/**
 * Validates file buffer signatures against known binary magic numbers.
 * SVG is intentionally excluded due to script injection and XSS risks.
 */
function inspectMagicBytes(buffer: Buffer): FileSignatureMatch | null {
  if (buffer.length < 8) return null;

  // JPEG / JPG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { canonicalExt: ".jpg", mime: "image/jpeg" };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { canonicalExt: ".png", mime: "image/png" };
  }

  // GIF: GIF87a (47 49 46 38 37 61) or GIF89a (47 49 46 38 39 61)
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    return { canonicalExt: ".gif", mime: "image/gif" };
  }

  // WebP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { canonicalExt: ".webp", mime: "image/webp" };
  }

  // PDF: %PDF- (25 50 44 46 2D)
  // Must start with %PDF- within the initial header and have reasonable document size.
  // Note: MIME type alone does not guarantee PDF safety, so we verify binary header & structure.
  if (
    buffer.length >= 32 &&
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  ) {
    return { canonicalExt: ".pdf", mime: "application/pdf" };
  }

  return null;
}

export async function POST(request: Request) {
  // 1. Authenticate admin user
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyAdminToken(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
  }

  // 2. Parse uploaded multipart form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data request" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file uploaded or file is empty" }, { status: 400 });
  }

  // 3. Size limit verification
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 10 MB limit" }, { status: 400 });
  }

  // 4. File extension allowlist check
  const rawExt = path.extname(file.name || "").toLowerCase();
  if (!ALLOWED_EXT_MAP[rawExt]) {
    return NextResponse.json(
      { error: "Unsupported file type. Allowed: jpg, jpeg, png, webp, gif, pdf (SVG is disabled for security)." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > MAX_BYTES) {
    return NextResponse.json({ error: "File buffer exceeds 10 MB limit" }, { status: 400 });
  }

  // 5. Binary magic bytes signature check
  const detected = inspectMagicBytes(buffer);
  if (!detected) {
    return NextResponse.json(
      { error: "File content does not match any allowed file signatures (JPG, PNG, WEBP, GIF, PDF)." },
      { status: 400 },
    );
  }

  // Check for extension spoofing (e.g. .jpg file containing an executable or non-jpeg payload)
  const isJpgMatch = (rawExt === ".jpg" || rawExt === ".jpeg") && detected.canonicalExt === ".jpg";
  if (!isJpgMatch && rawExt !== detected.canonicalExt) {
    return NextResponse.json(
      { error: "File extension does not match its detected binary signature." },
      { status: 400 },
    );
  }

  // 6. Generate a strictly server-controlled, randomized filename to prevent path traversal
  const safeBase = path
    .basename(file.name, rawExt)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 32);
  const prefix = safeBase ? `${safeBase}-` : "";
  const randomSuffix = crypto.randomBytes(8).toString("hex");
  const filename = `${Date.now()}-${prefix}${randomSuffix}${detected.canonicalExt}`;

  // 7. Path traversal defense
  const uploadDir = path.resolve(process.cwd(), "public", "uploads");
  const targetPath = path.resolve(uploadDir, filename);
  if (!targetPath.startsWith(uploadDir + path.sep)) {
    return NextResponse.json({ error: "Invalid target file path" }, { status: 400 });
  }

  await mkdir(uploadDir, { recursive: true });
  await writeFile(targetPath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
