import { LogoMark } from "@/components/logo-mark";
import { Separator } from "@/components/ui/separator";
import { businessProfile } from "@/lib/content/business-profile";

// FR-029–030: smaller logo, business name, contact info; logo links Home.
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-brand-navy-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-purple/10 blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-blue-100/80 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#home" aria-label="Mahrukh Fumigation Services — Home" className="inline-block">
            <LogoMark size="footer" />
          </a>
          <p className="mt-3 max-w-xs text-xs text-blue-100/60">
            {businessProfile.name} — {businessProfile.location}
          </p>
        </div>

        <address className="not-italic leading-relaxed">
          <p>{businessProfile.address}</p>
          <p>
            Tel: {businessProfile.phones.join(", ")} · Fax: {businessProfile.fax}
          </p>
          <p>
            Mobile / WhatsApp:{" "}
            <a href={`tel:${businessProfile.mobile}`} className="transition-colors hover:text-white">
              {businessProfile.mobile}
            </a>
          </p>
          <p>
            <a href={`mailto:${businessProfile.email}`} className="transition-colors hover:text-white">
              {businessProfile.email}
            </a>
          </p>
        </address>
      </div>

      <Separator className="relative" />

      <div className="relative px-4 py-5 text-center text-xs text-blue-100/50">
        © {new Date().getUTCFullYear()} {businessProfile.name}. All rights reserved.
      </div>
    </footer>
  );
}
