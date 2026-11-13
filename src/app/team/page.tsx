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

  // Find the featured advocate: Head of Chambers (excluding Deputy Head) or first advocate by sort order
  const featured =
    advocates.find(
      (a) =>
        (a.designation.toLowerCase().includes("head") &&
          !a.designation.toLowerCase().includes("deputy")) ||
        a.order === 0,
    ) ?? advocates[0];

  // All other advocates exclude the featured advocate to prevent duplicate rendering
  const otherAdvocates = featured
    ? advocates.filter((a) => a.id !== featured.id)
    : advocates;

  // Group the remaining advocates by their category/designation
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
        {/* Featured Advocate: Balanced 2-column layout */}
        {featured ? (
          <section className="team-category team-category-featured">
            <h2 className="category-title">
              {featured.designation}
            </h2>
            <div className="featured-card">
              <div className="featured-media">
                <AdvocateImage
                  src={featured.imageUrl}
                  name={featured.name}
                  designation={featured.designation}
                  objectPosition="top center"
                  priority
                />
              </div>
              <div className="featured-content">
                <h3 className="featured-name">
                  {featured.name}
                </h3>
                <p className="featured-meta">
                  <span className="featured-credentials">{featured.credentials}</span>
                  {featured.barCouncilId ? (
                    <span className="featured-bar-id"> • Bar Council ID: {featured.barCouncilId}</span>
                  ) : null}
                </p>
                {featured.bio ? (
                  <div
                    className="featured-bio"
                    dangerouslySetInnerHTML={{ __html: featured.bio }}
                  />
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {/* Directory Categories: Consistent responsive grid */}
        {Array.from(categoriesMap.entries()).map(([designation, members]) => (
          <section key={designation} className="team-category">
            <h2 className="category-title">
              {designation}
            </h2>
            <div className="directory-grid">
              {members.map((member) => (
                <article key={member.id} className="directory-card group">
                  <div className="directory-media">
                    <AdvocateImage
                      src={member.imageUrl}
                      name={member.name}
                      designation={member.designation}
                      objectPosition="top center"
                    />
                  </div>
                  <div className="directory-info">
                    <h3 className="directory-name">
                      {member.name}
                    </h3>
                    <p className="directory-credentials">
                      {member.credentials}
                    </p>
                    {member.barCouncilId ? (
                      <p className="directory-id">
                        ID: {member.barCouncilId}
                      </p>
                    ) : null}
                    {member.bio ? (
                      <div
                        className="directory-bio line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: member.bio }}
                      />
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
