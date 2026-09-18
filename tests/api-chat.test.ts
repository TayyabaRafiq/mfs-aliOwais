import { describe, expect, it, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/gemini/rate-limit", () => ({
  isRateLimited: vi.fn(() => false),
}));

const generateChatReply = vi.fn();
vi.mock("@/lib/gemini/client", () => ({
  generateChatReply: (...args: unknown[]) => generateChatReply(...args),
  GeminiUnavailableError: class GeminiUnavailableError extends Error {},
}));

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const FALLBACK_TEXT =
  "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.";

describe("POST /api/chat", () => {
  beforeEach(() => {
    generateChatReply.mockReset();
  });

  it("returns a grounded reply on success", async () => {
    generateChatReply.mockResolvedValueOnce("We offer termite proofing among our services.");
    const { POST } = await import("@/app/api/chat/route");

    const res = await POST(makeRequest({ message: "Do you do termite proofing?" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ status: "ok", reply: "We offer termite proofing among our services." });
  });

  it.each([
    ["quota exceeded (429)", { name: "GeminiUnavailableError", message: "429 quota exceeded" }],
    ["provider timeout", new Error("timeout")],
    ["provider 5xx", new Error("500 Internal Server Error")],
    ["malformed response", new Error("Empty response from Gemini")],
    ["unexpected exception", new TypeError("unexpected")],
  ])("maps %s to the identical uniform fallback with no leaked details", async (_label, error) => {
    generateChatReply.mockRejectedValueOnce(error);
    const { POST } = await import("@/app/api/chat/route");

    const res = await POST(makeRequest({ message: "What is your quote for a 3-bed house?" }));
    const json = await res.json();
    const bodyText = JSON.stringify(json);

    expect(res.status).toBe(200);
    expect(json).toEqual({ status: "unavailable", reply: FALLBACK_TEXT });
    // No raw status codes, provider error text, or stack traces ever leak
    // into the HTTP response body (FR-056/FR-057).
    expect(bodyText).not.toMatch(/429/);
    expect(bodyText).not.toMatch(/500/);
    expect(bodyText).not.toMatch(/timeout/i);
    expect(bodyText).not.toMatch(/error/i);
    expect(bodyText).not.toMatch(/stack/i);
  });

  it("rejects empty messages with a 400 and no technical detail", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(makeRequest({ message: "" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.status).toBe("invalid");
    expect(generateChatReply).not.toHaveBeenCalled();
  });

  it("returns the uniform fallback when the rate limiter rejects the request", async () => {
    const { isRateLimited } = await import("@/lib/gemini/rate-limit");
    vi.mocked(isRateLimited).mockReturnValueOnce(true);
    const { POST } = await import("@/app/api/chat/route");

    const res = await POST(makeRequest({ message: "Hello" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ status: "unavailable", reply: FALLBACK_TEXT });
    expect(generateChatReply).not.toHaveBeenCalled();
  });
});
