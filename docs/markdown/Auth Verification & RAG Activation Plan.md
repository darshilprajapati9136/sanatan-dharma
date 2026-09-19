# Auth Verification & RAG Activation Plan

## 1. Automated coverage (done, runs in `npm test`)

- `tests/auth.test.ts` — open-redirect guard (`getSafeNextPath`): localized
  in-app targets pass, external/`//host`/non-locale/dot-segment targets fall
  back to the locale profile page.
- `tests/smoke.mjs` — signed-out profile redirects, unauthenticated `/api/me`
  exposes no user or profile (both locales).
- `tests/rag-gate.test.ts` — RAG off by default, dual-key activation,
  citation allowlist, input limits, bilingual abstention.

## 2. Manual test-account run (outstanding — needs a test Supabase project)

Do not use production data or a real user account.

1. Sign up with a disposable test address; confirm verification email arrives.
2. Log in, open `/en/profile`, save a preference, reload — value persists.
3. Log out — session ends, `/en/profile` redirects to localized login.
4. Expire/revoke the session — protected routes redirect, no crash.
5. Attempt `?next=https://evil.example` on login — must land on profile.

## 3. Database / RLS review (code-reviewed, not live-verified)

- `ENABLE ROW LEVEL SECURITY` is set on all public tables
  (`0000_initial_schema.sql`).
- `profiles_insert_own` restricts inserts to `authenticated` with
  `id = auth.uid()` (`0001_profiles_insert_policy.sql`).
- App reads go through server-side `getSession()` + `getCurrentProfile()`;
  failures return `null`, never throw to the page.
- Before touching production: apply migrations to a staging database first,
  confirm unauthorized reads/writes fail and authorized ones succeed.

## 4. RAG activation gates (enforced in `src/server/services/rag-gate.ts`)

RAG stays OFF until all hold:

1. `RAG_ENABLED=true` **and** `AI_API_KEY` are set (either missing = disabled).
2. Every citation resolves to approved local content
   (`learn:*`, `festival:*`, `calendar:*`, `scripture:*`) — unknown ids fail
   the whole answer set.
3. No approved evidence → serve `abstainResponse()` text plus the fixed
   reading pointers, never a generated answer.
4. Inputs capped at 300 chars; Panchang calculation never goes to an LLM
   (stays on `src/server/services/panchang-live.ts`).
5. Still required at activation time: multilingual evaluations, rate limiting,
   provider-failure drills, cost caps, and editorial sign-off of the approved
   corpus (`verification_status` in `approved`/`reviewed`).
