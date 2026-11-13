import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { getResources } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "research"), t(locale, "research"), "/research");
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function ResearchPage() {
  const locale = await getLocale();
  const items = await getResources("Research");

  return (
    <>
      <PageTitle locale={locale} label="research" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="group border border-neutral-200 rounded-xl p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  {item.category} • {item.readTime}
                </span>
                <Link href={`/resources/${item.slug}`}>
                  <h3 className="text-xl font-bold text-neutral-900 mt-2 transition-colors duration-300 ease-in-out group-hover:text-gold">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-600 mt-2 line-clamp-3">
                  {stripTags(item.content)}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                <Link
                  href={`/resources/${item.slug}`}
                  className="font-bold uppercase tracking-wider text-neutral-900 hover:text-gold transition-colors"
                >
                  Read Note →
                </Link>
                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold hover:underline"
                  >
                    PDF ↓
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
