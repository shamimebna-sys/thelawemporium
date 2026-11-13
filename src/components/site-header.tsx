"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { BrandWordmark } from "@/components/brand-wordmark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { navGroups, photosLink } from "@/data/nav";
import { t } from "@/lib/messages";
import { pick } from "@/lib/locale";
import type { Locale } from "@/lib/types";

function pathMatches(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return <HeaderInner key={pathname} locale={locale} pathname={pathname} />;
}

function HeaderInner({ locale, pathname }: { locale: Locale; pathname: string }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const isCompact = !isHome || isScrolled;

  useEffect(() => {
    if (!isHome) {
      return;
    }

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollTop > 20);
    }

    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`masthead${isHome ? " is-home" : " is-inner"}${
        isHome && isScrolled ? " is-scrolled" : ""
      }`}
    >
      <div
        className={`masthead-bar transition-all duration-300${
          isCompact ? " w-full bg-black min-h-32" : ""
        }`}
      >
        <div className="masthead-inner compact">
          <div
            className={`logo-nav w-full flex items-center justify-between px-8 lg:px-12 transition-all duration-300${
              isCompact ? " bg-black h-32 py-8" : " py-8"
            }`}
          >
            <Link href="/" className="brand-lockup" aria-label={t(locale, "home")}>
              <BrandMark className="brand-mark" />
              <span className="header-wordmark text-2xl xl:text-3xl font-black">
                <BrandWordmark />
                <span className="sr-only">{t(locale, "siteName")}</span>
              </span>
            </Link>

            <div className="nav-row flex items-center gap-5 lg:gap-6" ref={navRef}>
              <nav className="nav-links flex items-center gap-4" aria-label={t(locale, "menu")}>
                {navGroups.map((group) => {
                  const expanded = openGroup === group.id;
                  const panelId = `${group.id}-panel`;
                  const childActive = group.children?.some((child) =>
                    pathMatches(pathname, child.href),
                  );
                  return (
                    <div
                      key={group.id}
                      className="dropdown"
                      onMouseEnter={() => setOpenGroup(group.id)}
                      onMouseLeave={() => setOpenGroup(null)}
                    >
                      <button
                        type="button"
                        className={`nav-item text-[15px] font-bold uppercase tracking-wider${childActive ? " is-active" : ""}`}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setOpenGroup(expanded ? null : group.id)}
                      >
                        {pick(group.label, locale)}
                      </button>
                      {expanded && group.children ? (
                        <div id={panelId} className="dropdown-panel" role="menu">
                          <div className="dropdown-panel-inner">
                            {group.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                className={pathMatches(pathname, child.href) ? "is-active" : undefined}
                              >
                                {pick(child.label, locale)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <Link
                  href={photosLink.href}
                  className={`nav-link text-[15px] font-bold uppercase tracking-wider${pathMatches(pathname, photosLink.href) ? " is-active" : ""}`}
                >
                  {pick(photosLink.label, locale)}
                </Link>
              </nav>
              <div className="lang-wrap">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>

            <button
              type="button"
              className="menu-btn"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t(locale, "closeMenu") : t(locale, "menu")}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <MenuIcon />
            </button>
          </div>

        </div>
      </div>

      {isHome ? (
        <div className="wordmark" aria-hidden="true">
          <BrandWordmark />
        </div>
      ) : null}

      <div className="masthead-spacer" />

      <nav
        id="mobile-nav"
        className={`mobile-nav${mobileOpen ? " is-open" : ""}`}
        aria-label={t(locale, "menu")}
      >
        <div className="mobile-lang">
          <LanguageSwitcher locale={locale} />
        </div>
        {navGroups.map((group) => (
          <div key={group.id} className="mobile-group">
            <p>{pick(group.label, locale)}</p>
            {group.children?.map((child) => (
              <Link key={child.href} href={child.href} className="sub">
                {pick(child.label, locale)}
              </Link>
            ))}
          </div>
        ))}
        <Link href={photosLink.href}>{pick(photosLink.label, locale)}</Link>
      </nav>
    </header>
  );
}

function MenuIcon() {
  const id = useId();
  return (
    <svg width="30" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <title id={id}>Menu</title>
      <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}
