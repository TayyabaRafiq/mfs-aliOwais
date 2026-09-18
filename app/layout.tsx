import type { Metadata } from "next";
import "./globals.css";
import { businessProfile } from "@/lib/content/business-profile";

// Metadata sourced only from company-facts.md-derived content (FR-035).
export const metadata: Metadata = {
  title: `${businessProfile.name} | Fumigation & Pest Control in ${businessProfile.location}`,
  description: `${businessProfile.name} provides fumigation, disinfestation, derating, termite proofing, rodent control, and pest control services in ${businessProfile.location}, with ${businessProfile.experience} of experience.`,
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
