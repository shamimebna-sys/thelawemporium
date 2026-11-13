"use client";
/**
 * Conditionally renders the public SiteHeader / SiteFooter outside /admin routes.
 */
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/types";

export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader locale={locale} />
      <main id="main" className="site-main">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
