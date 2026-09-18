---
id: 002
title: Add AI chatbot requirement
stage: spec
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.specify (amendment)
labels: [spec, chatbot, ai, mahrukh-fumigation-services]
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

I want to add an AI chatbot to the website specification before we proceed to `/sp.plan`.

Add a floating "Ask Mahrukh AI" chatbot to the single-page website.

Requirements:

* The chatbot should answer visitor questions about Mahrukh Fumigation Services, its services, business information, contact details, experience, and other approved website/company information.
* Its business knowledge must be grounded in the verified information in `company-facts.md` and the approved website specification.
* It MUST NOT invent services, certifications, clients, partnerships, guarantees, technical claims, prices, or other company facts.
* If the requested information is not available in the approved knowledge, the chatbot should clearly say that it does not have that information and provide an appropriate contact option instead.
* It should be able to guide visitors toward the relevant service or contact/quote channel.
* Provide quick questions/suggestions where useful, such as "Our Services", "Request a Quote", "Contact Us", and "About Mahrukh".
* The chatbot UI should be professional, simple, responsive, accessible, and consistent with the website's branding.
* It should not interfere with the main website CTA or content.
* Include appropriate loading, error, unavailable-service, and API failure states.
* Protect API keys; no secret/API key should ever be exposed in client-side code.
* Keep the architecture compatible with the approved Next.js + TypeScript + Tailwind + shadcn/ui stack.
* Do not add unnecessary complexity or a separate chatbot page.

For the initial version, make it a company/business assistant rather than an unrestricted general-purpose chatbot.

Please update the specification, update the quality checklist, and tell me whether adding the chatbot creates any new technical clarification that I need to decide before `/sp.plan`.

Do NOT run `/sp.plan`, `/sp.tasks`, or `/sp.implement` yet.
Do NOT commit or push yet.

## Response snapshot

Amended spec.md: added User Story 5 (P2) for the "Ask Mahrukh AI" chatbot with 6 acceptance scenarios; 6 new edge cases (off-topic questions, pricing requests, AI service failure, JS-disabled degradation, small-viewport behavior); 14 new functional requirements (FR-040–FR-053) covering grounding/knowledge-scope, fallback-to-contact behavior, off-topic refusal, quick-suggestion prompts, branding consistency, non-interference with primary CTA, loading/error/unavailable states, server-side-only API key handling, keyboard/screen-reader accessibility, reduced-motion, mobile usability, and graceful degradation; 2 new key entities (Assistant Knowledge Source, Chat Exchange); 4 new assumptions (ephemeral conversations, basic rate-limiting expected, new AI dependency flagged against the locked stack); 4 new success criteria (SC-009–SC-012). Added Clarification Q3 (AI/LLM provider choice — no default, cost/vendor decision required) alongside the two carried-over open questions from the original spec. Updated the requirements checklist to note all three open clarifications are at the 3-marker limit and flagged the chatbot as introducing an architecturally significant new dependency relative to Constitution Principle XI (recommended for an ADR once the provider is chosen). Not committed/pushed; `/sp.plan` not run.

## Outcome

- ✅ Impact: Chatbot requirement fully integrated into the approved spec structure; one new owner decision surfaced (AI provider) alongside the two already pending.
- 🧪 Tests: none (spec stage)
- 📁 Files: specs/001-company-homepage/spec.md; specs/001-company-homepage/checklists/requirements.md
- 🔁 Next prompts: Owner to answer all three Clarification Questions (quote mechanism, page structure, AI provider), then `/sp.plan`; consider `/sp.adr` for the AI-provider dependency once chosen.
- 🧠 Reflection: Kept the 3-marker clarification limit by giving the two carried-over questions reasonable defaults already and reserving the "no reasonable default" treatment specifically for the provider/cost decision, which genuinely has no safe default to assume.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): Manual checklist review — PASS, with 3 open clarifications explicitly tracked (see checklists/requirements.md).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Once the AI provider is chosen, run `/sp.adr` to document the new external dependency before `/sp.plan` finalizes the technical approach.
