import type { CmsPage, Localized, PhotoFolder } from "@/lib/types";

export const intro: Localized = {
  en: "The Law Emporium is a leading law firm based in Dhaka, Bangladesh. We are known for criminal and constitutional litigations. Our specialty includes civil, company, trust, society, administrative, immigration and family matters. Our team is comprised of dynamic lawyers with sound understanding of law. We render the best services to our clients.",
  bn: "দ্য ল’ এম্পোরিয়াম ঢাকার একটি চেম্বার। আমরা ফৌজদারি ও সাংবিধানিক মামলায় হাজির হই; প্রয়োজনে দেওয়ানি, কোম্পানি, ট্রাস্ট, সমিতি, প্রশাসনিক, অভিবাসন ও পারিবারিক নথিও নিই। দলটি একই সপ্তাহে আইন, গেজেট ও পেপার বুক পড়ে আদালত কী করতে পারে তা মক্কেলকে বলে।",
};

export const features = [
  {
    number: "01",
    href: "/stories",
    title: { en: "Our Stories", bn: "আমাদের গল্প" },
    description: {
      en: "Provisions of law become meaningful when the courts appropriately apply them to solve diverse problems of human life. In a number of cases, we have assisted Courts to arrive at creative legal solutions.",
      bn: "আদালত যখন মানুষের সমস্যায় আইন প্রয়োগ করে, তখন ধারার অর্থ হয়। কয়েকটি মামলায় আমরা কার্যকর আইনি সমাধানে সহায়তা করেছি।",
    },
  },
  {
    number: "02",
    href: "/precedents",
    title: { en: "200 Years Precedents", bn: "২০০ বছরের নজির" },
    description: {
      en: "Precedents significantly contribute in shaping common law jurisprudence. We analyze 200-year-old-precedents, extract the best of those and apply them in real life problems.",
      bn: "নজির এখনও এই কমন ল’ এখতিয়ার গড়ে। পুরনো রিপোর্ট পড়ি, যে অনুপাত আজও চলে তা রাখি, সামনের নথিতে লাগাই।",
    },
  },
  {
    number: "03",
    href: "/research",
    title: { en: "Research and Analysis", bn: "গবেষণা ও বিশ্লেষণ" },
    description: {
      en: "Our researchers are committed to conduct full time research. We engage in-depth research in multifaceted legal issues to suggest the proper course of law in a given problem.",
      bn: "গবেষকরা শুনানিতে যে প্রশ্ন উঠবে সেটিতে পূর্ণসময় কাজ করেন এবং কাউন্সেল দাঁড়িয়ে বলতে পারেন এমন নোট লেখেন।",
    },
  },
];

export const cmsPages: CmsPage[] = [
  {
    slug: "about",
    title: { en: "About Us", bn: "আমাদের কথা" },
    body: {
      en: "<p>We are a Bangladeshi law firm providing solution based legal service to our clients. Our firm, The Law Emporium, is comprised of young, able and dynamic lawyers. They possess sound and practical command of legal knowledge. We aim to emphatically provide best-in-class and cost effective legal solutions to materialize our clients’ objectives.</p><p>The firm conducts extensive and up to the minute legal research in diverse, newly originated complex legal issues and presents their cohesive solutions. In dealing complex issues, we extensively examine the 200-year legal literature of the subcontinent, scrutinize reasoning of the both sides, formulate strategy and pursue them in court. In course of doing so, we employ classical and comprehensive legal resources embracing cutting-edge online legal resource of major legal systems of the world.</p><p>The Law Emporium is a criminal and constitutional law firm. Many a times, the counsels of the firm appeared in a number cases involving jurisprudential question of law and had the privilege of assisting the Highest Court in shaping jurisprudence in our legal system. In the same time, it has already garnered the reputation of dealing with civil and company matters adeptly. Especially, it has successfully served clients in the arena of pre-emption, title and ownership of land, formation of company and society, legal opinion, vetting, mutation, patent, copyright and trademark.</p><p>The firm has the benchmark track record of handling cyber-crimes, financial crimes, prevention of human trafficking, domestic violence, offence relating to arms, explosive substances, anti-terrorism and anti- corruption matters both in Supreme Court and the District Courts.</p><p>The Law Emporium has been applauded for its contribution in solving complex constitutional and criminal legal issues. In the Apex Court of the country, the Counsels of the firm meaningfully contributed in interpreting constitution and statutes of the land and those cases have been reported in the prominent law reports of our jurisdiction. Furthermore, the adroitness of the firm in solution oriented, in-depth legal research has been appreciated in the leading national dailies of Bangladesh. The firm successfully represented its clients in Court in enforcing their fundamental rights against arbitrary exercise of power by the government, statutory bodies and autonomous institutions. In course of doing so, The Law Emporium moved on behalf of citizens’ of diverse backgrounds irrespective of race, sex, color and religion.</p><p>In appropriate circumstances, The Law Emporium is committed to provide pro bono legal service to the destitute and vulnerable class of the society and will strive to provide them with coveted remedies exploring the best relevant solutions.</p>",
      bn: "<p>আমরা ঢাকার একটি চেম্বার। সময়, কাগজ ও বিচারবোধ বিক্রি করি। এখানকার আইনজীবীরা গেজেট নিয়ে বসে থাকতে পারেন এবং কোন যুক্তি বেঞ্চ নাড়াবে তা জানেন।</p><p>পদ্ধতি পুরনো। আইন, সর্বশেষ পরিপত্র এবং উপমহাদেশের দুই শতাব্দীর রিপোর্ট পড়ি। যুক্তির আগে কালানুক্রম লিখি।</p><p>ফৌজদারি ও সাংবিধানিক কাজ তালিকার কেন্দ্র। দেওয়ানি স্বত্ব, কোম্পানি গঠন, হেফাজত ও চাকুরির মামলা পাশে থাকে। যথাযথ ক্ষেত্রে ফি ছাড়া নথি নিই।</p>",
    },
  },
  {
    slug: "policy",
    title: { en: "Policy", bn: "নীতি" },
    body: {
      en: "<p>This website does not ask you to create an account. Appointment fields are used only to return your call. We do not sell lists, and we do not collect special-category data through the public pages.</p><p>Server logs may keep an IP address for security. Do not send confidential case papers through the appointment form.</p>",
      bn: "<p>এই সাইটে অ্যাকাউন্ট লাগে না। অ্যাপয়েন্টমেন্ট ঘর শুধু ফোন ফেরত দিতে। তালিকা বিক্রি করি না।</p><p>নিরাপত্তার জন্য লগে আইপি থাকতে পারে। অ্যাপয়েন্টমেন্ট ফর্মে গোপনীয় মামলার কাগজ পাঠাবেন না।</p>",
    },
  },
  {
    slug: "terms-and-conditions",
    title: { en: "Terms and Conditions", bn: "শর্তাবলি" },
    body: {
      en: "<ol><li>Pages, stories, research notes, and videos may be edited or withdrawn without notice.</li><li>Nothing on this site is a guarantee of a court result. We accept that a note can be wrong and we correct it when we see the error.</li><li>Text and layout are original to this reconstruction. You may quote short passages for study. You may not copy the site for a commercial product.</li><li>We are not responsible for how a third party uses a screenshot of these pages.</li><li>These terms may change. If you disagree, do not use the site.</li></ol>",
      bn: "<ol><li>পাতা, গল্প, গবেষণা ও ভিডিও নোটিশ ছাড়া বদলানো বা তোলা হতে পারে।</li><li>সাইটের কিছুই আদালতের ফলের নিশ্চয়তা নয়।</li><li>লেখা ও বিন্যাস এই পুনর্নির্মাণের মৌলিক সম্পদ। পড়াশোনার জন্য সংক্ষিপ্ত উদ্ধৃতি চলবে; বাণিজ্যিক নকল নয়।</li><li>তৃতীয় পক্ষ স্ক্রিনশট কীভাবে ব্যবহার করে তার দায় আমরা নিই না।</li><li>শর্ত বদলাতে পারে। অসম্মত হলে সাইট ব্যবহার করবেন না।</li></ol>",
    },
  },
];

export function getCmsPage(slug: string): CmsPage | undefined {
  return cmsPages.find((page) => page.slug === slug);
}

export const photoFolders: PhotoFolder[] = [
  {
    slug: "library-afternoon",
    title: { en: "Library afternoon", bn: "লাইব্রেরির বিকেল" },
    position: 1,
    photos: [
      { alt: { en: "Shelves of law reports", bn: "আইন রিপোর্টের তাক" } },
      { alt: { en: "A paper book on the table", bn: "টেবিলে পেপার বুক" } },
      { alt: { en: "Window light on a desk", bn: "টেবিলে জানালার আলো" } },
    ],
  },
  {
    slug: "filing-morning",
    title: { en: "Filing morning", bn: "দাখিলের সকাল" },
    position: 2,
    photos: [
      { alt: { en: "Cause list on the wall", bn: "দেয়ালে কারণ তালিকা" } },
      { alt: { en: "Stamped annexures", bn: "সিলমারা সংযুক্তি" } },
    ],
  },
  {
    slug: "chamber-corridor",
    title: { en: "Chamber corridor", bn: "চেম্বার করিডোর" },
    position: 3,
    photos: [
      { alt: { en: "Black door with brass plate", bn: "পিতলের প্লেটওয়ালা কালো দরজা" } },
      { alt: { en: "Bench in the waiting room", bn: "অপেক্ষমাণ কক্ষের বেঞ্চ" } },
      { alt: { en: "Coat pegs", bn: "কোটের খুঁটি" } },
      { alt: { en: "Stairwell", bn: "সিঁড়িঘর" } },
    ],
  },
  {
    slug: "research-desk",
    title: { en: "Research desk", bn: "গবেষণার ডেস্ক" },
    position: 4,
    photos: [
      { alt: { en: "Open gazette", bn: "খোলা গেজেট" } },
      { alt: { en: "Highlighter on a judgment", bn: "রায়ে হাইলাইটার" } },
    ],
  },
];

export const contact = {
  office: {
    lines: {
      en: ["Suite B-2", "House No. 12", "Road No. 7, Dhanmondi", "Dhaka-1209, Bangladesh"],
      bn: ["স্যুট বি-২", "বাড়ি নং ১২", "রোড নং ৭, ধানমন্ডি", "ঢাকা-১২০৯, বাংলাদেশ"],
    },
    hours: {
      en: [
        "9:00 AM - 9:30 PM (Saturday)",
        "5:00 PM - 9:30 PM (Sunday to Wednesday)",
        "5:00 PM - 8:00 PM (Thursday)",
      ],
      bn: [
        "সকাল ৯:০০ - রাত ৯:৩০ (শনিবার)",
        "বিকেল ৫:০০ - রাত ৯:৩০ (রবি থেকে বুধ)",
        "বিকেল ৫:০০ - রাত ৮:০০ (বৃহস্পতিবার)",
      ],
    },
  },
  chamber: {
    lines: {
      en: ["Room No. 210, Bar Building", "Supreme Court Bar Association", "Ramna, Dhaka-1212, Bangladesh"],
      bn: ["রুম নং ২১০, বার ভবন", "সুপ্রিম কোর্ট বার অ্যাসোসিয়েশন", "রমনা, ঢাকা-১২১২, বাংলাদেশ"],
    },
    hours: {
      en: ["9 AM - 4 PM (Sunday to Thursday)"],
      bn: ["সকাল ৯টা - বিকেল ৪টা (রবি থেকে বৃহস্পতি)"],
    },
  },
  phones: ["+880 1700-000010"],
  emails: ["chambers@example.com", "clerk@example.com"],
  mapUrl: "https://maps.google.com/?q=Dhanmondi+Dhaka",
};

export const featuredSlugs = [
  { kind: "story" as const, slug: "stay-on-a-midnight-warrant" },
  { kind: "precedent" as const, slug: "concurrent-bail-jurisdiction" },
  { kind: "research" as const, slug: "anticipatory-bail-note" },
  { kind: "video" as const, slug: "reading-a-paper-book" },
  { kind: "electronic" as const, slug: "studio-on-writ-practice" },
];
