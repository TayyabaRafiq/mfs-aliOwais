<!--
Sync Impact Report
- Version change: 1.1.0 → 1.2.0
- Modified principles:
  - XIII. Logo Usage & Placement — marquee example replaced with a cross-reference to new
    Principle XIV (avoids duplicating the full marquee spec in two places)
- Added sections:
  - Principle XIV. Hero Marquee & Trust Indicators (marquee text/motion/accessibility
    requirements, its non-substitute relationship to the logo, and factual Hero trust
    indicators with a ban on exaggerated marketing claims)
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ no change needed (Constitution Check gate is
    resolved dynamically from this file at /sp.plan time)
  - .specify/templates/spec-template.md — ✅ no change needed (no hardcoded principle refs)
  - .specify/templates/tasks-template.md — ✅ no change needed (no hardcoded principle refs)
  - CLAUDE.md — ✅ no change needed (generic agent guidance, no principle-specific text)
- Follow-up TODOs: none

Prior entries:
- 1.0.0 → 1.1.0: Added Principle XIII. Logo Usage & Placement; expanded Principle IV to
  permit logo asset-preparation (extraction/cleanup) without redesign.
- N/A (template) → 1.0.0: Initial ratification. Added Core Principles I–XII; Source of
  Truth; Development Workflow; Governance. Resolved all generic template placeholders.
-->

# Mahrukh Fumigation Services Website Constitution

## Core Principles

### I. Factual Accuracy
Use only verified business information from `company-facts.md`. Never invent or embellish
company claims. Never invent testimonials, awards, certifications, statistics, partnerships,
client relationships, technical claims, or safety claims. Every claim on the website MUST be
traceable to `company-facts.md`. Information not yet verified MUST be clearly marked
`[NEEDS VERIFICATION]` in project artifacts and MUST NOT appear as a stated fact on the live site.

### II. Business Identity
The business/company name is **Mahrukh Fumigation Services**. The Executive is
**Syed Ali Owais**. Where his role is displayed, the website MUST use exactly:

> **Syed Ali Owais**
> **Executive — Mahrukh Fumigation Services**

"Proprietor" MUST NOT be used as his website designation. The site MUST make the
Executive/company relationship clear without making Syed Ali Owais appear to be a
separate company or brand.

### III. Executive Representation
Syed Ali Owais does not want his photograph on the website. The site MUST NOT generate,
invent, or use a stock or AI-generated photograph as a substitute for him. He MUST be
represented through professional text only, using the designation in Principle II, placed
where appropriate (e.g., About/Executive section, contact/footer areas). No biography,
qualifications, achievements, or personal history MUST be invented for him.

### IV. Brand Identity
The existing, authentic Mahrukh Fumigation Services logo (as shown on the physical
letterhead) is the source of truth for brand identity and MUST NOT be unnecessarily
redesigned, replaced, or altered. A new logo MUST NOT be created merely because a clean
digital asset is not yet available; producing a usable digital asset from the existing
letterhead (extraction, cleanup, background removal, vectorization) is permitted as an
asset-preparation task ONLY, and MUST preserve the original design, proportions, colors,
and wording as closely as technically possible. Visual direction MUST read as Professional,
Established, Trustworthy, Modern, Simple, and Approachable. General palette: deep purple
(primary), professional blue (secondary/trust), white/light backgrounds (majority), with
restrained accent colors used only where compatible with the existing logo. See Principle
XIII for logo placement requirements.

### V. Hero Strategy
The Hero section MUST NOT depend on an Executive photograph. It MUST focus on: Mahrukh
Fumigation Services, core services, 25+ years of experience (where supported by
`company-facts.md`), evidence-supported credibility, and a clear contact/quote
call-to-action. Genuine company/service photographs MAY be used if and when provided.
Generic illustrative imagery (including AI-generated visuals) MAY be used for services,
but MUST NEVER be presented as actual Mahrukh Fumigation Services work. An AI-generated
or stock photo of a person MUST NEVER be used to represent Syed Ali Owais.

### VI. Evidence & Privacy
Organizations and documented experience (including NBP and Meezan Bank) MUST be described
with conservative, evidence-supported wording. Historical NBP enlistment MUST NOT be
presented as a current relationship; it MAY be described accurately as historical,
multi-year enlistment for fumigation works. Meezan Bank references MUST remain limited to
what the reviewed certificate supports. The website MUST NOT expose NTN numbers,
certificate/reference numbers, signatures, private tax information, confidential
contractual details, or other unnecessary private document details. The site MUST NOT make
unsupported claims about NBP policies, renewal practices, or policy changes.

### VII. Content Integrity
The website MUST NOT contain invented or unsupported clients, partnerships, testimonials,
awards, certifications, licenses, government affiliations, guarantees, safety claims,
chemical claims, technical claims, statistics, or current business relationships. When
wording is uncertain, conservative factual wording MUST be preferred over marketing
exaggeration.

### VIII. Design Simplicity
The website MUST stay simple, purposeful, professional, and modern. Every section and
component MUST have a clear purpose. Unnecessary pages and decorative complexity MUST be
avoided, including cartoonish pest-control visuals, excessive 3D effects, and gimmicky
animation (e.g., flying pests, bouncing elements). Animation MAY be used only when it
measurably improves the user experience, and MUST remain restrained.

### IX. UX & Accessibility
The website MUST be mobile-first and responsive, with clear, simple navigation and clear
contact/quote pathways. Typography MUST be accessible with sufficient contrast, all
interactive elements MUST be keyboard-accessible, and markup MUST use semantic HTML.
Accessibility MUST NOT be sacrificed for visual effects.

### X. Performance & SEO
Images and assets MUST be optimized. Unnecessary dependencies and unnecessary client-side
JavaScript MUST be avoided. The project MUST follow good Next.js performance practices,
use semantic HTML, provide meaningful metadata, and maintain an SEO-friendly site
structure. The website MUST remain fast and maintainable.

### XI. Technical Consistency
The project MUST use the established technology stack: Next.js, TypeScript, Tailwind CSS,
shadcn/ui, Lucide icons, Framer Motion (used selectively per Principle VIII), and Vercel
for deployment. The stack MUST NOT change unless a justified project requirement makes it
necessary, and any such change MUST be documented (e.g., via an ADR).

### XII. Simplicity as a Product Requirement
Simplicity is a core product requirement, not a style preference. Every page, section,
component, animation, and visual element MUST justify its presence through clear user
value or business value. The finished website MUST feel: Professional + Established +
Trustworthy + Modern + Simple + Approachable.

### XIII. Logo Usage & Placement
The existing Mahrukh Fumigation Services logo (per Principle IV) MUST have a clear,
recognizable presence in the site header/navbar, sized responsively for desktop and
mobile, and MUST link back to Home when clicked. A smaller version of the same logo MUST
appear in the footer alongside the business name and appropriate contact information. The
logo MAY also appear in the Hero where it improves brand recognition, but MUST NOT be
unnecessarily duplicated or enlarged there; the Hero MUST remain visually clean and
primarily communicate the business, services, experience, and call-to-action. The Hero
marquee (see Principle XIV) is a distinct, separate element from the logo and MUST NOT
replace or substitute for the actual logo anywhere on the site.

### XIV. Hero Marquee & Trust Indicators
The Hero MUST include a subtle, continuously repeating horizontal text marquee near its
top. Preferred text: "MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦". The
marquee MUST move slowly and smoothly with an elegant, professional feel — NOT like a fast
news ticker. It is text-only and MUST NOT use a photograph of Syed Ali Owais (per Principle
III). It MUST remain visually secondary to the main Hero message and call-to-action, MUST
be responsive on desktop and mobile, and MUST respect `prefers-reduced-motion` (pausing or
removing the animation when set). The marquee is separate from the actual company logo and
MUST NOT replace it (see Principle XIII). The Hero MUST also include concise, factual trust
indicators — e.g., "25+ Years Experience", "Karachi-Based Service", and "Commercial &
Institutional Experience" — provided each remains consistent with `company-facts.md`.
Exaggerated or unsupported marketing claims (e.g., "No. 1", "most trusted", "industry
leader") MUST NOT be used.

## Source of Truth

`company-facts.md` at the repository root is the authoritative source of verified business
facts for this project. Every spec, plan, task, and implementation decision involving
business claims, contact details, services, client/organization references, or the
Executive's representation MUST be checked against `company-facts.md`. If a needed fact is
missing or marked `[NEEDS VERIFICATION]` there, the work MUST either wait for verification,
use clearly conservative/generic wording, or omit the claim — it MUST NOT be invented.
Updates to verified facts MUST be made in `company-facts.md` first, then reflected in
downstream specs/plans/content.

## Development Workflow

This project follows the lean Spec Kit Plus SDD flow: `/sp.constitution` (this document) →
`/sp.specify` → optional `/sp.clarify` → `/sp.plan` → optional `/sp.checklist` →
`/sp.tasks` → optional `/sp.analyze` → `/sp.implement`. Each stage MUST be reviewed and
approved by the project owner before the next stage begins; stages MUST NOT be skipped
ahead without explicit approval. Prompt History Records MUST be created per the existing
project convention (`history/prompts/`). Architecturally significant decisions (e.g.,
introducing a new dependency, deviating from Principle XI) MUST be surfaced as ADR
suggestions rather than made silently.

## Governance

This constitution supersedes other informal practices for this project. Amendments
require: (1) a clear written rationale, (2) an explicit version bump per the policy below,
and (3) propagation review of dependent templates (`plan-template.md`, `spec-template.md`,
`tasks-template.md`) and agent guidance (`CLAUDE.md`) for consistency.

**Versioning policy** (semantic versioning):
- **MAJOR**: Backward-incompatible governance changes or removal/redefinition of a
  principle (e.g., relaxing the no-invented-claims rule).
- **MINOR**: A new principle or section added, or materially expanded guidance.
- **PATCH**: Wording clarifications, typo fixes, non-semantic refinements.

All specs, plans, and generated content MUST be checked for compliance with this
constitution before implementation proceeds. Any conflict between a requested feature and
this constitution MUST be raised to the project owner for resolution rather than resolved
unilaterally by relaxing a principle.

**Version**: 1.2.0 | **Ratified**: 2026-09-16 | **Last Amended**: 2026-09-16
