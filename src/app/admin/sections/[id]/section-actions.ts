"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export async function updateSectionAction(formData: FormData) {
  await assertAdminSession();

  const id = formData.get("id") as string;
  await prisma.pageSection.update({
    where: { id },
    data: {
      badgeNumber: ((formData.get("badgeNumber") as string) || null) || null,
      order: parseInt(formData.get("order") as string, 10) || 0,
      titleEn: (formData.get("titleEn") as string).trim(),
      titleBn: (formData.get("titleBn") as string).trim(),
      contentEn: (formData.get("contentEn") as string).trim(),
      contentBn: (formData.get("contentBn") as string).trim(),
    },
  });
  revalidatePath("/admin/sections");
  revalidatePath("/");
  redirect("/admin/sections");
}
