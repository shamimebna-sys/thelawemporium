import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/sign-in", "/signin", "/successful-appointment"] },
    sitemap: "https://thelowemporium.local/sitemap.xml",
  };
}
