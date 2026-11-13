import { prisma } from "@/lib/prisma";
import { ResourcesManager } from "./resources-manager";

export const metadata = { title: "Legal Resources" };
export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const items = await prisma.resourceItem.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <ResourcesManager
      initialItems={items.map((i) => ({
        id: i.id,
        title: i.title,
        slug: i.slug,
        category: i.category,
        author: i.author,
        fileUrl: i.fileUrl ?? "",
        content: i.content,
        readTime: i.readTime,
        order: i.order,
      }))}
    />
  );
}
