import { prisma } from "@/lib/prisma";
import { PhotosManager } from "./photos-manager";

export const metadata = { title: "Photos Gallery" };
export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <PhotosManager
      initialItems={items.map((i) => ({
        id: i.id,
        title: i.title,
        caption: i.caption,
        imageUrl: i.imageUrl,
        category: i.category,
        featured: i.featured,
        order: i.order,
      }))}
    />
  );
}
