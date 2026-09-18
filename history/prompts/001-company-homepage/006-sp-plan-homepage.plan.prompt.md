---
id: 006
title: sp plan homepage
stage: plan
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.plan
labels: [plan, architecture, gemini, chatbot, mahrukh-fumigation-services]
links:
  spec: specs/001-company-homepage/spec.md
  ticket: null
  adr: history/adr/0001-add-gemini-chatbot.md
  pr: null
files:
 - specs/001-company-homepage/plan.md
 - specs/001-company-homepage/research.md
 - specs/001-company-homepage/data-model.md
 - specs/001-company-homepage/contracts/chat-api.md
 - specs/001-company-homepage/quickstart.md
tests:
 - none (plan stage; no tests written yet)
---

## Prompt

Now run `/sp.plan` for the `001-company-homepage` feature.

Before planning, read the complete current: spec.md, checklists/requirements.md, CLAUDE.md, company-facts.md, ADR-0001, and the Constitution. Use these as source of truth.

[Full requirement list covering: single-page site with anchor sections; authentic logo not redesigned; Syed Ali Owais as Executive text-only, no photo; six approved services; conservative organization wording; direct contact only, no form; Gemini free-tier chatbot with server-side key, business-scoped grounding, ephemeral conversations, friendly fallback on failure, no raw provider errors; few illustrative visuals per FR-059–FR-067, never presented as real Mahrukh staff/work/clients/branches, image acquisition non-blocking; accessibility/responsive/reduced-motion/performance/SEO; graceful degradation without JS/chatbot/images; locked stack Next.js/TypeScript/Tailwind/shadcn-ui/Lucide/Framer Motion/Vercel.]

Planning requirements: keep architecture simple; no unnecessary dependencies; plan Gemini server-side integration and env var handling; include chatbot loading/error/quota/unavailable/fallback states; include chatbot grounding approach; include illustrative-visual strategy without requiring image acquisition first; include logo asset handling; include responsive/accessibility/reduced-motion/performance/SEO details; include validation/testing approach; do not invent business information.

Do NOT run `/sp.tasks` or `/sp.implement` yet. Do NOT commit or push anything.

## Response snapshot

Ran `.specify/scripts/powershell/setup-plan.ps1 -Json` to scaffold `plan.md`, then read spec.md, checklists/requirements.md, CLAUDE.md, company-facts.md, ADR-0001, and constitution.md v1.2.0 in full before drafting. Produced `plan.md` with: Technical Context (TypeScript/Next.js 14 App Router, `@google/generative-ai` as the one new dependency already approved via ADR-0001, no storage/database, light Vitest+Playwright testing approach, single-project structure); a full Constitution Check table mapping all 14 principles + Source of Truth to a concrete compliance mechanism (PASS, no violations, no Complexity Tracking entries needed); a concrete `app/`/`components/`/`lib/`/`public/` file layout with one Route Handler (`app/api/chat/route.ts`) as the only backend surface; a dedicated "Logo Asset Handling" section (scan+cleanup only, placeholder-not-blocker if unavailable); an "Illustrative Visual Strategy" section (shared wrapper component enforcing caption/alt rules and a non-blocking gradient/icon fallback, with no `location`/`client` prop existing at the type level); and a "Gemini Chatbot Integration" section detailing server-only key handling, request flow, uniform failure-mapping to the approved fallback message with HTTP 200 (deliberately not surfacing provider status codes), client state machine, and prompt-based off-topic/grounding enforcement. Also wrote `research.md` (4 resolved unknowns: Gemini model/SDK choice, free-tier rate-limit sizing, static-export-vs-API-route compatibility, accessible widget via existing shadcn primitives), `data-model.md` (7 entities/types matching the spec's Key Entities, with TypeScript unions used to structurally prevent FR-019/FR-022/FR-061/FR-062 violations), `contracts/chat-api.md` (the one `POST /api/chat` contract, detailing the uniform-fallback response shape), and `quickstart.md` (env vars, local dev, fallback-testing procedure without burning quota, manual acceptance pass mapped to the 5 user stories). Ran `update-agent-context.ps1 -AgentType claude` per the command's Phase 1 step; it reported success but only inserted a stray UTF-8 BOM into `CLAUDE.md` (a no-op for actual content, since our generated `CLAUDE.md` doesn't contain the `## Active Technologies`/`## Recent Changes` headers the script looks for) — reverted that change via `git checkout -- CLAUDE.md` since it added no value. Re-checked the Constitution Check gate post-design: still PASS, unchanged. Not committed/pushed; `/sp.tasks` and `/sp.implement` not run.

## Outcome

- ✅ Impact: Feature has a complete, constitution-compliant implementation plan ready for `/sp.tasks`.
- 🧪 Tests: none (plan stage) — testing *approach* documented in plan.md/quickstart.md for the implementation stage
- 📁 Files: specs/001-company-homepage/plan.md; research.md; data-model.md; contracts/chat-api.md; quickstart.md (all new)
- 🔁 Next prompts: Owner review of the plan, then `/sp.tasks` to break it into implementable tasks.
- 🧠 Reflection: The `update-agent-context.ps1` script is a no-op against this project's actual `CLAUDE.md` structure (generated by SpecifyPlus's `init`, not the plain `agent-file-template.md` this script expects) — worth flagging to the user rather than silently leaving a meaningless BOM diff in a tracked file.

## Evaluation notes (flywheel)

- Failure modes observed: `update-agent-context.ps1` reported "success" while making no substantive change (only a BOM byte) — a silent-no-op failure mode worth knowing about before relying on it for future plans.
- Graders run and results (PASS/FAIL): Manual Constitution Check review — PASS across all 14 principles and the Source of Truth section, both pre- and post-design.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): If agent-context auto-sync is wanted going forward, either restructure CLAUDE.md to include `## Active Technologies`/`## Recent Changes` headers matching `agent-file-template.md`, or accept manual updates to CLAUDE.md per feature instead.
