import Link from "next/link";
import { t } from "@/lib/messages";
import type { Locale } from "@/lib/types";

export function CtaPair({ locale }: { locale: Locale }) {
  return (
    <section className="cta-band" aria-label={t(locale, "appointment")}>
      <div className="cta-grid">
        <Link href="/appointment" className="cta-box cta-appoint">
          <div>{t(locale, "getAn")}</div>
          <div>{t(locale, "appointment")}</div>
        </Link>
        <Link href="/contact" className="cta-box cta-contact">
          <div>{t(locale, "contact")}</div>
        </Link>
      </div>
    </section>
  );
}
