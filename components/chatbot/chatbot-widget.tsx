"use client";

import { MessageCircleMore } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChatbotPanel } from "@/components/chatbot/chatbot-panel";

/**
 * FR-040/047/052: a floating trigger, positioned bottom-right so it never
 * overlaps the primary Hero CTA or any section content, built on shadcn's
 * Dialog (Radix UI under the hood) for correct focus trapping, Escape-to-
 * close, and ARIA wiring (FR-050) with no extra dependency.
 *
 * Positioned at bottom-24 (trigger and open panel alike) rather than bottom-4
 * so the persistent floating WhatsAppButton (bottom-4) always has a clear,
 * non-overlapping gap below it — both while this trigger is idle and while
 * its panel is open.
 */
export function ChatbotWidget() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Ask Mahrukh AI"
          // No filled circle behind the icon (visual-only change) — the
          // h-12 w-12 tap target, position, focus ring, and reduced-motion
          // handling are all unchanged. text-brand-accent + drop-shadow
          // keep the icon readable against whatever page content happens
          // to scroll behind this fixed, now-transparent button.
          className="fixed bottom-24 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full text-brand-accent transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <MessageCircleMore className="h-7 w-7 drop-shadow-md" aria-hidden="true" />
        </button>
      </DialogTrigger>
      {/* Title/Description render inside ChatbotPanel itself (it owns the
          conversation state that decides whether to collapse them) — Radix
          wires aria-labelledby/aria-describedby to them via context
          regardless of DOM depth, so no manual aria-describedby is needed
          here. */}
      <DialogContent className="bottom-24 h-[min(34rem,72vh)]">
        <ChatbotPanel />
      </DialogContent>
    </Dialog>
  );
}
