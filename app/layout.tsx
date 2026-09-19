import type { Metadata } from "next";
import "./globals.css";
import { businessProfile } from "@/lib/content/business-profile";

// Same base URL as app/sitemap.ts / app/robots.ts — update all three
// together if a custom domain ever replaces the current Vercel URL.
const SITE_URL = "https://mfs-ali-owais.vercel.app";
const SOCIAL_TITLE = "Mahrukh Fumigation Services | Fumigation & Pest Control in Karachi";
const SOCIAL_DESCRIPTION =
  "Professional fumigation, pest control, and termite proofing in Karachi, Pakistan — 25+ years of experience.";

// Metadata sourced only from company-facts.md-derived content (FR-035).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${businessProfile.name} | Fumigation & Pest Control in ${businessProfile.location}`,
  description: `${businessProfile.name} provides fumigation, disinfestation, derating, termite proofing, rodent control, and pest control services in ${businessProfile.location}, with ${businessProfile.experience} of experience.`,
  // Google Search Console site-ownership verification.
  verification: {
    google: "chHXb_PvTdNcSikadcp_VyJxpsg6-VD8rvk64yg0jEw",
  },
  // Social share preview (WhatsApp, LinkedIn, etc.) — og-image.png is a
  // generated 1200x630 card using the real logo icon and the same honest
  // copy as the Hero section, not a stock/invented image.
  openGraph: {
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: SITE_URL,
    siteName: businessProfile.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${businessProfile.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // Favicon set generated from the real logo (public/logo/mahrukh-logo.png)
  // via a crop of its circular emblem — see components/logo-mark.tsx and
  // the image-processing notes for that request. Replaces the earlier
  // temporary "M" monogram placeholder (app/icon.svg, now removed).
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
