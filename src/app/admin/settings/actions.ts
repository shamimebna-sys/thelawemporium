"use server";
/**
 * Server actions for site-wide settings.
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export async function updateSettingsAction(formData: FormData) {
  await assertAdminSession();

  const entries = Array.from(formData.entries()).filter(
    ([key, val]) => !key.startsWith("$ACTION_") && typeof val === "string",
  ) as [string, string][];

  for (const [key, value] of entries) {
    await prisma.siteSetting.updateMany({
      where: { key },
      data: { value: value.trim() },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/appointment");
  revalidatePath("/contact");
  revalidatePath("/");
}

export async function saveSettingsJsonAction(values: Record<string, string>) {
  await assertAdminSession();

  try {
    for (const [key, value] of Object.entries(values)) {
      await prisma.siteSetting.updateMany({
        where: { key },
        data: { value: value.trim() },
      });
    }
    revalidatePath("/admin/settings");
    revalidatePath("/appointment");
    revalidatePath("/contact");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save site settings." };
  }
}
