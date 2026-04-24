
# Final Horus-Bot Website + App Demo Polish

Focused fix pass — no redesign, no new architecture. Apply the user's exact copy, fix the listed bugs, and smooth the visual transitions.

## Part A — Website Bug Fixes

### A1. Scroll-to-top on route change
- Create `src/components/site/ScrollToTop.tsx` — listens to `useLocation().pathname` and runs `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`.
- Mount it once inside `<BrowserRouter>` in `src/App.tsx`, just above `<AppRoutes />`.
- Applies to every route (public + app), so About/Experience/Tickets/App/FAQ/Contact and footer links all open from the top.

### A2. Mobile hamburger menu reliability (`SiteHeader.tsx`)
Desktop nav stays exactly as-is. Only the mobile overlay branch changes:
- Make the overlay a true full-viewport `fixed inset-0 z-[100]` panel (not anchored under header) with its own internal header row (logo + close X).
- Add an opaque/blurred backdrop layer; clicking the backdrop closes the menu.
- Keep `body` scroll lock effect (already present) and confirm it cleans up.
- Ensure hamburger button has `type="button"` and `aria-expanded`.
- Close on: X click, backdrop click, any nav link click, route change (effect on `location.pathname`).

### A3. Smooth premium background (`src/index.css`)
- Add a `body::before` fixed full-viewport gradient layer (z-index -1, `pointer-events:none`):
  - `radial-gradient` ivory→cream→subtle gold glow→ivory, very low opacity.
- Make `bg-sidebar/40` section dividers more transparent so the page reads as one continuous surface (replace usages on HomePage/AppPage with `bg-transparent` + a soft top/bottom fade divider, or reduce to `bg-sidebar/15` with `border-0`).
- Keep card colors, typography, gold accents identical.

## Part B — Copy Rewrites (use the user's exact EN+AR text)

For every page below: replace English copy with the spec text and provide a natural Modern Standard / Egyptian Arabic equivalent via `isRTL` ternaries. No structural changes unless noted.

- **HomePage.tsx** — Hero, sub-line, Product Overview (3 cards), Core Capabilities (6 cards including new Multilingual wording: "Arabic, Egyptian Arabic, English, and other supported languages"), How It Works (4 steps), For Museums (5 bullets), System Status (4 bullets), Footer CTA.
- **AboutPage.tsx** — Why Horus-Bot Exists; Problem (5 cards); Solution (4 cards); Mission/Vision; Team intro + 4 team cards; Capabilities (4 cards).
- **ExperiencePage.tsx** — Hero + 5 stages: Before Visit (4), At the Museum (3), During the Tour (intro + 4), Engagement (3), Accessibility (intro + 3).
- **AppPage.tsx** — New hero copy + robot connection line + app store line; Core Capabilities (4 cards); 5 screen preview cards (Live navigation, Exhibit details, Ask the guide, Interactive quiz, Visit progress) — keep current placeholder phone frames but make them feel intentional (label + icon + soft gradient, no broken empty boxes); final CTA.
- **TicketsInfoPage.tsx** — New hero + two info notices; Adult $25, Student $15, Group $80 with the listed bullets; Trusted Booking section (3 cards: free cancellation, instant QR, secure payment).
- **FaqPage.tsx** — Replace with the 8 listed Q&A. Set only the first 2 (`Do I have to use the app?`, `What if all robots are busy?`) open by default via `defaultValue={["q1","q2"]}` on the Accordion. Final CTA block ("Still Have Questions?" + Book your visit button).
- **ContactPage.tsx** — New hero/subtitle. Contact cards: Visitor Support (`support@horus-bot.com`) and Museum Partnerships (`museums@horus-bot.com`). **Remove the phone card entirely.** Keep Office: Cairo, Egypt. Subject options: Visitor support / Booking issue / Technical issue / Partnership request / Press inquiry. New message placeholder. Bottom CTA.
- **SiteFooter.tsx** — Update brand blurb to spec ("A new way to experience museums — guided, personalized, and effortless from start to finish.") Remove any phone numbers.

Tone guardrails applied everywhere: no "backend", "edge function", "LiDAR", "ROS", "AI-powered" (except small subtle use in chat), "revolutionary", "magical". Use product language: robot guide, companion app, guided museum experience, assigned robot, live tour support.

## Part C — App Demo Fixes

### C1. Checkout & purchase flow (`TicketsScreen.tsx`)
- Above the checkout button, add helper line: "You'll receive your ticket instantly after checkout." (EN/AR).
- Replace the destructive toast on 0 tickets with a soft inline message above the totals card ("Please select at least one ticket.") — no big red overlay.
- Success dialog title → "🎉 You're all set!" with subtitle "Your tickets are ready." Button stays "Go to My Tickets".
- On checkout, also persist a richer ticket object including `museum: "Egyptian Museum"`, formatted `date`, `status: 'active'` so My Tickets can render full cards. (Existing `addTickets` already saves to localStorage via AppContext — extend the Ticket shape in `src/lib/data.ts` with optional `museum` and `status` fields.)

### C2. My Tickets page (`MyTicketsScreen.tsx`)
- Empty state: title "No tickets yet", text "You do not have any tickets yet. Book your visit to get started.", primary button "Book a visit" → navigates to `/tickets`.
- Filled state: card per ticket showing museum name, formatted date, type + count, total price, a placeholder QR square (CSS pattern, no library), `Status: Active` badge, and two buttons: "View Ticket" (opens a simple dialog with ticket details + QR) and "Add to Wallet" (toast: "Wallet pass coming soon").
- Full EN/AR.

### C3. Chat error UX (`ChatModal.tsx`)
- Track a `failureCount` ref/state.
- On any error, do NOT surface raw error message. Replace fallback text:
  - 1st failure: "Something went wrong. Please try again." (AR equivalent).
  - 2+ failures: "Sorry, I'm having trouble right now. You can try again, or tap one of the options below." Keep `QuickReplies` visible (already always rendered).
- Remove the destructive toast that exposes `error.message`. Just log to console.
- Update initial greeting in `src/lib/i18n.ts` (`chatGreeting`) to: "Hi, I'm Horus-Bot 👋 I can help you with tickets, directions, exhibits, or your tour. What would you like to know?" + AR equivalent.
- Soften the "AI-Powered" subtitle — keep it small, change to "Museum guide" (EN) / "مرشد المتحف" (AR) since the user wants AI-powered de-emphasized.

### C4. Chat language behavior
- Update `SYSTEM_PROMPT` in `supabase/functions/horus-chat/index.ts`:
  - "You can communicate in Arabic, Egyptian Arabic (عامية مصرية), English, and other languages. Always reply in the same language and dialect the visitor used. If they wrote in Egyptian Arabic, reply in friendly Egyptian Arabic. Keep replies short, warm, and museum-focused."
- No code change needed in client — model handles dialect matching.

## Files to create
- `src/components/site/ScrollToTop.tsx`

## Files to edit
- `src/App.tsx` — mount `ScrollToTop`
- `src/index.css` — global gradient background layer, soften section dividers
- `src/components/site/SiteHeader.tsx` — full-viewport mobile overlay + backdrop
- `src/components/site/SiteFooter.tsx` — copy
- `src/pages/site/HomePage.tsx`
- `src/pages/site/AboutPage.tsx`
- `src/pages/site/ExperiencePage.tsx`
- `src/pages/site/AppPage.tsx`
- `src/pages/site/TicketsInfoPage.tsx`
- `src/pages/site/FaqPage.tsx`
- `src/pages/site/ContactPage.tsx`
- `src/pages/TicketsScreen.tsx` — helper line, soft 0-ticket message, new success modal, persist richer ticket
- `src/pages/MyTicketsScreen.tsx` — full empty + filled states with QR placeholder, View Ticket dialog
- `src/lib/data.ts` — extend `Ticket` type with optional `museum`, `status`
- `src/lib/i18n.ts` — chat greeting + new strings (My Tickets empty/filled, ticket statuses, view/wallet buttons, soft errors)
- `src/components/chat/ChatModal.tsx` — friendly fallback by failure count, remove technical toast, softer subtitle
- `supabase/functions/horus-chat/index.ts` — system prompt language behavior

## Out of scope
- Redesign, new pages, new visual identity
- Real screenshots (placeholders stay, just look intentional)
- Wiring contact form to a real inbox
- Real wallet pass generation
