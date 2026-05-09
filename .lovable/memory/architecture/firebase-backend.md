---
name: Firebase backend
description: Firebase project, collections, auth-uid linkage, and shared-ecosystem contract between website, mobile app, and robot
type: feature
---
# Firebase Backend (`horus-bot-app`)

The website, mobile app, and robot fleet ALL share the same Firebase project. A user created from any surface must be able to log in from any other surface.

## Project
- Project ID: `horus-bot-app`
- Auth domain: `horus-bot-app.firebaseapp.com`
- Web config lives in `src/integrations/firebase/client.ts` (public — safe to commit).
- Console setup checklist: `firestore.rules` (rules to paste), enable Email/Password sign-in, add the Lovable preview + published domains to authorized domains.

## Identity
- Source of truth: Firebase Auth UID.
- App-level user shape exposed by `useAuth()`: `{ id: uid, email }` — `id` is intentionally mapped from `uid` so consumer code (`user.id`) didn't need to change.

## Collections

| Path | Purpose | Owner field |
|---|---|---|
| `users/{uid}` | Profile (display_name, avatar_url, visit_count, …) | doc id = uid |
| `users/{uid}/favorites/{exhibitId}` | Saved exhibits | path |
| `users/{uid}/visitHistory/{auto}` | Exhibit visit log | path |
| `users/{uid}/progress/main` | Quiz, streak, AR-used, chat_count | path |
| `museumTickets/{auto}` | Museum entry ticket (shown in "My Tickets") | `userId` |
| `robotTourTickets/{auto}` | Robot guided tour config (duration, language, interests, accessibility) | `userId` |
| `tourSessions/{auto}` | Created in-museum when user scans robot QR (out of website scope) | `userId` |
| `exhibits/{id}`, `robots/{id}` | Public read-only catalog | — |

## Booking contract
- `BookPage` writes TWO docs per booking: a `robotTourTickets` doc, then a `museumTickets` doc with `robot_tour_ticket_id` linking to it.
- The museum ticket doc is denormalised — it embeds tour fields too — so the website's "My Tickets" cards render from a single read.
- `qr_value` (e.g. `HRSB-XXXX-YYYY`) is the museum entry pass; robot QR pairing is a separate step done in-museum by the mobile app.

## What does NOT use Firebase
- The `horus-chat` AI proxy is still a Lovable Cloud edge function (stateless Gemini call). `ChatModal` calls it via plain `fetch`. Migrate to a Firebase Cloud Function only if Lovable Cloud is later disabled.

## Forbidden
- Never create a second/separate Firebase project for the website.
- Never use `localStorage`-only mock accounts or fake tickets.
- Never write a ticket without a real Firebase Auth `userId`.
