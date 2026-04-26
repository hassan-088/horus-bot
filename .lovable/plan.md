
## Goal

Restore the website's role as a pure marketing + booking site. Remove every button that opens the app shell, and build a complete website-native booking flow that ends with the ticket saved to the user's account and visible on the website's My Tickets page (and later in the real app via the same login).

No redesign. Existing premium visual style, fonts, colors, spacing, and brand stay untouched.

---

## 1. Header cleanup (`SiteHeader.tsx`)

Remove the "Open App / افتح التطبيق" button from both desktop and mobile menu — currently it routes to `/home` (the app shell) and confuses the website's role.

Keep:
- Logo, all 7 nav links (Home, About, Experience, Tickets, App, FAQ, Contact)
- Language switch
- "My tickets" button (visible only when signed in) → `/tickets-mine`
- "Book Your Visit" primary CTA → `/book` (new website route, not `/tickets-info` landing — see below)

Mobile menu mirrors the same set, no "Open App".

---

## 2. New website booking route: `/book`

Create `src/pages/site/BookPage.tsx` — a single multi-step page rendered inside the public `MainLayout` (SiteHeader + SiteFooter, no app BottomNav, no FloatingChatButton).

Add `/book` to the `publicRoutes` array in `MainLayout.tsx` and register the route in `App.tsx`.

**All booking CTAs across the site point here**, replacing every current link to `/tickets` (the app screen):
- `HomePage.tsx`: hero "Book Your Visit", final CTA "Book Your Visit"
- `TicketsInfoPage.tsx`: each pricing card "Book now", and the SectionHero
- `ExperiencePage.tsx`, `AppPage.tsx`, `FaqPage.tsx`, `ContactPage.tsx`, `AboutPage.tsx`: any "Book"/"Secure your spot" button (audit all)
- `SiteHeader.tsx`: primary CTA

Steps inside `/book` (all on one page, stepper UI at top showing 1→5):

### Step 1 — Account gate (only if not signed in)
Reuses existing `AccountGateModal` content but rendered inline as a step (not modal). Same EN/AR copy already approved:
- Title: "Create your Horus-Bot account" / "أنشئ حسابك على Horus-Bot"
- Body: "Create an account to save your tickets, personalize your tour, and access everything later from the Horus-Bot app."
- Tabs: Sign up / Log in
- Signup fields: Full name, Email, Password, Confirm password
- Optional fields (signup): Preferred language (Arabic / Egyptian Arabic / English), Phone number
- On success → advance to Step 2

If the user is already signed in, this step is auto-skipped.

### Step 2 — Select tickets
Three tier rows (Adult / Student / Child) with +/- counters. Same `ticketPrices` from `src/lib/data.ts`. Live subtotal.

### Step 3 — Date & time
- Date picker (HTML date input, today minimum)
- Time slot buttons: 09:00, 11:00, 13:00, 15:00 (4 slots; museum's typical windows)

### Step 4 — Personalize Your Tour
Title: "Personalize Your Tour" / "خصّص جولتك"
Subtitle: "Choose what you would like to see so Horus-Bot can guide your visit around your time and interests." / Arabic equivalent.

Fields:
- Tour duration: 30 / 45 / 60 / 90 min (single select)
- Visitor type: Adult / Student / Child / Family / Group (single select)
- Interests (multi-select chips): Ancient Egypt, Royal artifacts, Statues, Mummies, Daily life, Architecture, Highlights only
- Accessibility (multi-select): Step-free route, Larger text in app, Extended audio description, Slower tour pace
- Preferred language: Arabic / Egyptian Arabic / English
- Optional notes (textarea, placeholder: "Tell us anything that can help personalize your visit.")

Button: "Continue to payment" / "متابعة إلى الدفع"

### Step 5 — Choose payment method
Title: "Choose Payment Method" / "اختر طريقة الدفع"
Options (radio cards): Credit / Debit Card, Apple Pay, Google Pay, Cash at museum counter
Demo notice: "Demo checkout — no real payment will be charged." / "دفع تجريبي — لن يتم خصم أي مبلغ حقيقي."

Order summary card showing: total tickets, date+time, total price.

CTA: "Confirm & Pay" / "أكّد وادفع"

On submit → call extended `createTicket` (see DB section), show success modal:
- Title: "🎉 You're all set! / كل شيء جاهز!"
- Body: "Your tickets are ready." / "تذاكرك جاهزة."
- Button: "View My Tickets" → navigates to `/tickets-mine` (website My Tickets, NOT app)

On error → toast: "Something went wrong. Please try again." / "حدث خطأ ما. حاول مرة أخرى."

---

## 3. Database: extend `tickets` table

Add columns to capture the personalization + time slot so they show on My Tickets and later sync to the app:

```sql
ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS visit_time text,
  ADD COLUMN IF NOT EXISTS tour_duration int,
  ADD COLUMN IF NOT EXISTS visitor_type text,
  ADD COLUMN IF NOT EXISTS interests text[],
  ADD COLUMN IF NOT EXISTS accessibility text[],
  ADD COLUMN IF NOT EXISTS preferred_language text,
  ADD COLUMN IF NOT EXISTS notes text;
```

All nullable, no RLS changes (existing user-scoped policies already cover them). Update `useUserTickets.ts` `UserTicket` + `NewTicketInput` interfaces to include these optional fields, and `createTicket` passes them through.

---

## 4. My Tickets page upgrades (`MyTicketsPage.tsx`)

Render the new fields when present:
- Time (next to date)
- Ticket breakdown (e.g., "2 Adult, 1 Student")
- Tour duration (e.g., "60 min tour")
- Preferred language
- Interest chips
- Total price, status: Active
- QR code placeholder, "View ticket", "Add to Wallet" (already toasts "coming soon")

Empty/unauthed states already match the spec — keep as-is.

Mirror the same rendering enhancements in the app's `MyTicketsScreen.tsx` so the same purchase shows correctly when the user later opens the app and logs in with the same account.

---

## 5. App Store / Google Play — already correct

`AppPage.tsx` already opens `ComingSoonModal` for both store buttons. Two small tweaks to match the spec exactly:
- Modal title: "App Preview Available" / "معاينة التطبيق متاحة"
- Modal body: "The Horus-Bot app is not published on stores yet. For now, you can join the early access list and use the app during the demo experience." / Arabic equivalent
- Buttons: "Join early access" (opens email field) and "Close"
- After email submit: "Thank you. We'll notify you when the Horus-Bot app is available." / Arabic equivalent
- Remove the current "Open App Demo" button — it currently navigates to `/launch` which is the app shell (violates "no fake app from website"). Replace with just "Join early access" + "Close".

---

## 6. Button / link audit

Walk through every page and ensure:
- All "Book *" buttons → `/book`
- App Store / Google Play → `ComingSoonModal` only
- Contact form → existing toast feedback
- "View tickets" / "My tickets" → `/tickets-mine`
- FAQ accordions → expand/collapse only
- No remaining links to `/home`, `/launch`, `/tickets` (app screen), `/my_tickets` from any public-site file
- Footer links audited the same way

The app routes still exist (the real app demo is reachable at `/launch`, `/home`, `/tickets`, etc.) but **nothing in the public website links to them**. The app remains a separate product reachable only by direct URL or a future native build — exactly per spec.

---

## 7. Files

**New**
- `src/pages/site/BookPage.tsx` — multi-step booking flow
- `src/components/site/BookingStepper.tsx` — small step indicator (1→5)

**Edited**
- `src/App.tsx` — register `/book` route
- `src/components/layout/MainLayout.tsx` — add `/book` to `publicRoutes`
- `src/components/site/SiteHeader.tsx` — remove "Open App" (desktop + mobile), point Book CTA to `/book`
- `src/pages/site/HomePage.tsx` — Book CTAs → `/book`
- `src/pages/site/TicketsInfoPage.tsx` — "Book now" cards → `/book`, hero CTA → `/book`
- `src/pages/site/ExperiencePage.tsx`, `AppPage.tsx`, `FaqPage.tsx`, `ContactPage.tsx`, `AboutPage.tsx` — audit + repoint Book buttons
- `src/components/site/SiteFooter.tsx` — audit links
- `src/components/site/ComingSoonModal.tsx` — refresh copy, remove "Open App Demo" button
- `src/pages/site/MyTicketsPage.tsx` — render new ticket fields
- `src/pages/MyTicketsScreen.tsx` — render new ticket fields (so app shows same data)
- `src/hooks/useUserTickets.ts` — extend interfaces + `createTicket` payload
- `src/lib/i18n.ts` — new strings (booking steps, personalization labels, success/error)

**DB migration**
- Add 7 nullable columns to `public.tickets`

**Untouched**
- `src/pages/TicketsScreen.tsx` (app's checkout screen) — left alone; no website link points to it anymore
- All other app screens, AuthContext, design tokens, fonts, colors

---

## Acceptance criteria (matches user spec)

- Header has no "Open App" button on desktop or mobile
- Every Book CTA on the website lands on `/book`, never on the app shell
- `/book` requires sign-in/signup before payment when user is anonymous
- `/book` includes the full personalization step before payment
- Payment step offers Card / Apple Pay / Google Pay / Cash; demo only, never shows technical errors
- After purchase: success modal → "View My Tickets" → `/tickets-mine` shows the new ticket immediately
- App Store / Google Play buttons only open the Coming Soon / early access modal
- Logging in inside the real app demo (`/auth`) with the same account shows the same tickets in `MyTicketsScreen`
- No dead buttons; no website link routes to `/home`, `/launch`, `/tickets` (app), or `/my_tickets`
