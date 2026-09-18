import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/hero/hero-visual";
import { ServiceTypewriter } from "@/components/hero/service-typewriter";
import { HeroMarquee } from "@/components/hero/hero-marquee";
import { businessProfile, buildWhatsAppUrl } from "@/lib/content/business-profile";

const WHATSAPP_MESSAGE = "Hi, I'd like to get a price for pest control/fumigation services.";

const TRUST_INDICATORS = [
  `${businessProfile.experience} Experience`,
  `${businessProfile.location.split(",")[0]}-Based Service`,
  "Commercial & Institutional Experience",
];

/**
 * FR-005/006/010–013, Constitution Principle III/XIV: no photograph of the
 * Executive anywhere in this tree — his identity is text-only ("Syed Ali
 * Owais" / "Executive — Mahrukh Fumigation Services"). Visual hierarchy:
 * company name → service typewriter → Executive name → Executive title →
 * description → trust indicators → CTAs, with the premium visual frame on
 * the opposite column (order-reversed on mobile so the CTA still lands high
 * on short viewports — see HeroVisual's `order-2 md:order-1`).
 */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-navy">
      {/* Atmospheric glow — static, decorative, never interactive. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-purple/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-blue/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-10 md:grid-cols-2 md:items-center md:py-24">
        <HeroVisual />

        <div className="relative order-1 z-10 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent sm:text-sm">
            Professional Fumigation &amp; Pest Control
          </p>

          <h1 className="mt-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl md:text-5xl">
            {businessProfile.name}
          </h1>

          <ServiceTypewriter />

          <p className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            {businessProfile.executiveName}
          </p>
          <p className="mt-1 text-sm font-medium text-blue-200 sm:text-base">
            {businessProfile.executiveTitle}
          </p>

          <p className="mt-5 max-w-prose text-sm text-blue-100/80 sm:text-base">
            Fumigation, disinfestation, termite proofing, rodent control, and pest control
            services for residential, commercial, and institutional properties in{" "}
            {businessProfile.location}.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {TRUST_INDICATORS.map((indicator) => (
              <li
                key={indicator}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur"
              >
                {indicator}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/40 transition-all duration-200 hover:scale-[1.03] hover:shadow-brand-blue/50"
            >
              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-primary-cta"
              >
                Let&apos;s Talk
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-brand-blue/60 bg-white/5 text-white backdrop-blur-sm transition-colors hover:border-brand-blue hover:bg-white/10"
            >
              <a href="#book-service">Book a Service</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>

      <HeroMarquee />
    </section>
  );
}
