import type { Metadata } from "next";
import { MediaFrame } from "@/components/media-frame";
import { PageTitle } from "@/components/page-title";
import { contact } from "@/data/site";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(locale, t(locale, "contact"), t(locale, "contact"), "/contact");
}

export default async function ContactPage() {
  const locale = await getLocale();
  const lines = locale === "bn" ? "bn" : "en";

  return (
    <>
      <PageTitle locale={locale} label="contact" />
      <div className="compact contact-wrap">
        <MediaFrame ratio="map" seed="office-map" label={t(locale, "officeAddress")} />
        <p className="map-link">
          <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer">
            {t(locale, "openMap")}
          </a>
        </p>
        <div className="address-row">
          <div>
            <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
              {t(locale, "officeAddress")}
            </h2>
            {contact.office.lines[lines].map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="member-meta" style={{ marginTop: 24 }}>
              <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
                {t(locale, "officeHours")}
              </h2>
              {contact.office.hours[lines].map((line) => (
                <div key={line}>{line}</div>
              ))}
              <p>{t(locale, "weekendHint")}</p>
            </div>
          </div>
          <div>
            <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
              {t(locale, "chamberAddress")}
            </h2>
            {contact.chamber.lines[lines].map((line) => (
              <div key={line}>{line}</div>
            ))}
            <div className="member-meta" style={{ marginTop: 24 }}>
              <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
                {t(locale, "officeHours")}
              </h2>
              {contact.chamber.hours[lines].map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </div>
        <hr className="sep" />
        <div>
          <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
            {t(locale, "contactNo")}
          </h2>
          {contact.phones.map((phone) => (
            <div key={phone}>
              <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
              {t(locale, "email")}
            </h2>
            {contact.emails.map((email) => (
              <div key={email}>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
