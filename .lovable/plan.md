
The user wants to restructure the project so the **website** becomes a pre-visit marketing site (Home, About, Experience, Tickets, App, FAQ, Contact) while keeping the existing **app** experience intact for in-museum use. Same cinematic gold/dark brand, but spacious and editorial.

## Plan: Build Pre-Visit Marketing Website

### Architecture decision
Split routing into two zones:
- **Public website** (`/`, `/about`, `/experience`, `/tickets-info`, `/app`, `/faq`, `/contact`) — marketing, no bottom nav, no chat button, with a top **SiteHeader** + **SiteFooter**
- **App** (existing `/home`, `/map`, `/exhibits`, etc.) — unchanged, keeps `MainLayout` with bottom nav + chat

Update `MainLayout` to detect public routes and show `SiteHeader`/`SiteFooter` instead of bottom nav/chat. The existing `SplashScreen` at `/` becomes the new marketing **Home** page (or moves to `/launch`).

### New components
- `src/components/site/SiteHeader.tsx` — sticky dark nav: logo (Horus-Bot), links (Home/About/Experience/Tickets/App/FAQ/Contact), language toggle, "Book Tickets" gold CTA, "Open App" outline link → `/home`
- `src/components/site/SiteFooter.tsx` — dark grounded footer: brand blurb, nav columns, contact, socials, legal
- `src/components/site/SectionHero.tsx` — reusable cinematic hero band (radial gold wash, serif headline, subhead, CTAs)
- `src/components/site/FeatureCard.tsx` — editorial card with icon, gold title, body
- `src/components/site/StepCard.tsx` — numbered step with gold accent

### New pages (`src/pages/site/`)
1. **`HomePage.tsx`** (`/`) — Hero (Book Tickets / Download App) → "What is this experience?" (4 features) → "How it works" (4 steps) → Experience Highlights (4 cards) → App Preview mockup → Final CTA → Footer
2. **`AboutPage.tsx`** (`/about`) — Mission, Vision, The Idea (problem/solution), Team, Technology
3. **`ExperiencePage.tsx`** (`/experience`) — Before Visit, At the Museum, During the Tour, Engagement (quizzes/rewards), Accessibility
4. **`TicketsInfoPage.tsx`** (`/tickets-info`) — Marketing-style ticket options with prices, date/time picker preview, then redirects to actual booking flow at `/tickets` (existing)
5. **`AppPage.tsx`** (`/app`) — What it does, key features, screenshots placeholder, App Store / Google Play buttons
6. **`FaqPage.tsx`** (`/faq`) — Accordion of common questions
7. **`ContactPage.tsx`** (`/contact`) — Email, phone, location, contact form (zod-validated)

### Routing changes (`src/App.tsx`)
- `/` → new `HomePage` (marketing). Move splash to `/launch` or remove
- Add public routes above app routes
- Keep all existing app routes untouched
- App entry from website: header "Open App" → `/home` (or `/onboarding` if first visit)

### Layout changes (`src/components/layout/MainLayout.tsx`)
- Add `publicRoutes` list. On public routes: render `<SiteHeader/>` + children + `<SiteFooter/>`, hide bottom nav and chat
- On app routes: existing behavior

### i18n
- Add EN + AR strings for all new website copy in `src/lib/i18n.ts` (nav links, hero copy, section titles, FAQ, footer)
- Header language toggle uses existing `AppContext`

### Design alignment (already in place from prior work)
- Reuse `SectionLabel`, `Card`, `Button`, cinematic tokens
- More generous spacing on website (`py-24`, `gap-16`) vs app's compact rhythm
- Larger hero typography (`text-hero` 44px, scale up to 64px on desktop)

### Out of scope (separate follow-ups)
- Real payment integration on Tickets page (existing checkout stays)
- Blog/Partners pages (mentioned as optional)
- Real team photos / app screenshots — placeholders for now
- Email sending for contact form — form validates + shows toast; backend wiring later

### Files to create
- `src/components/site/SiteHeader.tsx`
- `src/components/site/SiteFooter.tsx`
- `src/components/site/SectionHero.tsx`
- `src/components/site/FeatureCard.tsx`
- `src/components/site/StepCard.tsx`
- `src/pages/site/HomePage.tsx`
- `src/pages/site/AboutPage.tsx`
- `src/pages/site/ExperiencePage.tsx`
- `src/pages/site/TicketsInfoPage.tsx`
- `src/pages/site/AppPage.tsx`
- `src/pages/site/FaqPage.tsx`
- `src/pages/site/ContactPage.tsx`

### Files to edit
- `src/App.tsx` (new routes)
- `src/components/layout/MainLayout.tsx` (public vs app layout switching)
- `src/lib/i18n.ts` (new EN/AR strings)
- `src/pages/SplashScreen.tsx` (move to `/launch` or repurpose)
