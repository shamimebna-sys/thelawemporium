import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE } from "./locale";
import type { Locale } from "./types";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}
