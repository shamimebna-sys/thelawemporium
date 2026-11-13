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

  // Head of Chambers is the featured lead profile (replicates Law Lab Category 1)
  const featured =
    advocates.find(
      (a) =>
        (a.designation.toLowerCase().includes("head") &&
          !a.designation.toLowerCase().includes("deputy")) ||
        a.order === 0,
    ) ?? advocates[0];

  // All other advocates exclude the featured lead to prevent duplicate rendering
  const otherAdvocates = featured
    ? advocates.filter((a) => a.id !== featured.id)
    : advocates;

  // Group other advocates by category preserving order (Deputy Head, Senior Counsel, Counsel, etc.)
  const categoriesMap = new Map<string, typeof advocates>();
  for (const adv of otherAdvocates) {
    const list = categoriesMap.get(adv.designation) ?? [];
    list.push(adv);
    categoriesMap.set(adv.designation, list);
  }

  return (
    <>
      <PageTitle locale={locale} label="team" />
      <div className="compact team-wrap">
        {/* Head of Chambers: 2-column layout matching Law Lab _head_1k6oik */}
        {featured ? (
          <div className="team-category">
            <h4 className="team-category-title">
              {featured.designation}
            </h4>
            <div className="team-head">
              <div className="team-frame">
                <AdvocateImage
                  src={featured.imageUrl}
                  name={featured.name}
                  designation={featured.designation}
                  objectPosition="top center"
                  priority
                />
              </div>
              <div className="team-head-info">
                <div className="team-head-name">
                  {featured.name}
                </div>
                <div className="team-head-desc">
                  <p>
                    {featured.credentials}
                    {featured.barCouncilId ? ` • Bar Council ID: ${featured.barCouncilId}` : ""}
                  </p>
                  {featured.bio ? (
                    <div dangerouslySetInnerHTML={{ __html: featured.bio }} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Other Categories (Deputy Head of Chambers, Senior Counsel, Counsel, etc.): Grid matching Law Lab _category-container_1k6oik */}
        {Array.from(categoriesMap.entries()).map(([designation, members]) => (
          <div key={designation} className="team-category">
            <h4 className="team-category-title">
              {designation}
            </h4>
            <div className="team-grid">
              {members.map((member) => (
                <div key={member.id} className="team-member-item group">
                  <div className="team-frame">
                    <AdvocateImage
                      src={member.imageUrl}
                      name={member.name}
                      designation={member.designation}
                      objectPosition="top center"
                    />
                  </div>
                  <div className="member-name">
                    {member.name}
                  </div>
                  <p className="member-credentials">{member.credentials}</p>
                  {member.barCouncilId ? (
                    <p className="member-bar-id">ID: {member.barCouncilId}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
