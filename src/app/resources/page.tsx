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
  return pageMetadata(locale, t(locale, "resources"), t(locale, "resources"), "/resources");
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await getLocale();
  const { category } = await searchParams;
  const all = await getResources();
  const categories = ["All", ...Array.from(new Set(all.map((i) => i.category)))];
  const active = category && categories.includes(category) ? category : "All";
  const items = active === "All" ? all : all.filter((i) => i.category === active);

  return (
    <>
      <PageTitle locale={locale} label="resources" />
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === "All" ? "/resources" : `/resources?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
                active === cat
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="group border border-neutral-200 rounded-xl p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold uppercase tracking-wider text-gold">
                    {item.category}
                  </span>
                  <span className="text-neutral-400">{item.readTime}</span>
                </div>
                <Link href={`/resources/${item.slug}`}>
                  <h3 className="text-xl font-bold text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-gold">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                  {stripTags(item.content)}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs">
                <span className="text-neutral-500">{item.author}</span>
                <div className="flex items-center gap-3">
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
                  <Link
                    href={`/resources/${item.slug}`}
                    className="font-semibold text-neutral-900 hover:text-gold transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
