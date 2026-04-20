
The user wants real, specific, product-focused EN+AR copy across all marketing pages. The site already exists (Home, About, Experience, Tickets info, App, FAQ, Contact) with bilingual ternaries. I'll rewrite copy in place — no new files, no architecture changes.

## Plan: Rewrite Marketing Copy (EN + AR)

### Approach
Replace placeholder/marketing copy in the 7 site pages and shared site components with the user-provided structure. Keep all existing layouts, components, and CSS — only swap text strings. Every English string gets a matching natural Modern Standard Arabic string via the existing `isRTL` ternary pattern.

### Content map per page

**`HomePage.tsx`**
- Hero: headline "Smart Museum Tours, Powered by an Autonomous Robot and Companion App" / "جولات متاحف ذكية بقيادة روبوت ذاتي القيادة وتطبيق مرافق". Subhead explains robot + app + tour backend. CTAs: "Book Your Visit" / "احجز زيارتك", "Explore the System" / "اكتشف النظام"
- Product Overview block: "A Complete Smart Museum System" / "منظومة متحف ذكية متكاملة" — explain 3 parts (robot, app, backend) and how they sync
- Core Features (6 cards): Robot Navigation & Guidance, Interactive Mobile App, Real-Time Indoor Navigation, Multilingual Support (EN/AR), Personalized Tour Paths, Visitor Engagement — each with a real 1–2 line description
- How It Works (4 steps): Book online & receive QR ticket → Scan QR at entrance, app pairs with robot → Robot greets you, app loads your tour → Follow guided path with live narration
- App preview block + Final CTA "Start Your Smart Museum Experience" / "ابدأ تجربتك في المتحف الذكي"

**`AboutPage.tsx`**
- Problem cards: getting lost, information overload, language barriers, low engagement (each 1 line, real)
- Solution cards: indoor positioning + robot escort, curated 30/60/90-min paths, full EN/AR voice and text, quizzes + collectible badges
- Mission: "Make every museum visit personally guided, well-paced, and understood in the visitor's own language." / Arabic equivalent
- Vision: "Equip 50 museums across the region with autonomous guidance by 2030, reducing dependence on staffed tours and waiting lines." / Arabic equivalent
- Team + Technology blocks: keep structure, tighten copy

**`ExperiencePage.tsx`** — "What Happens During Your Visit" / "ما يحدث خلال زيارتك"
- Before Visit: pick date/time, choose tour length, download app, receive QR
- At the Museum: scan QR at gate, app pairs with nearest robot via Bluetooth, headphones recommended
- During the Tour: robot leads between exhibits, app shows 3D map + ETA, tap any exhibit for deep info, ask questions in EN/AR
- Engagement: per-exhibit quiz, badges saved to profile, photo capture spots flagged on the map
- Accessibility: wheelchair-friendly paths, adjustable text size, audio descriptions

**`TicketsInfoPage.tsx`**
- Each tier explains what's actually included: robot-guided tour, full app access, interactive quizzes, exhibit AR overlays (Group adds a dedicated robot)
- Trust strip: digital ticket via email, free cancellation up to 24h, payments encrypted (PCI-compliant processor)

**`AppPage.tsx`** — "The Control Center of Your Visit" / "مركز التحكم في زيارتك"
- 4 features with real function: Indoor map with live position, exhibit info library (text + audio + images), chat with the tour system for questions, push notifications for live talks and tour updates
- Screenshots placeholder section + store badges

**`FaqPage.tsx`** — Replace generic Qs with realistic ones:
- "Do I have to use the app?" — Recommended; without it you still get robot escort but no map/quizzes
- "What if the robot is busy?" — Up to 8 robots run in parallel; the app routes you to the next available one
- "Which languages?" — English and Arabic, with audio in both
- "Is it suitable for children?" — Yes; Family tour preset (45 min) with shorter stops and puzzles
- "Do I need internet?" — Museum Wi-Fi is provided and required for live navigation
- "Wheelchair access?" — All robot-guided paths are step-free

**`ContactPage.tsx`** — Tighten: support email for visitors, sales email for museum decision-makers, phone, location with map embed, contact form with subject options (Visitor support / Museum partnership / Press)

**`SiteHeader.tsx` / `SiteFooter.tsx`** — Verify nav labels are accurate ("Explore the System" CTA in header points to `/experience`); footer brand blurb rewritten to one realistic sentence in both languages.

### Files to edit
- `src/pages/site/HomePage.tsx`
- `src/pages/site/AboutPage.tsx`
- `src/pages/site/ExperiencePage.tsx`
- `src/pages/site/TicketsInfoPage.tsx`
- `src/pages/site/AppPage.tsx`
- `src/pages/site/FaqPage.tsx`
- `src/pages/site/ContactPage.tsx`
- `src/components/site/SiteHeader.tsx` (CTA labels)
- `src/components/site/SiteFooter.tsx` (brand blurb)

### Out of scope
- New pages or sections
- Layout/visual changes (cinematic theme stays as-is)
- Real images (placeholders remain — propose follow-up)
- Backend wiring for contact form

### Tone & language guardrails I'll apply
- No "revolutionary", "next-generation", "immersive journey", "amazing"
- Every claim is concrete (numbers, actions, outcomes)
- Arabic is Modern Standard, not literal — uses natural museum/visitor terminology
