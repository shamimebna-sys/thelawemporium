import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { categoryRoutes } from "@/data/services";
import { getServicesByCategory } from "@/lib/cms";
import { t } from "@/lib/messages";
import type { Locale, ServiceCategory } from "@/lib/types";

export async function ServiceCategoryView({
  locale,
  category,
}: {
  locale: Locale;
  category: ServiceCategory;
}) {
  const meta = categoryRoutes[category];
  const items = await getServicesByCategory(category);

  return (
    <>
      <PageTitle locale={locale} label={meta.heading} />
      <div className="cms-wrap">
        <div className="service-list">
          {items.map((item, index) => (
            <article key={item.id} className={`service-block${index % 2 === 1 ? " is-even" : ""} group`}>
              <Link href={`/services/${item.slug}`}>
                <div className="idx">{String(item.indexNumber || index + 1).padStart(2, "0")}</div>
                <h3 className="transition-colors duration-300 ease-in-out group-hover:text-gold">
                  {locale === "bn" ? item.titleBn : item.titleEn}
                </h3>
                <p>{locale === "bn" ? item.excerptBn : item.excerptEn}</p>
              </Link>
            </article>
          ))}
          {items.length === 0 ? <p>{t(locale, "service")}</p> : null}
        </div>
      </div>
    </>
  );
}
