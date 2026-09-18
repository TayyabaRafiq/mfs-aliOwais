"use client";

import { useEffect, useState } from "react";

// Displayed exactly between the company name and the Executive's name
// (see hero.tsx) — cycles through the approved service names only.
const PHRASES = [
  "Professional Fumigation",
  "Professional Pest Control",
  "Professional Rodent Control",
  "Professional Termite Proofing",
] as const satisfies readonly [string, string, string, string];

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 32;
const PAUSE_AFTER_TYPE_MS = 1400;
const PAUSE_AFTER_DELETE_MS = 300;

type Phase = "typing" | "pausing" | "deleting" | "advancing";

export function ServiceTypewriter() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Non-null: phraseIndex is always kept in [0, PHRASES.length) via modulo
    // arithmetic below, so this index is always valid.
    const current = PHRASES[phraseIndex % PHRASES.length]!;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED_MS);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE_MS);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED_MS);
      } else {
        timeout = setTimeout(() => setPhase("advancing"), PAUSE_AFTER_DELETE_MS);
      }
    } else if (phase === "advancing") {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIndex, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <p className="mt-3 text-lg font-semibold text-blue-200 sm:text-xl">
        Fumigation · Pest Control · Rodent Control · Termite Proofing
      </p>
    );
  }

  return (
    <p
      className="mt-3 min-h-[1.75rem] text-lg font-semibold text-blue-200 sm:min-h-[2rem] sm:text-xl"
      aria-hidden="true"
    >
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-blue-200 align-middle" style={{ height: "1em" }} />
    </p>
  );
}
