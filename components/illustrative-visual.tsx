import Image from "next/image";
import { Shield, Bug, Warehouse, Wrench, Building2, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The seven illustrative-visual subjects approved in spec.md FR-059. This is
 * the ONLY place a subject/caption pairing exists — there is deliberately no
 * `location`, `client`, or `employeeName` prop anywhere on this component,
 * which makes an FR-061/FR-062 violation (naming a real client/location, or
 * using a visual as evidence of a relationship) a type-level impossibility,
 * not just a convention (see data-model.md IllustrativeVisual).
 */
export type IllustrativeSubject =
  | "commercial-fumigation"
  | "pest-control-treatment"
  | "rodent-control-service"
  | "fumigation-equipment"
  | "technician-treatment"
  | "warehouse-industrial-environment"
  | "institutional-commercial-environment";

// Generic, non-evidentiary captions only (FR-060). Callers cannot override
// these — the caption is derived from the approved subject, never free text.
const SUBJECT_CAPTIONS: Record<IllustrativeSubject, string> = {
  "commercial-fumigation": "Professional Commercial Fumigation",
  "pest-control-treatment": "Pest Control Treatment",
  "rodent-control-service": "Rodent Control Service",
  "fumigation-equipment": "Fumigation Equipment",
  "technician-treatment": "Technician Performing Treatment",
  "warehouse-industrial-environment": "Industrial Pest Management",
  "institutional-commercial-environment": "Institutional & Commercial Pest Management",
};

const SUBJECT_ICONS: Record<IllustrativeSubject, typeof Shield> = {
  "commercial-fumigation": Shield,
  "pest-control-treatment": Bug,
  "rodent-control-service": Bug,
  "fumigation-equipment": Wrench,
  "technician-treatment": ClipboardCheck,
  "warehouse-industrial-environment": Warehouse,
  "institutional-commercial-environment": Building2,
};

export interface IllustrativeVisualProps {
  subject: IllustrativeSubject;
  /** Path under /public/images. Omit if no genuine or sourced asset exists yet — FR-064. */
  src?: string;
  /** true = purely decorative (empty alt); false = informative (caption used as alt). FR-066. */
  decorative?: boolean;
  /** Set true only for above-the-fold instances (e.g., the Hero); otherwise images lazy-load. */
  priority?: boolean;
  className?: string;
  /** Intrinsic size hint for next/image — match the real source file's ratio to avoid layout-shift warnings. Defaults to a 4:3 source. */
  width?: number;
  height?: number;
}

export function IllustrativeVisual({
  subject,
  src,
  decorative = false,
  priority = false,
  className,
  width = 800,
  height = 600,
}: IllustrativeVisualProps) {
  const caption = SUBJECT_CAPTIONS[subject];
  const Icon = SUBJECT_ICONS[subject];

  if (!src) {
    // No suitable visual available yet — render a brand-colored, non-deceptive
    // fallback instead of blocking implementation or fabricating imagery (FR-064).
    return (
      <div
        role={decorative ? "presentation" : "img"}
        aria-label={decorative ? undefined : caption}
        className={cn(
          // Cinematic dark treatment — richer than a flat two-color
          // gradient, so the "no real photo yet" placeholder still reads as
          // premium rather than a plain color block.
          "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-navy via-brand-purple to-brand-blue text-white",
          className,
        )}
        data-illustrative-subject={subject}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]"
        />
        <Icon aria-hidden="true" className="relative h-14 w-14 opacity-90 drop-shadow-lg" />
      </div>
    );
  }

  return (
    <figure className={cn("overflow-hidden rounded-lg", className)} data-illustrative-subject={subject}>
      <Image
        src={src}
        alt={decorative ? "" : caption}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        className="h-full w-full object-cover"
      />
      {!decorative && (
        <figcaption className="sr-only">{caption}</figcaption>
      )}
    </figure>
  );
}
