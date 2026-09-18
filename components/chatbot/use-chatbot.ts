"use client";

import { useCallback, useState } from "react";

export type ChatRole = "user" | "assistant" | "system-fallback";

export interface ChatExchange {
  id: string;
  role: ChatRole;
  text: string;
}

export type ChatbotStatus = "idle" | "loading" | "success" | "unavailable" | "error";

const FALLBACK_TEXT =
  "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.";

function makeId() {
  return Math.random().toString(36).slice(2);
}

/**
 * Client-side chat state machine (FR-048, FR-058). Conversation history
 * lives only in this React state for the current page session — it is
 * never sent anywhere for storage and disappears on refresh. There is
 * exactly one rendering path for both "unavailable" (server said so) and
 * "error" (the fetch itself failed) so the visitor always sees the same
 * calm, contact-oriented message regardless of the underlying cause.
 */
export function useChatbot() {
  const [messages, setMessages] = useState<ChatExchange[]>([]);
  const [status, setStatus] = useState<ChatbotStatus>("idle");

  const send = useCallback(async (text: string, quickSuggestion?: string) => {
    if (!text.trim() && !quickSuggestion) return;

    const userMessage: ChatExchange = { id: makeId(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setStatus("loading");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, quickSuggestion: quickSuggestion ?? null }),
      });

      const data: { status: string; reply: string } = await response.json();

      if (data.status === "ok") {
        setMessages((prev) => [...prev, { id: makeId(), role: "assistant", text: data.reply }]);
        setStatus("success");
      } else {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), role: "system-fallback", text: data.reply || FALLBACK_TEXT },
        ]);
        setStatus("unavailable");
      }
    } catch {
      setMessages((prev) => [...prev, { id: makeId(), role: "system-fallback", text: FALLBACK_TEXT }]);
      setStatus("error");
    }
  }, []);

  return { messages, status, send };
}
