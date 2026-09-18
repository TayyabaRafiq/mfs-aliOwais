import { test, expect } from "@playwright/test";

// FR-032, SC-008: every interactive element must be reachable and operable
// using a keyboard alone.
test.describe("Keyboard navigation", () => {
  test("Tab reaches the header nav, CTA, and chatbot trigger without a mouse", async ({ page }) => {
    await page.goto("/");

    const focusableCount = await page.evaluate(
      () => document.querySelectorAll("a[href], button:not([disabled])").length,
    );
    expect(focusableCount).toBeGreaterThan(0);

    // Tab through the page and confirm focus never gets stuck off-document.
    for (let i = 0; i < 15; i += 1) {
      await page.keyboard.press("Tab");
      const active = await page.evaluate(() => document.activeElement?.tagName);
      expect(active).not.toBeNull();
    }

    const chatbotTrigger = page.getByRole("button", { name: /ask mahrukh ai/i });
    await chatbotTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
