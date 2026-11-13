import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { getMediaCoverage } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "media"), t(locale, "media"), "/media");
}

export default async function MediaIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ badge?: string }>;
}) {
  const locale = await getLocale();
  const { badge } = await searchParams;
  const items = await getMediaCoverage(badge);
  const allItems = badge ? await getMediaCoverage() : items;
  const badges = ["All", ...Array.from(new Set(allItems.map((i) => i.badge)))];
  const active = badge && badges.includes(badge) ? badge : "All";

  return (
    <>
      <PageTitle locale={locale} label="media" />
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          {badges.map((b) => (
            <a
              key={b}
              href={b === "All" ? "/media" : `/media?badge=${encodeURIComponent(b)}`}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${
                active === b
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {b}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const Wrapper = item.articleUrl ? "a" : "div";
            const wrapperProps = item.articleUrl
              ? { href: item.articleUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <article key={item.id} className="group border border-neutral-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <Wrapper {...wrapperProps} className="block">
                  {item.coverImage ? (
                    <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold uppercase tracking-wider text-gold">
                        {item.badge} • {item.outletName}
                      </span>
                      <span className="text-neutral-400">{formattedDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.excerpt}</p>
                  </div>
                </Wrapper>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
