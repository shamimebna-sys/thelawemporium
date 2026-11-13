import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/page-title";
import { getResourceBySlug } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const item = await getResourceBySlug(slug);
  if (!item) return {};
  return pageMetadata(locale, item.title, item.category, `/resources/${slug}`);
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const item = await getResourceBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageTitle locale={locale} text={item.category} />
      <article className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-neutral-500">
          <span className="font-bold text-gold">{item.category}</span>
          <span>•</span>
          <span>{item.author}</span>
          <span>•</span>
          <span>{item.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight transition-colors duration-300 ease-in-out hover:text-gold">
          {item.title}
        </h1>

        {item.fileUrl ? (
          <div>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-colors"
            >
              Download PDF Attachment
            </a>
          </div>
        ) : null}

        <div
          className="text-[17px] leading-relaxed text-neutral-800 space-y-4 [&>p]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        <div className="pt-8 border-t border-neutral-200">
          <Link href="/resources" className="text-sm font-semibold text-neutral-700 hover:text-gold">
            ← Back to Resources
          </Link>
        </div>
      </article>
    </>
  );
}
