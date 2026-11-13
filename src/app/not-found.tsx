import Link from "next/link";
import { GoBack } from "@/components/go-back";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <div className="compact not-found">
      <h1>{t(locale, "notFoundTitle")}</h1>
      <p>{t(locale, "notFoundBody")}</p>
      <ul>
        <li>
          <GoBack locale={locale} />
        </li>
        <li>
          <Link href="/">{t(locale, "home")}</Link>
        </li>
      </ul>
    </div>
  );
}
