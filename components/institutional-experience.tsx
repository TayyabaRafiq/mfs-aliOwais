import { organizations } from "@/lib/content/organizations";
import { IllustrativeVisual } from "@/components/illustrative-visual";
import { GradientBorder } from "@/components/ui/gradient-border";

/**
 * FR-020–025: commercial/institutional experience + organizations served.
 * Every organization renders with the neutral "served" relationship only —
 * there is no prop or code path here that can render "partner," "approved
 * vendor," or similar stronger wording (the type itself is closed to
 * `"served"`, see lib/content/organizations.ts). Historical notes (NBP,
 * Meezan Bank) render verbatim and are visually marked as historical.
 */
export function InstitutionalExperience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-brand-navy-deep py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-brand-violet/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Track Record
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Commercial &amp; Institutional Experience
            </h2>
            <p className="mt-4 max-w-prose text-blue-100/75">
              Organizations and institutions served include banks, educational institutions,
              warehouses, and other commercial and corporate properties.
            </p>
          </div>

          <GradientBorder className="hidden md:block">
            <IllustrativeVisual
              subject="institutional-commercial-environment"
              src="/images/experience/institutional-building.webp"
              className="aspect-[4/3] rounded-[calc(1rem-1.5px)]"
            />
          </GradientBorder>
        </div>

        <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200/70">
          Organizations Served
        </h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <li key={org.name}>
              <GradientBorder innerClassName="h-full" className="h-full">
                <div className="h-full rounded-[calc(1rem-1.5px)] bg-white/[0.03] p-4 text-sm text-blue-100/90 backdrop-blur-sm transition-colors hover:bg-white/[0.06]">
                  <p className="font-medium text-white">{org.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-brand-accent">
                    Organization served
                  </p>
                  {org.historicalNote && (
                    <p className="mt-2 text-xs text-blue-100/60">{org.historicalNote}</p>
                  )}
                </div>
              </GradientBorder>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
