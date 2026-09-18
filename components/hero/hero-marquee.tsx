"use client";

/**
 * FR-007–009 / Constitution Principle XIV: a subtle, continuously repeating,
 * slow-and-smooth text marquee — never a fast news ticker, never a
 * substitute for the actual logo (Principle XIII), and always paused for
 * prefers-reduced-motion via the `motion-safe-only` utility (see globals.css)
 * plus the `motion-reduce:animate-none` Tailwind variant below (belt and
 * braces: works whether or not JS re-evaluates the media query).
 */
const MARQUEE_TEXT = "MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦";

export function HeroMarquee() {
  return (
    <div
      role="group"
      className="w-full overflow-hidden border-y border-white/10 bg-brand-purple-dark/40 py-2"
      aria-label={MARQUEE_TEXT}
    >
      <div
        className="motion-safe-only flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-white/80 motion-reduce:animate-none"
        aria-hidden="true"
      >
        {/* Duplicated once so the 50%-translateX loop is seamless. */}
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}
