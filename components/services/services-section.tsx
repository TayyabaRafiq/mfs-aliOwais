import { services } from "@/lib/content/services";
import { ServiceCard } from "@/components/services/service-card";

// FR-017–019: exactly the six verified services, nothing else.
export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-brand-navy py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-blue/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          What We Do
        </p>
        <h2 className="mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          Our Services
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
