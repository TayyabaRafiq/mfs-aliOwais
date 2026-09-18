import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { InstitutionalExperience } from "@/components/institutional-experience";
import { organizations } from "@/lib/content/organizations";

const FORBIDDEN_TERMS = [
  "official partner",
  "approved client",
  "government partner",
  "preferred vendor",
  "endorsed client",
];

describe("InstitutionalExperience", () => {
  it("never renders a forbidden relationship term for any organization", () => {
    render(<InstitutionalExperience />);
    const text = screen.getByText(/commercial & institutional experience/i).closest("section")!.textContent!.toLowerCase();
    FORBIDDEN_TERMS.forEach((term) => {
      expect(text).not.toContain(term);
    });
    // Every listed organization is rendered with the neutral label only.
    expect(text.match(/organization served/g)?.length).toBe(organizations.length);
  });

  it("renders the exact NBP historical wording from company-facts.md", () => {
    render(<InstitutionalExperience />);
    expect(screen.getByText(/category "d"/i)).toBeInTheDocument();
    expect(screen.getByText(/category "b"/i)).toBeInTheDocument();
    expect(screen.getByText(/historical enlistment/i)).toBeInTheDocument();
  });
});
