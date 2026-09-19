# QA & Release Checklist
## Sanatan Dharma Platform

**Purpose:** Provide a mandatory quality-assurance checklist for every page, feature, bug fix, and release.

A task is not complete only because the code runs.

A task is complete only after the relevant checks below are performed.

---

# 1. Functional Verification

Confirm that:

- the requested feature works;
- all primary user actions work;
- navigation behaves correctly;
- buttons trigger the expected action;
- forms submit correctly;
- validation works;
- data is saved correctly;
- data is retrieved correctly;
- redirects work;
- authentication-dependent behavior works;
- no major existing feature was broken.

---

# 2. Happy Path Testing

Test the normal expected flow from start to finish.

Examples:

- signup;
- login;
- logout;
- profile update;
- reading an article;
- switching language;
- searching;
- navigating through scripture content.

Do not test only isolated components.

---

# 3. Error Path Testing

Test what happens when:

- the network fails;
- the server returns an error;
- required data is missing;
- credentials are incorrect;
- permissions are insufficient;
- a route does not exist;
- a request times out;
- database operations fail.

Users should receive useful feedback.

---

# 4. Empty State Testing

Where a feature may have no data, verify:

- the page does not look broken;
- an intentional empty state appears;
- the user understands what happened;
- the next action is clear.

---

# 5. Loading State Testing

Check:

- loading indicators appear when necessary;
- layout does not jump excessively;
- skeletons are used where appropriate;
- loading text is understandable;
- users cannot accidentally submit the same action repeatedly.

---

# 6. Form Validation

For every form, test:

- empty required fields;
- invalid email;
- invalid lengths;
- invalid formats;
- whitespace-only values;
- duplicate submissions;
- special characters;
- extremely long text;
- server-side validation.

Do not rely only on browser validation.

---

# 7. Authentication Testing

For authenticated features, verify:

- logged-out behavior;
- logged-in behavior;
- session expiration;
- logout;
- protected routes;
- redirect logic;
- unauthorized requests;
- password reset if implemented;
- email verification if implemented.

---

# 8. Authorization Testing

Check that users cannot access data merely by changing:

- URL parameters;
- IDs;
- request payloads;
- frontend state.

Authorization must be enforced server-side where required.

---

# 9. Supabase / Database Testing

When database changes are involved, verify:

- migrations are correct;
- tables exist;
- columns are correct;
- constraints work;
- indexes are appropriate;
- RLS is enabled where needed;
- RLS policies work;
- unauthorized reads fail;
- unauthorized writes fail;
- authorized reads/writes succeed;
- no service-role credentials are exposed.

---

# 10. Data Integrity

Confirm that:

- duplicate data is not created unintentionally;
- relationships remain valid;
- required references exist;
- deletes do not orphan critical data;
- updates do not overwrite unrelated fields;
- timestamps behave correctly.

---

# 11. Responsive Testing

Test at minimum:

- narrow mobile;
- common mobile;
- tablet;
- laptop;
- desktop.

Verify:

- no horizontal overflow;
- navigation works;
- text wraps correctly;
- cards stack properly;
- buttons fit;
- forms remain usable;
- images scale;
- tables remain readable;
- modals fit the screen.

---

# 12. Mobile Interaction Testing

Check:

- tap targets are large enough;
- dropdowns work;
- menus close correctly;
- forms are easy to use;
- fixed elements do not block content;
- keyboard opening does not destroy layout.

---

# 13. Visual Consistency

Inspect:

- typography;
- spacing;
- alignment;
- colors;
- borders;
- shadows;
- border radius;
- button styles;
- card styles;
- icon styles.

The page should match:

`docs/DESIGN_SYSTEM_RULES.md`

---

# 14. AI-Generated Design Smell Check

Look specifically for:

- excessive gradients;
- giant headings;
- glowing cards;
- random blur effects;
- endless rounded cards;
- fake statistics;
- vague marketing copy;
- repeated three-column sections;
- unnecessary animations;
- excessive saffron/gold.

Remove or redesign them unless they have a clear product reason.

---

# 15. Accessibility Testing

Verify:

- keyboard navigation;
- visible focus states;
- correct semantic HTML;
- form labels;
- button names;
- alt text;
- heading hierarchy;
- color contrast;
- dialog accessibility;
- reduced-motion support.

Where practical, test with a screen reader.

---

# 16. Keyboard Testing

Navigate the page without a mouse.

Check:

- Tab order;
- Enter behavior;
- Space behavior;
- Escape behavior;
- focus trapping in dialogs;
- menu navigation;
- visible focus.

---

# 17. Content Accuracy Review

For religious, historical, or philosophical content, verify:

- references are correct;
- quotations are accurate;
- scripture names are correct;
- chapter/verse numbers are correct;
- disputed claims are presented carefully;
- interpretations are not presented as universal facts;
- no fabricated references exist.

Follow:

`docs/CONTENT_AND_CULTURAL_ACCURACY_STANDARDS.md`

---

# 18. Copy Review

Check for:

- spelling;
- grammar;
- repetitive wording;
- awkward machine-like phrasing;
- vague labels;
- unnecessary marketing language;
- inconsistent terminology.

Buttons and navigation should use clear language.

---

# 19. Hindi / Localization Testing

Verify:

- translations load;
- no untranslated keys appear;
- Hindi text is readable;
- navigation still fits;
- long translated strings do not break layout;
- language switch works;
- routes behave correctly after switching.

---

# 20. SEO Review

For public pages, check:

- title;
- description;
- H1;
- heading structure;
- canonical URL where needed;
- Open Graph metadata;
- indexability;
- structured data where appropriate;
- human-readable URL.

---

# 21. Link Testing

Check:

- internal links;
- external links;
- breadcrumbs;
- navigation;
- footer links;
- related content links.

There should be no accidental dead links.

---

# 22. 404 Testing

Visit a nonexistent route.

Verify:

- the 404 page appears;
- it matches the design system;
- navigation back to useful content exists.

---

# 23. Performance Review

Check for:

- oversized images;
- unnecessary JavaScript;
- duplicate requests;
- unnecessary client components;
- large third-party libraries;
- layout shifts;
- slow-loading fonts;
- expensive animations.

---

# 24. Image Testing

Verify:

- correct dimensions;
- proper compression;
- responsive behavior;
- alt text;
- no stretched imagery;
- no broken assets;
- correct captions.

For sacred imagery, verify respectful presentation.

---

# 25. Animation Review

Confirm that motion:

- serves a purpose;
- does not delay interaction;
- does not distract;
- is not repeated excessively;
- respects reduced-motion preferences.

---

# 26. Browser Testing

Where possible, test:

- Chrome;
- Safari;
- Firefox;
- Edge.

At minimum, prioritize Chrome and Safari for this project.

---

# 27. Console Review

Check the browser console.

Resolve unexpected:

- errors;
- warnings;
- hydration errors;
- failed requests;
- React warnings.

Do not ignore persistent console errors.

---

# 28. Network Review

Inspect network requests where relevant.

Check:

- duplicate requests;
- failed requests;
- sensitive data exposure;
- slow requests;
- incorrect status codes.

---

# 29. Security Review

Check for:

- secrets in frontend code;
- exposed environment variables;
- unsafe HTML rendering;
- injection risk;
- weak authorization;
- insecure uploads;
- sensitive error messages;
- unrestricted endpoints.

---

# 30. Environment Review

Verify:

- required environment variables are documented;
- `.env.example` is current;
- real secrets are not committed;
- development-only configuration is not accidentally used in production.

---

# 31. Dependency Review

If a package was added:

- confirm it is necessary;
- confirm it is maintained;
- confirm it is used;
- remove unused packages;
- update documentation if needed.

---

# 32. TypeScript Review

Run the available type check.

Look for:

- `any`;
- unnecessary type assertions;
- mismatched API types;
- ignored errors;
- unsafe null handling.

Do not silence errors without understanding them.

---

# 33. Lint Review

Run the project's lint command if available.

Fix meaningful warnings and errors.

Do not disable lint rules globally just to make checks pass.

---

# 34. Build Verification

Run the project build before major release.

Example only if supported by the project:

```bash
npm run build
```

A successful development server is not enough.

---

# 35. Test Verification

Run available automated tests.

Examples may include:

```bash
npm run test
npm run test:e2e
```

Use only scripts that actually exist.

---

# 36. Dead Code Review

Remove:

- unused imports;
- unused variables;
- obsolete components;
- old test code;
- temporary debug files;
- commented-out abandoned implementations.

---

# 37. Debug Artifact Review

Remove:

- `console.log`;
- temporary alerts;
- mock values;
- debug buttons;
- temporary credentials;
- temporary comments.

Keep deliberate logging where appropriate.

---

# 38. Code Duplication Review

Look for repeated:

- UI blocks;
- utility logic;
- validation logic;
- API logic;
- content definitions.

Extract shared logic only when doing so improves maintainability.

---

# 39. Overengineering Review

Ask:

> Did this feature become more complicated than necessary?

Remove unnecessary:

- abstractions;
- dependencies;
- state;
- components;
- layers;
- patterns.

---

# 40. Regression Testing

After major changes, re-check important existing flows.

At minimum consider:

- home;
- login;
- signup;
- profile;
- navigation;
- localization;
- authentication.

---

# 41. UX Review

Ask:

- Is the next action obvious?
- Is anything confusing?
- Is important information hidden?
- Are users forced to think unnecessarily?
- Are error messages useful?
- Does the interface require explanation?

Improve the UI if the answer reveals unnecessary friction.

---

# 42. Product Relevance Review

Ask:

> Does this feature actually belong in the product?

Do not preserve unnecessary features solely because development effort was already spent on them.

---

# 43. Professional Quality Review

Ask:

> If this feature were released by a serious professional product team, what would still look unfinished?

Fix the highest-impact issues before approval.

---

# 44. Documentation Review

Update documentation if the change affects:

- architecture;
- setup;
- environment variables;
- database;
- routes;
- major workflows;
- design system;
- content structure.

---

# 45. Agent Completion Report

After a substantial coding task, OpenCode/Cline should report:

## Changed

What was implemented.

## Files

Key files created or modified.

## Validation

Exactly what was run.

Example:

```text
npm run lint — passed
npm run typecheck — passed
npm run build — passed
```

## Manual Checks

What was manually tested.

## Remaining

Anything still unresolved or unverified.

---

# 46. No False Completion Claims

Never claim:

`Everything is perfect.`

or:

`All bugs are fixed.`

unless sufficient evidence exists.

Use precise statements.

Example:

`The implementation is complete and passed lint and build checks. Mobile Safari has not yet been manually tested.`

---

# 47. Severity Levels

QA issues may be classified as:

## Blocker

Release must not proceed.

Examples:

- authentication broken;
- sensitive data leak;
- data loss;
- major page inaccessible.

## Critical

Very serious problem.

Examples:

- authorization bypass;
- major functionality broken;
- mobile page unusable.

## Major

Important but not necessarily release-blocking.

Examples:

- incorrect validation;
- poor responsive behavior;
- significant accessibility issue.

## Minor

Small quality issue.

Examples:

- spacing inconsistency;
- minor text error.

---

# 48. Release Blocking Conditions

Do not release when:

- build fails;
- critical authentication flow is broken;
- severe security issue exists;
- data corruption is possible;
- major routes fail;
- production secrets are exposed;
- core mobile experience is unusable.

---

# 49. Release Candidate Checklist

Before a significant release, confirm:

- [ ] Functional flows tested
- [ ] Error paths tested
- [ ] Mobile tested
- [ ] Desktop tested
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Database policies reviewed
- [ ] Accessibility reviewed
- [ ] Localization reviewed
- [ ] Content accuracy reviewed
- [ ] SEO reviewed
- [ ] Performance reviewed
- [ ] Security reviewed
- [ ] Console reviewed
- [ ] Lint passed
- [ ] Types passed
- [ ] Build passed
- [ ] Relevant tests passed
- [ ] Documentation updated
- [ ] No real secrets committed

---

# 50. Page-Level Approval Checklist

Before approving an individual page:

- [ ] Clear purpose
- [ ] Clear H1
- [ ] Correct navigation
- [ ] Consistent layout
- [ ] Good spacing
- [ ] Readable typography
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Correct content
- [ ] Correct links
- [ ] Useful loading state
- [ ] Useful error state
- [ ] Useful empty state where relevant
- [ ] No generic AI filler
- [ ] No unnecessary decoration
- [ ] No console errors

---

# 51. Feature-Level Approval Checklist

Before approving a feature:

- [ ] Requirements satisfied
- [ ] Happy path works
- [ ] Failure path works
- [ ] Validation works
- [ ] Authorization works
- [ ] Responsive behavior works
- [ ] Accessibility considered
- [ ] Localization preserved
- [ ] Performance acceptable
- [ ] No security regression
- [ ] Tests/checks performed
- [ ] Documentation updated if needed

---

# 52. Content-Level Approval Checklist

For educational content:

- [ ] Claims verified
- [ ] Scripture references verified
- [ ] Quotations verified
- [ ] Translation attribution checked
- [ ] Interpretation clearly identified
- [ ] Historical uncertainty communicated
- [ ] Tone respectful
- [ ] No sensational claims
- [ ] No fabricated facts
- [ ] Sources recorded

---

# 53. Database Change Checklist

Before applying database changes:

- [ ] Schema understood
- [ ] Migration created
- [ ] Existing data considered
- [ ] Constraints reviewed
- [ ] Indexes reviewed
- [ ] RLS reviewed
- [ ] Policies reviewed
- [ ] Rollback/recovery considered
- [ ] Application code updated
- [ ] Types updated if applicable

---

# 54. Authentication Change Checklist

Before changing authentication:

- [ ] Signup works
- [ ] Login works
- [ ] Logout works
- [ ] Sessions work
- [ ] Protected routes work
- [ ] Invalid credentials handled
- [ ] Expired session handled
- [ ] Redirects correct
- [ ] Server-side authorization preserved
- [ ] Secrets protected

---

# 55. UI Change Checklist

Before approving major UI changes:

- [ ] Existing design system inspected
- [ ] Component reuse considered
- [ ] Desktop reviewed
- [ ] Mobile reviewed
- [ ] Interaction states reviewed
- [ ] Accessibility reviewed
- [ ] Animations justified
- [ ] AI design-smell check completed

---

# 56. Final Release Question

Before release, answer:

> Are we releasing because the feature is actually ready, or because the code has simply been written?

If the answer is the second, continue QA.

---

# 57. Mandatory Documents

All QA work must respect:

`docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`

`docs/AI_AGENT_INSTRUCTIONS.md`

`docs/DESIGN_SYSTEM_RULES.md`

`docs/CONTENT_AND_CULTURAL_ACCURACY_STANDARDS.md`

---

# Final Rule

A professional product is not defined by the absence of bugs.

It is defined by how deliberately the team handles quality, failure, uncertainty, consistency, and user trust.

**Build → Review → Test → Fix → Verify → Release**

Never:

**Build → Assume → Release**

**End of QA & Release Checklist**

# V1 execution record — 19 September 2026

## Passed

- Baseline and final ESLint, TypeScript checking and production build.
- Five content regression tests: bilingual retrieval, filters/unknown queries, sample data provenance, content-link integrity and message parity.
- HTTP smoke checks for 22 pages in each language (44 total), signed-out profile redirects, missing festival/noindex state, and signed-out account API returning null user/profile. Repeated against the production build on port 3001.
- Browser: Today inspected in English/Hindi at 320, 390, 768, 1024 and 1440 pixels, with no horizontal page overflow after refinements.
- Browser: saved article added, shown in Library, removed and empty state shown; language switch retains search query/filter; festival Vrat filter; Ask form returns related reading; Panchang details expand; mobile menu closes on navigation.
- Existing published Bhagavad Gita appears through the Supabase scripture library.
- Fresh production browser check: Hindi search renders with no console errors.
- Whitespace/diff check passes. No dependency or database changes.

## Limits requiring later verification

Authenticated signup/login/logout/profile save and session expiry were not exercised with a test account. Public-launch accessibility audit, provider integration, content review, full Hindi article translation and production RAG remain outstanding. No production deployment performed. Browser checks are recorded manual checks; the repeatable automated suite is content/HTTP based.

Next.js dev generated AGENTS.md and CLAUDE.md; these are framework documentation pointers, not application feature changes.

## V1 follow-up record — 19 September 2026 (festivals, guided paths, scriptures fallback)

- Added six festival/vrat guides (Navratri, Janmashtami, Maha Shivaratri, Ganesh Chaturthi, Makar Sankranti, Pradosh) with English+Hindi WHAT/WHY/HOW/SOURCES/RELATED structure; no invented dates.
- Homepage Upcoming section now previews four guides; festival detail Hindi external-source label generalised (was hardcoded to Ekadashi).
- Learn guided path expanded from one 3-step list to three tracks (foundations, scripture, practice) with ten new `daily` message keys in both locales.
- Scriptures page falls back to the five Learn scripture introductions when the database reader is empty.
- Passed: ESLint, `tsc --noEmit`, 5 content tests (incl. message parity), production build (108 pages), HTTP smoke EN+HI, live 200s for new festival slugs, `/en`+`/hi` Learn pages with all three tracks rendering in both languages, and linked Learn topics.
- Limits unchanged from the earlier record: no test-account auth exercise, no provider/RAG/production-deployment verification.

## V1 follow-up record — 19 September 2026 (upcoming spotlight)

- Homepage Upcoming section now shows three festivals plus two Vrat guides with one-line summaries, so both recurring observances (Ekadashi, Pradosh) surface on Today.
- Profile preferences (location, tradition, calendar) deliberately deferred: no such columns exist in `profiles`/`user_preferences`, and a live-database migration is out of scope for V1. Language preference already covers the submission need.
- Passed: ESLint, `tsc --noEmit`, 5 content tests, production build, HTTP smoke EN+HI, live rendering checks of the spotlight rows and summaries in both languages.

## V1 follow-up record — 19 September 2026 (explore gateways, metadata, readme)

- Replaced the five Explore redirects with real gateway pages: hub plus Deities, Mantras, Philosophy and Traditions built from existing Learn topics with `TopicCard` rows and related-reading links. No new message keys.
- Added `generateMetadata` to 14 routes (home, about, privacy, terms, login, signup, profile, scriptures index/detail/section, festival detail, explore hub and gateways), reusing existing i18n keys and database-backed titles with safe fallbacks.
- README now carries the 5-minute demonstration journey and the full bilingual route list.
- Passed: ESLint, `tsc --noEmit`, 5 content tests, production build, HTTP smoke EN+HI (previous redirect targets now return real pages), live 200s and content/title checks for all new Explore routes in both languages.
