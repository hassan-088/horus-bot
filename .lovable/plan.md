
This is a comprehensive copy + UX polish pass across all 7 marketing pages plus 2 shared components. No redesign — only content rewrites, a few new sections on Home, and one mobile menu UX fix on Contact. I'll proceed page by page following the user's spec exactly.

## Plan: Final Product-Level Copy & UX Polish

### Approach
Rewrite all marketing copy to remove technical jargon (no backend, LiDAR, ROS, beacons, etc.) and replace with confident, user-facing product language. Add 2 new Home sections, fix Group pricing, fill App screenshots, add FAQ closing CTA, fix Contact mobile menu. Every English string keeps its Arabic counterpart via the existing `isRTL` ternary.

### Files to edit

**`src/pages/site/HomePage.tsx`** — Largest changes
- Hero: new headline "Smart museum tours powered by an autonomous robot" + revised subtext + small museum-facing line + replace "robot waiting at gate" risk
- Product Overview: collapse to 2-part explanation (robot + app), drop any "layers/backend" language
- Overview cards: keep robot + app, replace 3rd "backend" card with **Guided Tour Experience** (or Museum Support)
- Features section: rename to **Core Capabilities**, rewrite cards to benefit-led wording
- How It Works: rewrite step 3 ("greets you, app loads route") and step 4 (robot guides + app supports)
- App preview: add "Works before, during, and after your visit"
- **NEW Section: "For Museums & Cultural Institutions"** — title, subtext, 5 benefit bullets
- **NEW Section: "System Status"** — 4 product readiness bullets
- Footer CTA: "Start your guided museum tour with Horus-Bot" + new subtext

**`src/pages/site/AboutPage.tsx`**
- Hero: confident rewrite ("Built to operate in real museum environments…")
- Problem section: add museum-side problem (peak-hour guide availability)
- Solution section: strip technical mechanics, convert to impact statements
- Mission & Vision: tighten to spec wording
- Team: add multidisciplinary intro line above cards; 4 team cards (Product/Robotics/AI&Content/Mobile)
- Technology section: reframe as 4 capability categories (Autonomous Guidance / Intelligent Exhibit Narration / Companion Visitor App / Accessible Interaction) — no frameworks/sensors
- Remove any duplication of Home's "what is the product"

**`src/pages/site/ExperiencePage.tsx`**
- Hero subtext tightened
- Before Visit: "you" language, remove instructional tone
- At the Museum: rewrite headphones as supporting note; replace "pair with nearest robot" with "Connect with your assigned robot"
- During the Tour: add emotional intro line; rewrite cards in experience-first wording (no "synchronization/pairing")
- Engagement: outcome-led rewrites (quizzes/badges/photo points)
- Accessibility: add intro line "Designed to be usable by every visitor…"

**`src/pages/site/TicketsInfoPage.tsx`**
- Hero: "Book your visit" + new subtext + **urgency line** + **reassurance line**
- Adult/Student/Group cards: rewrite bullets per spec
- **Fix Group pricing**: change to "$80 / group (up to 5 people)" — critical fix
- Trust block: humanize the 3 trust items (cancellation/QR/secure payment)

**`src/pages/site/AppPage.tsx`**
- Hero: "Your entire museum experience, in one place" + new subtext + robot-connection line near top
- Store buttons: add "Download before your visit for the best experience" line
- Core functions: rewrite all 4 cards as user outcomes
- **Screenshots**: replace empty placeholders with 4–5 mockup phone frames showing labeled fake screens (Live navigation / Exhibit details / Ask the guide / Interactive quiz / Visit progress) — built with existing UI primitives since real app screens aren't exportable here
- Final CTA: "Install the app before you arrive" + new subtext

**`src/pages/site/FaqPage.tsx`**
- Reassuring tone rewrites for all existing answers
- **Add 2 questions**: "How long does the full experience take?" + "What happens if I get disconnected?"
- Set 1–2 questions open by default (`defaultValue` on Accordion — switch to `type="multiple"` if needed for 2 open)
- **Add closing CTA block**: "Still have questions?" + Book your visit button

**`src/pages/site/ContactPage.tsx`**
- Hero: add human subtext "Our team is here to help — before, during, and after your visit"
- Contact cards: add response expectations under each (replies within hours / partnerships scope / hours Sun–Thu); **remove placeholder phone** if it's clearly fake (+20 100 000 0000 in footer is placeholder — replace with email-only or generic "Available Sun–Thu, 9am–6pm" without fake number)
- Subject options: expand to 5 (Visitor support / Booking issue / Technical issue / Partnership / Press) — update Zod enum
- Message placeholder: "Tell us what you need — booking, support, or partnerships…"
- Add light trust line: "Built for museums, visitors, and cultural spaces in Egypt"
- **Add fallback CTA at bottom**: "Prefer a faster next step?" + Book your visit button
- **Mobile menu UX fix**: lock body scroll when mobile menu open (this lives in `SiteHeader.tsx`)

**`src/components/site/SiteHeader.tsx`**
- Mobile menu: add `useEffect` to toggle `document.body.style.overflow = 'hidden'` when open
- Ensure overlay has solid bg (not translucent) so form/page content doesn't bleed through
- No CTA label changes needed (already "Book Your Visit")

**`src/components/site/SiteFooter.tsx`**
- Replace brand blurb with: "Designed to help museums guide visitors through large and complex spaces with a more connected, accessible, and engaging experience." (+ AR)
- Remove any "robot, app, and backend" wording (currently says "tour management backend" — must remove)
- Fake phone number: remove or replace with "Available Sun–Thu, 9am–6pm"

### Out of scope
- Visual redesign (theme stays cinematic gold/dark)
- Real app screenshots (will use styled mockup frames built with existing UI primitives, labeled as preview)
- Backend wiring for Contact form (form still validates + toasts only)
- New pages

### Tone guardrails I'll apply everywhere
- Banned: backend, layer, LiDAR, ROS, SLAM, beacons, sensor fusion, MQTT, Firebase, AI models, NLP, sync, pairing-as-jargon
- Banned: revolutionary, magical, cutting-edge, immersive (unsupported), greets you by name, robot waiting at the gate
- Required: confident, calm, premium, short sentences, "you" language, benefit-first, museum-real
- Arabic stays Modern Standard, natural — not literal translation
