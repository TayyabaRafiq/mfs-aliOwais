import Image from "next/image";
import { Wind, Bug, Zap, ShieldCheck, BugOff, SprayCan, type LucideIcon } from "lucide-react";
import type { Service, ServiceId } from "@/lib/content/services";
import { GradientBorder } from "@/components/ui/gradient-border";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Purely decorative icon per service — not a claim of any kind, just visual
// identification (FR-018 remains satisfied: descriptions are unchanged).
const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  fumigation: Wind,
  disinfestation: Bug,
  derating: Zap,
  "termite-proofing": ShieldCheck,
  "rodent-control": BugOff,
  "pest-control": SprayCan,
};

/**
 * One illustrative image per service card. Every `alt` is a generic,
 * honest, non-evidentiary caption (FR-060–FR-062) — never implying an
 * actual Mahrukh employee, actual Mahrukh equipment, or a real client site.
 * Sourced from Pexels (free, commercial-use, no attribution required).
 */
const SERVICE_IMAGES: Record<ServiceId, { src: string; alt: string }> = {
  fumigation: { src: "/images/services/fumigation.webp", alt: "Professional Commercial Fumigation" },
  disinfestation: {
    src: "/images/services/disinfestation.webp",
    alt: "Professional Pest Control Treatment",
  },
  derating: { src: "/images/services/derating.webp", alt: "Industrial Pest Management" },
  "termite-proofing": {
    src: "/images/services/termite-proofing.webp",
    alt: "Termite Treatment Service",
  },
  "rodent-control": { src: "/images/services/rodent-control.webp", alt: "Rodent Control Equipment" },
  "pest-control": { src: "/images/services/pest-control.webp", alt: "Professional Pest Control Service" },
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.id];
  const image = SERVICE_IMAGES[service.id];

  return (
    <li>
      <GradientBorder className="h-full transition-transform duration-300 hover:-translate-y-1">
        <div className="group h-full overflow-hidden rounded-[calc(1rem-1.5px)] bg-white/[0.04] backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={450}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark gradient scrim so the floating icon stays legible over any photo. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/10 to-transparent"
            />
            <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue shadow-md shadow-brand-purple/40 transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
          </div>

          <CardHeader className="pb-0">
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{service.description}</CardDescription>
          </CardContent>
        </div>
      </GradientBorder>
    </li>
  );
}
