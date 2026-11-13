import type { MetadataRoute } from "next";
import { members } from "@/data/members";
import { electronicMedia, precedents, printMedia, researchItems, stories, videos } from "@/data/content";
import { photoFolders } from "@/data/site";
import { categoryRoutes, services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thelowemporium.local";
  const staticPaths = [
    "",
    "/about",
    "/team",
    "/contact",
    "/appointment",
    "/policy",
    "/terms-and-conditions",
    "/stories",
    "/precedents",
    "/research",
    "/videos",
    "/photos",
    "/media/print",
    "/media/electronic",
    ...Object.values(categoryRoutes).map((item) => item.path),
  ];

  const dynamic = [
    ...members.map((item) => `/members/${item.slug}`),
    ...services.map((item) => `/services/${item.id}`),
    ...stories.map((item) => `/stories/${item.slug}`),
    ...precedents.map((item) => `/precedents/${item.slug}`),
    ...researchItems.map((item) => `/research/${item.slug}`),
    ...videos.map((item) => `/videos/${item.slug}`),
    ...printMedia.map((item) => `/media/print/${item.slug}`),
    ...electronicMedia.map((item) => `/media/electronic/${item.slug}`),
    ...photoFolders.map((item) => `/photos/${item.slug}`),
  ];

  return [...staticPaths, ...dynamic].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
