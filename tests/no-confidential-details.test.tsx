import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "@/app/page";

const FORBIDDEN_PATTERNS = [
  /\bntn\b/i,
  /certificate\s*(no\.?|number|#)/i,
  /reference\s*(no\.?|number|#)/i,
  /signature/i,
];

describe("Full page — confidential document details", () => {
  it("never exposes certificate numbers, NTN numbers, reference numbers, or signatures", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";
    FORBIDDEN_PATTERNS.forEach((pattern) => {
      expect(text).not.toMatch(pattern);
    });
  });

  it("never renders a certificate image anywhere on the page", () => {
    const { container } = render(<HomePage />);
    const images = Array.from(container.querySelectorAll("img"));
    images.forEach((img) => {
      expect(img.alt.toLowerCase()).not.toContain("certificate");
    });
  });
});
