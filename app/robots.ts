import type { MetadataRoute } from "next";

// Update SITE_URL here if a custom domain replaces the current Vercel
// deployment URL (see app/sitemap.ts, which uses the same value).
const SITE_URL = "https://mfs-ali-owais.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
