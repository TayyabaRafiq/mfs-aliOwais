"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IllustrativeVisual } from "@/components/illustrative-visual";
import { businessProfile } from "@/lib/content/business-profile";

/**
 * The premium framed visual for the Hero's left column (per the approved
 * redesign): rounded corners, gradient border, soft blue/purple glow,
 * cinematic dark treatment, and 1-2 tasteful info badges — never a
 * meaningless oversized shape, and never presented as an actual photograph
 * of Mahrukh Fumigation Services' work unless a genuine asset is supplied
 * (FR-059–FR-067 remain fully enforced by IllustrativeVisual itself).
 */
export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative order-2 mx-auto w-full max-w-md md:order-1 md:mx-0"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Soft ambient glow behind the frame — static blur, no motion, plus
          an optional gentle pulse that fully respects reduced-motion. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-purple/50 via-brand-blue/40 to-brand-accent/20 blur-3xl motion-reduce:animate-none animate-glow-pulse"
      />

      {/* Elegant gradient border, achieved with padding + inner surface. */}
      <div className="relative rounded-3xl bg-gradient-to-br from-brand-purple via-blue-500 to-brand-accent p-[2px] shadow-2xl shadow-brand-navy/60">
        <div className="overflow-hidden rounded-[calc(1.5rem-2px)] bg-brand-navy">
          <IllustrativeVisual
            subject="commercial-fumigation"
            src="/images/hero/hero-fumigation.webp"
            width={900}
            height={1125}
            priority
            className="aspect-[4/5] rounded-none"
          />
        </div>
      </div>

      {/* 1–2 small tasteful info badges — factual, from company-facts.md only. */}
      <div className="absolute -left-3 -top-3 rounded-full border border-white/20 bg-brand-navy/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">
        {businessProfile.experience} Experience
      </div>
      <div className="absolute -bottom-3 -right-3 rounded-full border border-white/20 bg-brand-navy/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur">
        Commercial &amp; Institutional
      </div>
    </motion.div>
  );
}
