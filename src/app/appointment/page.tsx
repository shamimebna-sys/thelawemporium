import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment-form";
import { contact } from "@/data/site";
import { getSiteSettings } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "appointment"), t(locale, "appointment"), "/appointment");
}

export default async function AppointmentPage() {
  const locale = await getLocale();
  const lang = locale === "bn" ? "bn" : "en";
  const settings = await getSiteSettings();
  const phones = settings.phone ? [settings.phone] : contact.phones;
  const emails = settings.email ? [settings.email] : contact.emails;
  const officeHourLines =
    locale === "en" && settings.officeHours
      ? settings.officeHours.split("|").map((s) => s.trim()).filter(Boolean)
      : contact.office.hours[lang];

  return (
    <>
      <div className="page-title-band">
        <div className="compact flex justify-start">
          <h1 className="page-title text-left self-start ml-0 mr-auto transition-colors duration-300 ease-in-out hover:text-gold">
            {t(locale, "appointment")}
          </h1>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-6 py-16 items-start">
        <div className="col-span-1 lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">
              {t(locale, "getInTouch")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight transition-colors duration-300 ease-in-out hover:text-gold">
              {t(locale, "scheduleConsultation")}
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              {t(locale, "appointmentIntro")}
            </p>
          </div>

          <div className="space-y-5 pt-4 border-t border-neutral-200">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
              </span>
              <div className="space-y-1 text-sm">
                <p className="font-semibold uppercase tracking-wider text-xs text-neutral-500">
                  {t(locale, "officeHours")}
                </p>
                {officeHourLines.map((line) => (
                  <p key={line} className="text-neutral-800">
                    {line}
                  </p>
                ))}
                <p className="text-xs text-neutral-500">{t(locale, "weekendHint")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <div className="space-y-1 text-sm">
                <p className="font-semibold uppercase tracking-wider text-xs text-neutral-500">
                  {t(locale, "contactNo")}
                </p>
                {phones.map((phone) => (
                  <p key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="font-medium text-neutral-900 hover:text-gold transition-colors"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <rect width="18" height="14" x="3" y="5" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <div className="space-y-1 text-sm">
                <p className="font-semibold uppercase tracking-wider text-xs text-neutral-500">
                  {t(locale, "email")}
                </p>
                {emails.map((email) => (
                  <p key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="font-medium text-neutral-900 hover:text-gold transition-colors"
                    >
                      {email}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 bg-white p-8 md:p-10 rounded-xl shadow-lg border border-neutral-100">
          <AppointmentForm locale={locale} />
        </div>
      </section>
    </>
  );
}
