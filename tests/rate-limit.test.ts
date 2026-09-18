import { describe, expect, it, beforeEach, vi } from "vitest";

describe("isRateLimited", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("allows requests under the threshold and rejects once it is exceeded", async () => {
    const { isRateLimited } = await import("@/lib/gemini/rate-limit");
    const key = "test-key-1";

    let limited = false;
    for (let i = 0; i < 6; i += 1) {
      limited = isRateLimited(key);
    }

    // 5 requests are allowed per window; the 6th must be rejected.
    expect(limited).toBe(true);
  });

  it("tracks separate keys independently", async () => {
    const { isRateLimited } = await import("@/lib/gemini/rate-limit");
    for (let i = 0; i < 5; i += 1) isRateLimited("key-a");
    expect(isRateLimited("key-b")).toBe(false);
  });
});
