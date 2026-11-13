import type { Metadata } from "next";
import { Article } from "@/components/article";
import { PageTitle } from "@/components/page-title";
import { electronicMedia, findContent } from "@/data/content";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return electronicMedia.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const item = findContent(electronicMedia, slug);
  if (!item) return {};
  return pageMetadata(locale, pick(item.title, locale), pick(item.excerpt, locale), `/media/electronic/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const item = findContent(electronicMedia, slug);
  if (!item) notFound();
  return (
    <>
      <PageTitle locale={locale} label="electronic" />
      <Article item={item} locale={locale} video />
    </>
  );
}
