# Professional Product & Engineering Standards  
## Sanatan Dharma Platform

**Document Type:** Master Product & Engineering Standard  
**Status:** Mandatory  
**Applies To:** Entire project  
**Primary Audience:** Developers, designers, OpenCode, Cline, coding agents, reviewers, and future contributors

---

# 1. Purpose

This document defines the minimum professional quality standard for the Sanatan Dharma Platform.

The website must feel like a carefully planned, professionally designed, production-quality digital product.

The objective is **not** to imitate a human developer artificially or hide the use of AI tools.

The objective is to ensure that every decision demonstrates the level of intentionality, consistency, engineering quality, usability, and craftsmanship expected from an experienced professional product-development team.

AI tools, coding agents, code-generation tools, and assistants may be used during development.

However:

> AI must be treated as an implementation assistant, not as the product designer, product manager, architect, or final decision-maker.

Generated code or designs must never be accepted simply because they work.

They must satisfy the standards in this document.

---

# 2. Core Product Principle

Every feature must answer four questions:

1. Why does this feature exist?
2. Which user problem does it solve?
3. How should the user interact with it?
4. What makes its implementation production-quality?

If these questions cannot be answered clearly, the feature should not be implemented yet.

---

# 3. Professional Team Standard

All work on this project should be approached as though it were being reviewed by a professional team consisting of:

- Product Manager
- Senior UI Designer
- UX Designer
- Frontend Engineer
- Backend Engineer
- Database Engineer
- Security Engineer
- Accessibility Specialist
- SEO Specialist
- Content Strategist
- QA Engineer
- Technical Lead

Coding agents must consider the concerns of these roles before considering a feature complete.

---

# 4. Mandatory Rule for AI Coding Agents

OpenCode, Cline, coding assistants, and other AI systems must:

- read relevant project documentation before making major changes;
- inspect the existing architecture before writing code;
- preserve existing working functionality;
- reuse existing components whenever appropriate;
- avoid unnecessary dependencies;
- avoid rewriting unrelated parts of the application;
- follow established naming and folder conventions;
- explain architectural changes when they are significant;
- keep code maintainable and modular;
- validate assumptions against the existing codebase;
- avoid inventing APIs, database columns, environment variables, or packages;
- identify incomplete requirements instead of silently guessing;
- run or recommend relevant validation checks after implementation.

Agents must never treat a feature as complete merely because it renders successfully.

---

# 5. Avoid Generic AI-Generated Website Patterns

The project must not fall into common low-quality generated-design patterns.

Avoid automatically using:

- excessive gradients;
- unnecessary glassmorphism;
- glowing borders everywhere;
- random floating shapes;
- excessive blur effects;
- giant hero headings without meaningful information;
- dozens of identical rounded cards;
- meaningless statistics;
- fake testimonials;
- fake user counts;
- excessive emojis;
- decorative Sanskrit symbols with no contextual meaning;
- generic spiritual stock imagery;
- unnecessary animated backgrounds;
- overuse of orange, gold, and saffron simply because the topic concerns Sanatan Dharma;
- excessive shadows;
- identical card grids across every page;
- meaningless hover animations;
- animations that delay navigation;
- overdramatic marketing language;
- repetitive sections created only to make a page appear longer.

Never add UI elements simply because they are common on modern websites.

Every visible element must serve a purpose.

---

# 6. Design Philosophy

The interface should communicate:

- authenticity;
- knowledge;
- calmness;
- cultural respect;
- credibility;
- clarity;
- modern craftsmanship.

The website should feel contemporary without disrespecting or trivializing the subject matter.

Traditional visual elements may be used when contextually appropriate.

They should never become decorative stereotypes.

---

# 7. Design System

A consistent design system must be maintained.

It should define:

- typography;
- font hierarchy;
- spacing scale;
- color tokens;
- border radius;
- shadows;
- containers;
- breakpoints;
- icon usage;
- interactive states;
- motion rules;
- buttons;
- inputs;
- cards;
- navigation;
- alerts;
- badges;
- dialogs;
- dropdowns.

Developers must not independently invent new styles on every page.

Existing design tokens and components should be reused whenever possible.

---

# 8. Typography

Typography must provide clear hierarchy.

At minimum, define styles for:

- display headings;
- H1;
- H2;
- H3;
- H4;
- body text;
- secondary text;
- captions;
- labels;
- navigation text.

Avoid:

- too many font families;
- excessively bold text;
- unnecessarily large headings;
- very long line lengths;
- tiny mobile text;
- inconsistent heading sizes.

Long-form educational content must prioritize readability.

---

# 9. Spacing

Spacing must follow a consistent system.

Do not use arbitrary spacing values throughout the project.

Spacing should clearly communicate relationships between:

- sections;
- headings;
- paragraphs;
- cards;
- controls;
- navigation;
- media;
- content groups.

Pages should feel intentionally composed rather than automatically generated.

---

# 10. Color Usage

Colors should be used systematically.

Define semantic roles such as:

- background;
- surface;
- elevated surface;
- primary;
- secondary;
- accent;
- text;
- muted text;
- border;
- success;
- warning;
- danger;
- information.

Saffron or culturally significant colors may appear where appropriate, but the entire interface should not become visually saturated.

Accessibility contrast requirements must always take priority.

---

# 11. Layout

Use deliberate layout structures.

Pages should follow consistent:

- content widths;
- gutters;
- grids;
- alignment;
- vertical rhythm;
- section spacing.

Avoid making every section a centered card.

Use different layouts depending on the information being communicated.

---

# 12. Responsive Design

Every page must work properly on:

- small mobile devices;
- large mobile devices;
- tablets;
- laptops;
- desktops;
- wide displays.

Responsive design must be intentional.

Do not simply shrink desktop layouts.

Mobile layouts should reconsider:

- navigation;
- information hierarchy;
- card layouts;
- typography;
- table behavior;
- tap targets;
- spacing;
- modal behavior;
- images.

No horizontal overflow should appear under normal conditions.

---

# 13. Navigation

Navigation must be predictable and understandable.

Users should always understand:

- where they are;
- what section they are viewing;
- how to go back;
- where important sections exist.

Navigation labels should describe destinations clearly.

Avoid vague labels such as:

- Explore
- Discover
- Journey
- Experience

unless their meaning is immediately obvious.

---

# 14. Interaction Design

Interactive elements must provide appropriate states.

Where relevant, components should include:

- default;
- hover;
- focus;
- active;
- selected;
- disabled;
- loading;
- success;
- warning;
- error.

Clickable elements must visually appear clickable.

Non-clickable decorative elements must not appear interactive.

---

# 15. Motion and Animation

Animation must support usability.

Good examples include:

- smooth menu transitions;
- subtle hover feedback;
- accordion expansion;
- page-state transitions;
- loading feedback;
- modal transitions.

Avoid:

- constant floating animations;
- unnecessary parallax;
- excessive entrance effects;
- long loading animations;
- motion that blocks interaction;
- animation simply to make the site appear advanced.

Motion should feel subtle and intentional.

Respect reduced-motion accessibility preferences.

---

# 16. Content Quality

Content must prioritize accuracy and usefulness.

Avoid generic AI-style phrases such as:

- "Embark on a journey..."
- "Discover timeless wisdom..."
- "Unlock ancient secrets..."
- "Dive into the rich tapestry..."
- "Explore the profound world..."
- "Where tradition meets technology..."

unless genuinely appropriate.

Use clear, direct, informative language.

---

# 17. Sanatan Dharma Content Standards

Religious and philosophical information must be handled carefully.

The platform should:

- distinguish scripture from interpretation;
- distinguish historical evidence from tradition;
- distinguish philosophical schools where they disagree;
- avoid presenting debated interpretations as universally accepted facts;
- include sources wherever practical;
- use correct terminology;
- preserve context when quoting texts;
- clearly identify translations;
- avoid sensational religious claims;
- respect diverse traditions within Sanatan Dharma.

---

# 18. Source Transparency

Educational content should eventually support source references such as:

- scripture;
- verse;
- chapter;
- text;
- author;
- commentary;
- translator;
- historical source;
- academic source.

Where uncertainty exists, the interface should communicate uncertainty instead of pretending complete certainty.

---

# 19. Frontend Engineering Standards

Frontend code must prioritize:

- maintainability;
- accessibility;
- responsiveness;
- reusability;
- performance;
- type safety;
- predictable state management.

Avoid:

- massive page components;
- deeply nested conditional rendering;
- repeated markup;
- duplicated business logic;
- inline styling without reason;
- excessive client-side rendering;
- unnecessary state;
- unnecessary JavaScript.

---

# 20. Component Architecture

Create reusable components when reuse is realistic.

Do not over-engineer components for hypothetical future use.

Components should have:

- clear responsibility;
- understandable props;
- predictable behavior;
- accessible semantics.

Prefer composition over extremely complicated configuration APIs.

---

# 21. File Organization

Code should be organized logically.

Use project conventions consistently.

Typical categories may include:

- app/routes;
- components;
- features;
- services;
- database;
- utilities;
- hooks;
- schemas;
- types;
- configuration;
- content.

Do not create duplicate folders for the same purpose.

---

# 22. Type Safety

Where TypeScript is used:

- avoid unnecessary `any`;
- define meaningful types;
- validate external data;
- keep API types consistent;
- reuse shared types when appropriate.

Compile-time safety does not replace runtime validation.

---

# 23. Forms

Every production form should account for:

- validation;
- required fields;
- invalid formats;
- submission loading;
- server errors;
- success feedback;
- duplicate submissions;
- keyboard navigation;
- accessible labels.

Errors should explain how users can fix the problem.

Avoid messages like:

`Something went wrong.`

when a more useful explanation is available.

---

# 24. Authentication

Authentication must prioritize security and predictable user experience.

Consider:

- signup;
- login;
- logout;
- session expiration;
- password reset;
- email verification;
- invalid credentials;
- account state;
- redirect behavior;
- unauthorized access.

Never rely only on frontend checks for protected resources.

---

# 25. Backend Engineering

Backend systems must:

- validate inputs;
- authorize requests;
- handle failures;
- avoid exposing sensitive data;
- produce predictable responses;
- use appropriate error handling;
- log relevant failures;
- prevent unnecessary database operations.

Backend code should not blindly trust client input.

---

# 26. Database Standards

Database design should prioritize:

- meaningful names;
- normalized structures where appropriate;
- correct relationships;
- constraints;
- indexes;
- timestamps;
- data integrity;
- scalability.

Do not store easily derivable values unnecessarily.

Do not duplicate the same information across tables without justification.

---

# 27. Database Security

When using Supabase or similar services:

- enable Row Level Security where appropriate;
- create deliberate RLS policies;
- separate public and private data;
- never expose service-role credentials to the frontend;
- validate authorization server-side;
- review database policies before production deployment.

---

# 28. API Design

APIs should use consistent conventions.

Responses should have predictable:

- status codes;
- data structures;
- validation behavior;
- error structures.

Never expose:

- stack traces;
- secrets;
- internal database information;
- unnecessary user information.

---

# 29. Security

Security is a product requirement.

Consider protection against:

- injection;
- XSS;
- CSRF where applicable;
- broken authentication;
- broken authorization;
- insecure direct object references;
- sensitive-data exposure;
- rate abuse;
- malicious file uploads;
- credential leaks.

Never commit secrets to source control.

---

# 30. Environment Variables

Environment variables must be clearly documented.

Provide `.env.example`.

The example file must never contain real secrets.

Variables should have descriptive names.

---

# 31. Accessibility

Accessibility is mandatory.

Target WCAG 2.2 AA where reasonably possible.

Requirements include:

- semantic HTML;
- keyboard navigation;
- visible focus states;
- sufficient color contrast;
- image alt text;
- correct labels;
- meaningful button names;
- screen-reader-friendly structure;
- accessible dialogs;
- reduced motion support.

Do not use `<div>` as a button when a proper `<button>` is appropriate.

---

# 32. SEO

Public informational pages should support:

- unique page titles;
- meta descriptions;
- semantic heading structure;
- canonical URLs where appropriate;
- Open Graph metadata;
- sitemap;
- robots configuration;
- structured data where useful;
- human-readable URLs.

SEO must not reduce content quality.

---

# 33. URL Structure

URLs should be:

- readable;
- predictable;
- stable;
- meaningful.

Prefer:

`/scriptures/bhagavad-gita`

over:

`/content?id=18392`

when appropriate.

---

# 34. Performance

Performance must be considered during development, not after launch.

Avoid:

- enormous JavaScript bundles;
- unnecessary client components;
- oversized images;
- blocking requests;
- unnecessary fonts;
- excessive third-party scripts;
- large animations.

Use:

- optimized images;
- caching;
- lazy loading where appropriate;
- code splitting;
- server rendering where beneficial.

---

# 35. Core Web Vitals

Aim for strong performance in:

- Largest Contentful Paint;
- Interaction to Next Paint;
- Cumulative Layout Shift.

Avoid layout shifts caused by missing image dimensions or late-loading UI.

---

# 36. Loading States

If data takes time to load, users should understand what is happening.

Use appropriate:

- skeletons;
- progress feedback;
- loading labels.

Avoid showing empty white areas while requests are running.

---

# 37. Empty States

Every feature that may contain no data should have an intentional empty state.

An empty state should explain:

- what is missing;
- why it may be empty;
- what the user can do next.

---

# 38. Error States

Failures must be designed intentionally.

Error handling should cover:

- network failures;
- missing content;
- unauthorized access;
- invalid routes;
- server errors;
- unavailable services.

Users should be able to recover whenever possible.

---

# 39. 404 Page

The 404 page should:

- clearly explain that the requested page does not exist;
- provide navigation back to useful areas;
- match the design system.

It should not become a gimmick.

---

# 40. Internationalization

The platform currently targets English and Hindi.

Architecture should support multilingual content cleanly.

Avoid hardcoding user-facing text across components when localization infrastructure exists.

Ensure:

- navigation can handle translated labels;
- layouts tolerate longer strings;
- language switching is understandable;
- URLs remain consistent with localization strategy.

---

# 41. Hindi Content

Hindi translations should sound natural.

Do not use literal machine translation without review.

Religious terminology should preserve accepted Hindi/Sanskrit usage where appropriate.

---

# 42. Images

Images must serve an informational, emotional, or contextual purpose.

Avoid generic stock imagery that makes the product look templated.

Use appropriate:

- compression;
- dimensions;
- responsive sizing;
- alt descriptions.

---

# 43. Icons

Use a consistent icon system.

Icons should support comprehension.

Avoid mixing unrelated icon styles.

Do not use icons as substitutes for unclear navigation labels.

---

# 44. Search

If search is implemented, it should eventually support useful behavior such as:

- relevant results;
- typo tolerance where practical;
- filters where necessary;
- empty-state handling;
- keyboard interaction;
- clear result hierarchy.

Search should not exist simply to populate the header.

---

# 45. AI Features

AI-generated answers concerning Sanatan Dharma must not be presented as unquestionable authority.

Where AI functionality exists:

- distinguish generated responses from verified source material;
- prioritize referenced content;
- communicate uncertainty;
- avoid fabricated scripture references;
- provide citations when possible;
- prevent AI responses from silently becoming canonical platform content.

---

# 46. User Trust

The product must never create fake credibility.

Never fabricate:

- testimonials;
- experts;
- user numbers;
- review counts;
- institutional partnerships;
- ratings;
- endorsements;
- religious authorities.

If real metrics do not exist, do not display invented metrics.

---

# 47. Privacy

Collect only information necessary for the product.

Users should understand:

- what data is collected;
- why it is collected;
- how it is used.

Sensitive information should never be logged unnecessarily.

---

# 48. Analytics

Analytics should answer real product questions.

Examples:

- Which educational sections are most useful?
- Where do users abandon flows?
- Which searches return poor results?
- Which features are actually used?

Do not add tracking simply because analytics tools exist.

---

# 49. Testing

Critical functionality should be tested.

Testing may include:

- unit tests;
- integration tests;
- end-to-end tests;
- manual browser testing;
- responsive testing;
- accessibility checks.

Prioritize testing around:

- authentication;
- permissions;
- database writes;
- critical navigation;
- forms;
- payments if introduced later.

---

# 50. Browser Testing

Important flows should be checked on modern versions of major browsers.

At minimum consider:

- Chrome;
- Safari;
- Firefox;
- Edge.

Mobile Safari deserves particular attention.

---

# 51. QA Checklist

Before marking a feature complete, verify:

- Does it work?
- Does it work on mobile?
- Does it work with keyboard navigation?
- Are loading states handled?
- Are errors handled?
- Are empty states handled?
- Are permissions correct?
- Is validation implemented?
- Is the design consistent?
- Is the copy clear?
- Is unnecessary code present?
- Does it introduce regressions?
- Does it meet accessibility requirements?
- Does it introduce performance problems?
- Does it follow this document?

---

# 52. Definition of Done

A feature is **NOT DONE** simply because code has been written.

A feature is done only when:

1. Requirements are understood.
2. Architecture is appropriate.
3. Implementation works.
4. Responsive behavior works.
5. Accessibility is considered.
6. Loading states exist where needed.
7. Error states exist where needed.
8. Empty states exist where needed.
9. Security implications are reviewed.
10. Input is validated.
11. Code matches project conventions.
12. Existing functionality has not been broken.
13. Relevant tests/checks pass.
14. The UI matches the design system.
15. Content quality has been reviewed.
16. Unnecessary generated code has been removed.
17. Documentation is updated when necessary.

---

# 53. Code Quality

Code should be understandable by another professional developer.

Prefer:

- descriptive naming;
- short focused functions;
- modular components;
- useful abstractions;
- meaningful comments only where needed.

Avoid comments that simply repeat the code.

Bad:

```ts
// Set loading to true
setLoading(true)
```

Useful comments should explain **why**, not merely **what**.

---

# 54. Avoid Overengineering

Professional software is not the same as complicated software.

Do not introduce:

- unnecessary microservices;
- premature abstraction;
- complicated state libraries without need;
- excessive design patterns;
- unnecessary dependencies;
- elaborate infrastructure for hypothetical scale.

Choose the simplest architecture that meets current requirements while allowing reasonable growth.

---

# 55. Dependency Policy

Before installing a dependency, determine:

1. Can the existing stack already solve the problem?
2. Is the package actively maintained?
3. Does it significantly increase bundle size?
4. Does it introduce security risk?
5. Is its purpose large enough to justify another dependency?

Do not install packages for trivial tasks.

---

# 56. Git Discipline

Changes should be logically grouped.

Commit messages should explain the change clearly.

Avoid giant commits containing unrelated modifications.

Do not include:

- secrets;
- generated temporary files;
- local configuration;
- irrelevant assets.

---

# 57. Documentation

Major architectural decisions should be documented.

Documentation should explain:

- what was decided;
- why it was decided;
- important constraints;
- consequences.

The purpose is to prevent future developers or agents from repeatedly redesigning the same architecture.

---

# 58. Agent Behaviour Before Coding

Before implementing a substantial feature, an AI coding agent should:

1. Read this document.
2. Read the relevant PRD.
3. Inspect relevant existing files.
4. Understand the current architecture.
5. Identify reusable components.
6. Identify database/API implications.
7. Identify security implications.
8. Form an implementation plan.
9. Modify only necessary areas.

---

# 59. Agent Behaviour During Coding

While coding, the agent must:

- preserve consistency;
- avoid unrelated refactors;
- avoid placeholder content unless requested;
- avoid fabricated data;
- maintain type safety;
- handle relevant states;
- preserve accessibility;
- maintain localization architecture.

---

# 60. Agent Behaviour After Coding

After implementing a feature, the agent should:

1. Review modified files.
2. Check for obvious errors.
3. Run relevant lint/type/build/tests where available.
4. Check responsive implications.
5. Check security implications.
6. Remove unnecessary code.
7. Explain significant changes.
8. List unresolved issues honestly.

---

# 61. Professional Review Standard

Before approving a page, ask:

> If this page were released by a serious funded product company, what would look unfinished?

Investigate those issues before accepting the page.

---

# 62. Design Review Standard

Ask:

> Does every visual decision appear intentional?

Look for:

- inconsistent spacing;
- repeated layouts;
- awkward typography;
- unnecessary decoration;
- weak hierarchy;
- inconsistent buttons;
- incorrect alignment;
- poor mobile behavior.

---

# 63. UX Review Standard

Ask:

> Can a new user understand what to do without explanation?

If not, improve the interface instead of adding lengthy instructions.

---

# 64. Engineering Review Standard

Ask:

> Would another developer understand and confidently modify this code six months from now?

If not, simplify it.

---

# 65. Content Review Standard

Ask:

> Is this text genuinely useful, accurate, specific, and natural?

Remove filler.

---

# 66. Cultural Review Standard

For Sanatan Dharma content, ask:

> Is this representation accurate, respectful, contextual, and free from unnecessary stereotypes?

When uncertainty exists, research before presenting information as fact.

---

# 67. Selling or Commercializing the Product

If this platform is later monetized, commercialization must not reduce trust.

Paid functionality should provide genuine additional value.

Avoid:

- manipulative countdowns;
- fake scarcity;
- misleading discounts;
- forced signup before basic exploration;
- intentionally confusing cancellation;
- deceptive UI patterns.

---

# 68. Quality Over Feature Count

Ten carefully designed features are better than fifty partially completed features.

Do not expand scope merely to make the project appear larger.

Professional products often feel professional because they deliberately exclude unnecessary functionality.

---

# 69. No Fake Complexity

Do not make the product artificially complex to demonstrate technical skill.

The user experience should remain simple even if the underlying engineering is sophisticated.

---

# 70. Final Product Principle

The platform should never communicate:

> "Look how much technology was used to build this."

It should communicate:

> "This product understands what I need."

Technology should remain largely invisible to the user.

---

# 71. Mandatory Instruction for OpenCode

Whenever OpenCode performs substantial development work on this project, use the following principle:

> Read `/docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md` before implementation. Treat all requirements in that document as project-wide engineering and product constraints. Do not consider the task complete merely because the code works. Ensure the implementation also meets the relevant UX, responsive, accessibility, security, performance, architecture, content, localization, and QA requirements defined there.

---

# 72. Instruction Priority

When instructions conflict, follow this priority:

1. Explicit current task requirements
2. Product Requirement Document
3. Technical/Architecture documentation
4. This Professional Product & Engineering Standards document
5. Existing project conventions
6. General implementation preference

If a serious conflict exists, report it instead of silently choosing one approach.

---

# 73. Final Rule

Do not optimize this project to **look human-made**.

Optimize it to be:

- intentional;
- coherent;
- useful;
- maintainable;
- secure;
- accessible;
- performant;
- culturally respectful;
- technically robust;
- visually refined.

If those standards are achieved, the result will naturally feel like a professionally developed product regardless of which tools assisted in its creation.

---

**End of Professional Product & Engineering Standards**