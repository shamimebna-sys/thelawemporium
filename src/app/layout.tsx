import type { Metadata } from "next";
import { SiteChrome } from "@/components/site-chrome";
import { getLocale } from "@/lib/get-locale";
import { htmlLang } from "@/lib/locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    ...pageMetadata(locale, t(locale, "siteName"), t(locale, "siteTagline"), "/"),
    metadataBase: new URL("https://thelowemporium.local"),
    icons: { icon: "/favicon.svg" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={htmlLang(locale)}>
      <body>
        <SiteChrome locale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}
