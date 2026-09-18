import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/content/business-profile";

const WHATSAPP_MESSAGE = "Hi, I'd like to get a price for pest control/fumigation services.";

/**
 * Persistent floating WhatsApp entry point, independent of the AI chatbot.
 * Sits lower (bottom-4) than the chatbot trigger/panel (bottom-24, see
 * ChatbotWidget) with a clear gap between them so the two floating
 * affordances never overlap or cover each other on any breakpoint — the
 * earlier mobile overlap bug was the chat panel covering the Hero CTA on
 * short viewports; keeping these two fixed elements vertically separated
 * avoids repeating that class of issue.
 */
export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
