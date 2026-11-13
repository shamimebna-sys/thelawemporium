"use server";
/**
 * Server actions for MediaCoverage (/admin/media).
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export type MediaInput = {
  id?: string;
  title: string;
  outletName: string;
  articleUrl: string;
  coverImage: string;
  publishedAt: string;
  excerpt: string;
  badge: string;
  order: number;
};

export async function upsertMediaAction(input: MediaInput) {
  await assertAdminSession();

  const title = input.title.trim();
  const outletName = input.outletName.trim();
  const excerpt = input.excerpt.trim();

  if (!title || !outletName || !excerpt) {
    return { ok: false, error: "Title, outlet name, and excerpt are required." };
  }

  const parsedDate = input.publishedAt ? new Date(input.publishedAt) : new Date();
  const data = {
    title,
    outletName,
    articleUrl: input.articleUrl.trim() || null,
    coverImage: input.coverImage.trim() || null,
    publishedAt: Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
    excerpt,
    badge: input.badge.trim() || "Print",
    order: Number(input.order) || 0,
  };

  try {
    if (input.id) {
      await prisma.mediaCoverage.update({ where: { id: input.id }, data });
    } else {
      await prisma.mediaCoverage.create({ data });
    }
    revalidatePath("/admin/media");
    revalidatePath("/admin");
    revalidatePath("/media");
    revalidatePath("/media/print");
    revalidatePath("/media/electronic");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save media item." };
  }
}

export async function deleteMediaAction(id: string) {
  await assertAdminSession();

  try {
    await prisma.mediaCoverage.delete({ where: { id } });
    revalidatePath("/admin/media");
    revalidatePath("/admin");
    revalidatePath("/media");
    revalidatePath("/media/print");
    revalidatePath("/media/electronic");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete media item." };
  }
}
