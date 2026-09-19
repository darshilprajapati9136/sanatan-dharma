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

## 5. Account features staging runbook (code complete, migration unapplied)

Shipped in main but inert until migration `0002_account_features_manual.sql`
is applied to a staging database: new API routes answer 401 signed-out and
503 on any database error; profile shows defaults; reading list stays local;
progress reporting is silent. Nothing writes when the tables are absent.

Known pre-existing drift (do NOT paper over — reconcile first): the live
`bookmarks` table uses `(content_type, content_id)` while the Drizzle schema
expects `verse_id`; `reading_progress` exists in the schema but not in the
0000 migration. The 0002 file is deliberately untracked by the drizzle
journal so `db:migrate` can never apply it by accident.

Staging apply and verify:

1. `psql "$STAGING_DATABASE_URL" -f src/db/migrations/0002_account_features_manual.sql`
2. Point `.env.local` at staging (Supabase URL/key + `DATABASE_URL`), run
   `npm run dev`, complete the §2 manual run with a disposable test address.
3. Save location/tradition/calendar on `/en/profile` — reload shows them.
4. Save two Learn articles signed out, sign in, open Library — both persist;
   remove one, reload — removal persists.
5. Open a scripture section signed in — `reading_progress` gains a row with
   an honest section-position percentage.
6. Confirm RLS: direct anon-key reads of `learn_bookmarks` return nothing;
   authenticated reads return own rows only.
7. Restore `.env.local` to project values when done.
