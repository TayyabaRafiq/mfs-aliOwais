/**
 * Single verified source for all business-identity content on the site.
 * Every field here is transcribed verbatim from `company-facts.md` — do not
 * add, embellish, or infer a field that isn't already documented there.
 */

export interface BusinessProfile {
  name: string;
  executiveName: string;
  executiveTitle: string;
  location: string;
  experience: string;
  address: string;
  phones: string[];
  fax: string;
  mobile: string;
  whatsapp: string;
  email: string;
}

export const businessProfile: BusinessProfile = {
  name: "Mahrukh Fumigation Services",
  executiveName: "Syed Ali Owais",
  // Constitution Principle II / company-facts.md: "Executive", never "Proprietor".
  executiveTitle: "Executive — Mahrukh Fumigation Services",
  location: "Karachi, Pakistan",
  experience: "25+ years",
  address: "D-8, 4th Floor, Ocean Center, Custom House, Karachi",
  phones: ["32628979", "37774549"],
  fax: "32628979",
  mobile: "0301-2278004",
  whatsapp: "0301-2278004",
  email: "mfs5181@gmail.com",
};

/**
 * `wa.me` requires the full international number (no leading 0, country
 * code prefixed) — company-facts.md's WhatsApp number is in local Pakistani
 * format ("0301-2278004"), so a naive digit-strip produces an invalid link.
 * This derives the correct international form once, for every WhatsApp
 * link on the site, and optionally pre-fills a message.
 */
export function buildWhatsAppUrl(message?: string): string {
  const digits = businessProfile.whatsapp.replace(/\D/g, "");
  const international = digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
  const base = `https://wa.me/${international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
