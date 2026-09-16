# README for AI Agents
## Sanatan Dharma Platform

**Purpose:** Single entry point for OpenCode, Cline, coding agents, and AI development assistants working on this repository.

Before making substantial changes, read this file first.

---

# 1. Project Standard

This project must be developed to the quality level expected from an experienced professional product-development team.

AI tools may assist with implementation.

However, AI-generated output must never be accepted automatically.

Every implementation must satisfy the project's product, engineering, design, content, security, accessibility, performance, and QA standards.

---

# 2. Mandatory Reading Order

Before substantial work, read these documents in this order:

1. `docs/README_FOR_AI_AGENTS.md`
2. `docs/AI_AGENT_INSTRUCTIONS.md`
3. `docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`
4. `docs/DESIGN_SYSTEM_RULES.md`
5. `docs/CONTENT_AND_CULTURAL_ACCURACY_STANDARDS.md`
6. `docs/QA_AND_RELEASE_CHECKLIST.md`

Then read any task-specific documentation such as:

- PRD
- Technical Requirements
- Architecture documentation
- Database documentation
- UI/UX documentation
- API documentation
- Feature specifications

---

# 3. First Rule

Do not code immediately.

First:

- understand the request;
- inspect the existing codebase;
- identify relevant files;
- understand existing conventions;
- check for reusable components;
- identify architectural impact;
- identify security implications;
- identify data/database impact;
- identify localization impact;
- identify responsive and accessibility requirements.

Then implement.

---

# 4. Do Not Treat the Prompt as the Entire Specification

The latest user prompt is only one source of requirements.

Also consider:

- existing code;
- existing architecture;
- project documentation;
- design system;
- product standards;
- database schema;
- localization;
- security rules.

Do not destroy existing structure merely to satisfy one isolated instruction.

---

# 5. Project-Wide Quality Standard

Every substantial implementation should be reviewed across the following dimensions:

- functionality;
- UX;
- visual design;
- mobile responsiveness;
- accessibility;
- security;
- authentication;
- authorization;
- database integrity;
- performance;
- SEO where relevant;
- localization;
- content accuracy;
- maintainability;
- testing;
- error handling.

---

# 6. Avoid Generic AI Output

Do not automatically generate:

- generic SaaS layouts;
- excessive gradients;
- glowing cards;
- endless rounded containers;
- fake testimonials;
- fake metrics;
- filler sections;
- generic spiritual slogans;
- unnecessary animation;
- random decorative Sanskrit symbols;
- repetitive three-column sections.

The interface must emerge from the actual product structure.

---

# 7. Never Fabricate Data

Never invent:

- user numbers;
- testimonials;
- quotations;
- scripture references;
- database records;
- API behavior;
- partnerships;
- experts;
- ratings;
- statistics;
- historical claims.

If data is unavailable, use a clearly identified placeholder only when necessary.

---

# 8. Existing Architecture Comes First

Before creating something new, check whether the project already contains:

- components;
- hooks;
- types;
- utilities;
- API helpers;
- database functions;
- schemas;
- styles;
- design tokens;
- translation keys.

Reuse or extend existing systems when appropriate.

---

# 9. Scope Discipline

Modify only what is required.

Do not:

- refactor unrelated systems;
- redesign unrelated pages;
- install unnecessary packages;
- rename unrelated files;
- alter unrelated database structures;
- rewrite working features without reason.

Report unrelated issues separately.

---

# 10. Security

Security requirements are mandatory.

Never expose:

- secrets;
- service-role keys;
- private tokens;
- privileged credentials.

Do not trust frontend-only permission checks.

When Supabase is used:

- inspect RLS;
- preserve authorization;
- use server-side checks where appropriate;
- never place service-role credentials in the browser.

---

# 11. Content Accuracy

This platform deals with religion, philosophy, history, and culture.

Never fabricate:

- verses;
- Sanskrit quotations;
- historical facts;
- translations;
- scripture citations.

Follow:

`docs/CONTENT_AND_CULTURAL_ACCURACY_STANDARDS.md`

Accuracy is more important than speed.

---

# 12. UI Development

Before making significant visual changes, read:

`docs/DESIGN_SYSTEM_RULES.md`

UI must be:

- intentional;
- consistent;
- responsive;
- accessible;
- restrained;
- content-driven.

Do not make visual changes purely to make the interface look "more modern."

---

# 13. Mobile Requirement

Every important feature must work on mobile.

Do not consider desktop-only functionality complete.

---

# 14. Localization

The project supports English and Hindi.

Preserve existing localization infrastructure.

Do not hardcode user-facing text when translation infrastructure already exists.

Check that longer translated text does not break layouts.

---

# 15. Error Handling

Do not implement only the happy path.

Where relevant, support:

- loading;
- empty;
- success;
- validation;
- unauthorized;
- not found;
- failure states.

---

# 16. Validation

Validate external and user-provided data.

Frontend validation is for UX.

Server-side validation is for safety and integrity.

Do not rely only on client validation.

---

# 17. Dependencies

Before installing a dependency, verify:

- existing tools cannot solve the problem;
- the package is necessary;
- it is maintained;
- it is appropriate for the stack;
- it does not introduce unreasonable complexity.

Do not install packages for trivial tasks.

---

# 18. Code Quality

Prefer:

- clear naming;
- small focused functions;
- modular components;
- predictable data flow;
- strong typing;
- simple architecture.

Avoid:

- giant files;
- duplicated logic;
- unnecessary abstractions;
- unnecessary state;
- `any` without reason;
- excessive comments;
- premature optimization.

---

# 19. Before Editing Files

Inspect the relevant files first.

Do not overwrite files without understanding their role.

When modifying a file:

- preserve useful existing behavior;
- preserve project conventions;
- minimize unrelated changes.

---

# 20. After Implementation

Before declaring completion:

1. Review your own changes.
2. Remove debug code.
3. Check for unused imports.
4. Check for obvious regressions.
5. Run available lint/type/test/build checks.
6. Review responsive implications.
7. Review accessibility.
8. Review security.
9. Check localization.
10. Apply the relevant QA checklist.

---

# 21. QA Requirement

Follow:

`docs/QA_AND_RELEASE_CHECKLIST.md`

Do not say the task is complete merely because the code compiled.

---

# 22. Final Response Format

After substantial coding work, report:

## Changed
What was implemented.

## Files
Important files created or modified.

## Validation
Exactly what checks were actually run.

## Remaining
Anything not tested, unresolved, or deferred.

Never claim testing that was not performed.

---

# 23. Instruction Priority

If instructions conflict, use this priority:

1. Explicit current task
2. Product requirements
3. Technical/architecture documentation
4. Security requirements
5. Professional product/engineering standards
6. Design system
7. Content accuracy standards
8. Existing project conventions
9. General implementation preference

If a major conflict cannot be safely resolved, report it instead of guessing.

---

# 24. Professional Development Mindset

Work as though your changes will be:

- reviewed by a senior engineer;
- reviewed by a product designer;
- audited for security;
- tested on mobile;
- used by real users;
- maintained by another developer later.

Do not optimize merely for passing the immediate prompt.

---

# 25. Core Workflow

Use this workflow:

**Understand → Inspect → Plan → Implement → Validate → Review → Report**

Do not use:

**Prompt → Generate → Assume Done**

---

# 26. Mandatory Documents

All agents must respect:

`docs/AI_AGENT_INSTRUCTIONS.md`

`docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`

`docs/DESIGN_SYSTEM_RULES.md`

`docs/CONTENT_AND_CULTURAL_ACCURACY_STANDARDS.md`

`docs/QA_AND_RELEASE_CHECKLIST.md`

This file exists to route agents into those standards.

---

# Final Instruction

Treat this repository like a real production product, not a coding demo.

The goal is not to produce a large amount of code.

The goal is to make correct, intentional, maintainable, professional changes that improve the product without damaging the rest of the system.

**End of README for AI Agents**