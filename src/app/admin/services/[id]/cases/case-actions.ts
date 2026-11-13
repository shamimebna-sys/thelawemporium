"use server";
/**
 * Server actions for service case management.
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export async function addCaseAction(formData: FormData) {
  await assertAdminSession();

  const serviceId = formData.get("serviceId") as string;
  await prisma.serviceCase.create({
    data: {
      serviceId,
      caseNumber: parseInt(formData.get("caseNumber") as string, 10) || 1,
      order: parseInt(formData.get("order") as string, 10) || 0,
      titleEn: (formData.get("titleEn") as string).trim(),
      titleBn: ((formData.get("titleBn") as string) || "").trim(),
      descriptionEn: (formData.get("descriptionEn") as string).trim(),
      descriptionBn: ((formData.get("descriptionBn") as string) || "").trim(),
      newsLink: ((formData.get("newsLink") as string) || null) || null,
    },
  });
  revalidatePath(`/admin/services/${serviceId}/cases`);
  revalidatePath(`/services/${serviceId}`);
  redirect(`/admin/services/${serviceId}/cases`);
}

export async function deleteCaseAction(formData: FormData) {
  await assertAdminSession();

  const caseId = formData.get("caseId") as string;
  const serviceId = formData.get("serviceId") as string;
  await prisma.serviceCase.delete({ where: { id: caseId } });
  revalidatePath(`/admin/services/${serviceId}/cases`);
  revalidatePath(`/services/${serviceId}`);
}
