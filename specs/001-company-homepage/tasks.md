---

description: "Task list for Mahrukh Fumigation Services — Company Homepage"
---

# Tasks: Mahrukh Fumigation Services — Company Homepage

**Input**: Design documents from `/specs/001-company-homepage/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-api.md, quickstart.md (all present and approved)

**Tests**: Included — plan.md's Technical Context commits to TypeScript strict mode + ESLint, Vitest/React Testing Library for components, and a Playwright smoke suite; kept intentionally light per Constitution Principle XII, not full TDD red-green for every unit.

**Organization**: Tasks are grouped by user story (from spec.md, in priority order: P1, P2, P2, P3, P3) to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US5)
- File paths are relative to the repository root

## Path Conventions

Single Next.js App Router project (per plan.md "Structure Decision"):
- `app/` — pages, layout, the one API route
- `components/` — UI components, grouped by section/feature
- `lib/` — content constants, Gemini client/rate-limiter, utils
- `public/` — logo and illustrative-visual assets
- `tests/` — Vitest unit/component tests; `tests/e2e/` — Playwright smoke tests

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling, per plan.md Technical Context

- [ ] T001 Initialize the Next.js 14 (App Router) + TypeScript project (`package.json`, `tsconfig.json`, `next.config.js`) per plan.md Project Structure
- [ ] T002 [P] Configure Tailwind CSS with brand design tokens (deep purple primary, professional blue secondary, white/light backgrounds, restrained accent) in `app/globals.css` and `tailwind.config.ts` (Constitution Principle IV)
- [ ] T003 [P] Initialize shadcn/ui (`components.json`) and add the `Button` and `Dialog`/`Popover` primitives (research.md §4)
- [ ] T004 [P] Install `lucide-react` and `framer-motion`
- [ ] T005 [P] Install `@google/generative-ai` as a server-only dependency (already approved via ADR-0001)
- [ ] T006 [P] Configure ESLint and TypeScript strict mode (`"strict": true` in `tsconfig.json`)
- [ ] T007 [P] Configure Vitest + React Testing Library (`vitest.config.ts`, `tests/setup.ts`)
- [ ] T008 [P] Configure Playwright (`playwright.config.ts`) for the e2e smoke suite
- [ ] T009 [P] Create `.env.local.example` documenting `GEMINI_API_KEY` and `GEMINI_MODEL` (placeholder values only); confirm `.gitignore` already excludes `.env*` files (no real key ever committed — FR-049)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared content constants, logo asset, header/footer, and the illustrative-visual wrapper that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Create `lib/content/business-profile.ts` — typed `BusinessProfile` constant sourced verbatim from `company-facts.md` (name, `executiveName`, `executiveTitle` = "Executive — Mahrukh Fumigation Services", location, experience, address, phones, fax, mobile, whatsapp, email) — Constitution Principle II, FR-015, data-model.md `BusinessProfile`
- [ ] T011 [P] Create `lib/content/services.ts` — the six approved `Service` entries as a closed union type (fumigation, disinfestation, derating, termite-proofing, rodent-control, pest-control) with conservative descriptions — FR-017–019, data-model.md `Service`
- [ ] T012 [P] Create `lib/content/organizations.ts` — `OrganizationReference` entries with `relationshipLabel: "served"` only, plus the exact NBP historical wording (2012–2013 Category "D"; Jan 2017–Dec 2017 Category "B") and Meezan Bank cafeteria wording from `company-facts.md` — FR-020–025, data-model.md `OrganizationReference`
- [ ] T013 [P] Create `lib/utils.ts` (shadcn `cn()` helper)
- [ ] T014 Create `app/layout.tsx` root layout (fonts, base HTML structure, imports `app/globals.css`)
- [ ] T015 Create `components/illustrative-visual.tsx` wrapper — optional `src`, required `caption` prop typed to the approved generic label set, `decorative: boolean`, brand-colored gradient/icon fallback when `src` is absent, `next/image` with automatic `loading="lazy"` when below the fold — FR-059–067, data-model.md `IllustrativeVisual` (no `location`/`client`/`employeeName` field exists on this type)
- [ ] T016 Prepare the digital logo asset in `public/logo/` by scanning/photographing the physical letterhead and cleaning it up (background removal, straightening, light color correction only — no redesign, no re-drawing) in header-scale and footer-scale sizes; if no source scan is available yet, render a clearly-labeled placeholder box instead of a fabricated logo — Constitution Principles IV/XIII
- [ ] T017 Create `components/site-header.tsx` — logo (from T016, linked to Home), nav, accessible mobile menu — FR-001–004, FR-013
- [ ] T018 Create `components/site-footer.tsx` — smaller logo (from T016), business name, contact info from `business-profile.ts` — FR-029–030

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Prospective Customer Evaluates Credibility and Requests a Quote (Priority: P1) 🎯 MVP

**Goal**: A visitor can identify the business, the Executive, and core credibility signals, and successfully make contact — the site's core conversion path

**Independent Test**: Load the homepage on desktop and mobile; confirm business name, Executive designation, and primary CTA are visible without scrolling; successfully initiate contact via phone/WhatsApp/email

- [ ] T019 [US1] Create `components/hero/hero.tsx` — business name, Executive designation (from `business-profile.ts`), primary "Get a Quote"/"Contact Us" CTA, optional `IllustrativeVisual` slot — FR-005/006/010–013
- [ ] T020 [US1] Create `components/hero/hero-marquee.tsx` — repeating marquee text "MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦", slow/smooth CSS animation, `prefers-reduced-motion` media query pauses/removes it — FR-007–009, Constitution Principle XIV
- [ ] T021 [P] [US1] Create `components/about-executive.tsx` — About text + Executive block using the exact designation "Syed Ali Owais" / "Executive — Mahrukh Fumigation Services"; no photo, no biography, no invented qualifications — FR-014–016
- [ ] T022 [P] [US1] Create `components/contact-section.tsx` — address/phones/fax/mobile/WhatsApp/email from `business-profile.ts` with `tel:`, `mailto:`, and `wa.me` links — FR-027–028
- [ ] T023 [US1] Compose `app/page.tsx`: `SiteHeader`, `Hero`, `AboutExecutive`, `ContactSection`, `SiteFooter`, with anchor ids for in-page navigation (depends on T017, T018, T019, T020, T021, T022)
- [ ] T024 [US1] Wire header/footer nav links to the in-page anchor sections — FR-003 (depends on T023)
- [ ] T025 [P] [US1] Component test: Hero renders business name, Executive designation, and CTA; no image/photo element exists anywhere for Syed Ali Owais — `tests/hero.test.tsx`
- [ ] T026 [P] [US1] Component test: `HeroMarquee` pauses/removes its animation when `prefers-reduced-motion` is set (mock `matchMedia`) — `tests/hero-marquee.test.tsx`
- [ ] T027 [P] [US1] Component test: `AboutExecutive` renders the exact designation string, never "Proprietor," with no biography/qualifications text — `tests/about-executive.test.tsx`
- [ ] T028 [P] [US1] Component test: `ContactSection` link hrefs (`tel:`, `mailto:`, `wa.me`) match `business-profile.ts` values exactly — `tests/contact-section.test.tsx`
- [ ] T029 [US1] Playwright smoke test: load homepage on desktop and mobile viewports, assert business name/Executive designation/CTA visible without scrolling, and contact links are present and correct — `tests/e2e/us1-quote-path.spec.ts` (depends on T023, T024)

**Checkpoint**: User Story 1 (MVP) is fully functional and independently testable

---

## Phase 4: User Story 2 - Visitor Learns About Services Offered (Priority: P2)

**Goal**: A visitor can confirm the business offers the specific service they need, with no unverified claims

**Independent Test**: View the Services section; confirm all six verified services are listed with conservative descriptions and no invented technical/safety claims

- [ ] T030 [US2] Create `components/services/service-card.tsx` — renders one `Service` (name + conservative description)
- [ ] T031 [US2] Create `components/services/services-section.tsx` — maps over the six services from `lib/content/services.ts` — FR-017–019 (depends on T011, T030)
- [ ] T032 [US2] Add `ServicesSection` to `app/page.tsx` composition and nav — FR-003 (depends on T023, T031)
- [ ] T033 [P] [US2] Component test: exactly six services render, names/descriptions match `services.ts`, no extra or invented services — `tests/services-section.test.tsx`

**Checkpoint**: User Stories 1 AND 2 both work independently

---

## Phase 5: User Story 5 - Visitor Gets Quick Answers via the "Ask Mahrukh AI" Chatbot (Priority: P2)

**Goal**: A visitor can get grounded answers to business questions from a floating chatbot, with graceful behavior on any failure and no leaked provider details

**Independent Test**: Open the chatbot, ask an in-scope question (grounded answer expected) and an out-of-scope/pricing question (decline + contact redirect expected); confirm the widget never overlaps the primary CTA

- [ ] T034 [US5] Create `lib/content/chatbot-knowledge.ts` — `buildSystemPrompt()` combining `business-profile.ts`, `services.ts`, `organizations.ts` plus explicit no-invention / off-topic-refusal / contact-redirect-on-unknown instructions — FR-041–044, data-model.md `AssistantKnowledgeSource` (depends on T010, T011, T012)
- [ ] T035 [US5] Create `lib/gemini/client.ts` — server-only Gemini client reading `GEMINI_API_KEY`/`GEMINI_MODEL` from environment variables; never imported by a `"use client"` file — FR-049/054 (depends on T005)
- [ ] T036 [US5] Create `lib/gemini/rate-limit.ts` — in-memory per-IP/session limiter sized conservatively against the free-tier quota — research.md §2
- [ ] T037 [US5] Implement `app/api/chat/route.ts` — validate and length-cap `message`, apply the rate limiter, build the system prompt via `chatbot-knowledge.ts`, call Gemini via `client.ts`; map **every** failure mode (quota exceeded, timeout, provider 5xx, malformed response, rate-limiter rejection, unexpected exception) to the identical `{status:"unavailable", reply:"I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email."}` at HTTP 200, logging the real error server-side only; return `{status:"ok", reply}` on success — FR-041–044/054–058, contracts/chat-api.md (depends on T034, T035, T036)
- [ ] T038 [P] [US5] Create `components/chatbot/chatbot-message.tsx` — user/assistant/system-fallback bubble styles
- [ ] T039 [US5] Create `components/chatbot/use-chatbot.ts` — client hook implementing the `idle → loading → (success | unavailable | error)` state machine, calling `/api/chat`, keeping `ChatExchange` history in React state only (never persisted), respecting `prefers-reduced-motion` for transitions — FR-048/050/051/058 (depends on T037)
- [ ] T040 [US5] Create `components/chatbot/chatbot-panel.tsx` — message list, required quick-suggestion chips ("Our Services," "Request a Quote," "Contact Us," "About Mahrukh"), input box — FR-045 (depends on T038, T039)
- [ ] T041 [US5] Create `components/chatbot/chatbot-widget.tsx` — floating trigger using the shadcn `Dialog`/`Popover` primitive (research.md §4), positioned to never overlap the primary Hero CTA or section content, fully keyboard-operable — FR-040/047/050/052 (depends on T040)
- [ ] T042 [US5] Mount `ChatbotWidget` in `app/page.tsx` (depends on T023, T041)
- [ ] T043 [P] [US5] Unit test: `rate-limit.ts` rejects requests after the configured threshold — `tests/rate-limit.test.ts`
- [ ] T044 [P] [US5] Unit test: `app/api/chat/route.ts` — mock the Gemini client to simulate success, quota-exceeded, timeout, malformed response, and rate-limiter rejection; assert every non-success case returns the identical fallback shape with zero leaked status codes, provider error text, or stack traces — `tests/api-chat.test.ts` (directly verifies FR-056/057)
- [ ] T045 [P] [US5] Component test: `ChatbotPanel` quick-suggestion chips are present and clickable; a mocked off-topic/pricing response renders the decline-and-contact-redirect copy — `tests/chatbot-panel.test.tsx`
- [ ] T046 [P] [US5] Static-analysis test: `lib/gemini/client.ts` (and any `GEMINI_API_KEY` reference) is never imported, directly or transitively, by a `"use client"` file — `tests/no-client-side-gemini.test.ts` (directly verifies FR-049)
- [ ] T047 [US5] Playwright smoke test: open the chatbot, ask a grounded in-scope question and an out-of-scope/pricing question (API stubbed), verify the widget never overlaps the primary CTA, and verify `prefers-reduced-motion` disables its transitions — `tests/e2e/us5-chatbot.spec.ts` (depends on T042)

**Checkpoint**: User Stories 1, 2, and 5 all work independently

---

## Phase 6: User Story 3 - Visitor Verifies Business Legitimacy via Institutional Experience (Priority: P3)

**Goal**: A commercial/institutional prospect can see evidence-based, conservatively-worded experience without any elevated relationship claims

**Independent Test**: View the "Commercial & Institutional Experience" and "Organizations Served" content; confirm all wording matches `company-facts.md` with no elevated relationship claims and no confidential document details

- [ ] T048 [US3] Create `components/institutional-experience.tsx` — commercial/institutional summary + organizations list from `organizations.ts`, neutral "served" wording, NBP/Meezan historical text — FR-020–025 (depends on T012)
- [ ] T049 [P] [US3] Create `components/why-mahrukh.tsx` — differentiators summary (25+ years experience, institutional experience, Karachi-based service) from `business-profile.ts` — FR-026 (depends on T010)
- [ ] T050 [US3] Add `InstitutionalExperience` and `WhyMahrukh` to `app/page.tsx` composition and nav (depends on T023, T048, T049)
- [ ] T051 [P] [US3] Component test: no organization is rendered with "partner," "approved vendor," "government partner," or similar wording; NBP/Meezan text matches `company-facts.md` exactly — `tests/institutional-experience.test.tsx`
- [ ] T052 [P] [US3] Page-level test: no certificate images, certificate/reference numbers, NTN numbers, or signatures appear anywhere in the rendered page — `tests/no-confidential-details.test.tsx`

**Checkpoint**: User Stories 1, 2, 5, and 3 all work independently

---

## Phase 7: User Story 4 - Mobile Visitor Quickly Finds Contact Options (Priority: P3)

**Goal**: A mobile visitor can reach a call/WhatsApp action within two taps without reading the full page

**Independent Test**: Load the homepage on a mobile viewport; confirm a contact affordance is reachable within two taps from page load

- [ ] T053 [US4] Enhance `components/site-header.tsx`/`components/hero/hero.tsx` with an early-positioned mobile call/WhatsApp affordance reachable within two taps (depends on T017, T019, T022)
- [ ] T054 [P] [US4] Playwright mobile-viewport smoke test: call/WhatsApp action reachable within two taps without a full-page scroll — `tests/e2e/us4-mobile-contact.spec.ts`

**Checkpoint**: All 5 user stories are independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Illustrative-visual content, accessibility/SEO/performance hardening, final validation, and deployment

- [ ] T055 [P] Add page metadata (title/description) via the App Router `metadata` export, sourced only from `business-profile.ts` — FR-035
- [ ] T056 [P] Accessibility pass: semantic landmarks (`header`/`nav`/`main`/`section`/`footer`) across all components, single `h1` with a logical, ordered subheading structure, color contrast checked against the brand palette — FR-033/036
- [ ] T057 [P] Keyboard-navigation automated test: tab through the entire page; every interactive element must be reachable and operable without a mouse — FR-032, SC-008 — `tests/e2e/keyboard-nav.spec.ts`
- [ ] T058 [P] Wire an optional `IllustrativeVisual` into the Hero (subject from the approved FR-059 list, caption from the approved generic label set) — FR-012 (depends on T015, T019)
- [ ] T059 [P] Wire an optional `IllustrativeVisual` into Why-Mahrukh or Institutional Experience — FR-059 (depends on T015, T048/T049)
- [ ] T060 [P] Source/prepare the approved illustrative visuals (per the FR-059 subject list) as optimized WebP/AVIF files in `public/images/` — content task, non-blocking since T015's fallback already covers their absence — FR-059–067
- [ ] T061 [P] Component test: `IllustrativeVisual` — `decorative=true` renders `alt=""`; `decorative=false` uses `caption` as the informative `alt` text; a missing `src` renders the fallback treatment, never a broken image — `tests/illustrative-visual.test.tsx`
- [ ] T062 [P] Verify `next/image` usage and `loading="lazy"` for every below-the-fold image, with no unnecessary layout shift — FR-037/066
- [ ] T063 [P] Global `prefers-reduced-motion` audit across the marquee, chatbot transitions, and any other animation — FR-039/051, SC-006
- [ ] T064 Run full validation: `npm run lint && npm run typecheck && npm run test && npm run test:e2e`; fix any failures
- [ ] T065 Run a Lighthouse pass (Performance/Accessibility/SEO/Best Practices) against plan.md's ≥90 working target and address clear regressions
- [ ] T066 Configure the Vercel project's `GEMINI_API_KEY` and `GEMINI_MODEL` environment variables for Production/Preview — quickstart.md
- [ ] T067 Deploy to Vercel and execute the quickstart.md manual acceptance pass (all 5 user stories plus SC-001–SC-014) against the live deployment (depends on T064, T066)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3–7)**: All depend on Foundational completion; stories may then proceed in parallel (if staffed) or sequentially in the priority order shown (P1 → P2 → P2 → P3 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories — this is the MVP
- **US2 (P2)**: No dependency on other stories; independently addable after Foundational
- **US5 (P2)**: No dependency on other stories; independently addable after Foundational (its content dependency is on the Foundational `lib/content/*` modules, not on US1/US2/US3/US4 components)
- **US3 (P3)**: No dependency on other stories
- **US4 (P3)**: Builds on US1's header/hero/contact components (T017, T019, T022) for the mobile affordance — the only cross-story dependency, and it's additive/enhancing, not blocking US1's own independent testability

### Within Each User Story

- Content/lib tasks before component tasks
- Components before page composition
- Page composition before nav wiring
- Implementation before its tests
- Story complete before moving to the next priority tier (if working sequentially)

### Parallel Opportunities

- All Setup tasks marked [P] (T002–T009) can run in parallel after T001
- Foundational tasks T011, T012, T013 can run in parallel (after T010 establishes the content-module pattern); T015 and T016 are independent of each other and of T011–T013
- Once Foundational completes, US1, US2, US5, and US3 can all start in parallel (different files, no cross-dependencies) if staffed; US4 should follow US1 given its enhancement dependency
- All test tasks marked [P] within a story can run in parallel with each other once their implementation tasks are done
- Phase 8's illustrative-visual, accessibility, and performance tasks (T055–T063) are largely independent and parallelizable

---

## Parallel Example: Foundational Phase

```bash
# After T010 (business-profile.ts) establishes the pattern, run together:
Task: "Create lib/content/services.ts with the six approved services"
Task: "Create lib/content/organizations.ts with organization references"
Task: "Create lib/utils.ts (cn helper)"

# Independently, in parallel with the above:
Task: "Create components/illustrative-visual.tsx wrapper"
Task: "Prepare the digital logo asset in public/logo/"
```

## Parallel Example: User Story 5 tests

```bash
# Once T037 (api/chat/route.ts) and T040 (chatbot-panel.tsx) are done, run together:
Task: "Unit test rate-limit.ts threshold rejection in tests/rate-limit.test.ts"
Task: "Unit test api/chat/route.ts failure-mode uniformity in tests/api-chat.test.ts"
Task: "Component test ChatbotPanel quick-suggestions and off-topic decline in tests/chatbot-panel.test.tsx"
Task: "Static-analysis test: no client-side Gemini import in tests/no-client-side-gemini.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run T029's Playwright smoke test and the quickstart.md manual pass for US1 independently
5. Deploy/demo if ready — the site already has business identity, credibility signals, and a working contact path

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → validate independently → deploy/demo (MVP)
3. Add US2 (Services) → validate → deploy/demo
4. Add US5 (Chatbot) → validate → deploy/demo (introduces the Gemini dependency; confirm env vars are set per T066 before enabling in production)
5. Add US3 (Institutional Experience/Why Mahrukh) → validate → deploy/demo
6. Add US4 (Mobile quick-contact enhancement) → validate → deploy/demo
7. Phase 8 Polish → final validation → production deploy

### Parallel Team Strategy

With multiple developers, after Foundational is done:
- Developer A: US1 (MVP path)
- Developer B: US2 (Services) and US3 (Institutional Experience/Why Mahrukh) — both are simple content-rendering stories
- Developer C: US5 (Chatbot) — the most self-contained, backend-heavy story
- US4 is a small follow-on to US1, best picked up once US1 lands

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Every FR (FR-001–FR-067) is covered by at least one task above; the Constitution's hard rules (no Ali Owais photograph/AI-substitute, authentic-logo-only, illustrative-visual safeguards, Gemini server-side-only/no-database/business-scoped-grounding) are each enforced by both an implementation task and a corresponding test task, not by convention alone
- Commit after each task or logical group; stop at any checkpoint to validate a story independently
- No business facts, clients, certifications, partnerships, technical claims, or guarantees are introduced by any task — all content tasks read from `company-facts.md` via the Foundational `lib/content/*` modules only
