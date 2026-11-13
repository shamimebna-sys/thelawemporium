/**
 * Server-side data access layer for public pages.
 * Queries PostgreSQL via Prisma and falls back cleanly to static data
 * if the database is unreachable or not yet seeded.
 */
import {
  electronicMedia,
  precedents,
  printMedia,
  researchItems,
  stories,
} from "@/data/content";
import { designations, members } from "@/data/members";
import { services as staticServices, servicesByCategory as staticByCategory } from "@/data/services";
import { contact, features as staticFeatures, intro as staticIntro, photoFolders } from "@/data/site";
import { prisma } from "@/lib/prisma";
import type { ServiceCategory } from "@/lib/types";

export type HydratedCase = {
  id: string;
  caseNumber: number;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  newsLink: string | null;
};

export type HydratedService = {
  id: string;
  slug: string;
  category: string;
  indexNumber: number;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  bodyEn: string;
  bodyBn: string;
  cases: HydratedCase[];
  fallbackCasesHtml?: { en: string; bn: string } | null;
};

export type HydratedHomeSection = {
  sectionKey: string;
  badgeNumber: string | null;
  href: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
};

export type HydratedGalleryItem = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  order: number;
};

export type HydratedMediaItem = {
  id: string;
  title: string;
  outletName: string;
  articleUrl: string | null;
  coverImage: string | null;
  publishedAt: Date;
  excerpt: string;
  badge: string;
  order: number;
};

export type HydratedResourceItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  fileUrl: string | null;
  content: string;
  readTime: string;
  order: number;
};

export type HydratedAdvocate = {
  id: string;
  name: string;
  designation: string;
  credentials: string;
  bio: string;
  imageUrl: string | null;
  barCouncilId: string | null;
  email: string | null;
  phone: string | null;
  order: number;
};

const FEATURE_HREF_BY_KEY: Record<string, string> = {
  "feature-1": "/stories",
  "feature-2": "/precedents",
  "feature-3": "/research",
};

/** Fetch all services for a category, ordered by indexNumber/order. */
export async function getServicesByCategory(category: ServiceCategory): Promise<HydratedService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { category },
      orderBy: [{ indexNumber: "asc" }, { order: "asc" }],
    });
    if (rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        category: row.category,
        indexNumber: row.indexNumber,
        titleEn: row.titleEn,
        titleBn: row.titleBn,
        excerptEn: row.excerptEn,
        excerptBn: row.excerptBn,
        bodyEn: row.bodyEn,
        bodyBn: row.bodyBn,
        cases: [],
      }));
    }
  } catch {
    // Fallback to static data below
  }

  return staticByCategory(category).map((item) => ({
    id: item.id,
    slug: item.id,
    category: item.category,
    indexNumber: item.position,
    titleEn: item.title.en,
    titleBn: item.title.bn,
    excerptEn: item.excerpt.en,
    excerptBn: item.excerpt.bn,
    bodyEn: item.body.en,
    bodyBn: item.body.bn,
    cases: [],
    fallbackCasesHtml: item.cases ?? null,
  }));
}

/** Fetch a single service + its cases by slug/id. */
export async function getServiceBySlug(slug: string): Promise<HydratedService | null> {
  try {
    const row = await prisma.service.findUnique({
      where: { slug },
      include: { cases: { orderBy: { order: "asc" } } },
    });
    if (row) {
      return {
        id: row.id,
        slug: row.slug,
        category: row.category,
        indexNumber: row.indexNumber,
        titleEn: row.titleEn,
        titleBn: row.titleBn,
        excerptEn: row.excerptEn,
        excerptBn: row.excerptBn,
        bodyEn: row.bodyEn,
        bodyBn: row.bodyBn,
        cases: row.cases.map((c) => ({
          id: c.id,
          caseNumber: c.caseNumber,
          titleEn: c.titleEn,
          titleBn: c.titleBn,
          descriptionEn: c.descriptionEn,
          descriptionBn: c.descriptionBn,
          newsLink: c.newsLink,
        })),
      };
    }
  } catch {
    // Fallback to static data below
  }

  const staticMatch = staticServices.find((item) => item.id === slug);
  if (!staticMatch) return null;

  return {
    id: staticMatch.id,
    slug: staticMatch.id,
    category: staticMatch.category,
    indexNumber: staticMatch.position,
    titleEn: staticMatch.title.en,
    titleBn: staticMatch.title.bn,
    excerptEn: staticMatch.excerpt.en,
    excerptBn: staticMatch.excerpt.bn,
    bodyEn: staticMatch.body.en,
    bodyBn: staticMatch.body.bn,
    cases: [],
    fallbackCasesHtml: staticMatch.cases ?? null,
  };
}

/** Fetch home intro and feature blocks from PageSection table. */
export async function getHomeContent(): Promise<{
  intro: { en: string; bn: string };
  features: HydratedHomeSection[];
}> {
  try {
    const rows = await prisma.pageSection.findMany({
      where: { pageSlug: "home" },
      orderBy: { order: "asc" },
    });
    if (rows.length > 0) {
      const introRow = rows.find((r) => r.sectionKey === "intro");
      const featureRows = rows.filter((r) => r.sectionKey !== "intro");
      return {
        intro: introRow
          ? { en: introRow.contentEn, bn: introRow.contentBn }
          : { en: staticIntro.en, bn: staticIntro.bn },
        features:
          featureRows.length > 0
            ? featureRows.map((row, idx) => ({
                sectionKey: row.sectionKey,
                badgeNumber: row.badgeNumber ?? String(idx + 1).padStart(2, "0"),
                href: FEATURE_HREF_BY_KEY[row.sectionKey] ?? "/stories",
                titleEn: row.titleEn,
                titleBn: row.titleBn,
                contentEn: row.contentEn,
                contentBn: row.contentBn,
              }))
            : staticFeatures.map((f, idx) => ({
                sectionKey: `feature-${idx + 1}`,
                badgeNumber: f.number,
                href: f.href,
                titleEn: f.title.en,
                titleBn: f.title.bn,
                contentEn: f.description.en,
                contentBn: f.description.bn,
              })),
      };
    }
  } catch {
    // Fallback to static data below
  }

  return {
    intro: { en: staticIntro.en, bn: staticIntro.bn },
    features: staticFeatures.map((f, idx) => ({
      sectionKey: `feature-${idx + 1}`,
      badgeNumber: f.number,
      href: f.href,
      titleEn: f.title.en,
      titleBn: f.title.bn,
      contentEn: f.description.en,
      contentBn: f.description.bn,
    })),
  };
}

/** Fetch site settings key-value map with static fallbacks. */
export async function getSiteSettings(): Promise<Record<string, string>> {
  const defaults: Record<string, string> = {
    siteName: "The Law Emporium",
    phone: contact.phones[0] ?? "",
    email: contact.emails[0] ?? "",
    address: contact.office.lines.en.join(", "),
    officeHours: contact.office.hours.en.join(" | "),
  };
  try {
    const rows = await prisma.siteSetting.findMany();
    for (const row of rows) {
      defaults[row.key] = row.value;
    }
  } catch {
    // Use defaults
  }
  return defaults;
}

/** Fetch all GalleryItem photos ordered by featured/order. */
export async function getGalleryItems(): Promise<HydratedGalleryItem[]> {
  try {
    const rows = await prisma.galleryItem.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    if (rows.length > 0) return rows;
  } catch {
    // Fallback below
  }

  return photoFolders.flatMap((folder, fIdx) =>
    folder.photos.map((photo, pIdx) => ({
      id: `${folder.slug}-${pIdx}`,
      title: photo.alt.en,
      caption: folder.title.en,
      imageUrl: `/api/placeholder/${encodeURIComponent(`${folder.slug}-${pIdx}`)}`,
      category: fIdx % 2 === 0 ? "Office" : "Court",
      featured: pIdx === 0,
      order: fIdx * 10 + pIdx,
    })),
  );
}

/** Fetch Press & Media coverage entries, optionally filtered by badge. */
export async function getMediaCoverage(badge?: string): Promise<HydratedMediaItem[]> {
  try {
    const rows = await prisma.mediaCoverage.findMany({
      where: badge ? { badge } : undefined,
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
    });
    if (rows.length > 0) return rows;
  } catch {
    // Fallback below
  }

  const allStatic = [
    ...printMedia.map((m, idx) => ({
      id: m.slug,
      title: m.title.en,
      outletName: "The Daily Star",
      articleUrl: m.link ?? null,
      coverImage: "/images/hero-book.png",
      publishedAt: m.date ? new Date(m.date) : new Date("2026-05-02"),
      excerpt: m.excerpt.en,
      badge: "Print",
      order: idx,
    })),
    ...electronicMedia.map((m, idx) => ({
      id: m.slug,
      title: m.title.en,
      outletName: "Broadcast Desk",
      articleUrl: m.link ?? null,
      coverImage: "/images/the-law-emporium-logo.jpg",
      publishedAt: m.date ? new Date(m.date) : new Date("2026-07-09"),
      excerpt: m.excerpt.en,
      badge: "Electronic",
      order: 10 + idx,
    })),
  ];

  return badge ? allStatic.filter((i) => i.badge === badge) : allStatic;
}

/** Fetch legal ResourceItem articles, optionally filtered by category. */
export async function getResources(category?: string): Promise<HydratedResourceItem[]> {
  try {
    const rows = await prisma.resourceItem.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    if (rows.length > 0) return rows;
  } catch {
    // Fallback below
  }

  const allStatic: HydratedResourceItem[] = [
    ...researchItems.map((r, idx) => ({
      id: r.slug,
      title: r.title.en,
      slug: r.slug,
      category: "Research",
      author: "The Law Emporium Research Wing",
      fileUrl: null,
      content: r.body.en,
      readTime: "6 min read",
      order: idx,
    })),
    ...stories.map((s, idx) => ({
      id: s.slug,
      title: s.title.en,
      slug: s.slug,
      category: "Story",
      author: "Chambers Editorial",
      fileUrl: null,
      content: s.body.en,
      readTime: "4 min read",
      order: 10 + idx,
    })),
    ...precedents.map((p, idx) => ({
      id: p.slug,
      title: p.title.en,
      slug: p.slug,
      category: "Precedent",
      author: "Appellate Research Desk",
      fileUrl: null,
      content: p.body.en,
      readTime: "5 min read",
      order: 20 + idx,
    })),
  ];

  return category ? allStatic.filter((i) => i.category === category) : allStatic;
}

/** Fetch a single resource by slug. */
export async function getResourceBySlug(slug: string): Promise<HydratedResourceItem | null> {
  try {
    const row = await prisma.resourceItem.findUnique({ where: { slug } });
    if (row) return row;
  } catch {
    // Fallback below
  }
  const list = await getResources();
  return list.find((item) => item.slug === slug) ?? null;
}

/** Fetch all AdvocateProfile records ordered by sort order. */
export async function getAdvocateProfiles(): Promise<HydratedAdvocate[]> {
  try {
    const rows = await prisma.advocateProfile.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length > 0) return rows;
  } catch {
    // Fallback below
  }

  const desigMap = new Map(designations.map((d) => [d.id, d.title.en]));
  return members.map((m, idx) => ({
    id: m.slug,
    name: m.name.en,
    designation: desigMap.get(m.designationId) ?? m.court.en,
    credentials: `${m.credentials.en} • ${m.court.en}`,
    bio: m.body.en,
    imageUrl: null,
    barCouncilId: `BD-SC-${1042 + idx * 117}`,
    email: m.email ?? null,
    phone: m.phone ?? null,
    order: idx,
  }));
}
