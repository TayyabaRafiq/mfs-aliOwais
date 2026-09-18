import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero/hero";
import { AboutExecutive } from "@/components/about-executive";
import { ServicesSection } from "@/components/services/services-section";
import { InstitutionalExperience } from "@/components/institutional-experience";
import { WhyMahrukh } from "@/components/why-mahrukh";
import { BookServiceSection } from "@/components/book-service-section";
import { ContactSection } from "@/components/contact-section";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { WhatsAppButton } from "@/components/whatsapp-button";

// The single home page, composed of anchor-linked sections in order
// (spec.md Clarifications Q2 — one page, no separate routes).
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutExecutive />
        <ServicesSection />
        <InstitutionalExperience />
        <WhyMahrukh />
        <BookServiceSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ChatbotWidget />
      <WhatsAppButton />
    </>
  );
}
