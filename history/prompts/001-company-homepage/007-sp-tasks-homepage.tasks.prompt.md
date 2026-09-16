---
id: 007
title: sp tasks homepage
stage: tasks
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.tasks
labels: [tasks, implementation-plan, gemini, chatbot, mahrukh-fumigation-services]
links:
  spec: specs/001-company-homepage/spec.md
  ticket: null
  adr: history/adr/0001-add-gemini-chatbot.md
  pr: null
files:
 - specs/001-company-homepage/tasks.md
tests:
 - none (tasks stage; test tasks are planned within tasks.md, not executed yet)
---

## Prompt

Run `/sp.tasks` for the Mahrukh Fumigation Services homepage feature.

Use the approved and committed: spec.md, plan.md, research.md, data-model.md, contracts/chat-api.md, quickstart.md, Constitution, company-facts.md.

Requirements: generate the complete implementation task list, dependency-aware and ordered; include single-page site, responsive UI, authentic logo handling, approved illustrative visuals, content/data constants, Gemini server-side chatbot, API route, rate limiting, accessibility, reduced motion, testing, and deployment; preserve FR-001–FR-067; preserve the Ali Owais no-photo rule; preserve the authentic-logo rule; preserve illustrative-visual safeguards FR-059–067; preserve Gemini safeguards (server-side key, business-scoped grounding, no database, graceful unavailable response, no client-side Gemini access); do not invent business facts; keep the existing approved stack.

Run `/sp.tasks` only — do NOT run `/sp.implement`, do NOT modify spec/plan, do NOT commit/push, do NOT create/merge a PR.

## Response snapshot

Ran `.specify/scripts/powershell/check-prerequisites.ps1 -Json`, confirming research.md/data-model.md/contracts/quickstart.md are all available. Generated `specs/001-company-homepage/tasks.md` with 67 tasks across 8 phases: Setup (T001-T009: Next.js/Tailwind/shadcn/lucide/framer-motion/@google-generative-ai/ESLint/Vitest/Playwright/env-var-example scaffolding), Foundational (T010-T018: business-profile/services/organizations content constants from company-facts.md, utils, layout, the illustrative-visual wrapper with no location/client field, logo asset preparation, header/footer shells — blocking prerequisite for all stories), then one phase per user story in spec.md priority order: US1/P1 MVP (T019-T029: hero, marquee, about-executive, contact-section, page composition, nav wiring, 5 tests including a no-photo assertion), US2/P2 (T030-T033: services section, 6-services test), US5/P2 chatbot (T034-T047: chatbot-knowledge grounding module, server-only Gemini client, rate limiter, the /api/chat route with uniform failure-mapping, chatbot UI components, and 5 tests including a dedicated static-analysis test asserting the Gemini client is never imported by a "use client" file), US3/P3 (T048-T052: institutional experience + why-mahrukh, neutral-wording test, no-confidential-details test), US4/P3 (T053-T054: mobile quick-contact enhancement building on US1's header/hero/contact, mobile Playwright test), and Polish (T055-T067: metadata/SEO, accessibility/keyboard-nav, illustrative-visual wiring and content sourcing as a non-blocking task, reduced-motion audit, full validation run, Vercel env var config, and deployment). Every task cites the specific FR(s)/Constitution principle(s)/data-model or contract section it implements. Dependencies & Execution Order, two Parallel Examples, and an Implementation Strategy (MVP-first, incremental delivery, parallel-team split) sections included per the tasks-template.md structure. Confirmed via `git status` that only tasks.md was added — spec.md and plan.md were not modified. No [NEEDS CLARIFICATION] markers were needed; all inputs were already fully resolved. Not committed/pushed; `/sp.implement` not run; no PR created.

## Outcome

- ✅ Impact: Feature has a complete, dependency-ordered, FR-traceable task list ready for `/sp.implement`.
- 🧪 Tests: none run (tasks stage) — 17 test tasks are planned within tasks.md itself, to be executed during implementation
- 📁 Files: specs/001-company-homepage/tasks.md (new)
- 🔁 Next prompts: Owner review of tasks.md, then `/sp.implement` (likely starting with the MVP: Setup → Foundational → US1).
- 🧠 Reflection: Assigned About/Executive (FR-014–016) to US1 (core identity/credibility) and Why-Mahrukh (FR-026) to US3 (evidence-based differentiators) since neither FR block maps to a single spec user story explicitly — documented the reasoning in tasks.md's Dependencies section rather than leaving it implicit.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): Manual FR-coverage review — PASS, every FR-001–FR-067 traced to at least one task; manual Constitution hard-rule review — PASS (no-photo, authentic-logo, illustrative-visual safeguards, and all Gemini safeguards each have both an implementation task and a dedicated test task).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none pending; ready for `/sp.implement` on owner's go-ahead.
