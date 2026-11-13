"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export async function updateAppointmentStatusAction(formData: FormData) {
  await assertAdminSession();
  const id = formData.get("id") as string;
  const status = formData.get("status") as "PENDING" | "CONFIRMED" | "CANCELLED";
  await prisma.appointment.update({ where: { id }, data: { status } });
  revalidatePath("/admin/appointments");
  revalidatePath("/admin");
}

export async function setAppointmentStatusAction(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED",
): Promise<{ ok: boolean; error?: string }> {
  try {
    await assertAdminSession();
    await prisma.appointment.update({ where: { id }, data: { status } });
    revalidatePath("/admin/appointments");
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Unauthorized")) {
      return { ok: false, error: err.message };
    }
    return { ok: false, error: "Could not update appointment status." };
  }
}
