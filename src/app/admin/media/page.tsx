import { prisma } from "@/lib/prisma";
import { MediaManager } from "./media-manager";

export const metadata = { title: "Press & Media" };
export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const items = await prisma.mediaCoverage.findMany({
    orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
  });

  return (
    <MediaManager
      initialItems={items.map((i) => ({
        id: i.id,
        title: i.title,
        outletName: i.outletName,
        articleUrl: i.articleUrl ?? "",
        coverImage: i.coverImage ?? "",
        publishedAt: i.publishedAt.toISOString().slice(0, 10),
        excerpt: i.excerpt,
        badge: i.badge,
        order: i.order,
      }))}
    />
  );
}
