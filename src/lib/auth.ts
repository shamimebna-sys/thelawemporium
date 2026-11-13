import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin-token";
export const JWT_ALGORITHM = "HS256";

export interface AdminTokenPayload {
  sub: string;
  email: string;
  name: string;
}

/**
 * Returns the raw JWT secret key as bytes.
 * Fails securely and immediately if JWT_SECRET is not configured in the environment.
 * Never logs or exposes the secret string.
 */
export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim() === "") {
    throw new Error("CRITICAL_CONFIG_ERROR: JWT_SECRET environment variable is not configured.");
  }
  return new TextEncoder().encode(secret.trim());
}

/**
 * Signs an admin JWT session token with HS256 and a 12-hour expiration.
 */
export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
}

/**
 * Verifies an admin JWT session token.
 * Strictly enforces the HS256 algorithm to prevent algorithm confusion attacks.
 */
export async function verifyAdminToken(token: string): Promise<AdminTokenPayload> {
  const secret = getJwtSecret();
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [JWT_ALGORITHM],
  });

  if (!payload.sub || typeof payload.sub !== "string") {
    throw new Error("Invalid token claims: missing subject.");
  }

  return {
    sub: payload.sub,
    email: typeof payload.email === "string" ? payload.email : "",
    name: typeof payload.name === "string" ? payload.name : "Administrator",
  };
}

/**
 * Asserts that the current request has a valid, authenticated admin session.
 * Reads the admin session token cookie and verifies its JWT signature and expiration.
 * Throws an Unauthorized error if the token is missing, invalid, or expired.
 * Returns the verified AdminTokenPayload on success.
 */
export async function assertAdminSession(): Promise<AdminTokenPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    throw new Error("Unauthorized: Missing admin session.");
  }

  try {
    return await verifyAdminToken(token);
  } catch {
    throw new Error("Unauthorized: Invalid or expired admin session.");
  }
}
