"use server";
/**
 * Server actions for the services + sub-cases admin routes.
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

/** FormData handler for dedicated /new and /[id] routes. */
export async function upsertServiceAction(formData: FormData) {
  await assertAdminSession();

  const id = (formData.get("id") as string | null) || undefined;
  const data = {
    slug: (formData.get("slug") as string).trim(),
    category: (formData.get("category") as string).trim(),
    indexNumber: parseInt(formData.get("indexNumber") as string, 10) || 1,
    titleEn: (formData.get("titleEn") as string).trim(),
    titleBn: (formData.get("titleBn") as string).trim(),
    excerptEn: (formData.get("excerptEn") as string).trim(),
    excerptBn: (formData.get("excerptBn") as string).trim(),
    bodyEn: (formData.get("bodyEn") as string).trim(),
    bodyBn: (formData.get("bodyBn") as string).trim(),
    order: parseInt(formData.get("order") as string, 10) || 0,
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data: { id: data.slug, ...data } });
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

/** Inline JSON action for modal create/edit with toast feedback. */
export async function saveServiceModalAction(input: {
  id?: string;
  slug: string;
  category: string;
  indexNumber: number;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  bodyEn: string;
  bodyBn: string;
  order: number;
}) {
  await assertAdminSession();

  const slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  if (!slug || !input.titleEn.trim()) {
    return { ok: false, error: "Slug and English title are required." };
  }
  const data = {
    slug,
    category: input.category,
    indexNumber: Number(input.indexNumber) || 1,
    titleEn: input.titleEn.trim(),
    titleBn: input.titleBn.trim() || input.titleEn.trim(),
    excerptEn: input.excerptEn.trim(),
    excerptBn: input.excerptBn.trim() || input.excerptEn.trim(),
    bodyEn: input.bodyEn.trim(),
    bodyBn: input.bodyBn.trim() || input.bodyEn.trim(),
    order: Number(input.order) || 0,
  };

  try {
    if (input.id) {
      await prisma.service.update({ where: { id: input.id }, data });
    } else {
      await prisma.service.create({ data: { id: slug, ...data } });
    }
    revalidatePath("/admin/services");
    revalidatePath("/admin");
    revalidatePath("/services");
    revalidatePath(`/services/${slug}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not save service (slug may already exist)." };
  }
}

export async function removeServiceAction(id: string) {
  await assertAdminSession();

  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/admin");
    revalidatePath("/services");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete service." };
  }
}

export async function saveServiceCaseModalAction(input: {
  id?: string;
  serviceId: string;
  caseNumber: number;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  newsLink: string;
  order: number;
}) {
  await assertAdminSession();

  if (!input.titleEn.trim() || !input.descriptionEn.trim()) {
    return { ok: false, error: "Case title and description are required." };
  }

  const data = {
    serviceId: input.serviceId,
    caseNumber: Number(input.caseNumber) || 1,
    titleEn: input.titleEn.trim(),
    titleBn: input.titleBn.trim() || input.titleEn.trim(),
    descriptionEn: input.descriptionEn.trim(),
    descriptionBn: input.descriptionBn.trim() || input.descriptionEn.trim(),
    newsLink: input.newsLink.trim() || null,
    order: Number(input.order) || 0,
  };

  try {
    if (input.id) {
      await prisma.serviceCase.update({ where: { id: input.id }, data });
    } else {
      await prisma.serviceCase.create({ data });
    }
    revalidatePath("/admin/services");
    revalidatePath(`/services/${input.serviceId}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save case entry." };
  }
}

export async function removeServiceCaseAction(caseId: string, serviceId: string) {
  await assertAdminSession();

  try {
    await prisma.serviceCase.delete({ where: { id: caseId } });
    revalidatePath("/admin/services");
    revalidatePath(`/services/${serviceId}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete case." };
  }
}

/** Delete a service by id (FormData helper). */
export async function deleteServiceAction(formData: FormData) {
  await assertAdminSession();

  const id = formData.get("id") as string;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
