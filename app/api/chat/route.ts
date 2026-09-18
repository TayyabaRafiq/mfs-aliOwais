import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/content/chatbot-knowledge";
import { generateChatReply } from "@/lib/gemini/client";
import { isRateLimited } from "@/lib/gemini/rate-limit";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 500;

const FALLBACK_REPLY =
  "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.";

const QUICK_SUGGESTIONS: Record<string, string> = {
  services: "What services does Mahrukh Fumigation Services offer?",
  quote: "How can I get a quote?",
  contact: "What are your contact details?",
  about: "Tell me about Mahrukh Fumigation Services.",
};

function unavailable() {
  // Deliberately HTTP 200 with a generic body — the underlying cause (quota,
  // timeout, provider 5xx, malformed response, rate limit) is never
  // distinguishable from the response the visitor sees (FR-056/057,
  // contracts/chat-api.md). The real cause is logged server-side only,
  // inside generateChatReply / the catch block below.
  return NextResponse.json({ status: "unavailable", reply: FALLBACK_REPLY }, { status: 200 });
}

export async function POST(request: NextRequest) {
  let body: { message?: unknown; quickSuggestion?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "invalid", reply: "Please enter a message." }, { status: 400 });
  }

  const quickSuggestion =
    typeof body.quickSuggestion === "string" ? QUICK_SUGGESTIONS[body.quickSuggestion] : undefined;
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";
  const message = quickSuggestion ?? rawMessage;

  if (!message) {
    return NextResponse.json({ status: "invalid", reply: "Please enter a message." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { status: "invalid", reply: "Please shorten your message." },
      { status: 400 },
    );
  }

  // Rate-limit key: forwarded client IP if present, else a coarse fallback.
  // No cookies, no persistent visitor identifier (FR-058).
  const rateLimitKey = request.headers.get("x-forwarded-for") ?? "anonymous";
  if (isRateLimited(rateLimitKey)) {
    return unavailable();
  }

  try {
    const systemPrompt = buildSystemPrompt();
    const reply = await generateChatReply(systemPrompt, message);
    return NextResponse.json({ status: "ok", reply }, { status: 200 });
  } catch (error) {
    // generateChatReply already logged the real error server-side; this is
    // the single, uniform failure path for every possible cause.
    // eslint-disable-next-line no-console
    console.error("[api/chat] returning fallback due to error", error);
    return unavailable();
  }
}
