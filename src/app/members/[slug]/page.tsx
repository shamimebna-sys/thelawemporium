import type { Metadata } from "next";
import { MediaFrame } from "@/components/media-frame";
import { PageTitle } from "@/components/page-title";
import { getMember, members } from "@/data/members";
import { designations } from "@/data/members";
import { getLocale } from "@/lib/get-locale";
import { pick } from "@/lib/locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return members.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const member = getMember(slug);
  if (!member) return {};
  return pageMetadata(locale, pick(member.name, locale), pick(member.summary, locale), `/members/${slug}`);
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const member = getMember(slug);
  if (!member) notFound();
  const designation = designations.find((item) => item.id === member.designationId);

  return (
    <>
      <PageTitle locale={locale} label="teamMember" />
      <div className="compact member-page">
        <div className="member-layout">
          <MediaFrame ratio="portrait" seed={member.slug} label={pick(member.name, locale)} />
          <div className="member-info">
            <div className="name transition-colors duration-300 ease-in-out hover:text-gold">
              {pick(member.name, locale)}
            </div>
            <div className="role">{pick(member.credentials, locale)}</div>
            <div className="role">{pick(member.court, locale)}</div>
            {designation ? <div className="role">{pick(designation.title, locale)}</div> : null}
            {member.phone ? (
              <p className="member-meta">
                <a href={`tel:${member.phone.replace(/\s/g, "")}`}>{member.phone}</a>
              </p>
            ) : null}
            {member.email ? (
              <p className="member-meta">
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </p>
            ) : null}
          </div>
        </div>
        <div className="member-body" dangerouslySetInnerHTML={{ __html: pick(member.body, locale) }} />
        <p className="sr-only">{t(locale, "siteName")}</p>
      </div>
    </>
  );
}
