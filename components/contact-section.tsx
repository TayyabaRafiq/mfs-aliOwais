import { Mail, MapPin, Phone, Printer, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessProfile, buildWhatsAppUrl } from "@/lib/content/business-profile";

// FR-027–028: exact contact details from company-facts.md, plus direct
// tel:/mailto:/WhatsApp links — no backend contact form for this version
// (spec.md Clarifications Q1).
export function ContactSection() {
  const whatsappHref = buildWhatsAppUrl();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-purple to-brand-purple-dark py-20 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-brand-blue/25 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Get In Touch
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Get a Quote / Contact Us</h2>
        <p className="mt-2 max-w-prose text-white/80">
          Reach {businessProfile.name} directly by phone, WhatsApp, or email.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContactItem icon={MapPin} label="Office Address" value={businessProfile.address} />
          <ContactItem
            icon={Phone}
            label="Telephone"
            value={businessProfile.phones.join(", ")}
            href={`tel:${businessProfile.phones[0]}`}
          />
          <ContactItem icon={Printer} label="Fax" value={businessProfile.fax} />
          <ContactItem
            icon={Phone}
            label="Mobile"
            value={businessProfile.mobile}
            href={`tel:${businessProfile.mobile}`}
          />
          <ContactItem
            icon={MessageCircle}
            label="WhatsApp"
            value={businessProfile.whatsapp}
            href={whatsappHref}
            external
          />
          <ContactItem
            icon={Mail}
            label="Email"
            value={businessProfile.email}
            href={`mailto:${businessProfile.email}`}
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            variant="accent"
            className="shadow-lg shadow-brand-accent/30 transition-transform hover:scale-105"
          >
            <a href={`tel:${businessProfile.phones[0]}`}>Call Now</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            <a href={`mailto:${businessProfile.email}`}>Email Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  /** Opens in a new tab (target="_blank" + rel="noopener noreferrer") — used for the WhatsApp link, which navigates to an external site. */
  external?: boolean;
}) {
  const content = (
    <>
      <Icon className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
      <span>
        <span className="block text-xs uppercase tracking-wide text-white/60">{label}</span>
        <span className="block font-medium">{value}</span>
      </span>
    </>
  );

  const surfaceClass =
    "flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition-all duration-200";

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${surfaceClass} hover:border-brand-accent/40 hover:bg-white/[0.09]`}
      >
        {content}
      </a>
    );
  }

  return <div className={surfaceClass}>{content}</div>;
}
