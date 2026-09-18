---
id: 003
title: Resolve clarification Q3 Gemini provider
stage: spec
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.specify (amendment)
labels: [spec, chatbot, gemini, clarification, mahrukh-fumigation-services]
links:
  spec: specs/001-company-homepage/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-company-homepage/spec.md
 - specs/001-company-homepage/checklists/requirements.md
tests:
 - none (spec stage; no tests applicable)
---

## Prompt

I have decided on Clarification Q3.

AI provider:

* Use the Google Gemini API.
* Start with an eligible Gemini model available on the current free tier.
* The initial chatbot should be designed to operate within the free-tier limits.
* Do NOT add paid billing as a requirement for the initial version.

Free-quota / rate-limit behavior is an explicit requirement:

If the Gemini API reaches its free quota, rate limit, becomes temporarily unavailable, or otherwise fails, the website MUST NOT expose raw API errors such as "429", stack traces, provider errors, or technical details to visitors.

Instead, the chatbot should show a friendly fallback message such as:

"I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email."

The visitor must still be able to use the normal website contact options.

Additional requirements:

* Keep the Gemini API key server-side only.
* Never expose the API key in client-side JavaScript, browser requests, GitHub, or public source code.
* Store the API key through environment variables / deployment secrets.
* Handle rate limiting, timeout, provider errors, and unavailable-service states gracefully.
* The chatbot must never block or replace the primary Contact / Get a Quote CTA.
* Keep chatbot conversations ephemeral; do not create a database or permanent chat-history system.
* Keep the implementation simple and compatible with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide, Framer Motion, and Vercel.
* The chatbot remains a Mahrukh-specific business assistant, not an unrestricted general-purpose chatbot.

Please now update the specification and resolve Clarification Q3 accordingly.

Then:

1. Run the specification quality checks.
2. Confirm all three clarification questions are resolved.
3. Show me the final clarification/assumption changes.
4. Confirm whether the specification is ready for `/sp.plan`.

Do NOT run `/sp.plan`, `/sp.tasks`, or `/sp.implement` yet.
Do NOT commit or push yet.

## Response snapshot

Resolved Q3 in spec.md: added FR-054–FR-058 (Gemini free-tier model requirement, no paid billing, no raw provider error exposure, friendly fallback message, ephemeral conversations/no database) and expanded FR-049 to require server-side-only key storage via environment variables/deployment secrets with no exposure in client code, browser requests, GitHub, or public source. Updated the AI-service-failure edge case to name Gemini and the exact fallback message pattern. Added SC-013 (100% of tested quota/rate-limit/failure cases show the friendly fallback with zero raw provider errors). Replaced the open "Clarification Questions" section with a resolved "Clarifications" log (session 2026-09-16) documenting all three decisions, and updated the Assumptions bullets for Q1/Q2 to mark them confirmed rather than pending. Re-ran the quality checklist: all items pass, Content Quality note added justifying the one named vendor (Gemini) as an explicit owner cost/business decision rather than an engineering implementation detail. Checklist marked "READY for /sp.plan." Flagged that documenting the new Gemini dependency via `/sp.adr` before/during `/sp.plan` is recommended given Constitution Principle XI. Not committed/pushed; `/sp.plan` not run.

## Outcome

- ✅ Impact: All three specification clarifications resolved; spec.md and its quality checklist both explicitly marked ready for `/sp.plan`.
- 🧪 Tests: none (spec stage)
- 📁 Files: specs/001-company-homepage/spec.md; specs/001-company-homepage/checklists/requirements.md
- 🔁 Next prompts: Owner sign-off to proceed to `/sp.plan`; optionally `/sp.adr add-gemini-chatbot` first to document the new dependency.
- 🧠 Reflection: Kept the resolution additive (new FR-054–058 rather than renumbering existing FRs) to minimize churn and preserve traceability back to the original FR set.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): Manual checklist review — PASS, zero open clarifications remain.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none pending; ready to proceed to `/sp.plan` on owner's go-ahead.
