# Mahrukh Fumigation Services

Business website for Mahrukh Fumigation Services — a Next.js site with an AI chatbot ("Ask Mahrukh AI") and WhatsApp-based contact/booking.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)-style components (built on Radix UI primitives)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Google Gemini API](https://ai.google.dev/) (`@google/genai`) for the chatbot backend
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
git clone <repo-url>
cd mfs-aliOwais
npm install
cp .env.local.example .env.local
```

Fill in the required values in `.env.local` (see below), then:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Set these in `.env.local` (never commit this file):

- `GEMINI_API_KEY` — server-side only, used exclusively by the chatbot's API route. Never exposed to the client.
- `GEMINI_MODEL` — the Gemini model used for chat responses.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server (after `build`) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript's type checker (no emit) |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |

## Features

- **Ask Mahrukh AI** — a Gemini-powered chatbot grounded in the site's own business content, with a floating trigger available from anywhere on the page.
- **Book a Service** — a structured form that composes a pre-filled WhatsApp message from the visitor's details (name, phone, address, service type, notes) and opens WhatsApp to send it. No backend or database involved.
- **Floating WhatsApp contact** — a persistent WhatsApp entry point alongside the chatbot trigger.
- **Responsive design** — built and verified across mobile, tablet, and desktop breakpoints.

## Content Source of Truth

All business content and copy on the site (services, contact details, company history, claims, etc.) must trace back to `company-facts.md` at the project root. When adding or editing content, verify it against that file rather than inventing or assuming details.
