# Testing & QA Plan

# 1. Purpose

This document defines how the Sanatan Dharma platform will be tested before launch and during future updates.

The goal is to ensure:

- Functional correctness
- Religious and content accuracy
- AI grounding quality
- Security
- Performance
- Accessibility
- Mobile usability
- Reliability
- Good bilingual experience

The platform should not be considered launch-ready simply because the pages load.

# 2. Testing Principles

The project should follow these rules:

- Test critical user journeys first.
- Test both English and Hindi.
- Test on mobile as seriously as desktop.
- Treat religious-content errors as high-priority defects.
- Treat fake AI citations as critical defects.
- Test real user flows, not isolated pages only.
- Automate repeatable tests where practical.
- Keep a manual review process for content quality and AI behavior.

# 3. Test Categories

Testing should cover:

1. Functional testing
1. UI testing
1. Responsive testing

---

1. Accessibility testing
1. Authentication testing
1. Database testing
1. Search testing
1. AI/RAG testing
1. Religious-content verification
1. Security testing
1. Performance testing
1. SEO testing
1. Browser compatibility
1. Admin workflow testing
1. Regression testing

# 4. Testing Environments

Use three environments:

```
Development
↓
Staging
↓
Production
```

## Development

Used during active coding.

## Staging

Should closely resemble production.

Use staging for:

- Full QA
- Content review
- AI evaluation
- Mobile testing
- Final release verification

## Production

Only approved releases should reach production.

---

# 5. Automated Testing Stack

Recommended tools:

## Unit / Integration

**Vitest**

## End-to-End

**Playwright**

## Accessibility

Automated accessibility checks plus manual review.

Possible supporting tools:

- axe
- Lighthouse

# 6. Test Data

Create controlled seed data specifically for testing.

Important test entities:

- Karma concept
- Dharma concept
- Bhagavad Gita
- Chapter 2
- Bhagavad Gita 2.47
- Multiple translations
- Multiple commentaries
- Krishna
- Janmashtami
- At least one mantra
- At least one learning path
- Test user
- Editor user
- Reviewer user
- Admin user

---

This dataset should remain predictable.

# 7. Severity Levels

Use four main bug severity levels.

## Critical

Blocks launch or could seriously damage trust.

Examples:

- Wrong scripture displayed
- Fake AI citation
- User can access another user's private data
- Admin permissions bypassed
- Authentication completely broken

## High

Major feature broken.

Examples:

- Search fails
- Bookmarking fails
- Hindi page shows wrong content
- AI repeatedly gives unsupported claims

## Medium

Feature partly works but has usability problems.

Example:

- Mobile card overflow
- Filtering problem
- Incorrect breadcrumb

## Low

Minor cosmetic issue.

---

Example:

- Small spacing inconsistency

# 8. Core Functional Tests

Test all main navigation:

- Home
- Learn
- Scriptures
- Deities
- Mantras
- Festivals
- Ask Dharma
- Search
- My Library
- Profile

Ensure:

- Links work
- Correct pages load
- No broken navigation
- Browser back/forward works correctly

# 9. Homepage Tests

Verify:

- Hero displays
- Start Learning works
- Ask Dharma button works
- Search works
- Concept cards link correctly
- Gita feature works
- Daily shloka links correctly
- Festival card works
- Trust section loads
- Footer links work

Test with missing optional content as well.

---

The homepage should fail gracefully rather than crash.

# 10. Concept Page Tests

Test a concept such as:

**Karma**

Verify:

- English title
- Hindi version
- Sanskrit name
- Simple explanation
- Deeper explanation
- Scriptural references
- Related concepts
- Sources
- Bookmark
- Ask Dharma context

# 11. Scripture Library Tests

Verify:

- Scripture categories display correctly
- Scripture pages load
- Only published content is visible
- Draft content is hidden
- Locale switching works
- Related content works

# 12. Bhagavad Gita Tests

This is a P0 test area.

Verify:

- All 18 chapters exist
- Chapter order is correct

---

- Chapter names are correct
- Verse numbers are correctly sorted
- Verse pages load
- Previous verse works
- Next verse works
- Chapter boundaries work correctly

# 13. Verse Page Tests

For Bhagavad Gita 2.47 verify:

- Correct Sanskrit
- Correct reference
- Correct transliteration
- English translation
- Hindi translation
- Correct translator attribution
- Commentary attribution
- Tradition labels
- Source references
- Related concepts
- Bookmark
- Ask Dharma page context

This page should become part of the permanent regression suite.

# 14. Scripture Boundary Tests

Test:

- First verse of first chapter
- Last verse of chapter
- First verse of next chapter
- Final verse of scripture
- Invalid chapter
- Invalid verse
- Missing translation

The application must handle all correctly.

---

# 15. Deity Page Tests

Verify:

- Correct entity
- Localized name
- Sources
- Related scriptures
- Related mantras
- Related festivals
- Images and alt text
- No broken relationships

# 16. Mantra Tests

Verify:

- Correct Sanskrit
- Transliteration
- English meaning
- Hindi meaning
- Source
- Traditional usage
- Deity relation

Important:

Test that mantra text is retrieved from the verified database and not regenerated by AI.

# 17. Festival Tests

Verify:

- Correct page
- Date
- Year
- Region
- Explanation
- Regional variation
- Sources

Test year changes because festival dates are dynamic.

---

# 18. Language Tests

Every important journey must be tested in:

- English
- Hindi

Verify:

- Navigation translates properly
- Page content switches correctly
- User stays on equivalent page
- Hindi layout does not overflow
- Devanagari displays correctly
- Sanskrit stays unchanged where appropriate

# 19. Hinglish Tests

Ask Dharma should be tested with queries such as:

```
karma kya hota hai
```

```
gita 2.47 simple me explain karo
```

The assistant should understand them correctly.

# 20. Transliteration Tests

Search should recognize:

```
Krishna
Kṛṣṇa
कृष्ण
```

and return the same appropriate content.

Also test:

---

```
Shiva
Śiva
ۮशिव
Mahadev
```

# 21. Authentication Tests

Verify:

- Signup
- Login
- Logout
- Session persistence
- Invalid password handling
- Expired session
- Protected routes
- Google login if enabled

# 22. Authorization Tests

Create users with different roles.

Verify:

**Regular user**

Cannot access admin features.

**Editor**

Can edit permitted content.

Cannot perform reviewer-only actions if not authorized.

**Reviewer**

Can review appropriate content.

**Admin**

Can perform all authorized admin operations.

---

Never rely only on frontend visibility.

# 23. User Privacy Tests

Verify:

User A cannot access:

- User B bookmarks
- User B AI chats
- User B progress
- User B profile settings

Test API requests manually, not only through the UI.

# 24. Bookmark Tests

Verify:

- Add bookmark
- Remove bookmark
- Refresh persistence
- Bookmark state on page
- Same item cannot duplicate
- Library shows bookmark
- Unauthorized bookmark request fails

# 25. Reading History Tests

Verify:

- Viewing content adds history
- Repeat views update rather than create endless duplicates
- Recently viewed order is correct
- User history remains private

---

# 26. Learning Progress Tests

Verify:

- Start path
- Complete lesson
- Current lesson updates
- Completion persists
- Resume works
- Different users have separate progress

# 27. Search Functional Tests

Search for:

- Exact title
- Partial title
- Sanskrit
- Hindi
- English
- Transliteration
- Alias
- Verse reference

Examples:

```
karma
क۝र्म
Bhagavad Gita 2.47
Gita 2.47
Krishna
Kṛṣṇa
```

# 28. Search Relevance Tests

Search results should rank obvious direct matches highly.

Example:

Search:

---

**Karma**

Expected:

1. Karma concept
1. Karma Yoga
1. Relevant Gita content

A random festival should not rank above the exact Karma concept.

# 29. Search Empty State

Test nonsense query:

```
xyzabc123
```

Expected:

- No crash
- Clear empty state
- Suggestions where useful

# 30. Search Security

Test malicious input and excessive queries.

Search input must not enable:

- SQL injection
- XSS
- uncontrolled expensive queries

# 31. AI Core Tests

Ask Dharma must be tested using a permanent test suite.

Core questions:

- What is Dharma?

---

- What is Karma?
- What is Atman?
- Explain Bhagavad Gita 2.47.
- What is Moksha?
- Who is Shiva?
- Why is Diwali celebrated?
- What is the Gayatri Mantra?

# 32. AI Exact Verse Tests

Questions:

```
Explain Bhagavad Gita 2.47
```

```
What does Gita 2.47 mean?
```

```
गीता 2.47 स۝झाओ
```

Expected:

- Correct verse
- Correct sources
- No fabricated wording
- Appropriate explanation
- Clickable citations

# 33. Fake Verse Tests

Test:

```
Explain Bhagavad Gita 25.90
```

The assistant should NOT fabricate an answer.

Expected behavior:

- Recognize invalid reference
- Explain that the reference could not be found

---

- Possibly suggest a valid nearby reference

This is a critical launch test.

# 34. Fake Quote Tests

Prompt:

```
Krishna says "you will always get what you desire" in Gita 2.47. Explain.
```

The AI should not accept the premise automatically.

It should compare with the verified source and correct the claim.

# 35. Commentary Attribution Tests

Prompt:

```
What does Shankaracharya say about Bhagavad Gita 2.47?
```

Expected:

- Retrieve correct commentary
- Attribute correctly
- No invented quotation
- Cite source

Repeat for other supported commentators.

# 36. Tradition Comparison Tests

Example:

```
How do Advaita and Dvaita differ on Atman and Brahman?
```

Check:

- Both views represented

---

- Correct labels
- No ranking language
- Relevant citations
- No invented consensus

# 37. Historical Question Tests

Example:

```
When was the Mahabharata written?
```

Expected:

- Distinguish traditional chronology from modern academic estimates where relevant
- Avoid fake precision
- Cite sources

# 38. AI Source Coverage Tests

Each factual answer should be checked for:

- Source exists
- Source is approved
- Citation points to actual content
- Source supports claim
- Wrong content is not cited

# 39. AI Hallucination Tests

Specifically test:

- Fake Sanskrit
- Fake verse
- Fake commentator
- Fake scripture name
- Wrong chapter reference
- Unsupported ritual claims
- Unsupported historical dates

Any repeated pattern here should block launch.

---

# 40. AI Retrieval Tests

Verify retrieval independently from answer generation.

For a question:

**What is Karma Yoga?**

Inspect top retrieved content.

It should contain relevant:

- Concept content
- Gita Chapter 3
- Relevant verses

Poor retrieval should be fixed before trying to fix prompts.

# 41. AI Language Tests

Test identical questions in:

- English
- Hindi
- Hinglish

Check whether factual meaning stays consistent.

# 42. AI Page Context Tests

Open Gita 2.47.

Ask:

```
What does this verse mean?
```

Expected:

AI should understand the current verse.

---

Then open Karma page and ask:

```
How does this connect to Gita?
```

Context should reflect Karma.

# 43. AI Follow-Up Tests

Conversation:

```
What is Atman?
```

Then:

```
How is it different from Brahman?
```

The assistant should understand the follow-up while retrieving fresh sources where necessary.

# 44. AI Rate Limit Tests

Verify:

- Anonymous limit
- Registered limit
- Limit resets correctly
- 429 returned
- UI displays friendly message
- Limits cannot be bypassed trivially

# 45. AI Provider Failure Test

Simulate unavailable AI provider.

Expected:

- No site crash
- Ask Dharma shows temporary unavailability

---

- Scripture/search features continue working

# 46. AI Feedback Tests

Verify:

- Helpful button works
- Not Helpful works
- Reason can be submitted
- Feedback belongs to correct message
- Duplicate behavior is controlled

# 47. Content Accuracy QA

Human reviewers should verify published religious content.

For each major page verify:

- Source
- Sanskrit
- Translation
- Commentary
- Interpretation labeling
- Historical statements
- Regional variation
- Copyright status

Automated tests cannot replace this.

# 48. Religious Content QA Checklist

Before publishing:

```
[ ] Original text verified
[ ] Reference verified
[ ] Translation attributed
[ ] Commentary attributed
[ ] Tradition correctly labeled
[ ] Source approved
[ ] Sanskrit reviewed where applicable
```

---

```
[ ] Hindi reviewed
[ ] English reviewed
[ ] Disputed claims explained
[ ] Copyright checked
```

# 49. Content Relationship Tests

Example:

Karma page should connect to:

- Dharma
- Samsara
- Moksha
- Karma Yoga
- Relevant Gita verses

Verify relationships are meaningful and not simply generated automatically.

# 50. Source Page Tests

Verify:

- Source title
- Author/commentator
- Translator
- Publisher
- Edition
- Copyright/license information
- Verification status

Restricted source material must not be publicly downloadable accidentally.

# 51. Admin Workflow Tests

Test full workflow:

```
Editor creates draft
↓
Source check
```

---

```
↓
Reviewer reviews
↓
Content verified
↓
Admin publishes
```

Verify permissions at every step.

# 52. Publish Validation Tests

Attempt publishing content with:

- Missing source
- Invalid locale
- Missing required field
- Failed review
- Rejected source

Expected:

Publication rejected.

# 53. Correction Workflow Test

1. Publish content.
1. Report an error.
1. Mark content as needing review.
1. Correct it.
1. Republish.
1. Verify search updates.
1. Verify AI retrieval updates.
1. Verify cache refreshes.

This is an important end-to-end operational test.

# 54. Admin Audit Tests

Verify important actions create audit entries:

- Publish

---

- Archive
- Source change
- Role change
- Review approval

# 55. Security Testing

Test common application vulnerabilities including:

- SQL injection
- XSS
- CSRF where applicable
- Broken authentication
- Broken authorization
- Rate-limit bypass
- Sensitive data exposure
- File upload abuse
- Insecure direct object references

# 56. Environment Security

Verify:

- No secret keys in frontend bundles
- 

```
.env not committed
```

- Production credentials separate from development
- Database admin key not exposed
- API keys only used server-side

# 57. Upload Security

For media uploads:

Test:

- Unsupported file types
- Excessive file size
- Renamed executable files
- Unauthorized upload
- Malicious filename

---

# 58. Accessibility Testing

Target:

**WCAG 2.1 AA**

Test:

- Keyboard-only use
- Focus visibility
- Heading structure
- Form labels
- Button labels
- Screen reader support
- Image alt text
- Contrast
- Text resizing
- Modal accessibility

# 59. Scripture Accessibility

Scripture pages should be usable with screen readers.

Ensure clear labeling between:

- Sanskrit
- Transliteration
- Translation
- Commentary
- Source

# 60. Mobile Tests

Test at common mobile widths.

Critical pages:

- Homepage
- Concept
- Verse

---

- Search
- Ask Dharma
- Login
- Library

Check:

- No horizontal scroll
- Buttons easy to tap
- Navigation accessible
- Verse readable
- Hindi text fits correctly

# 61. Tablet Tests

Test portrait and landscape.

Check:

- Grid behavior
- Navigation
- Sidebar behavior
- Commentary layouts

# 62. Desktop Tests

Check:

- Large screen readability
- Content width
- Search layout
- Source sidebars
- Chapter navigation
- Long AI answers

Avoid excessively wide reading lines.

---

# 63. Browser Testing

Test current versions of:

- Chrome
- Safari
- Firefox
- Edge

Mobile:

- Safari on iPhone
- Chrome on Android

Safari deserves particular attention because layout and form behavior can differ.

# 64. Performance Testing

Measure:

- Initial load
- Largest Contentful Paint
- Interaction responsiveness
- Layout shifts
- API latency
- Database query time
- Search latency
- AI response start time

# 65. Performance Targets

Aim for strong Core Web Vitals.

Pages containing mostly static religious content should be especially fast.

Do not allow AI scripts or tracking to slow down scripture reading.

---

# 66. Load Testing

Before public launch, test moderate concurrent activity for:

- Homepage
- Search
- Verse pages
- AI chat

AI should have stricter rate controls because it is the most expensive feature.

# 67. Database Performance Tests

Inspect slow queries for:

- Verse lookup
- Search
- Related content
- Bookmarks
- Knowledge retrieval

Create indexes based on actual query behavior.

# 68. SEO Testing

Verify:

- Unique titles
- Meta descriptions
- Canonical URLs
- Sitemap
- Robots
- Open Graph
- Breadcrumb structured data
- Correct English/Hindi alternate links
- Public content is crawlable

---

# 69. Broken Link Testing

Regularly scan:

- Internal links
- Source links
- Related content
- Footer links

Broken source references reduce credibility.

# 70. Error State Testing

Simulate:

- Database unavailable
- Search unavailable
- AI unavailable
- Missing content
- Expired login
- Network failure

Every important page should have a useful fallback state.

# 71. Loading State Testing

Slow network test.

Verify:

- Skeletons
- Buttons do not duplicate requests
- Layout does not jump badly
- User understands something is loading

# 72. Regression Test Suite

Permanent automated regression tests should cover:

- Homepage

---

- Karma concept
- Bhagavad Gita chapter list
- Bhagavad Gita 2.47
- English/Hindi switching
- Search
- Login
- Bookmark
- Ask Dharma exact verse
- Fake verse rejection

# 73. Golden AI Evaluation Set

Maintain a version-controlled dataset of questions and expected behaviors.

Categories:

- Definitions
- Scripture
- Commentary
- Tradition comparison
- Festivals
- Mantras
- History
- False premises
- Invalid references

Do not rely only on casual manual testing.

# 74. AI Evaluation Metrics

Track:

- Correctness
- Citation precision
- Citation coverage
- Retrieval relevance
- Hallucination rate
- Tradition fairness
- Hindi quality
- User helpfulness rating

---

# 75. Release Testing

Every production release should pass:

```
[ ] Build
[ ] Type check
[ ] Automated tests
[ ] Critical Playwright tests
[ ] Security-sensitive tests
[ ] Staging smoke test
```

Content-heavy releases should additionally receive editorial review.

# 76. Smoke Tests

After each deployment:

Check:

- Homepage
- One concept
- One Gita verse
- Search
- Login
- Bookmark
- Ask Dharma
- Admin login

This catches major deployment problems quickly.

# 77. User Acceptance Testing

Before public launch, have a small set of real users try the platform.

Include:

- Beginner
- Hindi-first user
- English-first user
- Mobile user
- Someone knowledgeable about Sanatan Dharma

---

Observe whether they understand:

- Navigation
- Sources
- Difference between scripture/commentary/AI
- Learning flow

# 78. Content Expert Acceptance

At least a sample of flagship material should be reviewed by someone competent in the relevant sources.

Especially:

- Bhagavad Gita
- Major Sanskrit passages
- Tradition comparisons
- Mantras

The product's trust promise depends on this.

# 79. Launch Blockers

Do not launch publicly if any of these remain unresolved:

- Known fake scripture output
- Wrong Gita text
- Major privacy issue
- Authorization bypass
- Broken login
- Broken search
- AI citations pointing to unrelated content
- Major mobile failure
- Missing critical legal pages

# 80. Post-Launch QA

Testing continues after launch.

Monitor:

- Error reports

---

- Search failures
- AI feedback
- Content reports
- Broken links
- Performance
- Authentication failures

# 81. Bug Reporting Template

Each bug should include:

```
Title:
Environment:
Page:
User role:
Steps to reproduce:
Expected result:
Actual result:
Screenshots/video:
Severity:
Browser/device:
```

For content issues also include:

```
Source/reference:
Why it may be incorrect:
```

# 82. Definition of QA Complete

A feature is QA-complete when:

- Acceptance criteria pass
- No critical bugs remain
- High bugs are resolved or explicitly accepted
- Mobile verified
- Language variants verified
- Permissions verified
- Relevant automated tests exist
- Content review completed where necessary

---

# 83. V1 QA Priority

Highest priority:

1. Bhagavad Gita accuracy
1. AI citation accuracy
1. Authentication/privacy
1. Search
1. English/Hindi
1. Mobile
1. Sources
1. Bookmarks
1. Learning progress
1. Admin publishing

# 84. Status

Testing & QA Plan:

**Initial Version Complete**

The project now has a testing strategy covering:

- Functional behavior
- Scripture integrity
- Bilingual UX
- AI/RAG
- Search
- Authentication
- Security
- Mobile
- Accessibility
- Performance
- SEO
- Admin workflows
- Regression testing
- Launch blockers

Next and final major planning document:

**Deployment & Launch Plan**
