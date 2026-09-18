# Feature Specification: Mahrukh Fumigation Services — Company Homepage

**Feature Branch**: `001-company-homepage`
**Created**: 2026-09-16
**Status**: Draft
**Input**: User description: "Create the complete specification for the Mahrukh Fumigation Services website based on the approved Constitution v1.2.0, the verified company-facts.md, and the established business identity/content rules. Deliver a professional, modern, trustworthy, established, simple, and approachable single home page covering: header/navbar with the existing company logo; hero section with marquee ('MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦') and trust indicators; about section; services section (Fumigation, Disinfestation, Derating, Termite Proofing, Rodent Control, Pest Control); commercial & institutional experience; organizations/clients served with conservative wording; why-Mahrukh section; contact/get-a-quote section; footer with logo and contact information; responsive, accessible, SEO-friendly, performant, with restrained animation and reduced-motion support. Syed Ali Owais must be represented as text only ('Syed Ali Owais' / 'Executive — Mahrukh Fumigation Services'), never with a photograph or AI/stock substitute. No invented services, certifications, testimonials, awards, partnerships, guarantees, technical claims, or client relationships; historical evidence must not be presented as current; no exposure of private certificate/NTN/signature details; no exaggerated marketing claims."

**Amendment (2026-09-16)**: Added a floating "Ask Mahrukh AI" chatbot to the same single home page — a business-scoped assistant grounded only in `company-facts.md` and this approved spec, with mandatory fallback/contact-redirect behavior for out-of-scope questions, quick-suggestion prompts, accessible/responsive UI that never interferes with the primary CTA, distinct loading/error/unavailable states, and server-side-only handling of any AI provider API key. See User Story 5 and FR-040–FR-053.

**Amendment (2026-09-16, cont'd)**: Added an "Illustrative Visuals" requirement — the site uses only a few professional visuals (not many images throughout the page), drawn from an approved generic subject list, which MUST never be presented or labeled as actual photographs of Mahrukh Fumigation Services, its staff, clients, branches, or completed work. See FR-059–FR-067.

**Source of truth**: `company-facts.md` (verified business facts) and `.specify/memory/constitution.md` v1.2.0 (project principles). Every requirement below is traceable to one or both.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Prospective Customer Evaluates Credibility and Requests a Quote (Priority: P1)

A property manager, homeowner, or institutional facilities contact lands on the homepage after searching for a fumigation/pest-control provider in Karachi. Within moments they need to understand who the business is, what it does, how long it has been operating, and how to get in touch for a quote.

**Why this priority**: This is the core conversion path — every other section exists to support a visitor reaching "contact us" with confidence. Without this, the site has no business value.

**Independent Test**: Can be fully tested by loading the homepage on desktop and mobile, confirming the business name, Executive designation, and core services are visible above the fold, and successfully initiating contact (call, WhatsApp, or email) via a clearly visible CTA.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** the page loads, **Then** the business name "Mahrukh Fumigation Services," the Executive designation ("Syed Ali Owais — Executive"), and a primary "Get a Quote"/"Contact Us" call-to-action are visible without scrolling on a standard desktop viewport.
2. **Given** a visitor wants to make contact, **When** they select the primary CTA or the Contact section, **Then** they can view or activate the office phone number, mobile/WhatsApp number, and email address.
3. **Given** a mobile visitor taps the phone or WhatsApp contact link, **When** their device supports it, **Then** the appropriate calling or messaging app opens with the correct number pre-filled.

---

### User Story 2 - Visitor Learns About Services Offered (Priority: P2)

A visitor wants to confirm the business offers the specific service they need (e.g., termite proofing or rodent control) before contacting.

**Why this priority**: Confirms fit before conversion; prevents wasted inquiries and builds trust that the business understands its own scope.

**Independent Test**: Can be tested by navigating to the Services section and confirming all six verified services are listed clearly with no unverified technical or safety claims attached.

**Acceptance Scenarios**:

1. **Given** a visitor views the Services section, **When** the section renders, **Then** exactly the six verified services (Fumigation, Disinfestation, Derating, Termite Proofing, Rodent Control, Pest Control) are displayed, each with a short, conservative description containing no invented technical, chemical, or safety claims.
2. **Given** a visitor reads a service entry, **When** they look for certifications or safety guarantees, **Then** none are shown unless such a claim exists in `company-facts.md`.

---

### User Story 3 - Visitor Verifies Business Legitimacy via Institutional Experience (Priority: P3)

A commercial or institutional prospect (e.g., a bank facilities officer) wants evidence the business has handled work of a similar scale before engaging.

**Why this priority**: Institutional/commercial buyers weigh credibility signals heavily; this section differentiates Mahrukh Fumigation Services from unverified competitors, but is secondary to the core contact path.

**Independent Test**: Can be tested by viewing the "Commercial & Institutional Experience" and "Organizations Served" content and confirming all wording matches the conservative, evidence-based phrasing in `company-facts.md` with no elevated relationship claims.

**Acceptance Scenarios**:

1. **Given** a visitor views the organizations/clients content, **When** they read any organization name (e.g., National Bank of Pakistan, Meezan Bank), **Then** it is described only as an organization/client served — never as a "partner," "approved vendor," "government partner," or similar unsupported relationship.
2. **Given** a visitor reads about NBP experience, **When** the content describes it, **Then** it is presented as historical, dated enlistment (2012–2013 Category D; 2017 Category B for fumigation works) and not as a current, ongoing relationship.
3. **Given** a visitor looks for supporting documents, **When** they scan the page, **Then** no certificate images, certificate/reference numbers, NTN numbers, signatures, or confidential contractual details are exposed.

---

### User Story 4 - Mobile Visitor Quickly Finds Contact Options (Priority: P3)

A visitor with an active pest problem browses on a phone and wants the fastest possible path to calling or messaging the business, without reading the full page.

**Why this priority**: Mobile is the dominant channel for local-service searches; a slow or buried contact path directly loses inquiries. Same priority tier as Story 3 — both reinforce conversion but are not the single MVP slice.

**Independent Test**: Can be tested by loading the homepage on a mobile viewport and confirming a contact affordance (e.g., a persistent or early-positioned call/WhatsApp action) is reachable within two taps from page load.

**Acceptance Scenarios**:

1. **Given** a visitor on a mobile device opens the homepage, **When** they view the header or hero area, **Then** a visible way to call or message the business is reachable without needing to scroll through every section.
2. **Given** the visitor is on a small viewport, **When** they view the navigation, **Then** it remains usable (e.g., a clear menu control) rather than overlapping or hiding content.

### User Story 5 - Visitor Gets Quick Answers via the "Ask Mahrukh AI" Chatbot (Priority: P2)

A visitor has a quick question (e.g., "Do you handle termite proofing?", "What's your WhatsApp number?", "Have you worked with banks before?") and would rather ask directly than search through the page.

**Why this priority**: Reduces friction for visitors who prefer a direct answer over scanning sections, and can nudge undecided visitors toward the contact/quote path. It enhances conversion but is not required for the MVP conversion path already covered by User Story 1.

**Independent Test**: Can be tested by opening the floating chatbot, asking a question covered by `company-facts.md`/the approved site content, and confirming the answer is accurate and grounded; then asking an out-of-scope question and confirming the chatbot declines gracefully and offers a contact option instead of inventing an answer.

**Acceptance Scenarios**:

1. **Given** a visitor opens the floating "Ask Mahrukh AI" chatbot, **When** they ask about a verified service, business fact, or contact detail, **Then** the chatbot answers using only information present in `company-facts.md` and the approved site content.
2. **Given** a visitor asks a question whose answer is not in the approved knowledge (e.g., pricing, a certification, a claim not on file), **When** the chatbot responds, **Then** it clearly states it does not have that information and offers a relevant contact channel or the quote pathway instead of guessing.
3. **Given** a visitor wants a starting point, **When** they open the chatbot, **Then** quick-suggestion options (e.g., "Our Services," "Request a Quote," "Contact Us," "About Mahrukh") are available to tap instead of typing.
4. **Given** a visitor is reading the main page content, **When** the chatbot is closed (its default state), **Then** it appears only as a small floating control that does not cover or interfere with the primary Hero CTA or any section content.
5. **Given** the chatbot's backend service is slow, unavailable, or returns an error, **When** the visitor sends a message, **Then** the chatbot shows an appropriate loading state, then a clear error/unavailable message that still offers a direct contact option.
6. **Given** a visitor has `prefers-reduced-motion` enabled, **When** the chatbot opens, closes, or receives a message, **Then** any transition/animation is reduced or removed accordingly.

---

### Edge Cases

- What happens when a visitor has `prefers-reduced-motion` enabled? The hero marquee and any other decorative animation MUST become static or motion-free without hiding any text or information they carried.
- What happens when JavaScript fails to load or is disabled? Core content (logo, navigation, hero heading/CTA, services, contact details) MUST still render and remain readable via standard HTML/CSS; only non-essential animated behavior may be lost.
- What happens when no suitable illustrative visual is available at implementation time (genuine or AI-generated)? Per FR-064, the affected section MUST still appear complete using layout, brand colors, gradients, or icons — the absence of an image MUST NOT block implementation or be filled with a misrepresentative substitute.
- What happens if an AI-generated illustrative visual could be mistaken for a specific real client site, branch, or institution (e.g., resembling a bank or school)? It MUST remain generic and non-specific, with a neutral label (per FR-060–FR-062) rather than naming or implying any real client or location.
- What happens when genuine Mahrukh Fumigation Services photographs become available after illustrative visuals are already in place? They MUST be clearly distinguished as actual company assets rather than blended in as more illustrative imagery (per FR-065).
- What happens when the organizations/clients list is long on a small screen? It MUST wrap or scroll within its own section without breaking the page layout or requiring horizontal scrolling of the whole page.
- What happens when a screen reader user reaches the hero marquee? It MUST be reachable/skippable in a way that does not trap focus or force listening to a repeating loop, and MUST NOT be the only place the business name/Executive designation appears.
- What happens if a visitor's browser blocks `tel:`, `mailto:`, or WhatsApp deep links? The visible text of the phone number, email, and WhatsApp number MUST remain readable so the visitor can act on it manually.
- What happens when a visitor asks the chatbot something entirely unrelated to Mahrukh Fumigation Services (e.g., general trivia, another company)? The chatbot MUST politely decline and redirect toward business-relevant topics or a contact option, rather than answering as a general-purpose assistant.
- What happens when a visitor asks the chatbot for a price or quote amount? The chatbot MUST NOT invent or estimate pricing; it MUST direct the visitor to the Contact/Get a Quote channel.
- What happens when the Gemini API reaches its free-tier quota, is rate-limited, times out, or otherwise fails? The chatbot MUST NOT expose raw provider errors (e.g., HTTP status codes such as "429," stack traces, or other technical details) to visitors; it MUST instead show a friendly fallback message (e.g., "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.") while the visitor retains full use of the normal website contact options.
- What happens when JavaScript is disabled or the chatbot fails to load? The chatbot is a progressive enhancement; all core content and contact paths (header, hero CTA, contact section, footer) MUST remain fully usable without it.
- What happens on small mobile viewports when the chatbot is open? The chat window MUST NOT permanently obscure the primary CTA or make the page unusable, and MUST be easily closable.

## Requirements *(mandatory)*

### Functional Requirements

**Header / Navigation**
- **FR-001**: The site MUST display the existing Mahrukh Fumigation Services logo (per Constitution Principle IV) in the header on the homepage, sized responsively for desktop and mobile.
- **FR-002**: The header logo MUST link back to the top of the Home page.
- **FR-003**: The header MUST provide navigation to the page's main sections (e.g., Home, About, Services, Contact/Get a Quote).
- **FR-004**: On mobile viewports, navigation MUST remain usable via a clear, accessible menu control rather than overlapping content.

**Hero**
- **FR-005**: The Hero MUST NOT include a photograph, or an AI-generated or stock-photo substitute, of Syed Ali Owais.
- **FR-006**: The Hero MUST prominently display the business name "Mahrukh Fumigation Services" and a primary call-to-action leading to the Contact/Get a Quote section.
- **FR-007**: The Hero MUST include a continuously repeating horizontal text marquee positioned near the top of the Hero, reading "MAHRUKH FUMIGATION SERVICES ✦ SYED ALI OWAIS — EXECUTIVE ✦".
- **FR-008**: The marquee MUST move slowly and smoothly, remain visually secondary to the main Hero heading and CTA, and MUST NOT resemble a fast news ticker.
- **FR-009**: The marquee MUST pause or be removed when the visitor's system has `prefers-reduced-motion` enabled, without removing the business name/Executive text from the page.
- **FR-010**: The Hero MUST display concise, factual trust indicators limited to statements directly supported by `company-facts.md` (e.g., "25+ Years Experience," "Karachi-Based Service," "Commercial & Institutional Experience").
- **FR-011**: The Hero MUST NOT display exaggerated or unsupported marketing claims (e.g., "No. 1," "most trusted," "industry leader," or similar).
- **FR-012**: The Hero MAY use genuine company/service imagery if supplied, or one illustrative visual per the Illustrative Visuals requirements (FR-059–FR-067); either way it MUST NOT be presented as an actual photograph of the company's work unless it genuinely is one.
- **FR-013**: The existing logo MAY also appear within the Hero but MUST NOT be duplicated or enlarged in a way that clutters the section (per Constitution Principle XIII).

**About / Executive**
- **FR-014**: The site MUST include an About section describing Mahrukh Fumigation Services (location, years of experience, general scope of work) using only facts present in `company-facts.md`.
- **FR-015**: The About/Executive content MUST represent Syed Ali Owais using exactly the text format "Syed Ali Owais" / "Executive — Mahrukh Fumigation Services," with no photograph, biography, qualifications, or achievements invented for him.
- **FR-016**: The content MUST make clear that Syed Ali Owais leads Mahrukh Fumigation Services without implying he is a separate company or brand.

**Services**
- **FR-017**: The Services section MUST list exactly the six verified services: Fumigation, Disinfestation, Derating, Termite Proofing, Rodent Control, and Pest Control.
- **FR-018**: Each service entry MUST use general, conservative wording and MUST NOT include unverified technical, chemical composition, or safety-guarantee claims.
- **FR-019**: The site MUST NOT display any service beyond the six verified ones unless it is first added to `company-facts.md`.

**Commercial & Institutional Experience / Organizations Served**
- **FR-020**: The site MUST include a section describing commercial and institutional experience using only the categories present in `company-facts.md` (e.g., banks, a university, an education board, a government-linked building, warehouses, a gas station, cold storage, restaurants, schools, corporate organizations).
- **FR-021**: The site MUST list organizations/clients served (e.g., National Bank of Pakistan, Meezan Bank, MCB Bank, Iqra University, Board of Secondary Education, FBR Building, Novonodec, Allied Record Pvt. Ltd. warehouses, Taj Gasoline, Pakistan Cold Storage) using neutral wording such as "organizations served."
- **FR-022**: The site MUST NOT describe any organization as a "partner," "official partner," "endorsed client," "approved client," "government partner," "preferred vendor," or similar relationship unless that exact wording is explicitly documented.
- **FR-023**: References to NBP experience MUST describe it as historical, dated enlistment (2012–2013 Category "D" panel; January 2017–December 2017 Category "B" enlistment for fumigation works of bank offices and branches) and MUST NOT imply a current or ongoing relationship.
- **FR-024**: References to Meezan Bank MUST be limited to the fumigation/pest-control work documented in the reviewed certificate, without implying an ongoing or exclusive relationship.
- **FR-025**: The site MUST NOT publish NTN numbers, certificate/reference numbers, signatures, private addresses sourced only from certificates, or other confidential document details anywhere on the page.

**Why Mahrukh**
- **FR-026**: The site MUST include a "Why Mahrukh" section summarizing verified differentiators (e.g., 25+ years of experience, documented commercial/institutional experience, Karachi-based service) drawn only from `company-facts.md`, with no invented certifications, awards, or guarantees.

**Contact / Get a Quote**
- **FR-027**: The site MUST provide a Contact/Get a Quote section presenting the office address, telephone numbers, fax, mobile number, WhatsApp number, and email address exactly as listed in `company-facts.md`.
- **FR-028**: The site MUST provide a direct way to initiate contact by phone, WhatsApp, and email from this section (e.g., `tel:`, WhatsApp, and `mailto:` links), so a visitor can reach the business without a working form.

**Footer**
- **FR-029**: The footer MUST display a smaller version of the same existing logo, the business name, and contact information (address, phone, email) on the Home page.
- **FR-030**: The footer logo MUST link back to the top of the Home page, consistent with header behavior.

**Responsive, Accessibility, SEO, Performance**
- **FR-031**: All sections MUST be fully usable and readable across mobile, tablet, and desktop viewports, without horizontal scrolling of the page.
- **FR-032**: All interactive elements (navigation links, CTA buttons, contact links) MUST be operable using a keyboard alone.
- **FR-033**: The page MUST use semantic HTML landmarks (header, nav, main, section, footer) and sufficient text/background color contrast.
- **FR-034**: Any non-decorative image MUST include descriptive alternative text; purely decorative visuals MUST be excluded from assistive-technology reading order.
- **FR-035**: The page MUST include descriptive, accurate metadata (title, description) reflecting only information present in `company-facts.md`.
- **FR-036**: The page MUST use a single primary heading and a logical, ordered subheading structure to support search-engine indexing.
- **FR-037**: Images and visual assets MUST be optimized for fast loading on typical mobile and desktop connections.
- **FR-038**: The site MUST avoid animations, scripts, or embedded widgets that do not directly support a stated user or business need (per Constitution Principles VIII and XII).
- **FR-039**: Any decorative animation, including the Hero marquee, MUST respect `prefers-reduced-motion` system settings.

**"Ask Mahrukh AI" Chatbot**
- **FR-040**: The site MUST provide a floating "Ask Mahrukh AI" chatbot control on the single home page (not a separate page), available from any scroll position.
- **FR-041**: The chatbot MUST answer only using information grounded in `company-facts.md` and the approved website content (services, business/contact information, experience, organizations served, etc.).
- **FR-042**: The chatbot MUST NOT invent services, certifications, clients, partnerships, guarantees, technical/chemical claims, prices, or any other company fact not present in its grounded knowledge.
- **FR-043**: When a visitor asks something outside the chatbot's grounded knowledge (including pricing/quote amounts), the chatbot MUST clearly state it does not have that information and MUST offer a relevant contact channel or the quote pathway instead of guessing.
- **FR-044**: The chatbot MUST decline to act as a general-purpose assistant for topics unrelated to Mahrukh Fumigation Services, redirecting the visitor to business-relevant topics or contact options.
- **FR-045**: The chatbot MUST offer quick-suggestion prompts, including at minimum "Our Services," "Request a Quote," "Contact Us," and "About Mahrukh."
- **FR-046**: The chatbot MUST be able to guide visitors toward the relevant service information or the Contact/Get a Quote channel based on their question.
- **FR-047**: The chatbot UI MUST remain visually consistent with the site's established branding (Constitution Principles IV, VIII, XII) and MUST NOT cover or interfere with the primary Hero CTA or any section's content when closed or open.
- **FR-048**: The chatbot MUST present distinct, clear states for: initial/idle, loading (awaiting a response), error (request failed), and service-unavailable (AI backend unreachable or not configured) — each of the latter two MUST still surface a direct contact option.
- **FR-049**: The Gemini API key MUST NOT be exposed in client-side code, browser network requests inspectable by the visitor, the compiled front-end bundle, the public GitHub repository, or any other public source code; it MUST be stored via environment variables / deployment secrets and used only from a server-side component.
- **FR-050**: The chatbot MUST be operable via keyboard alone (opening, closing, sending a message, activating a quick-suggestion) and MUST expose its open/close control and message log in a way compatible with screen readers.
- **FR-051**: The chatbot's open/close and message-arrival transitions MUST respect `prefers-reduced-motion` system settings.
- **FR-052**: The chatbot MUST remain fully usable on mobile and desktop viewports without permanently blocking access to the rest of the page.
- **FR-053**: The site's core content and primary contact/quote path MUST remain fully functional if the chatbot fails to load or is disabled.
- **FR-054**: The chatbot MUST be powered by the Google Gemini API, using a model available on Gemini's current free tier for this initial version.
- **FR-055**: The chatbot's initial version MUST be designed to operate within the Gemini API's free-tier quota and rate limits; paid billing MUST NOT be a requirement for this version.
- **FR-056**: When the Gemini API reaches its free-tier quota, is rate-limited, times out, or otherwise fails, the site MUST NOT expose raw provider errors (e.g., HTTP status codes such as "429," stack traces, or other technical error details) to visitors.
- **FR-057**: In any such failure case, the chatbot MUST display a friendly fallback message (e.g., "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email.") and the visitor MUST still be able to use the normal website contact options.
- **FR-058**: The chatbot MUST NOT persist conversation history in a database or other permanent storage; conversations remain ephemeral to the visitor's current session only.

**Illustrative Visuals**
- **FR-059**: The site MUST use only a small number of illustrative visuals overall (not many images throughout the page), limited to the approved generic subjects: commercial fumigation, professional pest-control treatment, rodent-control service, fumigation equipment, a technician performing treatment, a warehouse/industrial pest-control environment, and an institutional/commercial pest-control environment.
- **FR-060**: Illustrative visuals (including any AI-generated scenes) MUST NEVER be presented as actual photographs of Mahrukh Fumigation Services, its staff, clients, branches, equipment, or completed work, and MUST use generic labels (e.g., "Professional Commercial Fumigation," "Pest Control Treatment," "Industrial Pest Management") rather than claims of depicting real company work.
- **FR-061**: Illustrative visuals MUST NOT depict people implied to be actual Mahrukh Fumigation Services employees, and MUST NOT be labeled as a specific client or location (e.g., an NBP branch, a Meezan Bank site, a named school or warehouse).
- **FR-062**: Illustrative visuals MUST NOT be used as evidence for client relationships, certifications, experience, awards, partnerships, or completed projects; such claims remain governed solely by `company-facts.md` (FR-017–FR-025).
- **FR-063**: Illustrative visuals MUST be realistic, professional, and clean, appropriate for an established commercial/institutional service company, avoiding cartoonish, childish, exaggerated, disturbing, or overly pest-focused imagery (Constitution Principle VIII).
- **FR-064**: If no suitable illustrative visual is available at implementation time, the affected section MUST still appear complete using layout, brand colors, gradients, icons, or other non-deceptive visual treatment; the absence of an image MUST NOT block implementation.
- **FR-065**: If genuine Mahrukh Fumigation Services photographs are supplied later, they MUST be treated as actual company assets and clearly distinguished from illustrative/AI-generated visuals.
- **FR-066**: Illustrative visuals MUST follow the same accessibility and performance rules as all site images (FR-034, FR-037): descriptive alt text for informative visuals, empty alt text for purely decorative ones, responsive/optimized formats (e.g., WebP/AVIF where appropriate), lazy-loading when below the fold, no unnecessary layout shift, and no watermarked or unlicensed images.
- **FR-067**: Illustrative visuals MUST NOT alter, recreate, or replace the existing Mahrukh Fumigation Services logo (Constitution Principles IV, XIII); the logo remains the sole source of truth for brand identity.

### Key Entities

- **Business Profile**: The single verified representation of Mahrukh Fumigation Services — name, Executive name/designation, location, years of experience, and contact channels, sourced entirely from `company-facts.md`.
- **Service**: One of the six verified offerings (Fumigation, Disinfestation, Derating, Termite Proofing, Rodent Control, Pest Control) with a short, conservative description.
- **Organization Reference**: A named organization or client category the business has served, with a relationship qualifier that is always neutral ("served") unless a stronger documented relationship exists.
- **Contact Channel**: A single method of reaching the business (phone, fax, mobile, WhatsApp, email) with its verified value from `company-facts.md`.
- **Assistant Knowledge Source**: The bounded set of approved content (`company-facts.md` plus the approved site copy) that the chatbot is grounded in and MUST NOT answer beyond; not a general knowledge base.
- **Chat Exchange**: A single visitor question and the chatbot's corresponding answer within a session; conceptual only, with no implied requirement to persist it beyond the visitor's current session (see Assumptions).
- **Illustrative Visual**: A generic, non-deceptive image (which may be AI-generated) used only for visual communication from the approved subject list in FR-059; never evidentiary of a real claim, and always distinguished from any genuine company photograph if/when one exists.

## Assumptions

- This feature covers a single home page containing all listed sections (header, hero, about, services, institutional experience, organizations served, why-Mahrukh, contact, footer) as anchor-linked sections, not a multi-page site with separate routes. This matches how the sections were requested (as parts of "Home page") and keeps the site simple per Constitution Principle XII; a multi-page structure can be introduced later as a separate feature if desired. *(Confirmed — see Clarifications below.)*
- "Get a Quote" is satisfied via direct contact channels (phone, WhatsApp, email) rather than a backend-processed contact form, since no form-delivery service is part of the approved technical stack (Constitution Principle XI) and no such requirement was specified. Adding a true form with server-side email delivery would be a separate, explicitly scoped future decision. *(Confirmed — see Clarifications below.)*
- The website is single-language (English), consistent with all provided source material; no bilingual requirement was stated.
- Genuine business/service photographs and any additional NBP documents remain optional future assets per `company-facts.md` and do not block this specification.
- A usable digital version of the existing logo will be prepared (via asset extraction/cleanup, not redesign) prior to implementation, per Constitution Principle IV.
- Chatbot conversations are ephemeral (kept only for the visitor's current session, e.g., in-memory/client-side); no database or permanent chat-history system is created (FR-058). This can be revisited if a future need (e.g., lead capture) is explicitly requested.
- The chatbot's server-side endpoint is expected to include basic abuse/rate-limiting protection (e.g., a simple per-session or per-IP limit) to help stay within the Gemini free tier; this is a standard safeguard rather than a scope decision requiring owner input.
- The chatbot is powered by the Google Gemini API on a free-tier-eligible model, with paid billing explicitly out of scope for this version. *(Confirmed — see Clarifications below.)* This is a new dependency relative to the previously locked stack (Constitution Principle XI) and should be documented via an ADR (e.g., `/sp.adr add-gemini-chatbot`) before or during `/sp.plan`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the business name, the Executive's name and designation, and the core service offering within 5 seconds of the homepage finishing loading.
- **SC-002**: A visitor can locate and activate a way to request a quote or contact the business within 2 taps/clicks from anywhere on the page.
- **SC-003**: 100% of business facts, service names, and organization references displayed on the page trace directly to an entry in `company-facts.md`, with zero invented claims.
- **SC-004**: The homepage's primary content (logo, hero heading, CTA) is visible and interactive within 3 seconds on a typical mobile connection.
- **SC-005**: All primary content and navigation remain fully readable and operable at mobile widths (down to 320px) and common desktop widths without horizontal scrolling.
- **SC-006**: Visitors with `prefers-reduced-motion` enabled experience a fully static or motion-free page with no information lost compared to the animated version.
- **SC-007**: A content review finds zero instances of unsupported relationship wording (e.g., "partner," "approved vendor," "government partner") applied to any organization mentioned.
- **SC-008**: A keyboard-only user can reach and activate every interactive element on the page (navigation, CTA, contact links) without using a mouse.
- **SC-009**: Visitors can get an accurate, grounded answer from the chatbot to a common business question (services offered, contact details, years of experience, organizations served) in a single exchange.
- **SC-010**: When asked something outside its grounded knowledge (including pricing), the chatbot correctly declines and offers a contact option in 100% of tested out-of-scope queries, with zero invented facts.
- **SC-011**: The chatbot never obscures or blocks the primary Hero CTA or page navigation on any tested viewport, whether open or closed.
- **SC-012**: No API key or secret used by the chatbot appears in any client-side network request, page source, or compiled front-end bundle.
- **SC-013**: When the Gemini API is rate-limited, over its free-tier quota, times out, or otherwise fails, 100% of tested cases show the friendly fallback message with working contact options, and zero raw provider errors, HTTP status codes, or stack traces are exposed to visitors.
- **SC-014**: A content/design review confirms the homepage uses only a small number of illustrative visuals overall, each generic and non-evidentiary per FR-059–FR-067, with zero instances of an illustrative visual being presented or labeled as an actual Mahrukh Fumigation Services photograph, employee, client site, or branch.

## Clarifications

All open questions raised during specification have been resolved by the project owner. This spec now reflects confirmed decisions, not defaults pending approval.

### Session 2026-09-16

- **Q1 — Get a Quote mechanism**: Resolved as direct contact channels only (phone, WhatsApp, email); no backend-processed contact form for this version.
- **Q2 — Site structure**: Resolved as a single home page with anchor-linked sections; no separate routes for About/Services/Contact.
- **Q3 — Chatbot AI provider**: Resolved as the Google Gemini API, using a model available on Gemini's current free tier. The initial version MUST operate within free-tier limits with no paid billing requirement. Free-quota/rate-limit/unavailability handling is an explicit requirement: raw provider errors (e.g., "429," stack traces, technical details) MUST NEVER be shown to visitors; a friendly fallback message directing them to phone/WhatsApp/email contact MUST be shown instead. The API key MUST be stored only via environment variables/deployment secrets, server-side only, and MUST NOT appear in client-side code, browser requests, GitHub, or any public source. Chatbot conversations remain ephemeral — no database or permanent chat-history system. Implementation MUST stay compatible with the existing Next.js/TypeScript/Tailwind/shadcn-ui/Lucide/Framer Motion/Vercel stack, and the chatbot remains a Mahrukh-specific business assistant, not a general-purpose one. See FR-054–FR-058 and the updated edge case above.
