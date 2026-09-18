import { test, expect } from "@playwright/test";

test.describe("US1 — credibility and quote path", () => {
  test("desktop: business name, Executive designation, and CTA are visible above the fold", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mahrukh Fumigation Services");
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await expect(page.getByText(/executive — mahrukh fumigation services/i).first()).toBeInViewport();
    await expect(page.getByRole("link", { name: /let's talk/i }).first()).toBeInViewport();
  });

  test("contact links are present and correct", async ({ page }) => {
    await page.goto("/#contact");
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: /call now/i })).toHaveAttribute("href", /^tel:/);
    await expect(contact.getByRole("link", { name: /whatsapp us/i })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\//,
    );
    await expect(contact.getByRole("link", { name: /email us/i })).toHaveAttribute("href", /^mailto:/);
  });
});

test.describe("US1 — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("business identity and CTA remain visible on a mobile viewport", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /let's talk/i }).first()).toBeVisible();
  });
});
