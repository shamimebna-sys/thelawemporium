"use client";

import { LOCALE_COOKIE } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  }

  return (
    <div
      className="lang-switch inline-flex items-stretch border border-white/25"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={`lang-btn min-h-[48px] min-w-[68px] px-4 py-2 text-base font-bold${locale === "en" ? " is-on" : ""}`}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        Eng
      </button>
      <button
        type="button"
        className={`lang-btn min-h-[48px] min-w-[74px] px-4 py-2 text-base font-bold${locale === "bn" ? " is-on" : ""}`}
        aria-pressed={locale === "bn"}
        onClick={() => setLocale("bn")}
      >
        বাংলা
      </button>
    </div>
  );
}
