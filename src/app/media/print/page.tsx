import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { getMediaCoverage } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "print"), t(locale, "print"), "/media/print");
}

export default async function PrintMediaPage() {
  const locale = await getLocale();
  const items = await getMediaCoverage("Print");

  return (
    <>
      <PageTitle locale={locale} label="print" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const formattedDate = new Date(item.publishedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            return (
              <article key={item.id} className="group border border-neutral-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <a
                  href={item.articleUrl ?? "#"}
                  target={item.articleUrl ? "_blank" : undefined}
                  rel={item.articleUrl ? "noopener noreferrer" : undefined}
                  className="block"
                >
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
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-gold">
                        {item.outletName}
                      </span>
                      <span className="text-neutral-400">{formattedDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 transition-colors duration-300 ease-in-out group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.excerpt}</p>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
