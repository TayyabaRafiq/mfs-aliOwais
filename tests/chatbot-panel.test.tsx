import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import { ChatbotPanel } from "@/components/chatbot/chatbot-panel";

// ChatbotPanel renders DialogTitle/DialogDescription itself (moved here so
// the header can collapse once a conversation starts) — those Radix
// primitives require ambient Dialog context, so every render here must be
// wrapped in <Dialog>, matching how ChatbotWidget actually mounts it.
function renderPanel() {
  return render(
    <Dialog open>
      <ChatbotPanel />
    </Dialog>,
  );
}

describe("ChatbotPanel", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the four required quick-suggestion chips", () => {
    renderPanel();
    expect(screen.getByRole("button", { name: "Our Services" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request a Quote" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact Us" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "About Mahrukh" })).toBeInTheDocument();
  });

  it("renders the grounded decline message for an out-of-scope/pricing question", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({
        status: "unavailable",
        reply:
          "I don't have pricing information here — please contact us by phone, WhatsApp, or email for a quote.",
      }),
    } as Response);

    renderPanel();
    fireEvent.click(screen.getByRole("button", { name: "Request a Quote" }));

    await waitFor(() => {
      expect(screen.getByText(/contact us by phone, whatsapp, or email/i)).toBeInTheDocument();
    });
  });

  it("sends a typed message and renders the assistant's grounded reply", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ status: "ok", reply: "Yes, we offer termite proofing." }),
    } as Response);

    renderPanel();
    fireEvent.change(screen.getByLabelText(/type your question/i), {
      target: { value: "Do you do termite proofing?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Yes, we offer termite proofing.")).toBeInTheDocument();
    });
  });
});
