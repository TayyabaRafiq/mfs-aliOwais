import "server-only";
import { GoogleGenAI } from "@google/genai";

/**
 * Server-only Gemini client (FR-049/FR-054). The `server-only` import above
 * makes it a BUILD ERROR for any Client Component to import this module,
 * even transitively — not just a code-review convention. GEMINI_API_KEY is
 * read here and nowhere else in the codebase.
 *
 * Uses @google/genai (the predecessor package, @google/generative-ai,
 * reached end-of-life 2025-11-30). gemini-3.5-flash-lite is the default —
 * confirmed via a live ListModels + generateContent check against this
 * project's key to actually work on the free tier, not just documented as
 * such: gemini-1.5-flash and gemini-2.5-flash-lite are both fully retired
 * (404), and newer flagship "thinking" models (e.g. gemini-3.8-flash) can
 * exceed free-tier quota under real traffic even though a single test call
 * succeeds. Confirm free-tier eligibility again before deploying if this
 * ever needs to change (see specs/001-company-homepage/research.md).
 */

const DEFAULT_MODEL = "gemini-3.5-flash-lite";

export class GeminiUnavailableError extends Error {
  constructor(cause?: unknown) {
    super("Gemini request failed");
    this.name = "GeminiUnavailableError";
    this.cause = cause;
  }
}

export async function generateChatReply(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Not configured — treat exactly like any other provider failure so the
    // route handler's single failure path (FR-056/057) handles it too.
    throw new GeminiUnavailableError(new Error("GEMINI_API_KEY is not configured"));
  }

  const modelName = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const ai = new GoogleGenAI({ apiKey });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        abortSignal: controller.signal,
      },
    });
    const text = response.text;
    if (!text || !text.trim()) {
      throw new GeminiUnavailableError(new Error("Empty response from Gemini"));
    }
    return text.trim();
  } catch (error) {
    // Quota exceeded (HTTP 429), rate limiting, timeouts, malformed
    // responses, and any other SDK/provider error all collapse to the same
    // internal error type here — the route handler never sees provider
    // status codes or error bodies, only "it failed."
    // eslint-disable-next-line no-console
    console.error("[gemini] request failed", error);
    throw new GeminiUnavailableError(error);
  } finally {
    clearTimeout(timeout);
  }
}
