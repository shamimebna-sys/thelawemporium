import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { getGalleryItems } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "photos"), t(locale, "photos"), "/photos");
}

export default async function PhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = await getLocale();
  const { category } = await searchParams;
  const allItems = await getGalleryItems();
  const categories = ["All", ...Array.from(new Set(allItems.map((i) => i.category)))];
  const active = category && categories.includes(category) ? category : "All";
  const items = active === "All" ? allItems : allItems.filter((i) => i.category === active);

  return (
    <>
      <PageTitle locale={locale} label="photos" />
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === "All" ? "/photos" : `/photos?category=${encodeURIComponent(cat)}`}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <article key={item.id} className="group space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-gold">
                  {item.title}
                </h3>
                {item.caption ? (
                  <p className="text-sm text-neutral-600 mt-1">{item.caption}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
