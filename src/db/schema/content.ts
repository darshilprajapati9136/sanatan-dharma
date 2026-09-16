import {sql} from 'drizzle-orm';
import {
  date,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';
import {locale, mantraType, timestamps, verificationStatus} from './common';
import {licenses, sources} from './knowledge';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const traditions = pgTable(
  'traditions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    sanskritName: text('sanskrit_name'),
    parentTraditionId: uuid('parent_tradition_id'),
    description: text('description'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    index('traditions_parent_idx').on(table.parentTraditionId),
    foreignKey({
      columns: [table.parentTraditionId],
      foreignColumns: [table.id],
      name: 'traditions_parent_fkey'
    }),
    pgPolicy('traditions_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const traditionLocalizations = pgTable(
  'tradition_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    traditionId: uuid('tradition_id')
      .notNull()
      .references(() => traditions.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    name: text('name').notNull(),
    description: text('description')
  },
  (table) => [
    uniqueIndex('tradition_localizations_tradition_locale_unique').on(table.traditionId, table.locale),
    pgPolicy('tradition_localizations_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${traditions} t where t.id = ${table.traditionId})`
    })
  ]
);

export const concepts = pgTable(
  'concepts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    canonicalName: text('canonical_name').notNull(),
    sanskritName: text('sanskrit_name'),
    difficultyLevel: text('difficulty_level').notNull().default('beginner'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    publishedAt: timestamp('published_at', {withTimezone: true})
  },
  () => [
    pgPolicy('concepts_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const conceptLocalizations = pgTable(
  'concept_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conceptId: uuid('concept_id')
      .notNull()
      .references(() => concepts.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    title: text('title').notNull(),
    shortDefinition: text('short_definition'),
    simpleExplanation: text('simple_explanation'),
    deepExplanation: text('deep_explanation'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description')
  },
  (table) => [
    uniqueIndex('concept_localizations_concept_locale_unique').on(table.conceptId, table.locale),
    pgPolicy('concept_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${concepts} c where c.id = ${table.conceptId} and c.verification_status = 'published')`
    })
  ]
);

export const deities = pgTable(
  'deities',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    canonicalName: text('canonical_name').notNull(),
    sanskritName: text('sanskrit_name'),
    parentDeityId: uuid('parent_deity_id'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    publishedAt: timestamp('published_at', {withTimezone: true})
  },
  (table) => [
    index('deities_parent_idx').on(table.parentDeityId),
    foreignKey({
      columns: [table.parentDeityId],
      foreignColumns: [table.id],
      name: 'deities_parent_fkey'
    }),
    pgPolicy('deities_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const deityLocalizations = pgTable(
  'deity_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    deityId: uuid('deity_id')
      .notNull()
      .references(() => deities.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    name: text('name').notNull(),
    shortDescription: text('short_description'),
    overview: text('overview'),
    philosophicalSignificance: text('philosophical_significance'),
    iconography: text('iconography'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description')
  },
  (table) => [
    uniqueIndex('deity_localizations_deity_locale_unique').on(table.deityId, table.locale),
    pgPolicy('deity_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${deities} d where d.id = ${table.deityId} and d.verification_status = 'published')`
    })
  ]
);

export const mantras = pgTable(
  'mantras',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    canonicalName: text('canonical_name').notNull(),
    sanskritText: text('sanskrit_text').notNull(),
    mantraType: mantraType('mantra_type').notNull().default('other'),
    primaryDeityId: uuid('primary_deity_id').references(() => deities.id),
    sourceId: uuid('source_id').references(() => sources.id),
    licenseId: uuid('license_id').references(() => licenses.id),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    publishedAt: timestamp('published_at', {withTimezone: true})
  },
  (table) => [
    index('mantras_deity_idx').on(table.primaryDeityId),
    index('mantras_source_idx').on(table.sourceId),
    pgPolicy('mantras_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const mantraLocalizations = pgTable(
  'mantra_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    mantraId: uuid('mantra_id')
      .notNull()
      .references(() => mantras.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    title: text('title').notNull(),
    transliteration: text('transliteration'),
    meaning: text('meaning'),
    context: text('context'),
    traditionalUsage: text('traditional_usage'),
    pronunciationNotes: text('pronunciation_notes')
  },
  (table) => [
    uniqueIndex('mantra_localizations_mantra_locale_unique').on(table.mantraId, table.locale),
    pgPolicy('mantra_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${mantras} m where m.id = ${table.mantraId} and m.verification_status = 'published')`
    })
  ]
);

export const festivals = pgTable(
  'festivals',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    canonicalName: text('canonical_name').notNull(),
    sanskritName: text('sanskrit_name'),
    dateType: text('date_type'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    publishedAt: timestamp('published_at', {withTimezone: true})
  },
  () => [
    pgPolicy('festivals_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const festivalDates = pgTable(
  'festival_dates',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    festivalId: uuid('festival_id')
      .notNull()
      .references(() => festivals.id, {onDelete: 'cascade'}),
    year: integer('year').notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    timezone: text('timezone'),
    region: text('region'),
    calendarBasis: text('calendar_basis'),
    calculationSource: text('calculation_source'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft')
  },
  (table) => [
    index('festival_dates_festival_year_idx').on(table.festivalId, table.year),
    pgPolicy('festival_dates_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const festivalLocalizations = pgTable(
  'festival_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    festivalId: uuid('festival_id')
      .notNull()
      .references(() => festivals.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    name: text('name').notNull(),
    shortDescription: text('short_description'),
    meaning: text('meaning'),
    history: text('history'),
    practices: text('practices'),
    spiritualSignificance: text('spiritual_significance'),
    regionalVariations: text('regional_variations'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description')
  },
  (table) => [
    uniqueIndex('festival_localizations_festival_locale_unique').on(table.festivalId, table.locale),
    pgPolicy('festival_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${festivals} f where f.id = ${table.festivalId} and f.verification_status = 'published')`
    })
  ]
);