---
id: 001
title: Homepage spec creation
stage: spec
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.specify
labels: [spec, homepage, mahrukh-fumigation-services]
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

/sp.specify Run `/sp.specify` now.

Create the complete specification for the Mahrukh Fumigation Services website based on:

1. The approved Constitution v1.2.0
2. The verified `company-facts.md`
3. The business identity and content rules already established

The specification should define a professional, modern, trustworthy, established, simple, and approachable business website.

Include requirements for:

* Home page
* Header/navbar with the existing company logo
* Hero section
* Hero marquee:
  "MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦"
* Hero trust indicators
* About section
* Services section:
  Fumigation, Disinfestation, Derating, Termite Proofing, Rodent Control, Pest Control
* Commercial & institutional experience
* Organizations/clients served using only verified/conservative wording
* Why Mahrukh section
* Contact / Get a Quote section
* Footer with logo and contact information
* Responsive mobile/desktop behavior
* Accessibility requirements
* SEO requirements
* Performance requirements
* Appropriate subtle animations
* Reduced-motion accessibility behavior

Important content rules:

* Syed Ali Owais must be represented as:
  "Syed Ali Owais"
  "Executive — Mahrukh Fumigation Services"
* Do NOT include a photograph of Syed Ali Owais.
* Do NOT create or suggest an AI-generated/stock substitute photograph.
* Use the existing authentic company logo; do not redesign it.
* Do not invent services, certifications, testimonials, awards, partnerships, guarantees, technical claims, or client relationships.
* Historical evidence must not automatically be presented as current status.
* Do not expose private certificate numbers, NTN/tax information, signatures, or confidential documents.
* Do not use exaggerated claims such as "No. 1", "most trusted", or "industry leader".
* Keep the website simple and purposeful; no unnecessary sections or gimmicky effects.

Do NOT run `/sp.plan`, `/sp.tasks`, or `/sp.implement` yet.

After `/sp.specify` completes, show me:

1. The generated specification
2. Any clarification questions you need from me
3. The files changed
4. Whether anything is still ambiguous or requires my approval

Do not commit or push the specification yet.

## Response snapshot

Created feature branch `001-company-homepage` and `specs/001-company-homepage/spec.md` covering 4 prioritized user stories (quote/contact conversion, service discovery, institutional credibility verification, mobile quick-contact), edge cases (reduced motion, JS-disabled, missing photos, long org lists, screen readers, blocked deep links), 39 functional requirements grouped by section (header, hero incl. marquee/trust indicators, about/executive, services, institutional experience/organizations, why-Mahrukh, contact, footer, responsive/accessibility/SEO/performance), 4 key entities, documented assumptions (single-page structure, contact-links-only quote path, English-only, optional photos/logo-asset-prep), and 8 measurable/technology-agnostic success criteria. Also created the requirements quality checklist. Two open points (quote mechanism, single- vs multi-page structure) were resolved with documented defaults and surfaced as explicit Clarification Questions for owner confirmation rather than blocking. Not committed/pushed; `/sp.plan` not run, per instructions.

## Outcome

- ✅ Impact: Feature spec ready for owner review/approval ahead of `/sp.plan`.
- 🧪 Tests: none (spec stage)
- 📁 Files: specs/001-company-homepage/spec.md; specs/001-company-homepage/checklists/requirements.md
- 🔁 Next prompts: Owner approval of spec + answers to Clarification Questions, then `/sp.plan`.
- 🧠 Reflection: Kept clarifications to 2 (within the 3-marker limit) by defaulting reasonably and documenting in Assumptions, matching the lean-SDD preference already established in this project.

## Evaluation notes (flywheel)

- Failure modes observed: `.specify/scripts/powershell/create-new-feature.ps1` errored on the `history/prompts` directory creation step under Windows PowerShell 5.1 because `Join-Path` in that version only accepts a single `-ChildPath` segment (the script assumes pwsh 7's multi-segment `Join-Path`). Branch and spec.md were already created successfully before the error; the `history/prompts/001-company-homepage/` directory was created manually as a workaround.
- Graders run and results (PASS/FAIL): Manual checklist review — PASS (see checklists/requirements.md).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Consider patching `create-new-feature.ps1` (and likely `setup-plan.ps1`) to use `Join-Path (Join-Path $a $b) $c` or `-AdditionalChildPath` conditionally, for Windows PowerShell 5.1 compatibility.
