# Phase 0 Research: Mahrukh Fumigation Services — Company Homepage

## 1. Gemini free-tier model and SDK shape

- **Decision**: Use the official `@google/generative-ai` Node SDK from a server-only module, targeting a current free-tier-eligible Gemini text model, configured via an environment variable (`GEMINI_MODEL`) rather than hardcoded, so the exact model name can be updated without a code change if Google's free-tier lineup shifts.
- **Rationale**: Google periodically renames/rotates which specific model IDs are free-tier-eligible; hardcoding one risks the chatbot silently breaking on a provider-side change. An env var keeps this a config update, not a redeploy-with-code-change.
- **Alternatives considered**: Calling the Gemini REST API directly with `fetch` (no SDK) — rejected as marginally more boilerplate for error/response parsing with no real benefit over the official SDK, which is lightweight and has no problematic transitive dependencies.

## 2. Free-tier rate limits → sizing the rate limiter

- **Decision**: Implement a simple in-memory token-bucket/fixed-window limiter (e.g., N requests per minute per client IP or per browser session id) inside `lib/gemini/rate-limit.ts`, with the exact numeric threshold set conservatively low (tuned during `/sp.tasks`/implementation against whatever the current published free-tier per-minute limit is) so a single visitor or a small burst of visitors cannot exhaust the shared quota.
- **Rationale**: Free-tier quotas are shared across the whole app, not per-visitor; without a limiter, a handful of concurrent visitors (or a bot) could exhaust the quota and degrade the chatbot for everyone else. An in-memory limiter is sufficient for a single-instance small-business site and requires no new infrastructure (Constitution XI/XII — no new database or external rate-limiting service).
- **Alternatives considered**: A hosted rate-limiting service (e.g., Upstash Redis-backed limiter) — rejected for v1 as unnecessary infrastructure for expected traffic; an in-memory limiter resets on redeploy/cold-start, which is an acceptable trade-off at this scale and noted as a risk below.

## 3. Static export vs. one dynamic API route

- **Decision**: Deploy as a standard Vercel Next.js app (not a fully static `output: 'export'` build). The homepage itself remains statically generated (no per-request server data), while `app/api/chat/route.ts` runs as a normal serverless/edge function. This is Vercel's default Next.js deployment model, requiring no extra configuration.
- **Rationale**: `output: 'export'` disallows Route Handlers entirely, which would make the chatbot's server-side Gemini call impossible without a separate backend service — that would violate the "single project, no unnecessary architecture" guidance (Constitution XII). Standard Vercel deployment supports static pages and API routes side by side with no added complexity.
- **Alternatives considered**: A fully static export plus a separate serverless function project/service for chat — rejected as unnecessary split-repo complexity for one endpoint.

## 4. Accessible floating chat widget without new dependencies

- **Decision**: Build the chatbot panel using shadcn/ui's existing `Dialog` (or `Popover`, chosen during implementation based on desired modal-vs-inline feel) primitive, which is already Radix-UI-based and provides focus trapping, `Escape`-to-close, and ARIA wiring out of the box. The floating trigger is a standard shadcn `Button` with an accessible label (e.g., "Ask Mahrukh AI").
- **Rationale**: Satisfies FR-050 (keyboard operability, screen-reader compatibility) without introducing a new UI dependency beyond what Constitution Principle XI already permits (shadcn/ui is in the locked stack).
- **Alternatives considered**: A fully custom-built floating panel — rejected as reinventing accessibility behavior shadcn/ui already provides correctly.

## Summary of resolved unknowns

| Unknown | Resolution |
|---|---|
| Gemini model/SDK | `@google/generative-ai`, model name via `GEMINI_MODEL` env var |
| Free-tier rate limiting | In-memory per-IP/session limiter, conservative threshold |
| Static export compatibility | Standard Vercel deployment (static pages + one serverless API route), not `output: 'export'` |
| Accessible chat widget | shadcn/ui `Dialog`/`Popover` + `Button`, no new dependency |

No `NEEDS CLARIFICATION` items remain from the Technical Context.
