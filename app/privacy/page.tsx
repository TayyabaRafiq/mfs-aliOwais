import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { businessProfile } from "@/lib/content/business-profile";

export const metadata: Metadata = {
  title: `Privacy Policy | ${businessProfile.name}`,
  description: `How ${businessProfile.name} handles information submitted through this website.`,
};

// Plain-language, factually accurate to how this site actually works: no
// backend database, no third-party sharing — the Book a Service form only
// builds a WhatsApp message (lib/content/business-profile.ts's
// buildWhatsAppUrl), and the chatbot's conversation state lives only in
// the browser tab for that session (components/chatbot/use-chatbot.ts).
// Do not add compliance-framework claims (GDPR, CCPA, etc.) here unless
// that is independently verified to actually apply.
export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-brand-navy py-20">
        <div className="mx-auto max-w-3xl px-4 text-blue-100/85">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Privacy Policy
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-sm text-blue-100/60">Last updated: September 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed sm:text-base">
            <section>
              <h2 className="text-lg font-semibold text-white">What information we collect</h2>
              <p className="mt-2">
                If you use the &quot;Book a Service&quot; form, we collect the information you type
                into it: your name, phone number, address or area, the service type you select,
                and any optional notes you add. If you use the &quot;Ask Mahrukh AI&quot; chatbot, we
                receive whatever you type into that conversation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">How we use it</h2>
              <p className="mt-2">
                The Book a Service form does not submit your information to us directly or store
                it anywhere. It composes a WhatsApp message from what you entered and opens
                WhatsApp for you to send — you decide whether to actually send it. If you do,
                {" "}{businessProfile.name} receives it the same way as any other WhatsApp message,
                and uses it solely to respond to your inquiry.
              </p>
              <p className="mt-2">
                We do not maintain a database of website visitors or form submissions. Nothing
                you type into the Book a Service form is stored by this website once you leave or
                refresh the page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">The chatbot</h2>
              <p className="mt-2">
                Chatbot conversations are sent to Google&apos;s Gemini API to generate a response.
                Conversation history is kept only in your browser for the current visit — it is
                not saved to any database by this website, and reopening the chat or reloading the
                page starts a fresh conversation with no memory of anything said before.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">Sharing your information</h2>
              <p className="mt-2">
                We do not sell or share your information with third parties for marketing or any
                other purpose. It is used only to respond to the inquiry you send us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white">Questions</h2>
              <p className="mt-2">
                If you have questions about this policy or how your information is handled,
                contact us at{" "}
                <a
                  href={`mailto:${businessProfile.email}`}
                  className="text-brand-accent underline underline-offset-2 hover:text-brand-accent/80"
                >
                  {businessProfile.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
