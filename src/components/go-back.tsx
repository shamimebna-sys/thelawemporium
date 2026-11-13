"use client";

import { t } from "@/lib/messages";
import type { Locale } from "@/lib/types";

export function GoBack({ locale }: { locale: Locale }) {
  return (
    <button type="button" onClick={() => history.back()} style={{ background: "none", border: 0, cursor: "pointer", padding: "12px 0", textDecoration: "underline" }}>
      {t(locale, "goBack")}
    </button>
  );
}
