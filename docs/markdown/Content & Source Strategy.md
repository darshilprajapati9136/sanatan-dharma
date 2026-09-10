# Content & Source Strategy

# 1. Purpose

The Content & Source Strategy defines how religious, philosophical, historical, devotional, and educational information will be selected, verified, attributed, translated, reviewed, stored, and presented.

The goal is to make the platform trustworthy, transparent, and respectful of the diversity within Sanatan Dharma.

# 2. Core Content Principle

The platform should follow this rule:

**Do not present interpretation as scripture.**

Every important piece of content should clearly indicate whether it is:

- Original scripture
- Translation
- Traditional commentary
- Modern scholarly explanation
- Editorial explanation
- AI-generated explanation

These categories should never be mixed together without clear labeling.

# 3. Source Hierarchy

Not all sources should be treated equally.

Recommended hierarchy:

## Tier 1 — Primary Scriptures

These are the strongest source category.

Examples:

- Vedas

---

- Principal Upanishads
- Bhagavad Gita
- Ramayana
- Mahabharata
- Major Puranas
- Brahma Sutras
- Yoga Sutras
- Other recognized classical texts

Primary scripture should always be preferred when answering questions about what a scripture directly states.

## Tier 2 — Classical Commentaries

Traditional commentaries should be used to explain interpretations.

Examples may include recognized commentaries from major acharyas and traditions.

Each commentary must be attributed clearly.

Example:

**Commentary tradition:** Advaita Vedanta **Commentator:** Adi Shankaracharya

The platform should not label one commentary as “the correct meaning” when respected traditions disagree.

## Tier 3 — Traditional Religious Institutions and Publishers

Sources may include:

- Reputable publishing houses
- Established spiritual institutions
- Traditional Sanskrit institutions
- Universities
- Academic editions of scriptures
- Trusted manuscript projects

Exact institutions should be selected during source curation.

---

## Tier 4 — Academic Sources

Useful for:

- History
- Linguistics
- Manuscript studies
- Archaeology
- Comparative philosophy
- Dating of texts
- Historical development

Academic sources should not automatically override traditional interpretation in theological matters.

Instead, the website should distinguish:

**Traditional perspective**

from

**Academic/historical perspective**

when necessary.

## Tier 5 — General Websites

General websites, blogs, social media posts, YouTube videos, and unsourced articles should not be treated as authoritative sources.

They may be useful for discovering topics but should not be used as the final evidence for important religious claims unless verified independently.

# 4. Source Metadata

Every important source in the database should have structured metadata.

Recommended fields:

```
Source ID
Title
Text name
Author / commentator
```

---

```
Tradition
Publisher
Edition
Language
Translator
Publication year
Source type
Copyright status
License
URL or reference
Verification status
Reviewer
Date reviewed
Notes
```

This will be important for both human content and AI retrieval.

# 5. Scripture Data Structure

Every scripture should be stored separately from its translations and commentaries.

Example:

```
Scripture
→ Chapter
→ Verse
```

Verse record:

```
Verse ID
Scripture ID
Chapter
Verse number
Original Sanskrit
Alternative numbering if applicable
Source edition
Verification status
```

Translations should be separate records.

```
Translation ID
Verse ID
```

---

```
Language
Translator
Translation text
Source
Copyright status
License
```

Commentaries should also be separate.

```
Commentary ID
Verse ID
Commentator
Tradition
Language
Commentary text
Source
Copyright status
```

This prevents data from becoming mixed or unclear.

# 6. Sanskrit Text Policy

Original Sanskrit text should be treated carefully.

Requirements:

- Use reliable editions.
- Preserve correct Devanagari.
- Preserve diacritics where Roman transliteration is used.
- Avoid copying Sanskrit from unverified websites.
- Maintain verse numbering.
- Maintain source edition information.
- Allow corrections if textual errors are discovered.

Where different recensions or readings exist, the platform should acknowledge them when relevant.

# 7. Transliteration Standard

Use a consistent transliteration system.

Recommended:

---

**IAST — International Alphabet of Sanskrit Transliteration**

Example:

कֻ

becomes

**karma**

धֻ

becomes

**dharma**

Where diacritics are required:

कृष्ण

becomes

**kṛṣṇa**

׌शिव

becomes

**śiva**

For beginners, the platform may optionally display simplified transliteration alongside IAST later.

# 8. English Translation Policy

English translations should be:

- Accurate
- Readable
- Clearly attributed
- Legally usable
- Consistent

The platform should not silently rewrite someone else's translation.

---

If an editorial translation is created internally, it should be labeled clearly as:

**Platform translation**

and undergo review.

# 9. Hindi Translation Policy

Hindi translations should not simply be machine translations of English.

Whenever possible, Hindi content should be created or reviewed directly from:

- Sanskrit
- Trusted Hindi editions
- Established translations

Machine translation may assist drafting but should not be considered verified religious content without review.

# 10. Commentary Policy

Different traditions often interpret the same verse differently.

The platform should support multiple commentaries.

Example structure:

**Bhagavad Gita 2.47**

**Original Verse**

Sanskrit.

**Translation**

Neutral translation.

**Advaita Interpretation**

Attributed.

---

**Vishishtadvaita Interpretation**

Attributed.

**Dvaita Interpretation**

Attributed.

**Simple Explanation**

Platform explanation.

This allows users to understand diversity rather than hiding it.

# 11. Tradition Labels

Content should be tagged with the relevant tradition when applicable.

Possible labels:

- Advaita
- Vishishtadvaita
- Dvaita
- Shaiva
- Vaishnava
- Shakta
- Smarta
- Samkhya
- Yoga
- Nyaya
- Mimamsa

Labels should be descriptive, not ranking-based.

Avoid language such as:

“Correct school”

“Superior tradition”

“Wrong interpretation”

unless discussing a historical debate and clearly attributing the statement.

---

# 12. Content Types

The platform should support several content categories.

## Scripture Content

Original texts, translations, commentary.

## Concept Content

Examples:

- Dharma
- Karma
- Moksha
- Atman
- Brahman

## Deity Content

Educational pages.

## Festival Content

Traditional and regional information.

## Mantra Content

Text, meaning, source, usage.

## Learning Content

Beginner lessons and structured paths.

## Historical Content

Historical development, chronology, institutions, figures.

## Practice Content

Puja, meditation, japa, fasting, pilgrimage, etc.

---

## AI Content

Generated explanations based on approved sources.

# 13. Content Status Workflow

Every content item should have a status.

Recommended workflow:

```
Draft
↓
Source Check
↓
Editorial Review
↓
Religious/Subject Review
↓
Verified
↓
Published
```

If a correction is later required:

```
Published
↓
Needs Review
↓
Corrected
↓
Republished
```

# 14. Verification Levels

A simple trust system may be used.

**Verified**

Reviewed and supported by approved sources.

---

**Source-Backed**

Sources are available, but expert review may still be pending.

**Editorial**

Written by the platform based on approved material.

**AI-Generated**

Generated dynamically by AI.

AI-generated content should never receive the same visual status as verified human-reviewed content unless it has been reviewed.

# 15. Reviewer Roles

As the platform grows, different reviewers may be needed.

Possible roles:

- Sanskrit reviewer
- Hindi reviewer
- English editor
- Scripture researcher
- Tradition-specific reviewer
- Academic/history reviewer
- Content administrator

One person does not need to perform all roles.

# 16. Accuracy Policy

The platform should distinguish between:

## Strongly Established

Example:

“The Bhagavad Gita has 18 chapters.”

---

## Tradition-Specific

Example:

A theological interpretation associated with a particular school.

## Historically Debated

Example:

Dating of a particular scripture.

## Uncertain

Claims lacking strong evidence.

Content should use appropriate language.

Example:

Instead of:

“This text was written in exactly 3000 BCE.”

Use:

“Traditional accounts and modern scholarship may date the text differently.”

# 17. Historical Claims

Historical claims require special care.

Topics such as:

- Date of the Mahabharata
- Age of the Vedas
- Historical identity of figures
- Archaeological interpretations

can be debated.

The site should clearly separate:

---

**Traditional chronology**

and

**Modern academic estimates**

where significant disagreement exists.

# 18. Mythology Terminology

The platform should be careful with the word “mythology.”

Some users may interpret it as implying that sacred narratives are false.

Recommended language:

- Sacred narratives
- Traditional accounts
- Puranic narratives
- Scriptural stories

Academic sections may still use “mythology” when discussing academic terminology, but context should be clear.

# 19. Deity Content Rules

Deity pages should avoid reducing deities to simple Western-style categories.

For example, avoid simplistic statements such as:

“Shiva is the god of destruction.”

Instead explain the concept more fully.

Example:

Shiva is associated with transformation, dissolution, asceticism, yoga, consciousness, and several other theological roles depending on tradition.

---

# 20. Festival Content Rules

Festival pages should acknowledge regional variation.

Example:

Diwali may have different associations across:

- North India
- Gujarat
- Bengal
- South India
- Nepal
- Different religious traditions

The platform should avoid presenting one regional version as universal.

# 21. Mantra Content Rules

Every mantra should ideally contain:

- Sanskrit
- Transliteration
- Meaning
- Source
- Context
- Traditional usage
- Associated deity or text
- Verification status

Avoid unverified supernatural claims.

Example to avoid:

“Chant this mantra 108 times and you are guaranteed wealth.”

Instead:

“This mantra is traditionally associated with…”

---

# 22. Ritual and Practice Content

Practical ritual instructions require care.

The platform may explain:

- General purpose
- Traditional context
- Common practice
- Required materials
- Variations

For complex rituals, the platform should indicate when guidance from a qualified practitioner or priest may be appropriate.

# 23. Ayurveda and Health Content

If Ayurveda is added later, health claims must be handled separately from spiritual or historical content.

The platform should distinguish:

- Traditional Ayurvedic teachings
- Historical information
- Modern medical evidence

It should not present potentially harmful medical claims as guaranteed treatment.

# 24. Copyright Strategy

Copyright must be checked before storing or publishing:

- Modern translations
- Modern commentaries
- Books
- Audio
- Photographs
- Illustrations

Prefer:

- Public-domain editions
- Openly licensed materials
- Properly licensed sources

---

- Original platform content

Copyright status should be stored in the source database.

# 25. Public Domain Does Not Mean Unverified

Even when a text is legally public domain, it still needs source verification.

Legal permission and religious accuracy are separate requirements.

# 26. AI Knowledge Policy

The AI assistant should follow a controlled retrieval system.

Preferred approach:

```
User Question
↓
Search Approved Knowledge Base
↓
Retrieve Relevant Sources
↓
Generate Answer
↓
Attach Citations
↓
Show Confidence / Context
```

The AI should not rely only on its general model memory for religious claims when reliable platform sources are available.

# 27. AI Source Priority

AI retrieval priority:

1. Verified platform scripture
1. Verified translations
1. Approved commentary
1. Verified educational pages
1. Approved academic sources

---

1. General model knowledge only when necessary

If general model knowledge is used, the system should be more cautious.

# 28. AI Citation Requirement

Where practical, AI answers should cite their source.

Example:

**Bhagavad Gita 2.47**

**Katha Upanishad 1.2.18**

**Commentary: Adi Shankaracharya**

Users should be able to click the citation and open the source.

# 29. AI Response Labels

Generated answers should display:

**AI-generated explanation**

This prevents users from confusing AI responses with original scripture.

# 30. AI Confidence Handling

The AI should not invent certainty.

When information is uncertain:

“I could not find a strong verified source for this claim.”

When traditions differ:

“Different traditions interpret this differently.”

When historical scholarship differs:

---

“Traditional and academic chronologies differ on this question.”

# 31. AI Hallucination Prevention

The system should include safeguards against:

- Invented verses
- Incorrect verse numbering
- Fake quotations
- Fake Sanskrit
- Wrong attribution
- Fabricated commentaries
- Unsupported historical claims

If a source cannot be verified, the AI should avoid presenting the claim as scriptural fact.

# 32. Scripture Citation Format

Use a consistent citation system.

Examples:

**Bhagavad Gita 2.47**

**Katha Upanishad 1.2.20**

**Yoga Sutras 1.2**

**Ramayana, Bala Kanda, Sarga X**

Exact formatting may vary by scripture.

# 33. Source Display on Pages

Every major page should have a:

**Sources & References**

section.

---

Example:

```
Sources
```

```
Bhagavad Gita 2.47
Translation: [Translator]
Commentary: [Commentator]
Edition: [Publisher]
Reviewed: [Date]
```

Users should not need to trust the platform blindly.

# 34. Editorial Style

Content should be:

- Respectful
- Clear
- Educational
- Neutral where appropriate
- Beginner-friendly
- Non-sensational
- Source-backed

Avoid excessive religious jargon without explanation.

# 35. Beginner Explanation Standard

Every complex concept should have at least two layers.

**Simple Explanation**

For beginners.

**Deeper Understanding**

For users who want more philosophical depth.

Example:

**Atman — Simple**

---

Atman generally refers to the inner self or deepest reality of the individual.

**Deeper**

Different philosophical schools understand the relationship between Atman, Brahman, individuality, and liberation differently.

# 36. Glossary System

The platform should maintain a central glossary.

Examples:

- Dharma
- Karma
- Moksha
- Atman
- Brahman
- Samsara
- Maya
- Bhakti
- Yoga
- Guru
- Puja
- Japa

Hovering or tapping difficult Sanskrit terms could show a short definition.

# 37. Related Content

Every page should connect to relevant content.

Example:

**Karma**

Related:

- Karma Yoga
- Dharma
- Samsara
- Moksha
- Bhagavad Gita 2.47

---

- Bhagavad Gita Chapter 3

Relationships should be curated and later assisted algorithmically.

# 38. Search Indexing

Search should index:

- Titles
- Sanskrit names
- English terms
- Hindi terms
- Transliteration
- Alternative spellings
- Tags
- Verse numbers

Example:

A search for:

**Krishna**

should also find:

**Kṛṣṇa**

**कृष्ण**

# 39. Content Version History

Important content should maintain revision history.

Store:

- Original version
- Changes
- Editor
- Reviewer
- Date
- Reason for change

This is useful when corrections are made.

---

# 40. Error Reporting

Users should eventually be able to report content issues.

Example button:

**Report an error**

Categories:

- Incorrect Sanskrit
- Wrong translation
- Incorrect source
- Typo
- Misleading explanation
- Tradition misrepresented
- Other

This can help improve accuracy.

# 41. Source Governance

A source should not automatically become approved because one editor adds it.

Recommended statuses:

```
Proposed
↓
Reviewed
↓
Approved
↓
Active
```

A source can later become:

```
Restricted
Archived
Rejected
```

---

# 42. Initial Source Scope for MVP

Do not attempt to verify every Sanatan Dharma text before launch.

Start with a controlled set.

Recommended MVP content focus:

**Bhagavad Gita**

High-quality Sanskrit text plus selected legally usable translations and commentaries.

**Beginner Concepts**

Approximately 10–20 concepts.

**Major Deities**

Approximately 7 major deity overview pages.

**Major Festivals**

Approximately 10–15 major festivals.

**Mantras**

Approximately 10–20 verified mantras.

**Scripture Overviews**

Vedas, Upanishads, Ramayana, Mahabharata, Puranas.

This gives the platform enough content to demonstrate quality and structure.

# 43. Content Expansion Strategy

Expand in stages.

## Phase 1

Bhagavad Gita + beginner concepts.

---

## Phase 2

Major Upanishads.

## Phase 3

Ramayana and Mahabharata.

## Phase 4

Major Puranas.

## Phase 5

Philosophical schools and commentaries.

## Phase 6

Advanced scripture library.

Quality should remain more important than coverage speed.

# 44. Important Open Decisions

Before final production, the project still needs to decide:

- Which Bhagavad Gita Sanskrit edition to use
- Which English translations are approved
- Which Hindi translations are approved
- Which commentaries are included first
- Which Upanishads are included first
- Which Ramayana version is used
- Which Mahabharata edition is used
- How regional traditions will be reviewed
- Who will review Sanskrit
- Who will verify Hindi
- What content licenses are available
- What AI retrieval system will be used

---

# 45. Recommended First Commentary Strategy

Do not include 20 commentaries immediately.

Start with a small representative set.

A possible approach:

- One major Advaita commentary
- One major Vishishtadvaita commentary
- One major Dvaita commentary
- A neutral platform explanation

Additional traditions can be added gradually.

The final source list should only include texts that can be legally and accurately used.

# 46. Transparency Page

The website should have a public page such as:

**How We Source Our Content**

It should explain:

- Where scripture text comes from
- How translations are selected
- How commentaries are attributed
- How content is reviewed
- How AI answers work
- How users can report mistakes

Transparency should be treated as a product feature.

# 47. Content Disclaimer

The platform may include a respectful disclaimer such as:

The platform is designed for education and exploration of Sanatan Dharma. Sanatan traditions contain diverse schools, lineages, interpretations, and regional practices. Where interpretations differ, the platform aims to identify and represent those differences rather than claim a single universal interpretation.

---

# 48. Content Quality Checklist

Before publishing a page, verify:

- Is the factual information accurate?
- Are scriptural claims cited?
- Is the Sanskrit checked?
- Is the translation attributed?
- Are interpretations labeled?
- Are disputed claims presented carefully?
- Are different traditions represented fairly?
- Is the language beginner-friendly?
- Is copyrighted material legally usable?
- Are related pages linked?
- Has the page been reviewed?
- Does the AI have permission to retrieve this content?

# 49. Source Quality Checklist

Before approving a source:

- Is the source identifiable?
- Is the edition known?
- Is the author/translator known?
- Is the publisher reputable?
- Is copyright status clear?
- Is it appropriate for the claim being supported?
- Is the text complete and unaltered?
- Has it been verified against another reliable source where necessary?

# 50. Main Strategic Principle

The competitive advantage of the platform should not simply be:

**“We have a lot of Sanatan Dharma content.”**

It should be:

**“Users can understand where the information came from, what the scripture actually says, how** **traditions interpret it, and what part was generated or explained by AI.”**

That trust layer should become one of the defining features of the product.

---

# 51. Status

Content & Source Strategy:

**Initial Version Complete**

Defined:

- Source hierarchy
- Scripture policy
- Translation policy
- Commentary policy
- Tradition handling
- Verification workflow
- Copyright principles
- AI retrieval policy
- Citation requirements
- Content review
- Search metadata
- Error reporting
- MVP source scope
- Expansion strategy

The next planning document should define the actual visual and interaction experience of the website.
