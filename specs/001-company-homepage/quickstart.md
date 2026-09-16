# Quickstart: Mahrukh Fumigation Services — Company Homepage

## Prerequisites

- Node.js 20 LTS, npm
- A Google AI Studio account with a Gemini API key eligible for the free tier

## Environment variables

Create `.env.local` (never committed — already covered by `.gitignore`):

```
GEMINI_API_KEY=your-server-side-only-key
GEMINI_MODEL=the-current-free-tier-eligible-model-name
```

- `GEMINI_API_KEY` is read only inside `lib/gemini/client.ts`, which is only ever imported from `app/api/chat/route.ts` (a server-only file). It must never appear in any file under `components/` or any file marked `"use client"`.
- On Vercel, the same two variables are set as Project → Environment Variables (Production/Preview), not committed to the repo.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The chatbot widget calls `/api/chat` on the same origin — no separate backend to run.

## Verifying the chatbot fallback locally (without burning quota)

Temporarily unset or set an invalid `GEMINI_API_KEY` and confirm:
1. The widget still opens/closes normally.
2. Sending a message shows the loading state, then the friendly "I'm temporarily unavailable…" message — never a raw error, status code, or stack trace.
3. The rest of the page (contact links, nav, sections) is unaffected.

## Testing

```bash
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest unit/component tests
npm run test:e2e     # Playwright smoke suite (keyboard nav, reduced-motion, contact links, chatbot fallback)
```

## Manual acceptance pass (maps to spec User Stories)

1. Load the homepage on desktop and mobile — confirm business name, Executive designation, and primary CTA are visible without scrolling (US1).
2. Confirm all six services render with no invented claims (US2).
3. Confirm organizations are listed with neutral "served" wording only, and NBP/Meezan text matches `company-facts.md` exactly (US3).
4. On mobile, confirm a call/WhatsApp action is reachable within two taps (US4).
5. Open the chatbot, ask an in-scope question (grounded answer expected) and an out-of-scope/pricing question (decline + contact redirect expected) (US5).
6. Enable OS-level "reduce motion" and confirm the marquee and chatbot transitions go static (SC-006).
7. Tab through the entire page with a keyboard only — every interactive element must be reachable and operable (SC-008).

## Deployment

Standard Vercel deployment (`vercel --prod` or Git-integrated deploys). No database, no additional infrastructure. Set the two Gemini environment variables in the Vercel project before the first production deploy that enables the chatbot.
