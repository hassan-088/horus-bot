
## Goal
Make ticket purchases real and account-bound. A visitor who buys on the website signs into a Horus-Bot account, pays via a (demo) payment selector, and sees the same ticket inside the app demo when logged in with the same account. Replace fake App Store / Google Play links with a "Coming soon" modal.

No redesign — only flow + data wiring + a few new screens.

---

## Part 1 — Database (Lovable Cloud)

New table `tickets` (separate from the in-app cart in `AppContext`, which becomes a fallback for guests only):

| column | type | notes |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| user_id | uuid | references auth.users (no FK to auth, indexed) |
| museum_name | text | default 'The Egyptian Museum' |
| visit_date | date | required |
| ticket_types | jsonb | `{adult:n, student:n, child:n, group:n}` |
| total_tickets | int | required |
| total_price | numeric | required |
| currency | text | default 'USD' |
| payment_method | text | 'card' \| 'apple_pay' \| 'google_pay' \| 'wallet' |
| status | text | default 'active' (CHECK in trigger, not constraint) |
| qr_value | text | `HRSB-{shortid}` generated client-side |
| created_at | timestamptz | default now() |

RLS:
- SELECT / INSERT where `auth.uid() = user_id`
- UPDATE / DELETE: none (tickets are immutable for the demo)

No CHECK constraints on dates — use a trigger only if needed (skip for now).

---

## Part 2 — Auth gate before checkout

**`TicketsScreen.tsx` (the cart on `/tickets`)**
- On Checkout click:
  - If `useAuth().user` exists → go straight to payment step.
  - Else → open new `<AccountGateModal>` with copy:
    - Title: "Save your ticket to your Horus-Bot account"
    - Body: "Create an account so your tickets are saved and ready inside the app when you arrive."
    - Tabs: Sign up / Log in (reuse logic from `AuthScreen.tsx`, no redirect to `/home` — just close modal and continue checkout).
- Cart state (quantities + date) is held in component state and is **not cleared** when the modal opens. After successful auth, the modal closes and the same component advances to the payment step.

**Two-step checkout** within `TicketsScreen.tsx` using a small local state machine:
1. `cart` — current view (quantities, date, totals)
2. `payment` — payment method picker (only shown when authed)
3. Success dialog (existing) — updated copy and now navigates to `/my_tickets`

---

## Part 3 — Payment method selection (demo)

New section shown after auth in `TicketsScreen.tsx`:
- Title: "Choose payment method"
- Radio cards: Credit / Debit Card · Apple Pay · Google Pay · Wallet balance / Promo code
- Note: "Demo checkout — no real payment will be charged."
- Button: "Confirm booking"

On confirm:
1. Insert row into `tickets` with the cart contents.
2. Show success dialog → navigate to `/my_tickets` (website).
3. On error: friendly toast "Your booking was completed, but we could not load your ticket. Please refresh."

---

## Part 4 — Tickets pages read from Cloud

Both `/my_tickets` (app) and a new `/tickets-mine` (website "My Tickets") use the same hook `useUserTickets()` that selects from the `tickets` table for the current `user.id`.

Three states (same component, used by both routes):

1. **Not signed in** → Title "Sign in to view your tickets", body, "Log in" button (→ `/auth`).
2. **Signed in, empty** → Title "No tickets yet", body, "Book a visit" button (→ `/tickets-info`).
3. **Signed in, has tickets** → Cards with: museum name, visit date, ticket count, total price, status badge (Active), QR placeholder square (renders `qr_value` as monospace text + dotted border), "View Ticket" + "Add to Wallet" buttons (the latter shows a friendly toast: "Wallet pass coming soon.").

The current local `tickets` from `AppContext` is kept only as a guest-cart fallback and no longer drives `MyTicketsScreen`.

Add a public-website route in `App.tsx`:
- `/tickets-mine` → new `MyTicketsPage` (premium website layout, uses `SectionHero`).

Update header link target on the website from any "Buy tickets" CTA — leave existing routes; add a small "My tickets" link in `SiteHeader.tsx` only when `user` is present.

---

## Part 5 — App login uses the same account

Already true: `AuthScreen.tsx` uses Supabase Auth, and the same `auth.users` row is shared across website + app. After signing in:
- `HomeScreen` already shows the user's display name (via `profile`).
- `MyTicketsScreen` is rewritten to call `useUserTickets()` so a website-bought ticket shows up immediately.
- Add a small "Upcoming visit" card on `HomeScreen` showing the next active ticket if one exists (museum name + visit date + "View ticket").

Copy on `AuthScreen.tsx`:
- Title: "Welcome back to Horus-Bot"
- Subtitle: "Log in to access your tickets, tours, and saved visit progress."
- (Keep AR equivalents.)

---

## Part 6 — Replace App Store / Google Play behavior

In `AppPage.tsx`, both Apple/Google buttons (hero and bottom CTA) become triggers for a new `<ComingSoonModal>`:
- Title: "App launch coming soon"
- Body: "The Horus-Bot app is not published yet. For now, you can explore the live app demo."
- Buttons: "Open App Demo" (→ `/launch`) · "Notify Me When Available" (opens a tiny inline email field; on submit, friendly toast "We'll let you know when it launches.").

Buttons keep their "App Store" / "Google Play" labels and icons — but never link out.

---

## Part 7 — Friendly error copy

Centralize in `src/lib/i18n.ts` and use everywhere (replace any raw Supabase error.message surfacing):
- Signup: "We couldn't create your account. Please check your details and try again."
- Login: "Email or password is incorrect. Please try again."
- Payment: "Payment could not be completed. Please try another method."
- Ticket save: "Your booking was completed, but we couldn't load your ticket. Please refresh or contact support."
- Network: "Connection issue. Please try again in a moment."

AR equivalents added alongside.

---

## Part 8 — File-level changes

**New**
- `src/components/site/AccountGateModal.tsx` — sign-up / log-in dialog used inside checkout.
- `src/components/site/ComingSoonModal.tsx` — App Store / Google Play replacement.
- `src/hooks/useUserTickets.ts` — fetch + insert tickets bound to `auth.uid()`.
- `src/pages/site/MyTicketsPage.tsx` — website "My Tickets" with three states.
- DB migration adding `tickets` table + RLS.

**Edited**
- `src/pages/TicketsScreen.tsx` — gated 2-step checkout, payment picker, writes to Cloud.
- `src/pages/MyTicketsScreen.tsx` — uses `useUserTickets`, three states, QR placeholder.
- `src/pages/AuthScreen.tsx` — friendly error copy + new title/subtitle.
- `src/pages/HomeScreen.tsx` — Upcoming visit card.
- `src/pages/site/AppPage.tsx` — Apple/Google buttons → `ComingSoonModal`.
- `src/pages/site/TicketsInfoPage.tsx` — "Book now" still routes to `/tickets`; add small "Already booked? View your tickets" link → `/tickets-mine`.
- `src/components/site/SiteHeader.tsx` — show "My tickets" link when `user` is present.
- `src/App.tsx` — register `/tickets-mine` route.
- `src/lib/i18n.ts` — error + new section strings (EN + AR).
- `src/lib/data.ts` — extend `Ticket` interface to match DB row shape (optional `qr_value`, `payment_method`, `museum_name`).

---

## Out of scope
- Real payment processing (no Stripe/Paddle wiring — demo only).
- Real QR image generation (text placeholder is enough; can add `qrcode` lib later).
- Apple/Google Wallet pass generation.
- Email magic link / Google OAuth (kept as future suggestion — current auth is email + password to match what already exists).

---

## Tone guardrails
- No "backend", "database", "Supabase", "RLS" anywhere user-facing.
- No raw error messages.
- Premium, calm, short sentences. Same as the rest of the site.
- Every new EN string has a matching AR string.
