/**
 * Admin layout — loads live notification count and wraps /admin/** in Luxe Dark AdminShell.
 */
import type { ReactNode } from "react";
import { prisma } from "@/lib/prisma";
import { AdminShell } from "./admin-shell";

export const metadata = {
  title: { template: "%s | The Law Emporium CMS", default: "Admin CMS | The Law Emporium" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let pendingAppointments = 0;
  try {
    pendingAppointments = await prisma.appointment.count({
      where: { status: "PENDING" },
    });
  } catch {
    pendingAppointments = 0;
  }

  return <AdminShell pendingAppointments={pendingAppointments}>{children}</AdminShell>;
}
