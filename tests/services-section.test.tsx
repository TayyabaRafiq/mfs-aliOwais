import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSection } from "@/components/services/services-section";
import { services } from "@/lib/content/services";

describe("ServicesSection", () => {
  it("renders exactly the six approved services and no others", () => {
    render(<ServicesSection />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(services).toHaveLength(6);
  });

  it("renders each service name from services.ts", () => {
    render(<ServicesSection />);
    services.forEach((service) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });
  });
});
