# Project Memory

## Core
- App Name: "Horus-Bot" (Arabic: حورس-بوت). Never use old name "Ankhu".
- App Purpose: Connected ecosystem — marketing+booking website, mobile companion app, autonomous museum robot — all sharing ONE backend.
- Backend: Firebase project `horus-bot-app` (Auth + Firestore). Shared with mobile app and robot. Never create a second Firebase project, never use mock/local accounts, never write tickets without a real Firebase Auth userId.
- AI: `horus-chat` edge function on Lovable Cloud (Gemini), called via plain fetch from `ChatModal`. Not on Firebase yet.
- Design: Cinematic museum theme — warm cream background + gold #E6C068. Cinzel serif headings (Amiri AR), Inter body (Noto Sans Arabic AR). Site is locked to LIGHT mode (no dark/system theme switching).
- i18n: English & Arabic (RTL layout) supported globally via AppContext. RTL auto-swaps fonts to Amiri/Noto Sans Arabic via CSS.
- Layout: MainLayout provides bottom nav & floating chat (hidden on Splash/Onboarding/AR).
- Tech Constraint: Vite config `dedupe: ["react", "react-dom"]` prevents hook errors.
- Positioning: The robot is the main experience. The app/website are companions before/during/after the visit. Never frame the app as the main product.

## Memories
- [Firebase Backend](mem://architecture/firebase-backend) — Firebase project, collections (users, museumTickets, robotTourTickets, tourSessions), auth-uid linkage, booking contract
- [Design System](mem://style/design-system) — Cinematic museum palette, Cinzel/Inter + Amiri/Noto Sans Arabic typography, button/card/input styling
- [Animations](mem://style/animations) — Reusable CSS animations and interactive states
- [Layout System](mem://architecture/layout-system) — Global MainLayout wrapper and consistent navigation rules
- [Side Menu](mem://features/side-menu-navigation) — Side menu behavior, animations, and main content scaling
- [Interactive Map](mem://features/interactive-map) — Multi-floor map logic, GEM Complex assets, and markers
- [AI Chat](mem://features/ai-chat-system) — Chat integration with Gemini, rich media, and edge functions
- [Museum Features](mem://features/museum-features) — Tour planner, audio guides, events calendar, alerts, recommendations
- [Gamification](mem://features/gamification) — Favorites, achievements, quizzes, and visit timelines
- [Accessibility](mem://features/accessibility-system) — High-contrast themes, motion reduction, and font scaling
