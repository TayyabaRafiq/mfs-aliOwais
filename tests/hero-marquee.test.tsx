import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HeroMarquee } from "@/components/hero/hero-marquee";

describe("HeroMarquee", () => {
  it("carries the business name and Executive designation in an accessible label", () => {
    const { container } = render(<HeroMarquee />);
    const region = container.querySelector("[aria-label]");
    expect(region?.getAttribute("aria-label")).toMatch(/mahrukh fumigation services/i);
    expect(region?.getAttribute("aria-label")).toMatch(/syed ali owais/i);
  });

  it("applies the reduced-motion utility classes to the animated element", () => {
    const { container } = render(<HeroMarquee />);
    const animated = container.querySelector(".animate-marquee");
    expect(animated).not.toBeNull();
    expect(animated?.className).toContain("motion-reduce:animate-none");
  });
});
