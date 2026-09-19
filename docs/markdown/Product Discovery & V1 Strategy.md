# Product Discovery & V1 Strategy

## Product decision

A trusted daily companion for understanding and practising Sanatan Dharma.

TODAY → UNDERSTAND → PRACTISE → LEARN. Daily utility is the entry point; education and scripture remain the depth. This direction comes from the project owner's supplied research conclusions; no independent competitor study is claimed here.

## Preserved foundation

Next.js App Router, TypeScript, Tailwind tokens/components, next-intl locale routing, Supabase session refresh and protected account routes, Drizzle schema/migrations, source-labelled Learn content, and the database-backed scripture reader are preserved. No database mutation was required.

## Implemented submission experience

- Today: real civil date labelled IST, visibly illustrative Panchang preview, meaning, three optional practices, short learning, discovery, Ask and an honest observance-date availability state.
- Panchang: typed context, provider/provenance boundary, sample values without an applicable date, unavailable unverified fields, expandable details and terminology. Preview location is fixed New Delhi; it is never presented as detected user location.
- Festivals: Diwali, Holi, Navratri, Janmashtami, Maha Shivaratri, Ganesh Chaturthi, Makar Sankranti, Ekadashi, Pradosh; festival/vrat filters; what/why/how/source/related reading; homepage upcoming preview. No unverified dates.
- Learn: three guided tracks (foundations, scripture, practice) over existing articles, Hindi improvements for the primary journey, explicit fallback labels on legacy untranslated sections, browser-local saved reading and library.
- Scriptures: existing source/translation separation retained, interpretation context and links to beginner introductions. Reader availability depends on published Supabase content.
- Search: bilingual local index of Learn concepts, scripture introductions, festivals and Panchang terms; query normalization, typed results, filters, empty states. Not a full verse index or semantic search.
- Ask: deterministic matching to labelled reading. No model call, invented answer or calculated Panchang. Draft content is not promoted to verified evidence.
- Account: existing Supabase login/signup/profile flows preserved. No new personalization database.
- UI: responsive layout, active navigation, closing mobile menu on navigation, query-preserving language switch, skip link, reduced motion, honest About/privacy/preview terms.

## Data integrity and production gates

1. Contract and integrate a trustworthy Panchang provider with date, coordinates, timezone, calendar convention, transitions, attribution, freshness, timeout and failure behavior. Validate against independently checked locations/dates, daylight-saving boundaries and tradition-specific observance rules. Do not relabel the fixture live.
2. Establish editorial review and verify original texts, translations, licensing and source metadata. Existing Learn and new festival content remains draft/editorial, not religious authority. Several legacy Learn sections still use explicitly labelled English fallback.
3. Activate RAG only over approved content; implement citation validation, multilingual evaluations, abstention, rate limiting, provider failure and cost controls. Never route calendar calculation to an LLM.
4. Verify authenticated login, signup, profile save, cookie refresh and logout with a dedicated test account in a test environment. No account was created or live user data modified for development checks.
5. Complete public-launch privacy/terms/contact, monitoring, hosting, and accessibility review. This is a submission preview, not a claim of production readiness.

## Scope boundaries

No astrology consultations, paid priests, marketplace, ecommerce, social feed, messaging, Kundali, live stream, temple bookings, native app, gamification or complex dashboard.

## Demonstration journey

Run `npm run dev`. Open `/en`, inspect the sample label, follow Panchang and expand details, explore Festivals and filter Vrat, read Ekadashi, search `karma` or `कर्म`, use Ask to find reading, follow Learn's first step, save it and revisit Library. Switch to Hindi while searching; query and filters persist. Open Profile while signed out to verify the localized login redirect.

## Verification

Baseline lint/typecheck/build passed. See the dated execution record in QA & Release Checklist for the final change verification and limits. `npm test` covers retrieval and data-integrity contracts. `npm run test:smoke` verifies local HTTP routes against a running site (`BASE_URL` can override localhost:3000).
