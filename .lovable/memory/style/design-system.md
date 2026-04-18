---
name: Design System
description: Cinematic museum theme — dark charcoal + warm gold, Cinzel/Inter (EN), Amiri/Noto Sans Arabic (AR)
type: design
---
# Cinematic Museum Theme

**Default mode:** Dark (`themeMode: 'dark'` in AppContext defaults).

## Palette (HSL tokens in src/index.css)
- Primary gold `#E6C068` → `41 70% 65%`, foreground dark ink `#1E1912` → `33 24% 9%`
- Dark surfaces: bg `#0F0F0F`, card `#1E1E1E`, popover `#262626`, section/secondary `#151515`, nav (sidebar) `#141414`
- Foreground `#F5F1E8` → `41 33% 94%`; muted-foreground `~#AAAAAA` → `0 0% 67%`
- Border `rgba(255,255,255,0.05–0.1)`; destructive `#E54848`
- Light mode: warm museum `#F7F2E8` bg, `#ECE7DD` cards

## Typography
- EN headings: **Cinzel** (serif), 0.02em tracking — applied globally to h1/h2/h3 + .font-serif
- EN body: **Inter**
- AR headings: **Amiri** (via `[dir="rtl"] h1/h2/h3`)
- AR body: **Noto Sans Arabic**
- Tailwind font sizes: `text-hero` (clamp 2–2.75rem, 1.1), `text-section` (13px, 0.08em uppercase)
- `.section-label` utility = uppercase gold Cinzel chip for editorial section headers

## Components
- **Button**: rounded-2xl, default h-52px, primary = gold bg + dark ink, hover gold-glow + scale 1.02; outline = gold border
- **Card**: rounded-3xl, border white/5, shadow-card (dark-tone)
- **Input**: rounded-2xl, bg white/5, gold focus ring
- **AppBar / BottomNav**: bg-sidebar (`#141414`), border white/5, gold active states

## Utilities
- `.bg-cinematic-hero` — radial gold wash over dark bg
- `.gold-border` — 1px primary/30 border
- `.gold-glow` — soft gold box-shadow
- `.section-label` / `.text-hero` — editorial typography
