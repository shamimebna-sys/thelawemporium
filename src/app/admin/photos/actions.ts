"use server";
/**
 * Server actions for GalleryItem (/admin/photos).
 */
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/auth";

export type GalleryInput = {
  id?: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
};

export async function upsertGalleryItemAction(input: GalleryInput) {
  await assertAdminSession();

  const title = input.title.trim();
  const imageUrl = input.imageUrl.trim();
  if (!title || !imageUrl) {
    return { ok: false, error: "Title and Image URL are required." };
  }

  try {
    if (input.id) {
      await prisma.galleryItem.update({
        where: { id: input.id },
        data: {
          title,
          caption: input.caption.trim(),
          imageUrl,
          category: input.category,
          featured: input.featured,
          order: Number(input.order) || 0,
        },
      });
    } else {
      await prisma.galleryItem.create({
        data: {
          title,
          caption: input.caption.trim(),
          imageUrl,
          category: input.category,
          featured: input.featured,
          order: Number(input.order) || 0,
        },
      });
    }
    revalidatePath("/admin/photos");
    revalidatePath("/admin");
    revalidatePath("/photos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to save gallery item." };
  }
}

export async function toggleGalleryFeaturedAction(id: string, featured: boolean) {
  await assertAdminSession();

  try {
    await prisma.galleryItem.update({ where: { id }, data: { featured } });
    revalidatePath("/admin/photos");
    revalidatePath("/photos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to update featured flag." };
  }
}

export async function deleteGalleryItemAction(id: string) {
  await assertAdminSession();

  try {
    await prisma.galleryItem.delete({ where: { id } });
    revalidatePath("/admin/photos");
    revalidatePath("/admin");
    revalidatePath("/photos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Failed to delete photo." };
  }
}
