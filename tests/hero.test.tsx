import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/hero/hero";

describe("Hero", () => {
  it("renders the business name, Executive designation, and a primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: /mahrukh fumigation services/i })).toBeInTheDocument();
    expect(screen.getByText(/executive — mahrukh fumigation services/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /let's talk/i })).toBeInTheDocument();
  });

  it("never renders a photograph or image element representing Syed Ali Owais", () => {
    const { container } = render(<Hero />);
    // The only <img>-producing element in Hero is the optional illustrative
    // visual, which is never a person and never labeled with his name.
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      expect(img.alt.toLowerCase()).not.toContain("ali owais");
    });
    expect(screen.queryByAltText(/syed ali owais/i)).not.toBeInTheDocument();
  });
});
