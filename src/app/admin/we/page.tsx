import { prisma } from "@/lib/prisma";
import { WeManager } from "./we-manager";

export const metadata = { title: "We / Advocates" };
export const dynamic = "force-dynamic";

export default async function AdminWePage() {
  const items = await prisma.advocateProfile.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <WeManager
      initialItems={items.map((a) => ({
        id: a.id,
        name: a.name,
        designation: a.designation,
        credentials: a.credentials,
        bio: a.bio,
        imageUrl: a.imageUrl ?? "",
        barCouncilId: a.barCouncilId ?? "",
        email: a.email ?? "",
        phone: a.phone ?? "",
        order: a.order,
      }))}
    />
  );
}
