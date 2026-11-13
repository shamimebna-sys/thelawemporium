/**
 * Next.js 16 Proxy: protects all /admin/** and /api/admin/** routes.
 * Verifies the JWT stored in the `admin-token` httpOnly cookie.
 * Unauthenticated web requests are redirected to /admin/login.
 * Unauthenticated API requests receive HTTP 401.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and non-admin API routes through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect /api/admin/** endpoints
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      await verifyAdminToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }
  }

  // Allow other public API routes (e.g. /api/placeholder)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Protect /admin/** pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await verifyAdminToken(token);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
