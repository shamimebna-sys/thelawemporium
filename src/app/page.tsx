import type { Metadata } from "next";
import Link from "next/link";
import { CtaPair } from "@/components/cta-pair";
import { FeaturedSlider } from "@/components/featured-slider";
import { HeroBook } from "@/components/hero-book";
import { electronicMedia, printMedia, researchItems, stories, videos } from "@/data/content";
import { getHomeContent } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "siteName"), t(locale, "siteTagline"), "/");
}

export default async function HomePage() {
  const locale = await getLocale();
  const { intro, features } = await getHomeContent();
  const featured = [
    ...videos.slice(0, 3),
    ...printMedia.slice(0, 3),
    ...stories.slice(0, 2),
    ...researchItems.slice(0, 2),
    ...electronicMedia.slice(0, 2),
  ];

  return (
    <>
      <section className="intro compact">
        <p className="intro-copy">{pick(intro, locale)}</p>
        <HeroBook alt={t(locale, "bannerTitle")} />
      </section>

      <section className="features-wrap" aria-label={t(locale, "resources")}>
        <div className="features">
          {features.map((feature, index) => (
            <article key={feature.sectionKey} className={`feature feature-${index + 1} group`}>
              <div className="feature-num">
                {feature.badgeNumber ?? String(index + 1).padStart(2, "0")}
              </div>
              <Link href={feature.href}>
                <div className="feature-title transition-colors duration-300 ease-in-out group-hover:text-gold">
                  {locale === "bn" ? feature.titleBn : feature.titleEn}
                </div>
                <div className="feature-desc">
                  {locale === "bn" ? feature.contentBn : feature.contentEn}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <FeaturedSlider items={featured} locale={locale} />

      <CtaPair locale={locale} />
    </>
  );
}
