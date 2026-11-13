import type { ContentItem, ContentKind } from "@/lib/types";

function item(
  kind: ContentKind,
  slug: string,
  position: number,
  titleEn: string,
  titleBn: string,
  excerptEn: string,
  excerptBn: string,
  bodyEn: string,
  bodyBn: string,
  extra: Partial<ContentItem> = {},
): ContentItem {
  return {
    slug,
    kind,
    published: true,
    position,
    title: { en: titleEn, bn: titleBn },
    excerpt: { en: excerptEn, bn: excerptBn },
    body: { en: bodyEn, bn: bodyBn },
    ...extra,
  };
}

export const stories: ContentItem[] = [
  item(
    "story",
    "stay-on-a-midnight-warrant",
    1,
    "Stay on a midnight warrant",
    "মধ্যরাতের পরোয়ানায় স্থগিতাদেশ",
    "A district court process issued after hours. The High Court Division stayed execution until the record could be read in daylight.",
    "অফিস সময়ের পর জারিকৃত প্রক্রিয়া। রেকর্ড পড়া না পর্যন্ত হাইকোর্ট স্থগিত রাখে।",
    "<p>The file arrived after the cause list had closed. Counsel isolated a single defect: the warrant recited a section that the complaint did not support. The stay was narrow, time-bound, and enough to bring the accused to court on a weekday.</p><p>This is the kind of story chambers tells because the remedy was modest and the record was clean — not because the matter was famous.</p>",
    "<p>কারণ তালিকা বন্ধের পর নথি আসে। অভিযোগে নেই এমন ধারায় পরোয়ানা। স্থগিতাদেশ সংকীর্ণ ও সময়সীমিত ছিল।</p>",
  ),
  item(
    "story",
    "custody-returned-before-term",
    2,
    "Custody returned before the term ended",
    "মেয়াদ শেষের আগে হেফাজত ফেরত",
    "An interim order had parked two children with a relative. The family court restored the parent who had been the actual carer.",
    "অন্তর্বর্তী আদেশে দুই শিশু আত্মীয়ের কাছে। প্রকৃত যত্নকারী অভিভাবককে ফেরত।",
    "<p>The affidavits were about school runs and medical cards, not about who shouted last. The court treated welfare as a timetable, not a slogan.</p>",
    "<p>হলফনামায় স্কুল ও চিকিৎসা কার্ড। কল্যাণ সময়সূচি হিসেবে বিবেচিত।</p>",
  ),
  item(
    "story",
    "name-cleared-on-the-register",
    3,
    "A name cleared on the company register",
    "কোম্পানি রেজিস্টারে নাম ছাড়করণ",
    "Two filings collided on the same proposed name. The later applicant kept the name after a paper trail of consent.",
    "একই প্রস্তাবিত নামে দুই দাখিল। সম্মতির কাগজে পরের আবেদনকারী নাম রাখে।",
    "<p>Incorporation work is unglamorous until a name is blocked. We reconstructed the timeline of applications and put a consent letter in the form the registrar would actually stamp.</p>",
    "<p>নাম আটকে গেলে গঠন কাজ জটিল। আবেদনের কালানুক্রম ও সম্মতিপত্র রেজিস্ট্রার যে ফর্মে সিল দেন সেভাবে।</p>",
  ),
  item(
    "story",
    "confession-left-on-the-table",
    4,
    "A confession left on the table",
    "টেবিলে পড়ে থাকা স্বীকারোক্তি",
    "The caution was missing. The remaining evidence did not carry a conviction on the charged section.",
    "সতর্কতা ছিল না। অভিযুক্ত ধারায় বাকি প্রমাণ দণ্ড টানায়নি।",
    "<p>We did not argue that the police were villains. We argued that the Code’s sequence for recording a confession is the sequence, and that a gap in that sequence is a legal gap.</p>",
    "<p>কোডে স্বীকারোক্তি লেখার ক্রমই ক্রম। সেখানে ফাঁক আইনি ফাঁক।</p>",
  ),
];

export const precedents: ContentItem[] = [
  item(
    "precedent",
    "concurrent-bail-jurisdiction",
    1,
    "Concurrent jurisdiction to entertain bail",
    "জামিন গ্রহণে সমান্তরাল এখতিয়ার",
    "The High Court Division and the court of sessions may both hear a bail application in a proper case.",
    "যথাযথ ক্ষেত্রে হাইকোর্ট ও দায়রা উভয়ে জামিন শুনতে পারে।",
    "<p>Older reports treat the two forums as concurrent, not as a rigid ladder that must be exhausted in every instance. The practical lesson is to plead why this bench, on this record, should go first.</p>",
    "<p>দুই ফোরাম সমান্তরাল। এই বেঞ্চ কেন আগে, তা রেকর্ডে বলতে হয়।</p>",
  ),
  item(
    "precedent",
    "unserviceable-arms",
    2,
    "Unserviceable arms and the charging section",
    "অকেজো অস্ত্র ও অভিযোগ ধারা",
    "A weapon that cannot fire may fall outside the mischief of a statute aimed at serviceable arms.",
    "যে অস্ত্র চলে না, চালু অস্ত্রের উদ্দেশ্যে লেখা আইনের আওতায় নাও পড়তে পারে।",
    "<p>The ratio is narrow: prove the condition of the object. Do not argue policy. The laboratory note, not the rhetoric, decides whether the section is attracted.</p>",
    "<p>বস্তুর অবস্থা প্রমাণ করুন। ল্যাব নোটই ধারা টানে কি না তা বলে।</p>",
  ),
  item(
    "precedent",
    "third-party-revision",
    3,
    "When a third party may revise",
    "তৃতীয় পক্ষ কখন রিভিশন করতে পারে",
    "A stranger to the decree may still move if the order binds an interest the court did not hear.",
    "ডিক্রির বাইরের কেউ আগ্রহ শোনা না হলেও আদেশ বাঁধলে নড়তে পারে।",
    "<p>Revision is not a gift to busybodies. The petitioner must show a legal interest affected by an order passed behind their back.</p>",
    "<p>আবেদনকারীকে পেছনে গিয়ে হওয়া আদেশে আইনি স্বার্থ দেখাতে হয়।</p>",
  ),
  item(
    "precedent",
    "confession-and-force",
    4,
    "Confessions extracted by force",
    "বলপ্রয়োগে আদায় করা স্বীকারোক্তি",
    "A rule against using a confession obtained by violence or the threat of it.",
    "সহিংসতা বা তার হুমকিতে পাওয়া স্বীকারোক্তি ব্যবহারের নিয়ম।",
    "<p>The common-law reading is older than the Code section that now carries it. We cite both, then return to the magistrate’s certificate on the face of the record.</p>",
    "<p>কমন ল’ পাঠ কোডের ধারার চেয়ে পুরনো। দুটোই উদ্ধৃত করে ম্যাজিস্ট্রেটের সনদ দেখি।</p>",
  ),
];

export const researchItems: ContentItem[] = [
  item(
    "research",
    "anticipatory-bail-note",
    1,
    "Anticipatory bail: a working note",
    "আগাম জামিন: কাজের নোট",
    "How chambers sequences the affidavit, the section, and the alternative remedy before moving.",
    "আবেদনের আগে হলফনামা, ধারা ও বিকল্প প্রতিকার কী ক্রমে সাজাই।",
    "<p>This paper is a checklist, not a treatise. It asks whether the accused has shown a specific threat, whether the offence is bailable in substance, and whether the sessions court has already been tried.</p>",
    "<p>এটি চেকলিস্ট। নির্দিষ্ট হুমকি, অপরাধের প্রকৃতি এবং দায়রা ইতিমধ্যে চেষ্টা করা হয়েছে কি না।</p>",
  ),
  item(
    "research",
    "writ-against-private-bodies",
    2,
    "Writs and bodies that look private",
    "রিট এবং ব্যক্তিগত দেখতে সংস্থা",
    "When a university, hospital, or company exercises a public function that can still be reviewed.",
    "বিশ্ববিদ্যালয়, হাসপাতাল বা কোম্পানি যখন জনক্ষমতা চালায়।",
    "<p>The test is function, not letterhead. We collect the statute, the funding, and the monopoly. If those three point at a public duty, a writ may still lie.</p>",
    "<p>মাপকাঠি কাজ, লেটারহেড নয়। আইন, অর্থায়ন ও একচেটিয়া অধিকার।</p>",
  ),
  item(
    "research",
    "certainty-in-charging",
    3,
    "Certainty in a criminal charge",
    "ফৌজদারি অভিযোগে নিশ্চয়তা",
    "A charge that a reasonably instructed person cannot understand is not a charge.",
    "যে অভিযোগ সাধারণ জ্ঞানসম্পন্ন ব্যক্তি বোঝেন না, তা অভিযোগ নয়।",
    "<p>Particulars are not decoration. They tell the accused which week, which place, and which act. We use this note when the FIR is a paragraph and the charge is a slogan.</p>",
    "<p>বিবরণ সাজসজ্জা নয়। কোন সপ্তাহ, কোন স্থান, কোন কাজ।</p>",
  ),
  item(
    "research",
    "life-sentence-length",
    4,
    "How long is a life sentence?",
    "যাবজ্জীবন দণ্ড কতদিন?",
    "A chamber paper on remission, natural life, and the words the statute actually uses.",
    "রেমিশন, প্রাকৃতিক জীবন এবং আইনের শব্দ নিয়ে চেম্বার পেপার।",
    "<p>Counsel should not guess. The paper sets out the competing readings and the practical consequence for a mercy petition versus an appeal.</p>",
    "<p>অনুমান নয়। ভিন্ন পাঠ এবং আপিল বনাম ক্ষমা আবেদনের ফল।</p>",
  ),
];

export const videos: ContentItem[] = [
  item(
    "video",
    "reading-a-paper-book",
    1,
    "How we read a paper book",
    "পেপার বুক কীভাবে পড়ি",
    "A short chambers talk on indexes, exhibits, and the page that actually decides the appeal.",
    "সূচি, প্রদর্শনী এবং যে পাতা আপিল টানায় সেটি নিয়ে সংক্ষিপ্ত আলোচনা।",
    "<p>This session is a teaching recording for juniors. It is not legal advice. It walks through a dummy paper book: index, deposition, exhibit, and the one contradiction that matters.</p>",
    "<p>জুনিয়রদের জন্য শিক্ষামূলক রেকর্ডিং। আইনি পরামর্শ নয়।</p>",
  ),
  item(
    "video",
    "writ-petition-structure",
    2,
    "Structure of a writ petition",
    "রিট আবেদনের কাঠামো",
    "Parties, facts, grounds, and the prayer — in that order, with nothing extra.",
    "পক্ষ, তথ্য, গ্রাউন্ড ও প্রার্থনা — এই ক্রমে, বাড়তি কিছু নয়।",
    "<p>A twenty-minute walkthrough of a model petition. Grounds are numbered. The prayer matches the grounds. Annexures are labelled as they are cited.</p>",
    "<p>মডেল আবেদনের বিশ মিনিট। গ্রাউন্ড নম্বরযুক্ত; প্রার্থনা গ্রাউন্ডের সাথে মিলে।</p>",
  ),
  item(
    "video",
    "family-court-first-date",
    3,
    "First date in the family court",
    "পারিবারিক আদালতে প্রথম তারিখ",
    "What to bring, what not to argue, and how to ask for an interim order without a speech.",
    "কী আনবেন, কী তর্ক করবেন না, এবং বক্তৃতা ছাড়া অন্তর্বর্তী আদেশ।",
    "<p>Practical listing advice for associates covering a first date. Bring the marriage document, the child’s school proof, and a draft order that a judge can initial.</p>",
    "<p>প্রথম তারিখের বাস্তব পরামর্শ। বিবাহ কাগজ, স্কুল প্রমাণ, খসড়া আদেশ।</p>",
  ),
];

export const printMedia: ContentItem[] = [
  item(
    "print",
    "note-on-court-hours",
    1,
    "A note on sitting hours in the daily press",
    "দৈনিকে আদালতের সময় নিয়ে নোট",
    "Chambers comment on listing delays, quoted in a law-page column.",
    "তালিকা বিলম্ব নিয়ে চেম্বার মন্তব্য, আইন পাতায় উদ্ধৃত।",
    "<p>The column asked why miscellaneous lists overrun. The answer we gave was unromantic: too few judges, too many mentions, and paper books that arrive the morning of the hearing.</p>",
    "<p>বিবিধ তালিকা লম্বা হয় কেন — বিচারক কম, উল্লেখ বেশি, পেপার বুক শুনানির সকালে আসে।</p>",
    { link: "https://example.com/press/court-hours", date: "2026-05-02" },
  ),
  item(
    "print",
    "haor-reporting",
    2,
    "Reporting from the haor belt",
    "হাওর অঞ্চল থেকে প্রতিবেদন",
    "A field note on flood damage and what a court can and cannot order.",
    "বন্যা ক্ষতি এবং আদালত কী আদেশ দিতে পারে তা নিয়ে মাঠ নোট।",
    "<p>We spoke about mega-projects only as a policy question, not as a pending petition. The piece is linked here as a media appearance, not as a chambers advertisement.</p>",
    "<p>মেগা প্রকল্প নীতি প্রশ্ন হিসেবে। এটি মিডিয়া উপস্থিতি, বিজ্ঞাপন নয়।</p>",
    { date: "2026-05-01" },
  ),
];

export const electronicMedia: ContentItem[] = [
  item(
    "electronic",
    "studio-on-writ-practice",
    1,
    "Studio conversation on writ practice",
    "রিট চর্চা নিয়ে স্টুডিও আলোচনা",
    "A recorded interview on how a writ petition is built, without discussing a live file.",
    "চলমান নথি ছাড়া রিট কীভাবে গড়া হয় সে বিষয়ে সাক্ষাৎকার।",
    "<p>The recording is a general explainer. No client is named. The host asked about annexures, affidavits, and the difference between a mandamus and a certiorari prayer.</p>",
    "<p>সাধারণ ব্যাখ্যা। কোনো মক্কেলের নাম নেই।</p>",
    { date: "2026-07-09" },
  ),
  item(
    "electronic",
    "news-hour-on-listing",
    2,
    "News hour on cause-list congestion",
    "কারণ তালিকার চাপ নিয়ে নিউজ আওয়ার",
    "A short clip on why mentions eat the morning list.",
    "উল্লেখ কেন সকালের তালিকা খায় সে বিষয়ে সংক্ষিপ্ত ক্লিপ।",
    "<p>We repeated the same point we put in print: congestion is a staffing and process problem. Television time is not a substitute for a paper book.</p>",
    "<p>চাপ জনবল ও প্রক্রিয়ার সমস্যা। টিভি সময় পেপার বুকের বদলি নয়।</p>",
    { date: "2026-05-05" },
  ),
];

export function published(items: ContentItem[]): ContentItem[] {
  return items.filter((entry) => entry.published).sort((a, b) => a.position - b.position);
}

export function findContent(items: ContentItem[], slug: string): ContentItem | undefined {
  return published(items).find((entry) => entry.slug === slug);
}

export const PAGE_SIZE = 12;
