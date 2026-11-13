import type { Metadata } from "next";
import { Article } from "@/components/article";
import { PageTitle } from "@/components/page-title";
import { findContent, stories } from "@/data/content";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return stories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const item = findContent(stories, slug);
  if (!item) return {};
  return pageMetadata(locale, pick(item.title, locale), pick(item.excerpt, locale), `/stories/${slug}`);
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const item = findContent(stories, slug);
  if (!item) notFound();
  return (
    <>
      <PageTitle locale={locale} label="stories" />
      <Article item={item} locale={locale} />
    </>
  );
}
