import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;

  if (!segments || segments.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Reject traversal, backslashes, colons, or null bytes
  for (const seg of segments) {
    if (!seg || seg === "." || seg === ".." || /[\/\\:\0]/.test(seg)) {
      return new NextResponse("Invalid file path", { status: 400 });
    }
  }

  const filename = segments[segments.length - 1];
  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_MAP[ext];

  if (!contentType) {
    return new NextResponse("Unsupported media type", { status: 403 });
  }

  const baseUploadDir = path.resolve(process.cwd(), "public", "uploads");
  const targetPath = path.resolve(baseUploadDir, ...segments);

  // Strict check that the resolved path is inside baseUploadDir
  if (!targetPath.startsWith(baseUploadDir + path.sep)) {
    return new NextResponse("Invalid file path", { status: 400 });
  }

  let filePath: string | null = null;
  if (existsSync(targetPath)) {
    filePath = targetPath;
  } else {
    // Secondary fallback for absolute production path if process cwd differs
    const prodFallback = path.resolve("/home/needshub/thelawemporium/public/uploads", ...segments);
    if (
      prodFallback.startsWith("/home/needshub/thelawemporium/public/uploads" + path.sep) &&
      existsSync(prodFallback)
    ) {
      filePath = prodFallback;
    }
  }

  if (!filePath) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error?.code === "ENOENT") {
      return new NextResponse("Not Found", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
