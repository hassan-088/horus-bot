
The user wants to rebrand the website to match a premium "cinematic museum" theme from their mobile app: dark charcoal + warm gold (#E6C068), Cinzel serif headings, Inter body, Amiri/Noto Sans Arabic for RTL. I'll align the global design system without rewriting every page — most components already consume CSS variables and Tailwind tokens, so updating those tokens will cascade brand-wide.

## Plan: Adopt Cinematic Museum Theme

### 1. Update design tokens (`src/index.css`)
Replace existing HSL design variables with the cinematic palette:
- `--background`: `#0F0F0F`, `--card`: `#1E1E1E`, `--popover`: `#262626`, `--secondary/section`: `#151515`
- `--primary`: gold `#E6C068` with dark ink foreground `#1E1912`
- `--foreground`: `#F5F1E8`, `--muted-foreground`: `rgba(255,255,255,0.58)`
- `--border`: `rgba(255,255,255,0.05)`, `--destructive`: `#E54848`
- Update `--home-bg`, `--map-bg`, `--map-container`, `--teal`, `--success`, `--warning` to harmonize with gold/dark
- Update light theme to use warm museum surfaces (`#F7F2E8`, `#ECE7DD`)
- Set default app to **dark mode** (museum cinematic feel) — add `class="dark"` on `<html>` in `index.html` or via root effect
- Add gold-glow shadow tokens (`--shadow-glow`, `--shadow-card`)
- Add radial-gradient + dark-overlay utility classes for hero sections

### 2. Update typography (`src/index.css` + `tailwind.config.ts` + `index.html`)
- Add Google Fonts links in `index.html`: Cinzel, Inter, Amiri, Noto Sans Arabic
- Replace `tailwind.config.ts` font families:
  - `serif` → Cinzel (headings)
  - `sans` → Inter (body)
  - Add `font-heading-ar` (Amiri) and `font-body-ar` (Noto Sans Arabic)
- Add base CSS rule: `[dir="rtl"]` switches font stacks to Arabic equivalents
- Update body default to Inter; headings (`h1-h3`, `.font-serif`) to Cinzel with appropriate letter-spacing
- Add font-size utilities: `text-hero` (44px/1.1), `text-section` (13px uppercase, 0.8px tracking)

### 3. Refine shared components for editorial feel
- **Button** (`src/components/ui/button.tsx`): bump default size to height 52px, radius 16px, add gold-glow hover; primary uses gold bg + dark ink
- **Card** (`src/components/ui/card.tsx`): default radius 24px, subtle 1px white/5% border, `shadow-card`; add `glass` variant (backdrop-blur + translucent dark)
- **Input** (`src/components/ui/input.tsx`): rounded-2xl, dark fill `white/5`, gold focus ring

### 4. Hero & landing polish
- **SplashScreen**: keep, but swap headline font to Cinzel and add gold radial wash overlay
- **HomeScreen**: introduce cinematic dark hero band with gold serif headline, supportive muted subtitle, prominent "Book Tickets" (gold) + "Download App" (outline) CTAs; add editorial section chips (uppercase gold labels: "MISSION", "ROBOT", "TICKETS")
- Add reusable `<SectionLabel>` component (uppercase, 13px, gold, 0.8px tracking) for editorial section headers

### 5. Navigation surfaces
- **AppBar / BottomNav**: use `--color-nav` (`#141414`), gold active states, refined line icons
- **Side menu** (in HomeScreen): dark glass panel with gold title accents

### 6. RTL parity
- Confirm `AppContext` toggles `dir="rtl"` on `<html>`; CSS rule swaps to Amiri/Noto Sans Arabic automatically
- Audit any hardcoded `text-left`/`ml-*` usages in shared components — replace with logical `text-start`/`ms-*` where it matters

### Out of scope (can follow up)
- Rewriting every individual screen's layout (Tickets, Events, etc.) — they will inherit the new tokens automatically
- New marketing pages (Mission/Team/Technology) — propose as separate task if desired

### Files to edit
- `src/index.css` (tokens, base typography, utilities)
- `tailwind.config.ts` (fonts, colors, font sizes, shadows, radii)
- `index.html` (Google Fonts, default dark class)
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/pages/HomeScreen.tsx` (hero band + CTAs)
- `src/pages/SplashScreen.tsx` (font swap)
- `src/components/layout/AppBar.tsx` + `BottomNav.tsx` (nav surface)
- New: `src/components/ui/section-label.tsx`

### Memory updates
Save the new cinematic palette, fonts, and shadow tokens to `mem://style/design-system` so future work stays on-brand.
