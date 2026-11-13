"use server";
/**
 * Server action: validate admin credentials, sign JWT, set httpOnly cookie.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, signAdminToken } from "@/lib/auth";

/** Returns `{ error }` on failure; redirects to /admin on success. */
export async function loginAction(data: { email: string; password: string }) {
  const user = await prisma.adminUser.findUnique({
    where: { email: data.email.toLowerCase().trim() },
  });

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcryptjs.compare(data.password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  let token: string;
  try {
    token = await signAdminToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login failure: Authentication service failed to sign token.", err instanceof Error ? err.message : "");
    return { error: "Authentication service unavailable. Please contact the administrator." };
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
  });

  redirect("/admin");
}
