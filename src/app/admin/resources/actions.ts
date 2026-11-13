"use server";
/**
 * Server actions for ResourceItem (/admin/resources).
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export type ResourceInput = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  fileUrl: string;
  content: string;
  readTime: string;
  order: number;
};

export async function upsertResourceAction(input: ResourceInput) {
  await assertAdminSession();

  const title = input.title.trim();
  const slug = input.slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const content = input.content.trim();

  if (!title || !slug || !content) {
    return { ok: false, error: "Title, slug, and content are required." };
  }

  const data = {
    title,
    slug,
    category: input.category.trim() || "Research",
    author: input.author.trim() || "The Law Emporium",
    fileUrl: input.fileUrl.trim() || null,
    content,
    readTime: input.readTime.trim() || "5 min read",
    order: Number(input.order) || 0,
  };

  try {
    if (input.id) {
      await prisma.resourceItem.update({ where: { id: input.id }, data });
    } else {
      await prisma.resourceItem.create({ data });
    }
    revalidatePath("/admin/resources");
    revalidatePath("/admin");
    revalidatePath("/resources");
    revalidatePath("/research");
    revalidatePath("/stories");
    revalidatePath("/precedents");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save resource (slug may already exist)." };
  }
}

export async function deleteResourceAction(id: string) {
  await assertAdminSession();

  try {
    await prisma.resourceItem.delete({ where: { id } });
    revalidatePath("/admin/resources");
    revalidatePath("/admin");
    revalidatePath("/resources");
    revalidatePath("/research");
    revalidatePath("/stories");
    revalidatePath("/precedents");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete resource." };
  }
}
