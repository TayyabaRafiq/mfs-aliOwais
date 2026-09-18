"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChatbotMessage } from "@/components/chatbot/chatbot-message";
import { useChatbot } from "@/components/chatbot/use-chatbot";

const QUICK_SUGGESTIONS = [
  { key: "services", label: "Our Services" },
  { key: "quote", label: "Request a Quote" },
  { key: "contact", label: "Contact Us" },
  { key: "about", label: "About Mahrukh" },
] as const;

// FR-045/FR-048: quick-suggestion chips and the full descriptive subtitle
// satisfy FR-045's "must offer quick-suggestion prompts" in the empty state,
// then collapse once a conversation starts so replies get the vertical
// space instead of permanently-fixed chrome. The title stays put throughout
// (DialogTitle/DialogDescription render here, not in ChatbotWidget, because
// only this component knows whether a conversation has started).
export function ChatbotPanel() {
  const { messages, status, send } = useChatbot();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStarted = messages.length > 0;

  // FR-048: whenever a new message (user or assistant) or a status change
  // (e.g. the "Thinking…" indicator appearing) lands, jump the scroll
  // container to the bottom so the latest exchange is immediately visible
  // without the visitor having to scroll manually.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "loading") return;
    void send(input.trim());
    setInput("");
  };

  const handleQuickSuggestion = (key: string, label: string) => {
    if (status === "loading") return;
    void send(label, key);
  };

  return (
    // flex-1 min-h-0 (not h-full): this is the sole flex child of
    // DialogContent's own fixed-height flex column, and DialogHeader below
    // is in turn its own shrink-0 child — h-full would make a nested flex
    // item claim 100% of an ancestor's total height on top of sibling
    // space, overflowing the bound. min-h-0 here (and again on the
    // scrolling message list below) is required for that nested
    // overflow-y-auto list to actually scroll rather than growing and
    // pushing the input row out of view (the classic nested-flexbox scroll
    // bug: a flex item's default min-height:auto lets its content force it
    // taller than the available space).
    <div className="flex min-h-0 flex-1 flex-col">
      <DialogHeader className={hasStarted ? "p-3" : undefined}>
        <DialogTitle>Ask Mahrukh AI</DialogTitle>
        {/* sr-only (not unmounted) once the conversation starts: keeps
            aria-describedby valid for screen-reader users and avoids
            Radix's "missing Description" dev warning, while giving sighted
            users back the vertical space (FR-047/048). */}
        <DialogDescription id="chatbot-description" className={hasStarted ? "sr-only" : undefined}>
          A business assistant for Mahrukh Fumigation Services — answers are grounded in our
          published services and business information only.
        </DialogDescription>
      </DialogHeader>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {messages.length === 0 && (
          <p className="text-sm text-blue-100/60">
            Ask about our services, experience, or how to get a quote.
          </p>
        )}
        {messages.map((message) => (
          <ChatbotMessage key={message.id} message={message} />
        ))}
        {status === "loading" && (
          <div className="flex justify-start">
            <div
              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-blue-100/70"
              role="status"
            >
              Thinking…
            </div>
          </div>
        )}
      </div>

      {!hasStarted && (
        <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
          {QUICK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.key}
              type="button"
              onClick={() => handleQuickSuggestion(suggestion.key, suggestion.label)}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-blue-100 transition-colors hover:bg-white/10"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex items-center gap-2 border-t border-white/10 p-3"
      >
        <label htmlFor="chatbot-input" className="sr-only">
          Type your question
        </label>
        <input
          id="chatbot-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          autoComplete="off"
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-blue-100/60 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
        />
        <Button type="submit" size="icon" aria-label="Send message" disabled={status === "loading"}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
