import type { Locale, Localized } from "./types";

export const LOCALE_COOKIE = "ll-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "bn";
}

export function pick(text: Localized, locale: Locale): string {
  return text[locale];
}

export function htmlLang(locale: Locale): string {
  return locale === "bn" ? "bn" : "en";
}
