# AI Agent Instructions
## Sanatan Dharma Platform

**Purpose:** Operational instructions for OpenCode, Cline, coding agents, and AI development assistants.

This file defines how AI coding agents must behave when working on this repository.

---

# 1. Read Before Coding

Before making any substantial change, read:

1. `docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`
2. Relevant PRD/product documentation
3. Relevant technical/architecture documentation
4. Relevant UI/UX documentation
5. Existing code related to the requested feature

Do not start coding based only on the latest prompt.

Understand the project first.

---

# 2. Treat Existing Architecture as Intentional

Do not rewrite working systems simply because another implementation is possible.

Before introducing a new pattern:

- inspect existing patterns;
- reuse existing utilities;
- reuse existing components;
- reuse existing types;
- reuse existing services;
- follow existing naming conventions.

Prefer consistency over personal implementation preference.

---

# 3. Do Not Perform Unrelated Changes

Only change what is required for the current task.

Do not:

- redesign unrelated pages;
- rename unrelated files;
- modify unrelated database structures;
- change existing styles globally without reason;
- rewrite working components;
- install unrelated packages;
- clean up unrelated code unless explicitly requested.

If unrelated problems are discovered, report them separately.

---

# 4. Plan Before Implementation

For any non-trivial task, internally determine:

- what files are involved;
- what existing systems are affected;
- what data is required;
- whether database changes are needed;
- whether API changes are needed;
- security implications;
- responsive implications;
- accessibility implications;
- localization implications;
- possible regressions.

Do not begin with random file creation.

---

# 5. Do Not Invent Project Facts

Never invent:

- API endpoints;
- database tables;
- database columns;
- environment variables;
- authentication behavior;
- package APIs;
- routes;
- configuration values;
- user data;
- content sources.

Inspect the project before assuming they exist.

---

# 6. No Fake Content

Never create fake:

- testimonials;
- user counts;
- religious authorities;
- reviews;
- ratings;
- partnerships;
- statistics;
- achievements;
- quotations;
- scripture references.

Use placeholders only when clearly marked and genuinely necessary during development.

---

# 7. Avoid Generic AI UI

Do not default to:

- giant gradient hero sections;
- random glowing effects;
- excessive glassmorphism;
- endless rounded cards;
- fake dashboard statistics;
- floating animated objects;
- meaningless icons;
- decorative elements without purpose;
- repetitive three-column feature sections;
- generic SaaS-style layouts;
- overuse of saffron/gold simply because the topic is Sanatan Dharma.

Design should follow the actual information architecture.

---

# 8. Professional UI Standard

Every page should have deliberate:

- hierarchy;
- spacing;
- typography;
- alignment;
- content width;
- responsive behavior;
- interaction states;
- visual consistency.

UI decisions must appear intentional.

---

# 9. Mobile Is Mandatory

Do not consider a feature complete if only desktop works.

Check:

- mobile navigation;
- text wrapping;
- horizontal overflow;
- touch targets;
- forms;
- dialogs;
- tables;
- cards;
- images;
- spacing;
- long translated strings.

Mobile layouts may require structural changes instead of simple shrinking.

---

# 10. Accessibility Is Mandatory

Use semantic HTML.

Prefer:

- `<button>` for actions;
- `<a>` for navigation;
- proper headings;
- labels for form fields;
- alt text for meaningful images;
- keyboard-accessible interactions;
- visible focus states.

Do not build interactions that work only with a mouse.

---

# 11. Handle All Important States

Where relevant, implement:

- loading;
- success;
- empty;
- disabled;
- validation;
- unauthorized;
- error;
- not-found states.

A working happy path is not sufficient.

---

# 12. Validate User Input

Do not trust client-side data.

Validate inputs at the appropriate boundary.

Consider:

- type;
- length;
- format;
- required fields;
- allowed values;
- authorization.

Frontend validation improves UX.

Backend validation protects the system.

Both may be required.

---

# 13. Protect Sensitive Data

Never expose:

- service-role keys;
- secrets;
- private tokens;
- internal credentials;
- unrestricted admin functionality.

Never place secrets in client-side code.

Never commit real secrets to the repository.

---

# 14. Authentication Rules

When working on authenticated features:

- verify server-side authorization;
- handle expired sessions;
- handle unauthenticated users;
- avoid trusting frontend role checks alone;
- preserve redirect behavior;
- avoid leaking private data.

---

# 15. Supabase Rules

When Supabase is involved:

- inspect existing schema first;
- inspect existing RLS policies;
- enable RLS where necessary;
- use appropriate policies;
- avoid broad public access;
- avoid using service-role credentials in the browser;
- preserve existing migrations and naming conventions.

Do not modify database security casually.

---

# 16. TypeScript Rules

Avoid `any` unless there is a strong technical reason.

Prefer:

- explicit interfaces/types;
- shared types where appropriate;
- discriminated unions when useful;
- schema validation for external data.

Do not use type assertions merely to silence errors.

Fix the underlying type issue where possible.

---

# 17. Component Rules

Components should have clear responsibility.

Avoid giant components containing:

- data fetching;
- form logic;
- business logic;
- styling logic;
- dozens of nested UI sections

all in one file.

Split components when it improves clarity.

Do not over-fragment tiny components without benefit.

---

# 18. Reuse Before Creating

Before creating a new component, check whether the project already has:

- button;
- input;
- modal;
- accordion;
- card;
- container;
- navigation;
- icon;
- form;
- typography;
- loading;
- alert

components that can be reused or extended.

---

# 19. Dependency Rules

Do not install a package before checking whether:

- the existing stack can solve the problem;
- the package is actually necessary;
- the package is maintained;
- the package creates unnecessary bundle weight;
- equivalent functionality already exists.

Avoid adding dependencies for trivial utility functions.

---

# 20. Performance Rules

Avoid:

- unnecessary client components;
- unnecessary React state;
- duplicate requests;
- oversized images;
- excessive effects;
- unnecessary libraries;
- expensive rerenders;
- blocking resources.

Use server-side capabilities where appropriate.

---

# 21. Content Rules

Text must be:

- specific;
- useful;
- natural;
- concise;
- culturally respectful.

Avoid filler phrases such as:

- "Embark on a transformative journey"
- "Unlock ancient wisdom"
- "Discover the timeless secrets"
- "Dive into a rich tapestry"
- "Experience spirituality like never before"

Do not use marketing language where educational language is more appropriate.

---

# 22. Sanatan Dharma Accuracy

Never fabricate religious information.

When implementing content features:

- preserve source references;
- distinguish scripture from commentary;
- distinguish traditional belief from historical evidence;
- do not present disputed interpretations as universal facts;
- preserve verse/chapter references accurately;
- retain translation attribution where available.

Religious content accuracy takes priority over decorative presentation.

---

# 23. Hindi and Localization

Do not break existing localization architecture.

When adding user-facing text:

- add translations through the established translation system;
- avoid hardcoding strings when translation infrastructure exists;
- ensure Hindi layouts still work;
- avoid machine-like Hindi where natural phrasing is possible.

---

# 24. SEO Rules

For public pages, preserve or implement relevant:

- page titles;
- descriptions;
- semantic headings;
- metadata;
- canonical handling;
- structured data where appropriate.

Do not keyword-stuff content.

---

# 25. Error Messages

Error messages should help users recover.

Bad:

`Error occurred.`

Better:

`We couldn't save your changes. Check your connection and try again.`

Do not expose technical stack traces to users.

---

# 26. Comments

Comments should explain reasoning, constraints, or unusual implementation details.

Do not add obvious comments.

Bad:

```ts
// Increment counter
counter++
```

Useful:

```ts
// Keep this server-side because the permission check depends on the authenticated session.
```

---

# 27. Do Not Overengineer

Use the simplest reliable solution.

Do not introduce:

- unnecessary architectural layers;
- microservices without need;
- complex factories;
- excessive abstractions;
- global state without need;
- premature optimization.

Professional code should be understandable.

---

# 28. Preserve Git Quality

Do not create unnecessary generated files.

Do not modify lock files unless dependencies actually changed.

Do not commit:

- local environment files;
- secrets;
- caches;
- build output unless required;
- temporary debugging files.

---

# 29. Validation After Changes

After substantial changes, run the checks available in the project.

Examples may include:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Use only commands that actually exist in the project.

Do not invent scripts.

If a command fails, inspect why.

Do not simply suppress the failure.

---

# 30. Review Your Own Work

Before declaring completion, inspect your changes.

Check:

- unnecessary code;
- unused imports;
- console logs;
- TODOs;
- temporary values;
- duplicated code;
- broken responsive states;
- inaccessible controls;
- missing validation;
- unhandled failures.

---

# 31. Never Claim Success Without Evidence

Do not say:

- "Everything works perfectly."
- "The feature is fully tested."
- "There are no bugs."

unless the relevant checks were actually performed.

Instead clearly state:

- what was changed;
- what was tested;
- what remains unverified.

---

# 32. Definition of Done

Before marking work complete, confirm the relevant items below:

- functional requirements implemented;
- desktop behavior works;
- mobile behavior considered;
- accessibility considered;
- validation implemented;
- loading states handled;
- error states handled;
- empty states handled;
- security implications reviewed;
- localization preserved;
- TypeScript/lint/build checks run where available;
- no unrelated regressions introduced;
- implementation follows project standards.

---

# 33. Stop Conditions

Do not continue blindly when:

- the requested change conflicts with architecture;
- required data does not exist;
- a database migration could destroy data;
- authentication behavior is unclear;
- a security-sensitive assumption cannot be verified.

In these cases, explain the issue instead of silently making a dangerous assumption.

---

# 34. Required Final Response After Coding

After completing work, provide a concise summary containing:

### Changed
What was implemented.

### Files
Important files created or modified.

### Validation
Tests/build/type checks actually run.

### Remaining
Anything still unverified or intentionally left for later.

Do not provide a giant essay unless requested.

---

# 35. Core Agent Principle

The goal is not to generate the maximum amount of code.

The goal is to make the smallest set of correct, maintainable, professional changes necessary to improve the product.

---

# 36. Mandatory Master Standard

All work must also follow:

`docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`

If this file and the master standards overlap, apply both.

If a serious conflict between project documents is discovered, report the conflict instead of silently ignoring one document.

---

# Final Instruction

Act like an experienced engineer joining an existing professional codebase.

First understand.

Then plan.

Then change.

Then validate.

Never generate blindly.