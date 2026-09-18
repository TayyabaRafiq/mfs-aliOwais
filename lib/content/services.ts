/**
 * The six verified services from company-facts.md. This union is closed on
 * purpose (FR-017/FR-019) — a service can only be added here after it is
 * first added to company-facts.md.
 */

export type ServiceId =
  | "fumigation"
  | "disinfestation"
  | "derating"
  | "termite-proofing"
  | "rodent-control"
  | "pest-control";

export interface Service {
  id: ServiceId;
  name: string;
  description: string;
}

// Descriptions are intentionally short and conservative — no technical,
// chemical-composition, or safety-guarantee claims (FR-018).
export const services: Service[] = [
  {
    id: "fumigation",
    name: "Fumigation",
    description:
      "Fumigation services for residential, commercial, and institutional premises.",
  },
  {
    id: "disinfestation",
    name: "Disinfestation",
    description: "Disinfestation services to address infestation concerns on-site.",
  },
  {
    id: "derating",
    name: "Derating",
    description: "Derating services as part of the business's pest-management offering.",
  },
  {
    id: "termite-proofing",
    name: "Termite Proofing",
    description: "Termite proofing services for buildings and structures.",
  },
  {
    id: "rodent-control",
    name: "Rodent Control",
    description: "Rodent control services for homes, offices, and larger facilities.",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    description: "General pest control services for a range of property types.",
  },
];
