---
id: 005
title: Add illustrative visuals requirement
stage: spec
date: 2026-09-16
surface: agent
model: claude-sonnet-5
feature: 001-company-homepage
branch: 001-company-homepage
user: tayyabaaliowais@gmail.com
command: /sp.specify (amendment)
labels: [spec, visuals, ai-imagery, mahrukh-fumigation-services]
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

Update the existing specification for `001-company-homepage` to add a concise **AI / Illustrative Visuals** requirement.

[Full requirement list: few professional visuals only; approved subjects (commercial fumigation, professional pest-control treatment, rodent-control service, fumigation equipment, technician performing treatment, warehouse/industrial pest-control environment, institutional/commercial pest-control environment); AI-generated scenes never presented as actual Mahrukh photographs/staff/clients/branches/equipment/work; no implied AI employees; no labeling as specific real client/location (NBP branch, Meezan Bank site, school, warehouse); generic labels instead ("Professional Commercial Fumigation," "Pest Control Treatment," "Industrial Pest Management"); realistic/professional/clean tone, avoiding cartoonish/childish/exaggerated/disturbing/overly pest-focused imagery; only a few visuals; logo never recreated/replaced; genuine photos later treated as real assets and distinguished from illustrative imagery; visuals never used as evidence for client relationships/certifications/experience/awards/partnerships/completed projects; no suitable visual available must not block implementation (fallback to layout/brand colors/gradients/icons); accessibility (meaningful alt text for informative images, empty alt for decorative), responsive/optimized formats (WebP/AVIF), lazy-loading below the fold, no unnecessary large files/layout shift, no watermarked/unlicensed images; do not redesign/modify the existing logo.]

Update the relevant functional requirements, non-functional requirements, assumptions, edge cases, and/or checklist items only where necessary. Keep the specification concise and avoid duplicating the same requirement unnecessarily.

Do NOT run `/sp.plan`, `/sp.tasks`, or `/sp.implement` yet.
Do NOT commit or push anything.

After the update, report:

1. Exact files changed
2. New/updated requirement IDs
3. Checklist status
4. Confirmation that all previous Gemini/chatbot requirements remain unchanged
5. Confirmation that nothing was committed or pushed

## Response snapshot

Added a second "Amendment" line to spec.md's header. Added 3 new edge cases (no-suitable-visual fallback, AI scene mistakable for a real client/location, genuine photos arriving later must be distinguished). Added a new "Illustrative Visuals" functional requirement block, FR-059–FR-067, covering: few-visuals-only + approved subject list (FR-059); never presented as real/generic labeling (FR-060); no implied employees/no specific client-location labeling (FR-061); not usable as evidence for claims (FR-062); realistic/professional tone constraints (FR-063); no-visual-available fallback, non-blocking (FR-064); genuine photos later distinguished from illustrative ones (FR-065); accessibility/performance rules by cross-reference to existing FR-034/FR-037 rather than duplicating them (FR-066); logo protection cross-referencing Constitution Principles IV/XIII (FR-067). Updated FR-012 (Hero imagery) to cross-reference the new block instead of restating rules. Added Key Entity "Illustrative Visual" and Success Criterion SC-014 (design review confirms sparse, non-evidentiary visual usage). Did not modify any existing FR-001–FR-058 content, any User default Story, or the Clarifications log (this was a direct new requirement, not a resolved ambiguity, so no new Clarification entry was forced). Updated the requirements checklist to note the addition, confirm no new clarification markers, and note the cross-referencing approach that avoided duplication; checklist remains "READY for /sp.plan". Not committed/pushed; `/sp.plan` not run.

## Outcome

- ✅ Impact: Illustrative-visuals policy now fully specified and traceable, closing a gap the spec previously only partially covered via a single Hero-only rule (old FR-012) and one edge case.
- 🧪 Tests: none (spec stage)
- 📁 Files: specs/001-company-homepage/spec.md; specs/001-company-homepage/checklists/requirements.md
- 🔁 Next prompts: Owner review of the new FR-059–FR-067 block, then proceed to `/sp.plan`.
- 🧠 Reflection: Followed the established additive-amendment pattern (append new FR block, cross-reference rather than duplicate existing accessibility/performance FRs) to keep the diff minimal and avoid renumbering churn across the whole document.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): Manual checklist review — PASS; verified no duplicate rules were introduced against FR-005 (Ali Owais photo ban), FR-034/FR-037 (existing image accessibility/performance), and FR-001–FR-013 (logo/Hero rules).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none pending; ready to proceed to `/sp.plan` on owner's go-ahead.
