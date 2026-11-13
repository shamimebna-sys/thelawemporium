import type { Metadata } from "next";
import type { Locale } from "./types";
import { t } from "./messages";

const siteUrl = "https://thelowemporium.local";

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "/",
): Metadata {
  const fullTitle = path === "/" ? t(locale, "siteName") : `${title} | ${t(locale, "siteName")}`;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: t(locale, "siteName"),
      title: fullTitle,
      description,
      url,
      type: "website",
      locale: locale === "bn" ? "bn_BD" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}
