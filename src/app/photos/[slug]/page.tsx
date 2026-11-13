import type { Metadata } from "next";
import { MediaFrame } from "@/components/media-frame";
import { PageTitle } from "@/components/page-title";
import { photoFolders } from "@/data/site";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return photoFolders.map((folder) => ({ slug: folder.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const folder = photoFolders.find((item) => item.slug === slug);
  if (!folder) return {};
  return pageMetadata(locale, pick(folder.title, locale), pick(folder.title, locale), `/photos/${slug}`);
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const folder = photoFolders.find((item) => item.slug === slug);
  if (!folder) notFound();

  return (
    <>
      <PageTitle locale={locale} text={pick(folder.title, locale)} />
      <div className="compact">
        <div className="photo-grid">
          {folder.photos.map((photo, index) => (
            <MediaFrame
              key={`${folder.slug}-${index}`}
              ratio="card"
              seed={`${folder.slug}-${index}`}
              label={pick(photo.alt, locale)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
