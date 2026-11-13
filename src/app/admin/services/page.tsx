/**
 * Admin: services management with inline modal + sub-case accordion drawer.
 */
import { prisma } from "@/lib/prisma";
import { ServicesManager } from "./services-manager";

export const metadata = { title: "Services" };
export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { indexNumber: "asc" }, { order: "asc" }],
    include: { cases: { orderBy: { order: "asc" } } },
  });

  return (
    <ServicesManager
      initialServices={services.map((s) => ({
        id: s.id,
        slug: s.slug,
        category: s.category,
        indexNumber: s.indexNumber,
        titleEn: s.titleEn,
        titleBn: s.titleBn,
        excerptEn: s.excerptEn,
        excerptBn: s.excerptBn,
        bodyEn: s.bodyEn,
        bodyBn: s.bodyBn,
        order: s.order,
        cases: s.cases.map((c) => ({
          id: c.id,
          serviceId: c.serviceId,
          caseNumber: c.caseNumber,
          titleEn: c.titleEn,
          titleBn: c.titleBn,
          descriptionEn: c.descriptionEn,
          descriptionBn: c.descriptionBn,
          newsLink: c.newsLink ?? "",
          order: c.order,
        })),
      }))}
    />
  );
}
