"use client";

import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { businessProfile, buildWhatsAppUrl } from "@/lib/content/business-profile";

const WHATSAPP_MESSAGE = "Hi, I'd like to get a price for pest control/fumigation services.";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#book-service", label: "Book a Service" },
  { href: "#contact", label: "Contact" },
];

/**
 * FR-001–004: authentic logo (linked Home), in-page nav, accessible mobile
 * menu (now a slide-in Sheet). FR-004 / US4: a call affordance is reachable
 * from the header itself on mobile, so a visitor never has to scroll the
 * full page to start a call.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl();
  const whatsappCtaHref = buildWhatsAppUrl(WHATSAPP_MESSAGE);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center" aria-label="Mahrukh Fumigation Services — Home">
          <LogoMark size="header" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-blue-100/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm" variant="outline" className="border-white/25 text-white hover:bg-white/10">
            <a href={`tel:${businessProfile.phones[0]}`} aria-label={`Call ${businessProfile.name}`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-brand-purple to-brand-blue shadow-md shadow-brand-purple/30 transition-transform hover:scale-105"
          >
            <a href={whatsappCtaHref} target="_blank" rel="noopener noreferrer">
              Let&apos;s Talk
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-blue-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Menu</SheetTitle>
            <nav aria-label="Primary" className="mt-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-blue-100 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <Button asChild className="bg-gradient-to-r from-brand-purple to-brand-blue">
                <a
                  href={whatsappCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/25 text-white hover:bg-white/10">
                <a href={`tel:${businessProfile.phones[0]}`}>Call Us</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* US4: reachable within two taps — a direct call link sits in the
          always-visible header bar on mobile too, independent of the menu.
          Each link carries its own padding (not just the container's) so the
          actual tap target is a comfortable ~44px tall, not just the text's
          line-height. */}
      <div className="flex items-center justify-center gap-1 border-t border-white/10 bg-white/[0.03] lg:hidden">
        <a
          href={`tel:${businessProfile.phones[0]}`}
          className="flex items-center gap-1 px-3 py-3 text-xs font-semibold text-blue-100"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          Call Now
        </a>
        <span className="text-white/20">|</span>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-3 text-xs font-semibold text-blue-100"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
