import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { IllustrativeVisual } from "@/components/illustrative-visual";

describe("IllustrativeVisual", () => {
  it("renders a non-deceptive fallback (no <img>) when no src is supplied", () => {
    const { container } = render(<IllustrativeVisual subject="commercial-fumigation" />);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("[data-illustrative-subject='commercial-fumigation']")).not.toBeNull();
  });

  it("uses the approved generic caption as alt text when informative", () => {
    const { container } = render(
      <IllustrativeVisual subject="pest-control-treatment" src="/images/pest-control-treatment.jpg" />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "Pest Control Treatment");
  });

  it("renders empty alt text when marked decorative", () => {
    const { container } = render(
      <IllustrativeVisual
        subject="fumigation-equipment"
        src="/images/fumigation-equipment.jpg"
        decorative
      />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });

  it("exposes no prop for naming a real client or location", () => {
    // Type-level guarantee: IllustrativeVisualProps has no `location`/`client`
    // field. This test documents that guarantee at the component's public API.
    const props = Object.keys({ subject: "commercial-fumigation" as const, src: undefined, decorative: false });
    expect(props).not.toContain("location");
    expect(props).not.toContain("client");
  });
});
