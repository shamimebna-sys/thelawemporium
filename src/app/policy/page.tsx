import type { Metadata } from "next";
import { HtmlPage } from "@/components/article";
import { PageTitle } from "@/components/page-title";
import { getCmsPage } from "@/data/site";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "policy"), t(locale, "policy"), "/policy");
}

export default async function PolicyPage() {
  const locale = await getLocale();
  const page = getCmsPage("policy");
  if (!page) notFound();
  return (
    <>
      <PageTitle locale={locale} label="policy" />
      <HtmlPage html={pick(page.body, locale)} locale={locale} />
    </>
  );
}
