
## Goal

Two production-cleanup tasks on the marketing site, no redesign:

1. Force the entire website (and app shell) to permanent light mode.
2. Confirm/clean any fake-app or Lovable-preview exposure, polish the early-access modal, and run a full clickability audit.

---

## Task 1 — Force light mode everywhere

Root cause: `src/contexts/AppContext.tsx` defaults `themeMode: 'dark'` and persists it to localStorage under `ankhu-app-state`. Returning desktop visitors keep the stored `dark`. Mobile (fresh storage) ends up light only by accident.

### Changes

**`src/contexts/AppContext.tsx`**
- Change `ThemeMode` type to `'light'` only (or keep type but force value).
- Set `defaultState.themeMode = 'light'` and `highContrast: false`.
- In the theme `useEffect`, always remove `dark` and `high-contrast` from `<html>` and never add them back. Remove the `prefers-color-scheme` matchMedia branch entirely.
- In the persisted-state hydration, ignore any saved `themeMode` / `highContrast` (force them back to `'light'` / `false` after parsing) so existing visitors with `dark` in localStorage are normalized on next load.
- Keep `setThemeMode` / `setHighContrast` as no-ops (or remove from context) so any leftover settings UI cannot re-enable dark.

**`src/index.css`**
- Leave `.dark { ... }` and `.high-contrast { ... }` blocks in place (they’re harmless once the class is never applied), OR delete them for cleanliness. Recommend: leave them — no risk, smaller diff.
- No other CSS changes; the warm cream/gold light palette in `:root` is already correct.

**`src/pages/SettingsScreen.tsx`** (app shell, not site, but uses same context)
- If it exposes a Theme / High-contrast toggle, hide those rows so users can’t re-flip dark mode. Keep language and font-scale controls. (Will verify and patch in build mode.)

Result: every route, on every viewport and language, renders the light Horus-Bot palette. No system-preference detection. No persisted dark state.

---

## Task 2 — Fake-app exposure, app-store modal, clickability audit

### Findings from the project scan

- Project-wide search for `lovable.app`, `iframe`, `webview`, `gptengineer`, `cdn.gpteng`, `Edit with Lovable`, `preview-badge` returned **no matches**. There is no embedded simulator, iframe, or Lovable badge in source. The `index.html` contains only meta tags and the app entry.
- The “Edit with Lovable” badge is injected by Lovable’s published hosting, not by source code. To remove it from the published site we’ll call the publish-settings tool to set `hide_badge = true` (in build mode).
- `SiteHeader.tsx` mobile + desktop nav has no “Open App” buttons. All Book CTAs route to `/book`. The `App` nav item points to `/app` (the marketing page about the companion app), not to the in-browser app shell. Good.
- `AppPage.tsx` “App Store” and “Google Play” buttons already only open `<ComingSoonModal>`. Same modal is reused for early-access on store buttons.
- `BookPage.tsx` 5-step booking flow is in place (Account → Tickets → Date/Time → Personalize → Payment) with success modal and `View My Tickets` route to `/tickets-mine`.
- `ContactPage.tsx` form uses zod validation and toast feedback. Footer social/Privacy/Terms links are placeholder `href="#"` (will be made non-clickable buttons or removed).

### Changes

**`src/components/site/ComingSoonModal.tsx`** — rewrite copy to match the spec exactly:
- Title: `Early Access to the Horus-Bot App` / `الوصول المبكر إلى تطبيق Horus-Bot`
- Body: `The Horus-Bot app is currently available in early access. Join to experience it during the demo.` (+ AR equivalent)
- Buttons: `Request Access` (primary, opens email capture) and `Close`.
- Email capture sub-step keeps the existing toast confirmation.
- Remove any “Join early access”/“Open App Demo” phrasing not in spec.

**`src/components/site/SiteFooter.tsx`** — remove dead clickability:
- Convert social icons (`href="#"`) into non-link `<button>`s that do nothing or remove the anchor wrapper, since they go nowhere. Preferred: keep icons but as plain non-interactive elements (no hover affordance), or wire them to `mailto:` for now. Will replace `href="#"` with a clean placeholder that does not look broken (cursor-default, no underline, aria-disabled).
- Same treatment for Privacy / Terms anchors: either remove or route to `/contact` until real pages exist. Recommend routing both to `/contact` so they’re never dead.

**`src/pages/site/AppPage.tsx`** — no behavioral change; verify both `StoreButtons` instances open only the modal (they do).

**Publish settings (build-mode tool call)**
- `publish_settings--set_badge_visibility { hide_badge: true }` to remove the “Edit with Lovable” badge from the published site (requires Pro plan; if it errors, we’ll surface a note).

### Clickability audit checklist (verified after edits)

- Header desktop: Home, About, Experience, Tickets, App, FAQ, Contact, Language toggle, My Tickets (auth), Book Your Visit → all route correctly.
- Header mobile: hamburger opens overlay, same items, language and Book button work, overlay closes on route change.
- Footer: Explore links route correctly; social/legal links no longer behave as broken `#` anchors.
- Home page CTAs: Book → `/book`, Explore the App → `/app`.
- Tickets-info CTAs: Book → `/book`.
- App page: App Store / Google Play → early-access modal only. No app-shell route.
- FAQ: accordion expand/collapse works (shadcn Accordion, type=`multiple`).
- Contact form: zod-validated, success toast.
- Booking flow: 5 steps, Back/Continue gating, payment success modal, “View My Tickets” → `/tickets-mine`.
- Language toggle: EN ↔ AR, RTL applied via `<html dir>` from `AppContext`.
- No iframe, webview, or Lovable preview anywhere in source.

---

## Out of scope

- No layout, copy (other than the modal text), color, or section changes.
- No new pages or features.
- App shell (`/home`, `/map`, etc.) is unchanged except the forced-light theme effect.

## Validation deliverable

After implementation I will reply with the explicit checklist (Header / Mobile menu / Footer / Booking / App modal / FAQ / Contact / Language / Fake-app / Broken buttons) marked checked.
