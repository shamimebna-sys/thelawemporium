import type { Metadata } from "next";
import { HtmlPage } from "@/components/article";
import { PageTitle } from "@/components/page-title";
import { getCmsPage } from "@/data/site";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getCmsPage("about");
  if (!page) return {};
  return pageMetadata(locale, pick(page.title, locale), pick(page.title, locale), "/about");
}

export default async function AboutPage() {
  const locale = await getLocale();
  const page = getCmsPage("about");
  if (!page) notFound();
  return (
    <>
      <PageTitle locale={locale} text={pick(page.title, locale)} />
      <HtmlPage html={pick(page.body, locale)} locale={locale} />
    </>
  );
}
