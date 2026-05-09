## Goal
Replace the current Lovable Cloud (Supabase) backend with the existing Firebase project `horus-bot-app` so the website shares Auth users, profiles, and tickets with the future mobile app.

## What stays
- All UI, routes, design system, copy, i18n, MainLayout, chat UI.
- All marketing pages (`/`, `/about`, `/experience`, `/tickets-info`, `/app`, `/faq`, `/contact`).
- All in-repo "app" screens (`/home`, `/map`, `/exhibits`, …) — they keep working, just reading from Firebase instead of Supabase.

## What changes (code)

### 1. Install Firebase
- `bun add firebase`
- New file `src/integrations/firebase/client.ts` exporting `app`, `auth`, `db` (Firestore), `analytics` using the provided config. Hardcoded — these are public web config values.

### 2. Auth migration
- Rewrite `src/contexts/AuthContext.tsx`:
  - `onAuthStateChanged` instead of Supabase listener.
  - `signUp` → `createUserWithEmailAndPassword` + write `users/{uid}` profile doc.
  - `signIn` → `signInWithEmailAndPassword`.
  - `signOut` → Firebase `signOut`.
  - `updateProfile` → `setDoc(users/{uid}, ..., {merge:true})`.
  - Profile shape: `{ uid, email, displayName, avatarUrl, visitCount, createdAt, updatedAt }`.
- `src/pages/AuthScreen.tsx` keeps the same form; just calls the new context.
- `src/components/auth/ProtectedRoute.tsx` unchanged (it only reads `useAuth()`).

### 3. Tickets migration (the critical one for booking)
- Rewrite `src/hooks/useUserTickets.ts` to query Firestore:
  - `museumTickets` where `userId == uid`
  - `robotTourTickets` where `userId == uid`
  - Returned shape kept compatible with current consumers (`MyTicketsScreen`, `MyTicketsPage`).
- Rewrite the booking submit step in `src/pages/site/BookPage.tsx`:
  - On final confirm, write **two** docs:
    - `museumTickets/{auto}` with visitor categories, date, total, qr, status.
    - `robotTourTickets/{auto}` with tour duration, language, interests, accessibility, linked `museumTicketId`.
  - Both include `userId = auth.currentUser.uid` and server timestamps.
- Robot QR pairing is explicitly **out of scope** for this pass (you described it as a third step that happens at the museum via the app).

### 4. Other Supabase reads
Replace with Firestore equivalents (collections under `users/{uid}/...` for per-user data):
- `useCloudSync.ts`, `FavoritesScreen`, `VisitHistoryScreen`, `ProgressScreen`, `AchievementsScreen` — switch to subcollections `users/{uid}/favorites`, `users/{uid}/visitHistory`, `users/{uid}/progress`.
- These keep their current UI; only the data layer changes.

### 5. Edge function (`horus-chat`)
- The Supabase edge function uses `LOVABLE_API_KEY` for Gemini. Two options:
  - **(chosen)** Keep the edge function as-is for now — it's stateless AI calls and doesn't need Firebase. The chat UI already calls it via `supabase.functions.invoke`. We'll switch this call to a plain `fetch` to the function URL so we can later remove the Supabase client entirely. Functionally identical.

### 6. Remove Supabase
- Delete `src/integrations/supabase/` imports from all touched files.
- Leave `src/integrations/supabase/client.ts` and `types.ts` in place (auto-generated, harmless) but stop importing them. We can fully delete after verifying nothing breaks.
- `.env` Supabase vars stay (managed file) — unused.

### 7. Memory + plan
- Update `mem://index.md` Core: backend is now Firebase (`horus-bot-app`), shared with mobile app and robot.
- Add `mem://architecture/firebase-backend.md` documenting collections (`users`, `museumTickets`, `robotTourTickets`, `tourSessions`, etc.) and the auth-uid linkage rule.

## What you (the user) must do in Firebase Console
I'll deliver these as a checklist + a `firestore.rules` file:
1. **Authentication → Sign-in method**: enable **Email/Password**. (Optional: Google.)
2. **Authentication → Settings → Authorized domains**: add
   - `id-preview--368a436a-bb42-4087-9005-93c36ffc0095.lovable.app`
   - `horus-bot.lovable.app`
   - any custom domain you publish to.
3. **Firestore Database**: create database in production mode.
4. Paste the security rules I'll provide (`users/{uid}` self-only; `museumTickets`/`robotTourTickets` readable+writable only when `request.auth.uid == resource.data.userId`).

## Out of scope (explicitly)
- Robot QR pairing & `tourSessions` (in-museum flow).
- Migrating existing Supabase data — Supabase has only your test accounts; you confirmed app isn't launched.
- Native mobile app code.
- Storage bucket setup (no uploads in current site).

## Risk / heads-up
- Firebase Auth password resets, email verification, and OAuth providers are configured in Firebase Console — not in code.
- Until you enable Email/Password in the console, sign-up will throw `auth/operation-not-allowed`. Expected.
- The chat edge function still lives on Lovable Cloud. If you ever delete the Supabase project, we'll need to move the Gemini proxy to a Firebase Cloud Function or call the Lovable AI Gateway directly from a small Vercel-style endpoint.

Approve and I'll execute the migration in one pass.