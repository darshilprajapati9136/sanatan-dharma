# Design System Rules
## Sanatan Dharma Platform

**Purpose:** Define the visual and interaction rules for the entire product.

This document must be followed by all developers, designers, and AI coding agents working on the interface.

The goal is to create a website that feels intentional, refined, culturally respectful, and professionally designed.

---

# 1. Design Objective

The interface should communicate:

- credibility;
- calmness;
- clarity;
- depth;
- cultural sensitivity;
- modern craftsmanship;
- trust.

The design should not feel like:

- a generic AI landing page;
- a spiritual template;
- a festival poster;
- a SaaS dashboard;
- a school project;
- a random collection of cards.

Every visual decision must support the product.

---

# 2. Core Visual Principle

Use restraint.

Professional design usually comes from:

- consistent spacing;
- clear hierarchy;
- thoughtful typography;
- balanced composition;
- strong content structure;
- deliberate use of contrast;
- subtle interaction feedback.

Do not attempt to create visual sophistication through excessive decoration.

---

# 3. Design Personality

The product should feel:

**Modern + Scholarly + Calm + Authentic**

Not:

**Flashy + Mystical + Overdecorated + Artificial**

---

# 4. Color Direction

The product may draw inspiration from Indian and Sanatan visual traditions, but it should not depend on stereotypical color usage.

Recommended direction:

- warm neutral backgrounds;
- off-white surfaces;
- deep charcoal text;
- muted earthy accents;
- restrained saffron accents;
- subtle maroon or deep brown where appropriate;
- soft secondary tones.

Avoid saturating the interface with orange or gold.

---

# 5. Color Roles

Create reusable tokens for:

- page background;
- primary surface;
- secondary surface;
- elevated surface;
- primary text;
- secondary text;
- muted text;
- border;
- primary action;
- secondary action;
- accent;
- success;
- warning;
- danger;
- information.

Never create random hexadecimal colors inside individual components without a clear reason.

---

# 6. Accent Color Usage

Accent colors should be reserved for:

- important actions;
- selected states;
- links;
- highlights;
- important informational markers.

If everything uses the accent color, nothing feels important.

---

# 7. Typography Direction

Typography should feel editorial and educational rather than promotional.

Use:

- one primary readable typeface;
- optionally one restrained display or cultural typeface if justified;
- clear heading hierarchy;
- comfortable body text.

Do not mix many fonts.

---

# 8. Typography Hierarchy

Define styles for:

- Display
- H1
- H2
- H3
- H4
- Body Large
- Body
- Body Small
- Label
- Caption

Heading sizes should scale naturally across breakpoints.

Avoid enormous headings purely for visual impact.

---

# 9. Long-Form Reading

Educational content pages should prioritize reading comfort.

Use:

- controlled line length;
- generous line height;
- clear section spacing;
- readable font size;
- visual separation for quotes and references.

Avoid full-width paragraphs on large screens.

---

# 10. Content Width

Different content types should have different maximum widths.

Examples:

- long-form reading: narrow;
- general pages: medium;
- dashboards or complex layouts: wider;
- full-width imagery: only when necessary.

Do not use the same container width for everything.

---

# 11. Spacing System

Use a consistent spacing scale.

Example conceptual scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64
- 96

Exact values may follow the existing framework.

Do not use arbitrary values such as:

- 17px
- 31px
- 53px

unless there is a specific reason.

---

# 12. Vertical Rhythm

Pages should maintain predictable vertical rhythm.

Sections should not randomly switch between very tight and very large spacing.

Use stronger spacing between major sections and smaller spacing inside related content groups.

---

# 13. Grid System

Use a deliberate grid.

Consider:

- desktop columns;
- tablet layouts;
- mobile stacking;
- consistent gutters;
- aligned content edges.

Avoid placing elements at arbitrary positions.

---

# 14. Border Radius

Use a limited radius scale.

Do not make every component extremely rounded.

Different elements may use different levels:

- controls: small;
- cards: medium;
- large surfaces: moderate;
- pills: only when semantically appropriate.

Avoid turning every button and container into a capsule.

---

# 15. Shadows

Use shadows sparingly.

Prefer:

- subtle surface separation;
- borders;
- tonal contrast.

Avoid large glowing shadows or heavy floating-card effects.

---

# 16. Borders

Borders should support structure.

Use subtle borders for:

- cards;
- inputs;
- dividers;
- menus;
- tables.

Avoid excessively dark outlines.

---

# 17. Cards

Cards should only be used when content genuinely forms a self-contained group.

Do not put every piece of content inside a card.

Avoid endless grids of identical cards.

Alternative structures include:

- lists;
- editorial layouts;
- timelines;
- tables;
- split layouts;
- grouped sections;
- content blocks.

---

# 18. Buttons

Define clear button variants.

At minimum:

- Primary
- Secondary
- Tertiary
- Destructive
- Icon Button

Buttons must have:

- default state;
- hover;
- focus;
- active;
- disabled;
- loading.

Avoid using primary buttons everywhere.

---

# 19. Button Labels

Use action-oriented labels.

Prefer:

- Read chapter
- Save article
- Continue learning
- View source
- Sign in

Avoid vague labels such as:

- Explore
- Discover
- Learn More

when a more precise label is available.

---

# 20. Links

Links should look like links.

Do not hide navigation inside ambiguous text.

Inline links must be visually distinguishable from body text.

---

# 21. Icons

Use one icon family consistently.

Icons should:

- clarify meaning;
- reinforce labels;
- improve scanning.

Do not use icons solely for decoration.

---

# 22. Navigation

Navigation should be visually calm and predictable.

Primary navigation should not compete with page content.

Keep the number of top-level destinations manageable.

---

# 23. Header

The header should prioritize:

- logo/identity;
- primary navigation;
- language control;
- authentication/account access;
- search if important.

Avoid stuffing many actions into the header.

---

# 24. Mobile Navigation

Mobile navigation should be deliberately designed.

Consider:

- drawer or sheet;
- clear hierarchy;
- sufficient touch targets;
- visible current section;
- language switching;
- account actions.

Do not simply wrap desktop navigation onto multiple lines.

---

# 25. Footer

The footer should provide useful secondary navigation.

Potential categories:

- Platform
- Learn
- Resources
- About
- Legal
- Language

Avoid oversized footers filled with unnecessary links.

---

# 26. Hero Sections

Not every page needs a hero.

Home pages and major landing pages may use one.

Avoid:

- giant empty heroes;
- vague inspirational copy;
- full-screen hero sections without purpose;
- decorative gradients with no meaning.

The hero must communicate actual product value.

---

# 27. Images in Hero Sections

Use imagery only when it strengthens the message.

Avoid:

- random temples;
- generic stock meditation photos;
- repeated deity artwork purely for decoration;
- low-quality spiritual collages.

Visuals should be relevant to the content.

---

# 28. Religious Imagery

Handle sacred imagery carefully.

Do not use deity images as casual decoration.

Avoid:

- cropping sacred imagery disrespectfully;
- placing text over faces;
- using sacred symbols as random background patterns;
- adding playful animation to sacred elements.

Context and respect take priority over aesthetics.

---

# 29. Sanskrit and Devanagari

Sanskrit and Hindi typography must remain readable.

Do not use decorative fonts that reduce legibility.

Use diacritics and script consistently when applicable.

---

# 30. Page Titles

Every page should have an obvious primary title.

Users should immediately understand what page they are viewing.

Avoid pages where decorative graphics dominate before the title becomes clear.

---

# 31. Section Titles

Section titles should describe content directly.

Prefer:

`Major Schools of Vedanta`

over:

`A Journey Through Thought`

---

# 32. Content Density

Different pages may require different density.

Educational pages may be more content-rich.

Marketing areas may use more whitespace.

Do not force the entire product into one density level.

---

# 33. Lists

Use lists when they improve comprehension.

Do not convert simple information into complex card grids.

---

# 34. Tables

Use tables for genuinely tabular information.

Tables must be responsive.

On small screens consider:

- horizontal scroll;
- stacked representation;
- simplified views.

Do not make tables unreadably small.

---

# 35. Forms

Forms should be visually simple.

Use:

- clear labels;
- helper text when useful;
- consistent field spacing;
- obvious validation;
- clear submit actions.

Do not rely on placeholder text as the only label.

---

# 36. Input States

Inputs should support:

- default;
- hover;
- focus;
- filled;
- disabled;
- error;
- success where appropriate.

Focus states must be clearly visible.

---

# 37. Error Design

Errors should not feel visually aggressive unless the situation is critical.

Use clear language and appropriate color.

Do not overwhelm users with technical details.

---

# 38. Success Design

Success states should be visible but restrained.

Avoid excessive celebration animations for ordinary actions.

---

# 39. Loading Design

Loading states should preserve layout stability.

Use skeletons when useful.

Avoid spinners for everything.

---

# 40. Empty States

Empty states should feel intentional.

They may include:

- short explanation;
- relevant illustration;
- next action.

Avoid generic text like:

`Nothing here yet.`

when better guidance is possible.

---

# 41. Search Results

Search results should prioritize:

- title;
- relevant excerpt;
- content type;
- source or category;
- clear hierarchy.

Avoid presenting every result as an oversized card.

---

# 42. Article and Scripture Pages

Long-form content pages should include appropriate structures such as:

- title;
- source information;
- chapter/section context;
- body content;
- references;
- related material;
- navigation between sections.

Do not clutter the reading experience with unnecessary UI.

---

# 43. Quotations and Verses

Quotes and verses should have a consistent treatment.

Display:

- original text where available;
- translation;
- reference;
- commentary if applicable.

Do not use oversized quotation marks or decorative backgrounds excessively.

---

# 44. Breadcrumbs

Use breadcrumbs when information hierarchy is deep.

Example:

`Scriptures > Bhagavad Gita > Chapter 2`

Do not add breadcrumbs to shallow pages unnecessarily.

---

# 45. Tabs

Use tabs only when users are switching between closely related views.

Do not hide unrelated information behind tabs to save space.

---

# 46. Accordions

Accordions work well for:

- FAQs;
- secondary explanations;
- optional detail.

Do not hide primary content inside accordions.

---

# 47. Modals

Use modals sparingly.

Do not use modals for complex multi-step workflows when a dedicated page would be clearer.

---

# 48. Tooltips

Tooltips should provide supplementary information.

Important instructions must not exist only inside tooltips.

---

# 49. Toasts

Use toast notifications for lightweight confirmation.

Avoid stacking many toasts.

Critical errors should appear close to the affected area when possible.

---

# 50. Animation

Motion should be subtle.

Recommended duration range:

approximately 150–300 ms for most interactions.

Longer transitions should have a strong reason.

---

# 51. Scroll Animation

Avoid animating every section on scroll.

If entrance animation is used, keep it subtle and selective.

Repeated fade-up animations across the entire site usually make generated websites feel generic.

---

# 52. Hover Animation

Hover states should communicate interactivity.

Avoid exaggerated scale effects.

Cards should not jump dramatically when hovered.

---

# 53. Reduced Motion

Respect `prefers-reduced-motion`.

Important functionality must never depend on animation.

---

# 54. Responsive Breakpoints

Use the project's established breakpoint system.

Do not introduce unique breakpoints for individual components without reason.

---

# 55. Small-Screen Priority

Test important interfaces around:

- narrow mobile screens;
- common mobile widths;
- tablets;
- laptops.

Do not assume desktop-first layouts will automatically translate well.

---

# 56. Touch Targets

Interactive elements should have comfortable touch areas.

Do not make icon buttons excessively small on mobile.

---

# 57. Text Wrapping

Account for:

- long English words;
- Hindi text;
- translated navigation labels;
- user-generated content;
- long titles.

Layouts should not break when text length changes.

---

# 58. Dark Mode

Do not implement dark mode merely because modern websites often have it.

Only support it if:

- it aligns with the product;
- all components can support it properly;
- contrast and imagery remain correct.

A poorly implemented dark mode is worse than no dark mode.

---

# 59. Consistency Rule

If the same component appears in multiple places, it should look and behave consistently unless there is a clear contextual reason to differ.

---

# 60. Reuse Rule

Before creating a new visual pattern, check whether an existing one already solves the problem.

Avoid design-system duplication.

---

# 61. Visual QA

Before considering a page finished, inspect:

- alignment;
- spacing;
- typography;
- wrapping;
- button consistency;
- card consistency;
- icons;
- borders;
- shadows;
- responsiveness;
- overflow;
- empty areas;
- interaction states.

---

# 62. AI-Generated Design Smell Checklist

If a page contains several of the following, reconsider the design:

- giant headline;
- gradient text;
- orange glow;
- blurred background blobs;
- three identical feature cards;
- four fake statistics;
- rounded everything;
- animated icons;
- generic testimonial section;
- huge CTA banner;
- repeated phrases about ancient wisdom;
- decorative mandalas everywhere.

One element may be appropriate.

Many together usually indicate a generic generated template.

---

# 63. Homepage Principle

The homepage should quickly answer:

1. What is this platform?
2. Who is it for?
3. What can users do here?
4. Why should they trust the information?
5. Where should they go next?

Visual design must support these answers.

---

# 64. Educational Product Principle

This website is primarily a knowledge product.

Design should prioritize:

- comprehension;
- discoverability;
- trust;
- reading;
- navigation;
- contextual learning.

Entertainment and visual spectacle are secondary.

---

# 65. Cultural Authenticity Principle

Do not attempt to create authenticity through decoration alone.

Authenticity should come from:

- accurate terminology;
- meaningful content;
- good sourcing;
- respectful context;
- thoughtful presentation.

---

# 66. Professional Design Review Question

Before approving any screen, ask:

> Would an experienced product designer be able to explain why each major visual decision exists?

If not, simplify or redesign.

---

# 67. Final Visual Rule

The product should not look impressive because it has many effects.

It should look professional because nothing feels accidental.

---

# 68. Mandatory Instruction for Coding Agents

Before making major UI changes:

1. Read this document.
2. Inspect existing components.
3. Preserve the design system.
4. Avoid generic generated patterns.
5. Test responsive behavior.
6. Check accessibility.
7. Review the page visually before completion.

---

# 69. Related Documents

Also follow:

`docs/PROFESSIONAL_PRODUCT_ENGINEERING_STANDARDS.md`

`docs/AI_AGENT_INSTRUCTIONS.md`

These documents are mandatory project-wide standards.

---

# Final Principle

Every page should feel deliberately designed for this product.

Do not build a generic website and then add Sanatan Dharma styling.

Build a Sanatan Dharma knowledge platform from the product structure upward.

**End of Design System Rules**