import { test, expect } from "@playwright/test";

// FR-009/FR-039: verifies the ACTUAL computed effect of prefers-reduced-motion
// on the Hero marquee, not just the presence of a utility class name — a
// Tailwind variant can be silently overridden by a higher-specificity rule
// (as the chatbot dialog's animation was, before being fixed to use the
// `!` important-modifier — see us5-chatbot.spec.ts).
test.describe("Global prefers-reduced-motion", () => {
  test("the Hero marquee animation is suppressed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const marquee = page.locator(".animate-marquee");
    const animationName = await marquee.evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).toBe("none");
  });

  test("the Hero marquee animates normally without prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const marquee = page.locator(".animate-marquee");
    const animationName = await marquee.evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).not.toBe("none");
  });
});
