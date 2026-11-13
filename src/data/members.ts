import type { Designation, Member } from "@/lib/types";

export const designations: Designation[] = [
  { id: "head", position: 1, title: { en: "Head of Chambers", bn: "হেড অব চেম্বার্স" } },
  { id: "senior-counsel", position: 2, title: { en: "Senior Counsel", bn: "সিনিয়র কাউন্সেল" } },
  { id: "counsel", position: 3, title: { en: "Counsels", bn: "কাউন্সেল" } },
  { id: "associates", position: 6, title: { en: "Associates", bn: "অ্যাসোসিয়েট" } },
  { id: "research", position: 7, title: { en: "Research Associates", bn: "রিসার্চ অ্যাসোসিয়েট" } },
  { id: "court", position: 12, title: { en: "Court Assistants", bn: "কোর্ট অ্যাসিস্ট্যান্ট" } },
];

export const members: Member[] = [
  {
    slug: "nabila-karim",
    name: { en: "Nabila Karim", bn: "নাবিলা করিম" },
    credentials: { en: "LL.B. (Hons.), LL.M.", bn: "এলএল.বি. (অনার্স), এলএল.এম." },
    court: { en: "Advocate, Supreme Court of Bangladesh", bn: "অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট" },
    designationId: "head",
    summary: {
      en: "Head of Chambers. Practice in criminal appeals, writs, and public law.",
      bn: "হেড অব চেম্বার্স। ফৌজদারি আপিল, রিট ও পাবলিক ল।",
    },
    body: {
      en: "<p>Nabila leads the chambers docket and takes the first cut on every capital and constitutional brief. She appears in the High Court Division and the Appellate Division, and she supervises how juniors read a paper book.</p><p>Her notes for the team are short: isolate the statute, then the finding, then the remedy. She teaches that a chambers is judged by the quality of its first draft, not the length of its press quotes.</p>",
      bn: "<p>নাবিলা চেম্বারের ডকেট পরিচালনা করেন এবং মৃত্যুদণ্ড ও সাংবিধানিক ব্রিফে প্রথম পাঠ নেন।</p>",
    },
    phone: "+880 1700-000001",
    email: "chambers@example.com",
  },
  {
    slug: "farhan-uddin",
    name: { en: "Farhan Uddin", bn: "ফারহান উদ্দিন" },
    credentials: { en: "LL.B. (Hons.), LL.M.", bn: "এলএল.বি. (অনার্স), এলএল.এম." },
    court: { en: "Advocate, Supreme Court of Bangladesh", bn: "অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট" },
    designationId: "senior-counsel",
    summary: {
      en: "Senior Counsel. Bail, quashment, and criminal revision.",
      bn: "সিনিয়র কাউন্সেল। জামিন, কোয়াশমেন্ট ও ফৌজদারি রিভিশন।",
    },
    body: {
      en: "<p>Farhan runs the urgent criminal list. He is usually the first call when a client needs a stay the same week. He also vets junior drafts on confessions, identification parades, and the Arms Act.</p>",
      bn: "<p>ফারহান জরুরি ফৌজদারি তালিকা চালান। একই সপ্তাহে স্থগিতাদেশ লাগলে প্রথম কল তিনি।</p>",
    },
    phone: "+880 1700-000002",
    email: "farhan@example.com",
  },
  {
    slug: "ruma-chowdhury",
    name: { en: "Ruma Chowdhury", bn: "রুমা চৌধুরী" },
    credentials: { en: "LL.B. (Hons.), LL.M. (International Law)", bn: "এলএল.বি., এলএল.এম. (আন্তর্জাতিক আইন)" },
    court: { en: "Advocate, Supreme Court of Bangladesh", bn: "অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট" },
    designationId: "counsel",
    summary: {
      en: "Counsel. Family, civil revision, and company papers.",
      bn: "কাউন্সেল। পারিবারিক, দেওয়ানি রিভিশন ও কোম্পানি কাগজ।",
    },
    body: {
      en: "<p>Ruma holds the family and company desks. She drafts memoranda and articles so they match the shareholders’ actual bargain, and she keeps custody petitions to facts a judge can test.</p>",
      bn: "<p>রুমা পারিবারিক ও কোম্পানি ডেস্ক রাখেন। হেফাজত আবেদন বিচারক যাচাই করতে পারেন এমন তথ্যে সীমাবদ্ধ রাখেন।</p>",
    },
    phone: "+880 1700-000003",
    email: "ruma@example.com",
  },
  {
    slug: "imran-hossain",
    name: { en: "Imran Hossain", bn: "ইমরান হোসেন" },
    credentials: { en: "LL.B. (Hons.), LL.M.", bn: "এলএল.বি. (অনার্স), এলএল.এম." },
    court: { en: "Advocate, District and Sessions Court, Dhaka", bn: "অ্যাডভোকেট, জেলা ও দায়রা জজ আদালত, ঢাকা" },
    designationId: "associates",
    summary: {
      en: "Associate. Research, drafting, and district-court appearances.",
      bn: "অ্যাসোসিয়েট। গবেষণা, খসড়া ও জেলা আদালতে হাজিরা।",
    },
    body: {
      en: "<p>Imran builds the first chronology on every new file. He cites the Code section, the gazette, and the last reported case that actually helps, then sits behind counsel in the High Court Division.</p>",
      bn: "<p>ইমরান প্রতিটি নতুন নথির প্রথম কালানুক্রম তৈরি করেন।</p>",
    },
    email: "imran@example.com",
  },
  {
    slug: "sadia-rahman",
    name: { en: "Sadia Rahman", bn: "সাদিয়া রহমান" },
    credentials: { en: "LL.B. (Hons.), LL.M.", bn: "এলএল.বি. (অনার্স), এলএল.এম." },
    court: { en: "Research Associate", bn: "রিসার্চ অ্যাসোসিয়েট" },
    designationId: "research",
    summary: {
      en: "Research Associate. Precedents, comparative notes, and chamber papers.",
      bn: "রিসার্চ অ্যাসোসিয়েট। নজির, তুলনামূলক নোট ও চেম্বার পেপার।",
    },
    body: {
      en: "<p>Sadia keeps the precedent library. She reads older subcontinental reports and extracts the ratio that still travels, then writes the one-page note counsel actually uses in court.</p>",
      bn: "<p>সাদিয়া নজির লাইব্রেরি রাখেন এবং আদালতে কাজে লাগে এমন এক পাতার নোট লেখেন।</p>",
    },
    email: "sadia@example.com",
  },
  {
    slug: "karim-ali",
    name: { en: "Karim Ali", bn: "করিম আলী" },
    credentials: { en: "Chambers staff", bn: "চেম্বার স্টাফ" },
    court: { en: "Court Assistant", bn: "কোর্ট অ্যাসিস্ট্যান্ট" },
    designationId: "court",
    summary: {
      en: "Court assistant. Filing, cause lists, and paper books.",
      bn: "কোর্ট অ্যাসিস্ট্যান্ট। দাখিল, কারণ তালিকা ও পেপার বুক।",
    },
    body: {
      en: "<p>Karim moves the paper. He knows the filing counters, the cause-list timing, and how to keep a paper book in the order a bench expects.</p>",
      bn: "<p>করিম কাগজ চালান। দাখিল কাউন্টার ও পেপার বুকের ক্রম তিনি জানেন।</p>",
    },
  },
];

export function membersByDesignation(): { designation: Designation; members: Member[] }[] {
  return [...designations]
    .sort((a, b) => a.position - b.position)
    .map((designation) => ({
      designation,
      members: members.filter((member) => member.designationId === designation.id),
    }))
    .filter((group) => group.members.length > 0);
}

export function getMember(slug: string): Member | undefined {
  return members.find((member) => member.slug === slug);
}
