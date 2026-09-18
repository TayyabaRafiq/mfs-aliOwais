import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "@/components/contact-section";
import { businessProfile } from "@/lib/content/business-profile";

describe("ContactSection", () => {
  it("renders tel/mailto/WhatsApp links matching business-profile.ts exactly", () => {
    render(<ContactSection />);

    const telLinks = screen.getAllByRole("link", { name: /call now/i });
    expect(telLinks[0]).toHaveAttribute("href", `tel:${businessProfile.phones[0]}`);

    const mailLink = screen.getByRole("link", { name: /email us/i });
    expect(mailLink).toHaveAttribute("href", `mailto:${businessProfile.email}`);

    const whatsappLink = screen.getByRole("link", { name: /whatsapp us/i });
    // wa.me requires international format (no leading 0, country code
    // prefixed) — buildWhatsAppUrl() converts the local-format number from
    // business-profile.ts for exactly this reason, so the href intentionally
    // does NOT contain the raw local digits.
    const localDigits = businessProfile.whatsapp.replace(/\D/g, "");
    const internationalDigits = `92${localDigits.slice(1)}`;
    expect(whatsappLink.getAttribute("href")).toContain(internationalDigits);
  });

  it("renders the office address and both telephone numbers", () => {
    render(<ContactSection />);
    expect(screen.getByText(businessProfile.address)).toBeInTheDocument();
    // The telephone entry lists both numbers in one line; the fax entry
    // separately shares the same digits as the first phone number, per
    // company-facts.md — so assert on the joined telephone line directly
    // rather than searching for each number in isolation.
    expect(screen.getByText(businessProfile.phones.join(", "))).toBeInTheDocument();
  });
});
