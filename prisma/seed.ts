/**
 * Seed script: creates default admin user and seeds services, cases,
 * home page sections, site settings, gallery photos, press/media coverage,
 * legal resources, advocate profiles, and sample appointments.
 * Run with: npx tsx prisma/seed.ts
 */
import bcryptjs from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";
import {
  electronicMedia,
  precedents,
  printMedia,
  researchItems,
  stories,
} from "../src/data/content";
import { designations, members } from "../src/data/members";
import { services } from "../src/data/services";
import { contact, features, intro, photoFolders } from "../src/data/site";

const prisma = new PrismaClient();

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

type ParsedCase = {
  caseNumber: number;
  title: string;
  description: string;
  newsLink: string | null;
};

function parseCasesFromHtml(html: string): ParsedCase[] {
  const listItems = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
  if (listItems.length > 0) {
    const entries: ParsedCase[] = [];
    for (const [idx, match] of listItems.entries()) {
      const inner = match[1];
      const hrefMatch = /href="(https?:\/\/[^"]+)"/i.exec(inner);
      const paragraphs = [...inner.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((p) => stripHtml(p[1]))
        .filter(Boolean);

      let title = "";
      let description = "";

      if (paragraphs.length > 0) {
        title = paragraphs[0].replace(/^\d+\.\s*/, "").trim();
        description = paragraphs.slice(1).join(" ").trim();
      } else {
        const strongMatch = /<strong\b[^>]*>([\s\S]*?)<\/strong>/i.exec(inner);
        if (strongMatch) {
          title = stripHtml(strongMatch[1]).replace(/^\d+\.\s*/, "").trim();
          description = stripHtml(inner.replace(strongMatch[0], "")).trim();
        } else {
          title = stripHtml(inner).replace(/^\d+\.\s*/, "").trim();
        }
      }

      if (title) {
        entries.push({
          caseNumber: idx + 1,
          title,
          description: description || title,
          newsLink: hrefMatch ? hrefMatch[1] : null,
        });
      }
    }
    if (entries.length > 0) return entries;
  }

  const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((p) => stripHtml(p[1]))
    .filter(Boolean);

  const numberedEntries: ParsedCase[] = [];
  let current: ParsedCase | null = null;

  for (const text of paragraphs) {
    const numbered = /^(\d+)\.\s+(.+)$/.exec(text);
    if (numbered) {
      if (current) numberedEntries.push(current);
      current = {
        caseNumber: parseInt(numbered[1], 10) || numberedEntries.length + 1,
        title: numbered[2].trim(),
        description: "",
        newsLink: null,
      };
    } else if (current) {
      current.description = current.description ? `${current.description} ${text}` : text;
    }
  }
  if (current) numberedEntries.push(current);

  if (numberedEntries.length > 0) {
    return numberedEntries.map((e) => ({
      ...e,
      description: e.description || e.title,
    }));
  }

  const fallbackText = stripHtml(html);
  if (!fallbackText) return [];
  return [
    {
      caseNumber: 1,
      title: "Notable Matter",
      description: fallbackText,
      newsLink: null,
    },
  ];
}

async function main() {
  // ── 1. Admin user ───────────────────────────────────────────────────────────
  const adminEmail = (process.env.SEED_ADMIN_EMAIL || "admin@thelawemporium.com").toLowerCase().trim();
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`✓ Admin user (${adminEmail}) already exists. Preserving existing password.`);
  } else {
    const rawPassword = process.env.SEED_ADMIN_PASSWORD;
    if (!rawPassword || rawPassword.trim().length < 8) {
      console.warn(
        `⚠ SEED_ADMIN_PASSWORD environment variable is not set or shorter than 8 characters.\n` +
        `  Skipping initial admin creation for ${adminEmail}.\n` +
        `  To create the initial admin user, set SEED_ADMIN_PASSWORD in your .env file and rerun seed.`
      );
    } else {
      const passwordHash = await bcryptjs.hash(rawPassword.trim(), 12);
      await prisma.adminUser.create({
        data: {
          email: adminEmail,
          passwordHash,
          name: "Chambers Administrator",
        },
      });
      console.log(`✓ Initial admin user created for ${adminEmail}.`);
    }
  }

  // ── 2. Site settings ────────────────────────────────────────────────────────
  const siteSettings = [
    { key: "siteName", value: "The Law Emporium" },
    { key: "phone", value: contact.phones[0] ?? "+880 1711-000000" },
    { key: "email", value: contact.emails[0] ?? "info@thelowemporium.com" },
    { key: "address", value: contact.office.lines.en.join(", ") },
    { key: "officeHours", value: contact.office.hours.en.join(" | ") },
  ];
  for (const s of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✓ Site settings seeded");

  // ── 3. Page sections (home intro + features) ────────────────────────────────
  const sections = [
    {
      pageSlug: "home",
      sectionKey: "intro",
      badgeNumber: null,
      titleEn: "Introduction",
      titleBn: "পরিচিতি",
      contentEn: intro.en,
      contentBn: intro.bn,
      order: 0,
    },
    ...features.map((feat, idx) => ({
      pageSlug: "home",
      sectionKey: `feature-${idx + 1}`,
      badgeNumber: feat.number,
      titleEn: feat.title.en,
      titleBn: feat.title.bn,
      contentEn: feat.description.en,
      contentBn: feat.description.bn,
      order: idx + 1,
    })),
  ];

  for (const sec of sections) {
    await prisma.pageSection.upsert({
      where: { pageSlug_sectionKey: { pageSlug: sec.pageSlug, sectionKey: sec.sectionKey } },
      update: sec,
      create: sec,
    });
  }
  console.log(`✓ ${sections.length} page sections seeded`);

  // ── 4. Services + ServiceCase entries ───────────────────────────────────────
  let totalCases = 0;
  for (const [idx, svc] of services.entries()) {
    await prisma.service.upsert({
      where: { id: svc.id },
      update: {
        slug: svc.id,
        category: svc.category,
        indexNumber: svc.position,
        titleEn: svc.title.en,
        titleBn: svc.title.bn,
        excerptEn: svc.excerpt.en,
        excerptBn: svc.excerpt.bn,
        bodyEn: svc.body.en,
        bodyBn: svc.body.bn,
        order: idx,
      },
      create: {
        id: svc.id,
        slug: svc.id,
        category: svc.category,
        indexNumber: svc.position,
        titleEn: svc.title.en,
        titleBn: svc.title.bn,
        excerptEn: svc.excerpt.en,
        excerptBn: svc.excerpt.bn,
        bodyEn: svc.body.en,
        bodyBn: svc.body.bn,
        order: idx,
      },
    });

    if (svc.cases) {
      const existingCount = await prisma.serviceCase.count({
        where: { serviceId: svc.id },
      });
      if (existingCount === 0) {
        const casesEn = parseCasesFromHtml(svc.cases.en);
        const casesBn = parseCasesFromHtml(svc.cases.bn);
        for (let i = 0; i < casesEn.length; i++) {
          const enCase = casesEn[i];
          const bnCase = casesBn[i];
          await prisma.serviceCase.create({
            data: {
              serviceId: svc.id,
              caseNumber: enCase.caseNumber,
              titleEn: enCase.title,
              titleBn: bnCase?.title ?? enCase.title,
              descriptionEn: enCase.description,
              descriptionBn: bnCase?.description ?? enCase.description,
              newsLink: enCase.newsLink,
              order: i,
            },
          });
          totalCases += 1;
        }
      }
    }
  }
  console.log(`✓ ${services.length} services and ${totalCases} cases seeded`);

  // ── 5. GalleryItem (Court, Events, Office) ──────────────────────────────────
  const existingGallery = await prisma.galleryItem.count();
  if (existingGallery === 0) {
    const folderCategoryMap: Record<string, string> = {
      "library-afternoon": "Office",
      "filing-morning": "Court",
      "chamber-corridor": "Office",
      "conference-table": "Events",
      "appellate-briefing": "Court",
      "book-binding": "Office",
    };

    const gallerySeeds: {
      title: string;
      caption: string;
      imageUrl: string;
      category: string;
      featured: boolean;
      order: number;
    }[] = [];

    let gIdx = 0;
    for (const folder of photoFolders) {
      const category = folderCategoryMap[folder.slug] ?? "Office";
      for (const [pIdx, photo] of folder.photos.entries()) {
        gallerySeeds.push({
          title: photo.alt.en,
          caption: `${folder.title.en} — ${photo.alt.en}`,
          imageUrl:
            gIdx === 0
              ? "/images/hero-book.png"
              : `/api/placeholder/${encodeURIComponent(folder.slug + "-" + pIdx)}`,
          category,
          featured: pIdx === 0,
          order: gIdx++,
        });
      }
    }

    // Also include high-visibility chamber showcase entries using existing asset
    gallerySeeds.push(
      {
        title: "Supreme Court Annex Briefing",
        caption: "Appellate Division paper-book preparation before morning mention.",
        imageUrl: "/images/hero-book.png",
        category: "Court",
        featured: true,
        order: gIdx++,
      },
      {
        title: "Annual Legal Symposium",
        caption: "Constitutional law seminar hosted by senior chambers counsel.",
        imageUrl: "/images/the-law-emporium-logo.jpg",
        category: "Events",
        featured: true,
        order: gIdx++,
      },
    );

    await prisma.galleryItem.createMany({ data: gallerySeeds });
    console.log(`✓ ${gallerySeeds.length} gallery items seeded`);
  }

  // ── 6. MediaCoverage (Print & Electronic) ───────────────────────────────────
  const existingMedia = await prisma.mediaCoverage.count();
  if (existingMedia === 0) {
    const mediaSeeds = [
      ...printMedia.map((m, idx) => ({
        title: m.title.en,
        outletName: idx === 0 ? "The Daily Star — Law & Our Rights" : "Dhaka Tribune",
        articleUrl: m.link ?? "https://example.com/press",
        coverImage: "/images/hero-book.png",
        publishedAt: m.date ? new Date(m.date) : new Date("2026-05-02"),
        excerpt: m.excerpt.en,
        badge: "Print",
        order: idx,
      })),
      ...electronicMedia.map((m, idx) => ({
        title: m.title.en,
        outletName: idx === 0 ? "Channel 24 Legal Hour" : "Somoy TV",
        articleUrl: m.link ?? "https://example.com/broadcast",
        coverImage: "/images/the-law-emporium-logo.jpg",
        publishedAt: m.date ? new Date(m.date) : new Date("2026-07-09"),
        excerpt: m.excerpt.en,
        badge: "Electronic",
        order: printMedia.length + idx,
      })),
    ];

    await prisma.mediaCoverage.createMany({ data: mediaSeeds });
    console.log(`✓ ${mediaSeeds.length} media coverage items seeded`);
  }

  // ── 7. ResourceItem (Research, Story, Precedent) ────────────────────────────
  const resourceSeeds = [
    ...researchItems.map((r, idx) => ({
      title: r.title.en,
      slug: r.slug,
      category: "Research",
      author: "The Law Emporium Research Wing",
      fileUrl: null as string | null,
      content: r.body.en,
      readTime: "6 min read",
      order: idx,
    })),
    ...stories.map((s, idx) => ({
      title: s.title.en,
      slug: s.slug,
      category: "Story",
      author: "Chambers Editorial",
      fileUrl: null as string | null,
      content: s.body.en,
      readTime: "4 min read",
      order: 10 + idx,
    })),
    ...precedents.map((p, idx) => ({
      title: p.title.en,
      slug: p.slug,
      category: "Precedent",
      author: "Appellate Research Desk",
      fileUrl: null as string | null,
      content: p.body.en,
      readTime: "5 min read",
      order: 20 + idx,
    })),
  ];

  for (const res of resourceSeeds) {
    await prisma.resourceItem.upsert({
      where: { slug: res.slug },
      update: res,
      create: res,
    });
  }
  console.log(`✓ ${resourceSeeds.length} resource items seeded`);

  // ── 8. AdvocateProfile (Team / We) ──────────────────────────────────────────
  const existingAdvocates = await prisma.advocateProfile.count();
  if (existingAdvocates === 0) {
    const designationById = new Map(designations.map((d) => [d.id, d.title.en]));
    const advocateSeeds = members.map((m, idx) => ({
      name: m.name.en,
      designation: designationById.get(m.designationId) ?? m.court.en,
      credentials: `${m.credentials.en} • ${m.court.en}`,
      bio: m.body.en,
      imageUrl: null as string | null,
      barCouncilId: `BD-SC-${1042 + idx * 117}`,
      email: m.email ?? null,
      phone: m.phone ?? null,
      order: idx,
    }));

    await prisma.advocateProfile.createMany({ data: advocateSeeds });
    console.log(`✓ ${advocateSeeds.length} advocate profiles seeded`);
  }

  // ── 9. Sample Appointments ──────────────────────────────────────────────────
  const existingAppts = await prisma.appointment.count();
  if (existingAppts === 0) {
    await prisma.appointment.createMany({
      data: [
        {
          name: "Tariqul Islam",
          contactNumber: "+880 1712-345678",
          email: "tariqul.islam@example.com",
          preferredTime: "Sunday, Nov 15 • 4:30 PM",
          status: "PENDING",
        },
        {
          name: "Farzana Yasmin",
          contactNumber: "+880 1819-223344",
          email: "farzana.y@example.com",
          preferredTime: "Monday, Nov 16 • 11:00 AM",
          status: "CONFIRMED",
        },
        {
          name: "Mahmudul Hasan",
          contactNumber: "+880 1911-889900",
          email: "m.hasan@example.com",
          preferredTime: "Wednesday, Nov 18 • 3:00 PM",
          status: "PENDING",
        },
      ],
    });
    console.log("✓ Sample appointments seeded");
  }

  console.log("\nDatabase seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
