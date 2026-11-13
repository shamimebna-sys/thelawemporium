import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "successTitle"), t(locale, "successBody"), "/successful-appointment");
}

export default async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getLocale();
  return (
    <>
      <PageTitle locale={locale} label="successTitle" />
      <div className="success-box compact">
        <p>{t(locale, "successBody")}</p>
        <p style={{ marginTop: 16, color: "#666" }}>{id}</p>
        <p style={{ marginTop: 24 }}>
          <Link href="/">{t(locale, "home")}</Link>
        </p>
      </div>
    </>
  );
}
