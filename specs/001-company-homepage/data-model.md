# Phase 1 Data Model: Mahrukh Fumigation Services — Company Homepage

All entities below are **static, compile-time content** defined in `lib/content/*.ts` — there is no database and no runtime mutation. Types are documented here as the shape of those constants, derived directly from the spec's "Key Entities" section and `company-facts.md`. No entity or field may be added without first adding the corresponding fact to `company-facts.md` (Constitution: Source of Truth).

## BusinessProfile

Single instance, from `company-facts.md` → Business Identity / Contact Information.

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | Fixed: "Mahrukh Fumigation Services" |
| `executiveName` | `string` | Fixed: "Syed Ali Owais" |
| `executiveTitle` | `string` | Fixed: "Executive — Mahrukh Fumigation Services" (FR-015; never "Proprietor") |
| `location` | `string` | "Karachi, Pakistan" |
| `experience` | `string` | "25+ years" (used for FR-010, FR-026 trust indicators) |
| `address` | `string` | Office address, verbatim from `company-facts.md` |
| `phones` | `string[]` | Telephone numbers |
| `fax` | `string` | |
| `mobile` | `string` | Also the WhatsApp number |
| `whatsapp` | `string` | Same value as `mobile` per `company-facts.md` |
| `email` | `string` | |

## Service

One entry per approved service (exactly 6 — FR-017/FR-019). No entry may exist outside this fixed list.

| Field | Type | Notes |
|---|---|---|
| `id` | `"fumigation" \| "disinfestation" \| "derating" \| "termite-proofing" \| "rodent-control" \| "pest-control"` | Closed union — adding a 7th requires a type change plus a `company-facts.md` update first |
| `name` | `string` | Display name |
| `description` | `string` | Short, conservative description (FR-018) — no technical/chemical/safety claims |

## OrganizationReference

One entry per organization/category in `company-facts.md` → Documented Organizational / Client Experience (FR-020/FR-021).

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | e.g., "National Bank of Pakistan (NBP)" |
| `relationshipLabel` | `"served"` | Closed to the neutral value only — no other string is a valid relationship label (FR-022) unless `company-facts.md` is updated with explicit new evidence |
| `historicalNote` | `string \| undefined` | Only set for NBP (historical 2012–2013 / Jan 2017–Dec 2017 enlistment wording, FR-023) and Meezan Bank (cafeteria fumigation/pest-control certificate wording, FR-024); omitted for all other entries |

## ContactChannel

Derived view over `BusinessProfile` fields for rendering `tel:`/`mailto:`/WhatsApp links (FR-027/FR-028) — not a separate stored entity, but documented as a type since components consume it as one shape:

| Field | Type | Notes |
|---|---|---|
| `type` | `"phone" \| "fax" \| "mobile" \| "whatsapp" \| "email"` | |
| `label` | `string` | Human-readable label |
| `value` | `string` | Raw value from `BusinessProfile` |
| `href` | `string` | Computed: `tel:`, `mailto:`, or `https://wa.me/...` |

## AssistantKnowledgeSource

Not a stored record — a **derivation**: `lib/content/chatbot-knowledge.ts` exports a single `buildSystemPrompt()` function that concatenates `BusinessProfile`, `Service[]`, and `OrganizationReference[]` into the Gemini system prompt, plus fixed instruction text enforcing FR-041–FR-044 (grounded-only, no invention, off-topic refusal, contact-redirect on unknowns). This guarantees the chatbot's knowledge and the page's visible content can never diverge, since both read the same three constants.

## ChatExchange

Client-side-only, in-memory, per browser session (FR-058 — never persisted):

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Local, e.g. `crypto.randomUUID()` |
| `role` | `"user" \| "assistant" \| "system-fallback"` | `"system-fallback"` renders the friendly unavailable message distinctly from a normal assistant reply |
| `text` | `string` | |
| `createdAt` | `number` | `Date.now()` equivalent, client-side only, for list keys/ordering — not a business record |

State machine for the chatbot session (`use-chatbot.ts`): `idle → loading → success (assistant ChatExchange appended) | unavailable (system-fallback ChatExchange appended) | error (client-side network failure, same rendering as unavailable)`.

## IllustrativeVisual

Configuration for each of the small, fixed number of visual slots (FR-059–FR-067) — not user data, a build-time prop:

| Field | Type | Notes |
|---|---|---|
| `subject` | One of the 7 approved subjects from FR-059 (closed union) | Determines which generic caption is used |
| `src` | `string \| undefined` | Path under `public/images/`; `undefined` triggers the non-deceptive fallback treatment (FR-064) |
| `caption` | `string` | Required; drawn only from the approved generic label set (FR-060) — component signature makes this non-optional |
| `decorative` | `boolean` | If `true`, rendered `alt=""`; if `false`, `caption` doubles as the informative `alt` text (FR-066) |

No `location`, `client`, or `employeeName` field exists on this type — structurally prevents FR-061/FR-062 violations at the type level, not just by convention.
