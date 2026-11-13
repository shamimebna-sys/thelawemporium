import Link from "next/link";
import { PAGE_SIZE } from "@/data/content";
import { t } from "@/lib/messages";
import type { Locale } from "@/lib/types";

export function Paginator({
  page,
  total,
  basePath,
  locale,
}: {
  page: number;
  total: number;
  basePath: string;
  locale: Locale;
}) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages <= 1) return null;

  const href = (n: number) => (n === 1 ? basePath : `${basePath}?page=${n}`);

  return (
    <nav className="pager" aria-label={t(locale, "page")}>
      {page > 1 ? (
        <Link href={href(page - 1)} aria-label={t(locale, "prev")}>
          ‹
        </Link>
      ) : null}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
        n === page ? (
          <span key={n} className="is-current" aria-current="page">
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)}>
            {n}
          </Link>
        ),
      )}
      {page < pages ? (
        <Link href={href(page + 1)} aria-label={t(locale, "next")}>
          ›
        </Link>
      ) : null}
    </nav>
  );
}
