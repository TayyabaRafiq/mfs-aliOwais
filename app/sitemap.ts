import type { MetadataRoute } from "next";

// Single-page site (spec.md Clarifications Q2 — one page, no separate
// routes) — one entry is all there is to list. Update SITE_URL here if a
// custom domain replaces the current Vercel deployment URL.
const SITE_URL = "https://mfs-ali-owais.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
