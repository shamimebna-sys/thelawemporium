import type { NavGroup } from "@/lib/types";

export const navGroups: NavGroup[] = [
  {
    id: "we",
    label: { en: "We", bn: "আমরা" },
    children: [
      { label: { en: "About Us", bn: "আমাদের কথা" }, href: "/about" },
      { label: { en: "Team", bn: "টিম" }, href: "/team" },
    ],
  },
  {
    id: "services",
    label: { en: "Services", bn: "সেবা" },
    children: [
      { label: { en: "Criminal", bn: "ফৌজদারি" }, href: "/services/criminal-lawyer" },
      {
        label: { en: "Constitutional", bn: "সাংবিধানিক" },
        href: "/services/constitutional-law-attorney",
      },
      { label: { en: "Civil", bn: "দেওয়ানি" }, href: "/services/civil-litigation-lawyer" },
      { label: { en: "Family Law", bn: "পারিবারিক" }, href: "/services/family-law-attorney" },
      { label: { en: "Company", bn: "কোম্পানি" }, href: "/services/company-lawyer" },
      { label: { en: "Pro Bono", bn: "প্রো বোনো" }, href: "/services/pro-bono-lawyer" },
    ],
  },
  {
    id: "resources",
    label: { en: "Resources", bn: "রিসোর্স" },
    children: [
      { label: { en: "Stories", bn: "গল্প" }, href: "/stories" },
      { label: { en: "Research", bn: "গবেষণা" }, href: "/research" },
      { label: { en: "Precedents", bn: "নজির" }, href: "/precedents" },
      { label: { en: "Videos", bn: "ভিডিও" }, href: "/videos" },
    ],
  },
  {
    id: "media",
    label: { en: "Media", bn: "মিডিয়া" },
    children: [
      { label: { en: "Print", bn: "মুদ্রণ" }, href: "/media/print" },
      { label: { en: "Electronic", bn: "ইলেকট্রনিক" }, href: "/media/electronic" },
    ],
  },
];

export const photosLink = {
  label: { en: "Photos", bn: "ছবি" },
  href: "/photos",
};

export const footerLinks = [
  { label: { en: "Contact Us", bn: "যোগাযোগ" }, href: "/contact" },
  { label: { en: "Policy", bn: "নীতি" }, href: "/policy" },
  { label: { en: "Terms and Conditions", bn: "শর্তাবলি" }, href: "/terms-and-conditions" },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];
