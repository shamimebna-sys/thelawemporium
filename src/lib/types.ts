export type Locale = "en" | "bn";

export type Localized = {
  en: string;
  bn: string;
};

export type ServiceCategory =
  | "criminal"
  | "constitutional"
  | "civil"
  | "family"
  | "company"
  | "pro-bono";

export type NavItem = {
  label: Localized;
  href: string;
};

export type NavGroup = {
  id: string;
  label: Localized;
  href?: string;
  children?: NavItem[];
};

export type Service = {
  id: string;
  category: ServiceCategory;
  position: number;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  cases?: Localized;
};

export type Member = {
  slug: string;
  name: Localized;
  credentials: Localized;
  court: Localized;
  designationId: string;
  summary: Localized;
  body: Localized;
  phone?: string;
  email?: string;
};

export type Designation = {
  id: string;
  position: number;
  title: Localized;
};

export type ContentKind = "story" | "precedent" | "research" | "video" | "print" | "electronic";

export type ContentItem = {
  slug: string;
  kind: ContentKind;
  published: boolean;
  position: number;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  date?: string;
  link?: string;
  documentLabel?: Localized;
};

export type PhotoFolder = {
  slug: string;
  title: Localized;
  position: number;
  photos: { alt: Localized }[];
};

export type CmsPage = {
  slug: string;
  title: Localized;
  body: Localized;
};
