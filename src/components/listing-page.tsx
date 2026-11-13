import { ContentCard } from "@/components/content-card";
import { PageTitle } from "@/components/page-title";
import { Paginator } from "@/components/paginator";
import { PAGE_SIZE, published } from "@/data/content";
import type { MessageKey } from "@/lib/messages";
import type { ContentItem, Locale } from "@/lib/types";

export function ListingPage({
  locale,
  title,
  items,
  basePath,
  page,
  variant = "photo",
}: {
  locale: Locale;
  title: MessageKey;
  items: ContentItem[];
  basePath: string;
  page: number;
  variant?: "photo" | "video";
}) {
  const list = published(items);
  const start = (page - 1) * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PageTitle locale={locale} label={title} />
      <div className="compact">
        <div className="card-grid">
          {slice.map((item) => (
            <ContentCard
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              title={item.title}
              excerpt={item.excerpt}
              locale={locale}
              variant={variant}
            />
          ))}
        </div>
        <Paginator page={page} total={list.length} basePath={basePath} locale={locale} />
      </div>
    </>
  );
}
