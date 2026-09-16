import {sql} from 'drizzle-orm';
import {
  boolean,
  foreignKey,
  index,
  pgTable,
  text,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';
import {
  contentType,
  locale,
  timestamps,
  verificationStatus
} from './common';
import {licenses, sources} from './knowledge';
import {traditions} from './content';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const scriptures = pgTable(
  'scriptures',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    titleEn: text('title_en'),
    titleHi: text('title_hi'),
    descriptionEn: text('description_en'),
    descriptionHi: text('description_hi'),
    tradition: text('tradition'),
    isPublished: boolean('is_published').notNull().default(false),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  () => [
    pgPolicy('scriptures_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`is_published = true`
    })
  ]
);

export const scriptureLocalizations = pgTable(
  'scripture_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    scriptureId: uuid('scripture_id')
      .notNull()
      .references(() => scriptures.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    summary: text('summary'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description')
  },
  (table) => [
    uniqueIndex('scripture_localizations_scripture_locale_unique').on(table.scriptureId, table.locale),
    index('scripture_localizations_scripture_idx').on(table.scriptureId),
    pgPolicy('scripture_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${scriptures} s where s.id = ${table.scriptureId} and s.verification_status = 'published')`
    })
  ]
);

export const scriptureSections = pgTable(
  'scripture_sections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    scriptureId: uuid('scripture_id')
      .notNull()
      .references(() => scriptures.id, {onDelete: 'cascade'}),
    parentId: uuid('parent_id'),
    sectionNumber: text('section_number'),
    slug: text('slug').notNull(),
    titleEn: text('title_en'),
    titleHi: text('title_hi'),
    descriptionEn: text('description_en'),
    descriptionHi: text('description_hi'),
    sortOrder: text('sort_order'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    uniqueIndex('scripture_sections_scripture_slug_unique').on(table.scriptureId, table.slug),
    index('scripture_sections_scripture_idx').on(table.scriptureId),
    index('scripture_sections_parent_idx').on(table.parentId),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'scripture_sections_parent_fkey'
    }),
    pgPolicy('scripture_sections_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${scriptures} s where s.id = ${table.scriptureId} and s.is_published = true)`
    })
  ]
);

export const scriptureSectionLocalizations = pgTable(
  'scripture_section_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sectionId: uuid('section_id')
      .notNull()
      .references(() => scriptureSections.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    title: text('title').notNull(),
    summary: text('summary'),
    description: text('description')
  },
  (table) => [
    uniqueIndex('scripture_section_localizations_section_locale_unique').on(table.sectionId, table.locale),
    pgPolicy('scripture_section_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${scriptureSections} sc join ${scriptures} s on s.id = sc.scripture_id where sc.id = ${table.sectionId} and s.verification_status = 'published')`
    })
  ]
);

export const verses = pgTable(
  'verses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    scriptureId: uuid('scripture_id')
      .notNull()
      .references(() => scriptures.id, {onDelete: 'cascade'}),
    sectionId: uuid('section_id')
      .notNull()
      .references(() => scriptureSections.id, {onDelete: 'cascade'}),
    verseNumber: text('verse_number').notNull(),
    textDevanagari: text('text_devanagari'),
    transliteration: text('transliteration'),
    sortOrder: text('sort_order'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    uniqueIndex('verses_section_verse_number_unique').on(table.sectionId, table.verseNumber),
    index('verses_scripture_idx').on(table.scriptureId),
    index('verses_section_idx').on(table.sectionId),
    pgPolicy('verses_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${scriptures} s where s.id = ${table.scriptureId} and s.is_published = true)`
    })
  ]
);

export const verseVariants = pgTable(
  'verse_variants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    verseId: uuid('verse_id')
      .notNull()
      .references(() => verses.id, {onDelete: 'cascade'}),
    variantText: text('variant_text').notNull(),
    sourceId: uuid('source_id').references(() => sources.id),
    variantType: text('variant_type'),
    notes: text('notes'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft')
  },
  (table) => [
    index('verse_variants_verse_idx').on(table.verseId),
    pgPolicy('verse_variants_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const transliterations = pgTable(
  'transliterations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    verseId: uuid('verse_id')
      .notNull()
      .references(() => verses.id, {onDelete: 'cascade'}),
    system: text('system').notNull().default('IAST'),
    text: text('text').notNull(),
    sourceId: uuid('source_id').references(() => sources.id),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft')
  },
  (table) => [
    index('transliterations_verse_idx').on(table.verseId),
    pgPolicy('transliterations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const translators = pgTable(
  'translators',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    biography: text('biography'),
    traditionId: uuid('tradition_id').references(() => traditions.id),
    website: text('website'),
    notes: text('notes')
  },
  (table) => [
    index('translators_name_idx').on(table.name),
    pgPolicy('translators_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`name is not null`
    })
  ]
);

export const translations = pgTable(
  'translations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    verseId: uuid('verse_id')
      .notNull()
      .references(() => verses.id, {onDelete: 'cascade'}),
    language: text('language').notNull(),
    translation: text('translation').notNull(),
    translator: text('translator'),
    sourceId: uuid('source_id').references(() => sources.id),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('translations_verse_idx').on(table.verseId),
    index('translations_source_idx').on(table.sourceId),
    pgPolicy('translations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${verses} v join ${scriptures} s on s.id = v.scripture_id where v.id = ${table.verseId} and s.is_published = true)`
    })
  ]
);

export const commentators = pgTable(
  'commentators',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    sanskritName: text('sanskrit_name'),
    traditionId: uuid('tradition_id').references(() => traditions.id),
    biography: text('biography'),
    historicalPeriod: text('historical_period'),
    notes: text('notes')
  },
  (table) => [
    index('commentators_name_idx').on(table.name),
    pgPolicy('commentators_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`name is not null`
    })
  ]
);

export const commentaries = pgTable(
  'commentaries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    verseId: uuid('verse_id')
      .notNull()
      .references(() => verses.id, {onDelete: 'cascade'}),
    commentatorId: uuid('commentator_id').references(() => commentators.id),
    locale: locale('locale').notNull(),
    commentaryText: text('commentary_text').notNull(),
    summary: text('summary'),
    sourceId: uuid('source_id').references(() => sources.id),
    copyrightStatus: text('copyright_status'),
    licenseId: uuid('license_id').references(() => licenses.id),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    index('commentaries_verse_idx').on(table.verseId),
    index('commentaries_source_idx').on(table.sourceId),
    pgPolicy('commentaries_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const editorialExplanations = pgTable(
  'editorial_explanations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    locale: locale('locale').notNull(),
    simpleExplanation: text('simple_explanation'),
    deepExplanation: text('deep_explanation'),
    authorId: uuid('author_id'),
    reviewerId: uuid('reviewer_id'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    index('editorial_explanations_content_idx').on(table.contentType, table.contentId),
    pgPolicy('editorial_explanations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);