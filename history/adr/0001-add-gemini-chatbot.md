# ADR-0001: AI Chatbot Provider — Google Gemini API (Free Tier)

> **Scope**: Documents the provider and operating-constraint decision cluster for the "Ask Mahrukh AI" chatbot (provider choice, cost model, key handling, persistence, and failure behavior together) — not a separate ADR per sub-decision.

- **Status:** Accepted
- **Date:** 2026-09-16
- **Feature:** 001-company-homepage
- **Context:** The approved specification (`specs/001-company-homepage/spec.md`, User Story 5 and FR-040–FR-058) requires a floating "Ask Mahrukh AI" chatbot on the homepage — a business-scoped assistant grounded only in `company-facts.md` and the approved site content. This introduces a new external AI/LLM dependency that did not exist in the previously locked technical stack (Constitution Principle XI: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide, Framer Motion, Vercel). The project owner needed to choose a provider and its operating constraints before implementation, given: no budget for ongoing paid API billing at this stage; the site's overall simplicity mandate (Constitution Principles VIII, XII); the privacy/document-handling principles already established (Constitution Principle VI); and the need to never expose secrets or raw technical errors to visitors of a small business marketing site. This decision was resolved directly in the specification (Clarifications, Q3, session 2026-09-16) ahead of `/sp.plan`, per explicit owner direction, and is recorded here as-is — this ADR documents that already-approved decision rather than opening it for reconsideration.

## Decision

Use the **Google Gemini API** as the sole AI provider for the "Ask Mahrukh AI" chatbot's initial version, with the following bundled constraints:

- **Model/cost**: A Gemini model eligible for the current free tier. No paid billing is a requirement for v1.
- **Key handling**: The Gemini API key is stored only via environment variables / deployment secrets and is used exclusively from a server-side route/handler. It must never appear in client-side code, browser-visible network requests, the public GitHub repository, or any other public source.
- **Persistence**: No database or permanent chat-history system. Conversations are ephemeral, scoped to the visitor's current session only.
- **Knowledge scope**: The chatbot answers only from `company-facts.md` and the approved site content; it declines out-of-scope or off-topic requests and redirects to a contact channel instead of guessing.
- **Failure handling**: Quota exhaustion, rate limiting, timeouts, and other provider failures must always surface the approved friendly fallback message ("I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.") and must never expose raw provider errors (e.g., HTTP 429, stack traces, technical details) to visitors. The primary Contact/Get a Quote CTA and all direct contact channels remain fully usable regardless of chatbot state.
- **Abuse protection**: The server-side endpoint applies basic rate-limiting (e.g., per-session or per-IP) to help stay within the free-tier quota.

## Consequences

### Positive

- Zero incremental cost for v1, matching a small local business's budget and avoiding billing risk before the feature proves its value.
- Fits the existing Vercel-hosted Next.js stack as a single server-side route/handler calling Gemini's API — no new hosting infrastructure required.
- Ephemeral, no-database design keeps the privacy surface area minimal, consistent with the document-privacy principle already established for the rest of the site.
- Mandatory grounding plus graceful fallback enforces the site's no-invented-claims principle even under AI provider failure, rather than letting a failure produce an unpredictable or technical-looking response.

### Negative

- The free tier has finite quota; a traffic spike could exhaust it, temporarily degrading the chatbot to fallback-only behavior (mitigated because the core conversion path — Story 1 — never depends on the chatbot, per FR-053).
- Ties chatbot availability to Google's free-tier terms and model lifecycle for the chosen model; a future policy change or model deprecation could require migration.
- No persistent conversation logging means there is no way to review past chatbot exchanges for quality auditing after the fact — an intentional trade-off for simplicity and privacy that forgoes that visibility.
- Introduces a new secret (the Gemini API key) and a new external dependency beyond the previously locked stack, requiring careful environment/deployment-secret management going forward.

## Alternatives Considered

- **Anthropic Claude API** — capable and well-suited to grounded, instruction-following assistants, but has no free tier suitable for sustained production traffic; rejected for v1 because it conflicts with the explicit "no paid billing requirement for v1" constraint.
- **OpenAI API** — similarly requires paid credits/billing for reliable production use; rejected for the same cost reason.
- **No external AI call (rule-based/FAQ keyword matching only)** — simplest possible option with zero ongoing cost or vendor dependency, but does not deliver the natural-language "Ask Mahrukh AI" experience the owner specifically requested; rejected as not meeting the approved feature intent, though it remains a viable lower-complexity fallback if the Gemini free tier later proves insufficient.

## References

- Feature Spec: `specs/001-company-homepage/spec.md` (User Story 5; FR-040–FR-058; Clarifications, Q3)
- Implementation Plan: not yet created — `/sp.plan` is pending
- Related ADRs: none
- Evaluator Evidence: `history/prompts/001-company-homepage/003-resolve-clarification-q3-gemini.spec.prompt.md`
