# Contract: `POST /api/chat`

The only API surface this feature introduces. Implemented as a Next.js Route Handler at `app/api/chat/route.ts`. Server-side only; the client never talks to Gemini directly (FR-049).

## Request

```
POST /api/chat
Content-Type: application/json
```

```json
{
  "message": "Do you handle termite proofing?",
  "quickSuggestion": null
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `message` | `string` | Yes | The visitor's typed question. Server MUST reject/ignore empty or excessively long input (basic length cap, e.g. 500 chars) before calling Gemini, to protect the free-tier quota. |
| `quickSuggestion` | `"services" \| "quote" \| "contact" \| "about" \| null` | No | Set instead of/alongside a typed `message` when the visitor taps one of the required quick-suggestion chips (FR-045); lets the handler shortcut to a canned, still-grounded response if desired, without always spending a Gemini call. |

No authentication, no cookies, no user identifier beyond what's needed for rate-limiting (e.g., IP from the request, or a random per-tab session id generated client-side and sent as a header — implementation detail decided in `/sp.tasks`).

## Response — success

```
200 OK
Content-Type: application/json
```

```json
{
  "status": "ok",
  "reply": "Yes — termite proofing is one of our services, alongside fumigation, disinfestation, derating, rodent control, and general pest control. For a quote, you can reach us by phone, WhatsApp, or email."
}
```

`reply` is always grounded per `lib/content/chatbot-knowledge.ts` (FR-041–044); never contains invented facts, pricing, or claims beyond `company-facts.md`.

## Response — unavailable / any failure (FR-056/057)

**Every** failure mode — Gemini quota exceeded (HTTP 429 from the provider), provider timeout, provider 5xx, malformed provider response, local rate-limiter rejection, or an unexpected exception — maps to the **same** shape and the **same** HTTP status, so the client has exactly one failure branch to handle:

```
200 OK
Content-Type: application/json
```

```json
{
  "status": "unavailable",
  "reply": "I'm temporarily unavailable. Please contact Mahrukh Fumigation Services directly by phone, WhatsApp, or email."
}
```

- HTTP status is deliberately `200` (not `429`/`500`) so no raw transport-level status code is visible to inspection as a signal of the underlying provider error (defense in depth alongside not including provider error text in the body) — the body's `status: "unavailable"` field is what the client branches on.
- The real error (provider status code, message, stack) is logged server-side only (e.g., `console.error` / platform logs) for the developer's own diagnostics — never included in the HTTP response.

## Response — malformed request

```
400 Bad Request
```

```json
{ "status": "invalid", "reply": "Please enter a message." }
```

Used only for empty/missing `message` with no `quickSuggestion`. Still no raw technical detail exposed.

## Client contract (`use-chatbot.ts`)

| Client state | Trigger |
|---|---|
| `idle` | Before first send / after a completed exchange |
| `loading` | Immediately after `fetch` is issued |
| `success` | Response body `status: "ok"` → append an `assistant` ChatExchange |
| `unavailable` | Response body `status: "unavailable"` or `"invalid"` → append a `system-fallback` ChatExchange, render contact options |
| `error` | The `fetch` itself rejects (network failure) before any response → same rendering as `unavailable` |

This keeps FR-048 (distinct loading/error/unavailable states) satisfied while ensuring visitors always see the same calm, contact-oriented message regardless of *why* the chatbot couldn't answer.
