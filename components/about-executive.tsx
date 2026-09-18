import { ShieldCheck, Landmark, TrendingUp } from "lucide-react";
import { businessProfile } from "@/lib/content/business-profile";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Badge } from "@/components/ui/badge";

/**
 * FR-014–016: About Mahrukh Fumigation Services + the Executive's text-only
 * representation. No photograph, no biography, no invented qualifications —
 * only the verified facts from company-facts.md. Presented as a premium
 * profile card (typography-only, per Constitution Principle III) rather
 * than a plain text block.
 *
 * The "Track Record" block below is sourced from company-facts.md's NBP
 * Documented Evidence + Years in Business + Broader Sector Experience
 * sections (three reviewed NBP documents spanning 2013–2020; the 25+ years
 * figure corroborated by a ~2019 proposal; generic sector language only —
 * no new organization names, no chemical/product brand names, no personal
 * identification details from the 2020 labor pass). See company-facts.md
 * for the full evidentiary basis and what is explicitly excluded.
 */
export function AboutExecutive() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-navy-light py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-purple/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              About the Company
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              About {businessProfile.name}
            </h2>
            <p className="mt-4 max-w-prose text-blue-100/75">
              {businessProfile.name} is based in {businessProfile.location} and has{" "}
              {businessProfile.experience} of experience — over two decades of documented
              experience — providing fumigation and pest-control services to residential,
              commercial, and institutional properties across sectors including banking,
              healthcare, hospitality, corporate, education, and logistics/travel.
            </p>

            {/*
              Executive quote placeholder — intentionally NOT rendered.
              Do not add a quote from Syed Ali Owais until a real, verified
              quote is supplied. Do not invent one.

              <blockquote className="mt-6 border-l-2 border-brand-accent pl-4 italic text-blue-100/80">
                "[real, verified quote goes here]"
              </blockquote>
            */}
          </div>

          <GradientBorder>
            <div className="rounded-[calc(1rem-1.5px)] bg-brand-navy/80 p-8 backdrop-blur">
              <Badge variant="gradient" className="mb-4">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Executive
              </Badge>
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                {businessProfile.executiveName}
              </p>
              <p className="mt-1 text-sm font-medium text-blue-200">{businessProfile.executiveTitle}</p>
            </div>
          </GradientBorder>
        </div>

        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Track Record
          </p>

          <div className="mt-4 space-y-4">
            <GradientBorder>
              <div className="flex items-start gap-4 rounded-[calc(1rem-1.5px)] bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue">
                  <Landmark className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Documented History with National Bank of Pakistan</p>
                  <p className="mt-2 text-sm text-blue-100/75">
                    Mahrukh Fumigation Services has a documented history with National Bank of
                    Pakistan spanning 2013 through at least 2020: panel enlistment in Category
                    &quot;D&quot; for 2013, enlistment in Category &quot;B&quot; for fumigation
                    works of bank offices and branches (January 2017 – December 2017), and an
                    approved labor pass from NBP&apos;s Engineering Wing Operations Group (dated
                    13 March 2020) authorizing fumigation work at NBP Head Office. This reflects
                    documented historical engagement, not a current, ongoing relationship.
                  </p>
                </div>
              </div>
            </GradientBorder>

            {/*
              General forward-looking positioning statement — its own card,
              deliberately kept separate from the Track Record card above and
              not tied to any specific organization's current status. Does
              not name NBP or any other client as an ongoing relationship;
              the Track Record card's historical framing is unchanged.
            */}
            <GradientBorder>
              <div className="flex items-start gap-4 rounded-[calc(1rem-1.5px)] bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue">
                  <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-blue-100/75">
                    {businessProfile.name} continues to serve a diverse range of commercial and
                    institutional sectors across Karachi, growing its experience and capabilities
                    over time.
                  </p>
                </div>
              </div>
            </GradientBorder>
          </div>
        </div>
      </div>
    </section>
  );
}
