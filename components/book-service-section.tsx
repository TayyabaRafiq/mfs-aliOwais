"use client";

import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { services } from "@/lib/content/services";
import { buildWhatsAppUrl } from "@/lib/content/business-profile";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BookingForm {
  name: string;
  phone: string;
  address: string;
  serviceId: string;
  notes: string;
}

const INITIAL_FORM: BookingForm = { name: "", phone: "", address: "", serviceId: "", notes: "" };

type FieldErrors = Partial<Record<keyof BookingForm, string>>;

/**
 * Not a real backend form (spec.md Clarifications Q1: no contact-form
 * backend for this version) — this is a structured wrapper around the same
 * WhatsApp deep-link pattern used by every other CTA on the site
 * (buildWhatsAppUrl). Submitting never sends data anywhere; it only opens
 * WhatsApp in a new tab with the fields composed into a pre-filled message
 * for the visitor to review and send themselves.
 */
export function BookServiceSection() {
  const [form, setForm] = useState<BookingForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange =
    (field: keyof BookingForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  // Radix Select's onValueChange hands back a plain string, not a change
  // event, so it needs its own handler rather than the native-input one.
  const handleServiceChange = (value: string) => {
    setForm((prev) => ({ ...prev, serviceId: value }));
    setErrors((prev) => (prev.serviceId ? { ...prev, serviceId: undefined } : prev));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter a phone number.";
    if (!form.address.trim()) nextErrors.address = "Please enter your address or area.";
    if (!form.serviceId) nextErrors.serviceId = "Please select a service.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const service = services.find((s) => s.id === form.serviceId);
    const lines = [
      "Hi, I'd like to book a service.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Address/Area: ${form.address.trim()}`,
      `Service: ${service?.name ?? form.serviceId}`,
    ];
    if (form.notes.trim()) {
      lines.push(`Notes: ${form.notes.trim()}`);
    }

    const url = buildWhatsAppUrl(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");

    // Reset for a fresh request — nothing is actually submitted anywhere
    // (this only opens a pre-filled WhatsApp draft), so there's no reason
    // to leave stale data sitting in the form afterward.
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <section id="book-service" className="relative overflow-hidden bg-brand-navy py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-purple/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-3xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Book a Service
        </p>
        <h2 className="mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          Request a Service on WhatsApp
        </h2>
        <p className="mt-4 max-w-prose text-blue-100/75">
          Fill in a few details and we&apos;ll open WhatsApp with your request ready to send —
          nothing here is stored or submitted anywhere else.
        </p>

        {/* A flat dark card (not GradientBorder) — the vivid rainbow-wash
            border reads fine on compact accent cards elsewhere, but
            stretched across a tall multi-field form it overwhelms the
            fields rather than framing them; this matches the more
            subdued treatment used for content-dense areas like Contact. */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/20 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 p-6 sm:p-8"
          >
            <FormField label="Name" htmlFor="book-name" required error={errors.name}>
              <input
                id="book-name"
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "book-name-error" : undefined}
                className={fieldClass(!!errors.name)}
              />
            </FormField>

            <FormField label="Phone Number" htmlFor="book-phone" required error={errors.phone}>
              <input
                id="book-phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange("phone")}
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "book-phone-error" : undefined}
                className={fieldClass(!!errors.phone)}
              />
            </FormField>

            <FormField
              label="Address / Area"
              htmlFor="book-address"
              required
              error={errors.address}
              hint="Just enough to locate the job — neighborhood or landmark is fine."
            >
              <input
                id="book-address"
                type="text"
                required
                value={form.address}
                onChange={handleChange("address")}
                autoComplete="off"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "book-address-error" : undefined}
                className={fieldClass(!!errors.address)}
              />
            </FormField>

            <FormField label="Service Type" htmlFor="book-service-type" required error={errors.serviceId}>
              <Select value={form.serviceId} onValueChange={handleServiceChange}>
                <SelectTrigger
                  id="book-service-type"
                  aria-invalid={!!errors.serviceId}
                  aria-describedby={errors.serviceId ? "book-service-type-error" : undefined}
                  className={fieldClass(!!errors.serviceId)}
                >
                  <SelectValue placeholder="Select a service…" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Message / Notes (optional)" htmlFor="book-notes">
              <textarea
                id="book-notes"
                value={form.notes}
                onChange={handleChange("notes")}
                rows={3}
                className={fieldClass(false)}
              />
            </FormField>

            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-brand-blue/50 sm:w-auto"
              >
                Send Request on WhatsApp
              </Button>
              <p className="mt-2 text-xs text-blue-100/65">
                Opens WhatsApp in a new tab with your details pre-filled — you send it from there.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function fieldClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400/60 focus:border-red-400 focus:ring-red-400"
      : "border-white/15 focus:border-brand-accent focus:ring-brand-accent",
  );
}

function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-blue-100">
        {label}
        {required && (
          <span className="text-brand-accent" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-blue-100/65">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-xs font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
