---
id: 004
title: ADR add gemini chatbot
stage: misc
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.adr add-gemini-chatbot
labels: [adr, chatbot, gemini, mahrukh-fumigation-services]
links:
  spec: specs/001-company-homepage/spec.md
  ticket: null
  adr: history/adr/0001-add-gemini-chatbot.md
  pr: null
files:
 - history/adr/0001-add-gemini-chatbot.md
tests:
 - none (documentation stage; no tests applicable)
---

## Prompt

Create an ADR for the already-confirmed Gemini chatbot provider decision.

Run:
`/sp.adr add-gemini-chatbot`

The decision is already confirmed in the specification:

* Chatbot provider: Google Gemini API
* Use a free-tier-eligible Gemini model for v1
* No paid billing requirement for v1
* API key must remain server-side only
* No database or permanent chat history
* Chat conversations are ephemeral
* Gemini quota/rate-limit/provider failures must show the approved friendly fallback message
* Raw 429 errors, stack traces, provider errors, or technical details must never be exposed to visitors

Important:

* This is documentation of an already-approved decision, not a request to reconsider the provider.
* Do not change the chosen provider.
* Do not run `/sp.plan`, `/sp.tasks`, or `/sp.implement`.
* Do not commit or push anything.

After creating the ADR, report:

1. ADR file path
2. ADR title/decision
3. Any files changed
4. Whether the specification itself was changed
5. Confirm that nothing was committed or pushed

## Response snapshot

Created `history/adr/0001-add-gemini-chatbot.md` documenting the already-approved decision cluster: Google Gemini API (free-tier model, no paid billing for v1) as the chatbot provider, bundled with its operating constraints (server-side-only key handling via env vars/deployment secrets, no database/ephemeral conversations, business-scoped knowledge grounding, and mandatory friendly-fallback behavior with zero raw provider error exposure on quota/rate-limit/failure). Status set to Accepted (decision was already made, not proposed). Noted one deliberate deviation from the standard `/sp.adr` flow: the command's default workflow reads decisions from `plan.md`, which doesn't exist yet since `/sp.plan` hasn't run; per explicit user instruction, the ADR instead sources the decision directly from the approved spec's Clarifications Q3, and the References section notes the plan as "not yet created." Listed alternatives considered (Claude API, OpenAI API, rule-based/no-AI fallback) with rejection rationale, and both positive/negative consequences. spec.md itself was not modified — this stage only added the ADR file. Nothing committed or pushed.

## Outcome

- ✅ Impact: The Gemini chatbot provider decision now has a permanent, reviewable ADR record ahead of `/sp.plan`.
- 🧪 Tests: none (documentation stage)
- 📁 Files: history/adr/0001-add-gemini-chatbot.md (new)
- 🔁 Next prompts: Owner review of the ADR; then proceed to `/sp.plan` when ready.
- 🧠 Reflection: Deviated intentionally from the command's plan.md-dependent workflow since no plan exists yet — flagged this transparently rather than silently reinterpreting the command or blocking on "run /sp.plan first."

## Evaluation notes (flywheel)

- Failure modes observed: `.specify/scripts/powershell/` has no `create-adr` script (only a `create-adr.sh` is referenced by the command doc, and this project was initialized with `--script ps`), so the ADR file and `history/adr/` directory were created manually rather than via script.
- Graders run and results (PASS/FAIL): Manual significance-test review — PASS (impacts architecture/security via new external dependency and secret handling; alternatives considered with tradeoffs; cross-cutting rather than an isolated detail).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Consider adding a `create-adr.ps1` counterpart to `.specify/scripts/powershell/` for parity with the bash version referenced in `sp.adr.md`.
