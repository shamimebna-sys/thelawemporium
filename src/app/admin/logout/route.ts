"use server";
/** Route handler: clears the auth cookie and redirects to /admin/login. */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
