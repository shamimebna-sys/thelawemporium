import type { Metadata } from "next";
import { ServiceCategoryView } from "@/components/service-category-view";
import { categoryRoutes } from "@/data/services";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import type { ServiceCategory } from "@/lib/types";

async function page(category: ServiceCategory) {
  const locale = await getLocale();
  const meta = categoryRoutes[category];
  return {
    metadata: pageMetadata(
      locale,
      locale === "bn" ? meta.titleBn : meta.titleEn,
      t(locale, meta.heading),
      meta.path,
    ),
    view: <ServiceCategoryView locale={locale} category={category} />,
  };
}

export function makeCategoryPage(category: ServiceCategory) {
  return {
    generateMetadata: async (): Promise<Metadata> => (await page(category)).metadata,
    Page: async () => (await page(category)).view,
  };
}
