import { ShieldCheck, Building2, MapPin } from "lucide-react";
import { businessProfile } from "@/lib/content/business-profile";
import { IllustrativeVisual } from "@/components/illustrative-visual";
import { GradientBorder } from "@/components/ui/gradient-border";

// FR-026: verified differentiators only — no invented certifications,
// awards, or guarantees.
const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    title: `${businessProfile.experience} of Experience`,
    description: "Long-standing operation in the fumigation and pest-control field.",
  },
  {
    icon: Building2,
    title: "Commercial & Institutional Experience",
    description: "Experience serving banks, educational institutions, and corporate properties.",
  },
  {
    icon: MapPin,
    title: `${businessProfile.location.split(",")[0]}-Based Service`,
    description: `Operating out of ${businessProfile.location}.`,
  },
];

export function WhyMahrukh() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-light py-20">
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Why Choose Us
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Why {businessProfile.name}
          </h2>
          <ul className="mt-8 space-y-4">
            {DIFFERENTIATORS.map((item) => (
              <li key={item.title}>
                <GradientBorder>
                  <div className="flex items-start gap-4 rounded-[calc(1rem-1.5px)] bg-white/[0.04] p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue">
                      <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-blue-100/70">{item.description}</p>
                    </div>
                  </div>
                </GradientBorder>
              </li>
            ))}
          </ul>
        </div>

        <GradientBorder className="hidden md:block">
          <IllustrativeVisual
            subject="pest-control-treatment"
            src="/images/why-mahrukh/equipment.webp"
            width={800}
            height={1000}
            className="aspect-[4/5] rounded-[calc(1rem-1.5px)]"
          />
        </GradientBorder>
      </div>
    </section>
  );
}
