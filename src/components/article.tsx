import { MediaFrame } from "@/components/media-frame";
import { pick } from "@/lib/locale";
import type { ContentItem, Locale } from "@/lib/types";

export function Article({
  item,
  locale,
  video = false,
}: {
  item: ContentItem;
  locale: Locale;
  video?: boolean;
}) {
  return (
    <article className="compact cms-wrap">
      <div className="article-col">
        <div className="article-hero">
          <MediaFrame ratio="card" seed={item.slug} play={video} label={pick(item.title, locale)} />
        </div>
        <h1 className="article-title transition-colors duration-300 ease-in-out hover:text-gold">
          {pick(item.title, locale)}
        </h1>
        <div className="prose-block">
          {item.date ? <p>{item.date}</p> : null}
          <div dangerouslySetInnerHTML={{ __html: pick(item.body, locale) }} />
          {item.link ? (
            <p>
              <a href={item.link} rel="noopener noreferrer" target="_blank">
                {item.link}
              </a>
            </p>
          ) : null}
          {item.documentLabel ? <p>{pick(item.documentLabel, locale)}</p> : null}
        </div>
      </div>
    </article>
  );
}

export function HtmlPage({ html, locale }: { html: string; locale: Locale }) {
  return (
    <div className="compact cms-wrap">
      <div className="article-col">
        <div
          className="prose-block"
          lang={locale === "bn" ? "bn" : "en"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
