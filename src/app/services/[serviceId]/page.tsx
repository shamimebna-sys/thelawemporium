import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/page-title";
import { getServiceBySlug } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type CaseEntry = {
  number: string;
  title: string;
  details: string;
  newsLink?: string | null;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCasesHtml(html: string): CaseEntry[] | null {
  const listItems = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
  if (listItems.length > 0) {
    const entries: CaseEntry[] = [];
    for (const [idx, match] of listItems.entries()) {
      const inner = match[1];
      const paragraphs = [...inner.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((p) => stripHtml(p[1]))
        .filter(Boolean);

      let title = "";
      let details = "";

      if (paragraphs.length > 0) {
        title = paragraphs[0].replace(/^\d+\.\s*/, "").trim();
        details = paragraphs.slice(1).join(" ").trim();
      } else {
        const strongMatch = /<strong\b[^>]*>([\s\S]*?)<\/strong>/i.exec(inner);
        if (strongMatch) {
          title = stripHtml(strongMatch[1]).replace(/^\d+\.\s*/, "").trim();
          details = stripHtml(inner.replace(strongMatch[0], "")).trim();
        } else {
          title = stripHtml(inner).replace(/^\d+\.\s*/, "").trim();
        }
      }

      if (title) {
        entries.push({ number: String(idx + 1), title, details });
      }
    }
    return entries.length > 0 ? entries : null;
  }

  const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((p) => stripHtml(p[1]))
    .filter(Boolean);

  const numberedEntries: CaseEntry[] = [];
  let current: CaseEntry | null = null;

  for (const text of paragraphs) {
    const numbered = /^(\d+)\.\s+(.+)$/.exec(text);
    if (numbered) {
      if (current) numberedEntries.push(current);
      current = {
        number: numbered[1],
        title: numbered[2].trim(),
        details: "",
      };
    } else if (current) {
      current.details = current.details ? `${current.details} ${text}` : text;
    }
  }
  if (current) numberedEntries.push(current);

  return numberedEntries.length > 0 ? numberedEntries : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;
  const locale = await getLocale();
  const service = await getServiceBySlug(serviceId);
  if (!service) return {};
  const title = locale === "bn" ? service.titleBn : service.titleEn;
  const excerpt = locale === "bn" ? service.excerptBn : service.excerptEn;
  return pageMetadata(locale, title, excerpt, `/services/${serviceId}`);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const locale = await getLocale();
  const service = await getServiceBySlug(serviceId);
  if (!service) notFound();

  const title = locale === "bn" ? service.titleBn : service.titleEn;
  const body = locale === "bn" ? service.bodyBn : service.bodyEn;

  const dbCases: CaseEntry[] = service.cases.map((c) => ({
    number: String(c.caseNumber),
    title: locale === "bn" && c.titleBn ? c.titleBn : c.titleEn,
    details: locale === "bn" && c.descriptionBn ? c.descriptionBn : c.descriptionEn,
    newsLink: c.newsLink,
  }));

  const fallbackHtml = service.fallbackCasesHtml
    ? locale === "bn"
      ? service.fallbackCasesHtml.bn
      : service.fallbackCasesHtml.en
    : null;
  const parsedCases =
    dbCases.length > 0 ? dbCases : fallbackHtml ? parseCasesHtml(fallbackHtml) : null;
  const hasCases = Boolean(parsedCases?.length || fallbackHtml);

  return (
    <>
      <PageTitle locale={locale} label="service" />
      <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-neutral-800">
          <p className="text-4xl md:text-5xl font-black text-center tracking-wider text-black mb-2 font-[family-name:var(--nums)]">
            {String(service.indexNumber).padStart(2, "0")}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-black tracking-tight mb-10 font-[family-name:var(--display)] transition-colors duration-300 ease-in-out hover:text-gold">
            {title}
          </h1>

          <div
            className="text-[17px] md:text-lg leading-relaxed text-neutral-800 text-justify mb-12 [&>p]:mb-5 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: body }}
          />

          {hasCases ? (
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-black mb-6 mt-10 font-[family-name:var(--display)] transition-colors duration-300 ease-in-out hover:text-gold">
                {t(locale, "cases")}
              </h2>

              {parsedCases ? (
                <div>
                  {parsedCases.map((entry, idx) => (
                    <div key={`${entry.number}-${idx}`}>
                      <h3 className="font-bold text-neutral-900 text-lg md:text-xl mb-1">
                        {entry.number}. {entry.title}
                      </h3>
                      {entry.details ? (
                        <p className="text-neutral-700 text-base leading-normal mb-6 pl-5">
                          {entry.details}
                          {entry.newsLink ? (
                            <>
                              {" "}
                              <a
                                href={entry.newsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold underline ml-1"
                              >
                                News Link
                              </a>
                            </>
                          ) : null}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : fallbackHtml ? (
                <div
                  className="text-neutral-700 text-base leading-normal [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: fallbackHtml }}
                />
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
