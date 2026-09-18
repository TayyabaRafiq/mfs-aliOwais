import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("US4 — mobile quick contact", () => {
  test("a call action is reachable within two taps from page load, without a full scroll", async ({
    page,
  }) => {
    await page.goto("/");

    // Tap 1: the always-visible mobile call bar under the header (scoped to
    // the header/banner landmark — "Call Now" also appears again, further
    // down, inside the Contact section).
    const callNow = page.getByRole("banner").getByRole("link", { name: /call now/i });
    await expect(callNow).toBeVisible();
    await expect(callNow).toHaveAttribute("href", /^tel:/);

    // No scrolling required — it's reachable immediately after load.
    await expect(callNow).toBeInViewport();
  });
});
