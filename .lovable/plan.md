## Tasks 3 & 4 — Excitement Copy + Real Visuals

### Important note about assets

The brief references `/assets/images/`, `/assets/artifacts/`, and `/assets/prototype/`. **None of those folders exist** in this project. The only real visual assets available are:

- `src/assets/gem.jpg` — Grand Egyptian Museum exterior/hall photo (premium, atmospheric)
- `src/assets/onboarding.jpg` — museum/visitor scene
- `src/assets/exhibit-golden-mask.jpg` — Tutankhamun mask
- `src/assets/exhibit-rosetta.jpg` — Rosetta Stone
- `src/assets/exhibit-vase.jpg` — Egyptian artifact
- `src/assets/gem-complex-map.png` — GEM map
- `src/assets/ankh.png` — ankh symbol
- `public/banner.png` — large banner image

There is **no robot prototype photo**, **no app mockup screenshot**, and **no QR/ticket photo** in the repo. Plan therefore uses only the real assets above. If you have a robot prototype photo or app mockup, please upload it and I'll wire it into the System Status / App page.

---

### Part A — Copy rewrites (experience-driven voice)

**`HomePage.tsx`**
- Hero subtitle → "Horus-Bot leads your museum tour in real time, guiding you between exhibits while the companion app keeps everything you need in your hand — tickets, maps, content, and interaction." (+ Arabic).
- Final CTA heading → "Experience the Future of Museum Tours."
- Final CTA subtitle → "Book your visit and enjoy a guided tour led by an autonomous robot, supported by a smart companion app from the moment you arrive." (+ Arabic).

**`TicketsInfoPage.tsx`**
- Hero title → "Plan Your Visit in Minutes" / "خطّط لزيارتك في دقائق".
- Hero subtitle → "Choose your ticket, schedule your visit, personalize your tour, and get ready for a guided experience with Horus-Bot." (+ Arabic).

**`AppPage.tsx`**
- Hero subtitle → "Plan your visit, connect with your robot, and follow your tour — all in one app." (+ Arabic).
- Reframe section heading "Core Capabilities / What You Actually Get" to softer marketing voice (e.g., "Designed Around Your Visit / Everything You Need, Right in Your Hand").

**`FaqPage.tsx`**
- Prepend new first FAQ:
  - Q: "What is Horus-Bot?"
  - A: "Horus-Bot is an autonomous robot guide that leads your museum tour in real time, while the mobile app supports you with navigation, exhibit content, tickets, and interaction." (+ Arabic).
- Update default-open accordion items to include the new first item.

**Positioning sweep** — light edits on Home/Experience/App so Robot is consistently framed as the star and the App as companion (no structural changes).

---

### Part B — Real visuals (assets-only)

**`SectionHero.tsx`** — add optional `backgroundImage` prop. When set, render the image as an absolutely-positioned `<img>` behind content with a warm cream gradient overlay (`from-background via-background/85 to-background/60`) so the existing serif headline stays fully readable. Keeps current hero usage on pages that don't pass an image untouched.

**`HomePage.tsx`**
1. Hero → pass `backgroundImage={gem}` (`src/assets/gem.jpg`) so the landing hero feels like entering the Grand Egyptian Museum.
2. Product Overview → insert one full-width visual band between the heading and the 3 cards: `onboarding.jpg` inside a rounded ring-bordered frame with a soft gold gradient overlay and a small caption ("A guided journey through Egypt's greatest collections").
3. Robot / App / Experience cards (the 3 overview cards) — add a small 16:9 image header on top of each card:
   - Robot Guide → `gem.jpg` (museum hall conveying the robot's environment).
   - Companion App → `gem-complex-map.png` (map asset, fits "navigation in your hand").
   - Guided Experience → `onboarding.jpg`.
4. System Status section → add a note card stating "Functional prototype tested in real museum conditions. Prototype photo coming soon." (no fake image inserted). When a real prototype image is uploaded later, drop it here with the caption "Early prototype used for navigation and system testing."

**`ExperiencePage.tsx`** — add one slim 21:9 image strip above each `Stage`:
- Before Visit → `onboarding.jpg` (planning mood).
- At the Museum → `gem.jpg` (entrance/hall).
- During the Tour → `exhibit-rosetta.jpg`.
- Engagement → `exhibit-golden-mask.jpg`.
Each strip uses `object-cover`, rounded-2xl, warm gradient overlay, no text on top.

**`TicketsInfoPage.tsx`** — add a single decorative `exhibit-vase.jpg` thumbnail strip (rounded, low-opacity) below the hero before the price tiers, to break the card-heavy feel.

**`AppPage.tsx`** — replace the abstract "Screens You Will Use" mock cards with a softer presentation: keep the 5 phone-frame cards (already static, non-interactive), but add `gem-complex-map.png` as a faint background pattern behind the screens grid section (low opacity, decorative only). No fake clickable app surfaces.

All `<img>` tags get descriptive `alt` text and `loading="lazy"`. All imports come from `@/assets/...` (Vite-bundled), so no external URLs.

---

### Files touched

- edit `src/components/site/SectionHero.tsx` (add optional `backgroundImage` prop)
- edit `src/pages/site/HomePage.tsx` (copy + visuals)
- edit `src/pages/site/ExperiencePage.tsx` (stage image strips)
- edit `src/pages/site/TicketsInfoPage.tsx` (copy + decorative image)
- edit `src/pages/site/AppPage.tsx` (copy + decorative bg)
- edit `src/pages/site/FaqPage.tsx` (prepend "What is Horus-Bot?")

### Validation checklist (will be reported after implementation)

- All new images load from `src/assets/` (Vite-bundled, no external URLs).
- Hero text remains readable over the museum background (gradient overlay verified at the user's 1287px viewport and on mobile).
- No fake/clickable app surfaces introduced.
- New FAQ item appears first in EN and AR.
- All updated copy lines match the brief exactly in EN; Arabic translations provided.
- No layout/section removals.
