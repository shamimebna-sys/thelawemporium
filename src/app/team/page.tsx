import type { Metadata } from "next";
import { AdvocateImage } from "@/components/advocate-image";
import { PageTitle } from "@/components/page-title";
import { getAdvocateProfiles } from "@/lib/cms";
import { getLocale } from "@/lib/get-locale";
import { t } from "@/lib/messages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata(
    locale,
    t(locale, "team"),
    locale === "bn"
      ? "আমাদের সদস্যরা আদালত ও ট্রাইব্যুনালে নিয়মিত হাজির হন।"
      : "Our team members regularly appear before the courts and tribunals.",
    "/team",
  );
}

export default async function TeamPage() {
  const locale = await getLocale();
  const advocates = await getAdvocateProfiles();

  const grouped = new Map<string, typeof advocates>();
  for (const adv of advocates) {
    const list = grouped.get(adv.designation) ?? [];
    list.push(adv);
    grouped.set(adv.designation, list);
  }

  return (
    <>
      <PageTitle locale={locale} label="team" />
      <div className="compact team-wrap">
        {Array.from(grouped.entries()).map(([designation, list]) => {
          const [featured, ...rest] = list;
          return (
            <section key={designation} className="team-category">
              <h2 className="transition-colors duration-300 ease-in-out hover:text-gold">
                {designation}
              </h2>
              {featured ? (
                <div className="team-head group">
                  <div className="aspect-square overflow-hidden rounded-lg bg-neutral-900 border border-neutral-200/50 shadow-sm">
                    <AdvocateImage
                      src={featured.imageUrl}
                      name={featured.name}
                      designation={featured.designation}
                      priority
                    />
                  </div>
                  <div className="team-head-info">
                    <div className="team-head-name transition-colors duration-300 ease-in-out group-hover:text-gold">
                      {featured.name}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                      {featured.credentials}
                      {featured.barCouncilId ? ` • Bar Council ID: ${featured.barCouncilId}` : ""}
                    </p>
                    <div
                      className="team-head-desc"
                      dangerouslySetInnerHTML={{ __html: featured.bio }}
                    />
                  </div>
                </div>
              ) : null}

              {rest.length > 0 ? (
                <div className="team-grid">
                  {rest.map((member) => (
                    <article key={member.id} className="member-card group">
                      <div className="aspect-square overflow-hidden rounded-lg bg-neutral-900 border border-neutral-200/50 shadow-sm mb-3">
                        <AdvocateImage
                          src={member.imageUrl}
                          name={member.name}
                          designation={member.designation}
                        />
                      </div>
                      <h3 className="member-name transition-colors duration-300 ease-in-out group-hover:text-gold">
                        {member.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mb-1">{member.credentials}</p>
                      {member.barCouncilId ? (
                        <p className="text-xs text-gold font-medium">ID: {member.barCouncilId}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </>
  );
}
