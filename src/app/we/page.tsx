import type { Metadata } from "next";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { PageTitle } from "@/components/page-title";
import { getAdvocateProfiles } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(
    locale,
    t(locale, "team"),
    "Our advocates and counsel appear regularly before the Supreme Court and Tribunals.",
    "/we",
  );
}

export default async function WePage() {
  const locale = await getLocale();
  const advocates = await getAdvocateProfiles();

  return (
    <>
      <PageTitle locale={locale} label="we" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {advocates.map((adv) => (
            <article
              key={adv.id}
              className="group border border-neutral-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                {adv.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={adv.imageUrl}
                    alt={adv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <MediaFrame ratio="card" seed={adv.name} label={adv.name} />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">
                    {adv.designation}
                  </p>
                  <h2 className="text-xl font-extrabold text-neutral-900 mt-1 transition-colors duration-300 ease-in-out group-hover:text-gold">
                    {adv.name}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">{adv.credentials}</p>
                  {adv.barCouncilId ? (
                    <p className="text-xs font-medium text-neutral-700 mt-1">
                      Bar Council ID: {adv.barCouncilId}
                    </p>
                  ) : null}
                  <div
                    className="text-sm text-neutral-600 mt-3 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: adv.bio }}
                  />
                </div>
                {(adv.email || adv.phone) ? (
                  <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-500 space-y-1">
                    {adv.phone ? <p>{adv.phone}</p> : null}
                    {adv.email ? <p>{adv.email}</p> : null}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/team"
            className="inline-block px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gold hover:text-black transition-colors"
          >
            {t(locale, "team")}
          </Link>
        </div>
      </div>
    </>
  );
}
