import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services/criminal", destination: "/services/criminal-lawyer", permanent: true },
      { source: "/services/constitutional", destination: "/services/constitutional-law-attorney", permanent: true },
      { source: "/services/civil", destination: "/services/civil-litigation-lawyer", permanent: true },
      { source: "/services/family-law", destination: "/services/family-law-attorney", permanent: true },
      { source: "/services/company", destination: "/services/company-lawyer", permanent: true },
      { source: "/services/pro-bono", destination: "/services/pro-bono-lawyer", permanent: true },
      { source: "/services/death-reference", destination: "/services/death-sentence", permanent: true },
      { source: "/services/bail-quashment", destination: "/services/bail", permanent: true },
      { source: "/services/life-imprisonment", destination: "/services/imprisonment-for-life", permanent: true },
    ];
  },
};

export default nextConfig;
