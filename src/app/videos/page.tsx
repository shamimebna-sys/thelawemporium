import type { Metadata } from "next";
import { ListingPage } from "@/components/listing-page";
import { videos } from "@/data/content";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "videos"), t(locale, "videos"), "/videos");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const locale = await getLocale();
  const { page } = await searchParams;
  return (
    <ListingPage
      locale={locale}
      title="videos"
      items={videos}
      basePath="/videos"
      page={Number(page) || 1}
      variant="video"
    />
  );
}
