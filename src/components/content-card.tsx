import Link from "next/link";
import type { Locale, Localized } from "@/lib/types";
import { pick } from "@/lib/locale";
import { MediaFrame } from "@/components/media-frame";

export function ContentCard({
  href,
  title,
  excerpt,
  locale,
  variant = "photo",
}: {
  href: string;
  title: Localized;
  excerpt: Localized;
  locale: Locale;
  variant?: "photo" | "video" | "overlay";
}) {
  return (
    <article className="content-card group">
      <Link href={href}>
        {variant === "overlay" ? (
          <div className="card-overlay">
            <MediaFrame ratio="card" seed={href} />
            <h3 className="overlay-title transition-colors duration-300 ease-in-out group-hover:text-gold">
              {pick(title, locale)}
            </h3>
          </div>
        ) : (
          <>
            <MediaFrame ratio="card" seed={href} play={variant === "video"} />
            <h3 className="transition-colors duration-300 ease-in-out group-hover:text-gold">
              {pick(title, locale)}
            </h3>
            <p>{pick(excerpt, locale)}</p>
          </>
        )}
      </Link>
    </article>
  );
}
