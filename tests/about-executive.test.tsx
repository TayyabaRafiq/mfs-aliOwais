import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutExecutive } from "@/components/about-executive";

describe("AboutExecutive", () => {
  it("renders the exact Executive designation and never 'Proprietor'", () => {
    render(<AboutExecutive />);
    expect(screen.getByText("Syed Ali Owais")).toBeInTheDocument();
    expect(screen.getByText("Executive — Mahrukh Fumigation Services")).toBeInTheDocument();
    expect(screen.queryByText(/proprietor/i)).not.toBeInTheDocument();
  });

  it("never renders a photograph for the Executive", () => {
    const { container } = render(<AboutExecutive />);
    expect(container.querySelectorAll("img").length).toBe(0);
  });
});
