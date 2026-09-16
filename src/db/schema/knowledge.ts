import {sql} from 'drizzle-orm';
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';
import {contentType, relationshipType, reviewStatus, sourceType, timestamps} from './common';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const licenses = pgTable(
  'licenses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    shortName: text('short_name'),
    url: text('url'),
    allowsRedistribution: boolean('allows_redistribution').notNull().default(false),
    allowsModification: boolean('allows_modification').notNull().default(false),
    allowsCommercialUse: boolean('allows_commercial_use').notNull().default(false),
    notes: text('notes')
  },
  (table) => [
    uniqueIndex('licenses_name_unique').on(table.name),
    pgPolicy('licenses_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const sources = pgTable(
  'sources',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    author: text('author'),
    publisher: text('publisher'),
    sourceType: sourceType('source_type').notNull(),
    url: text('url'),
    publicationYear: text('publication_year'),
    notes: text('notes'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('sources_title_idx').on(table.title),
    pgPolicy('sources_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const sourceReviews = pgTable(
  'source_reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sourceId: uuid('source_id')
      .notNull()
      .references(() => sources.id, {onDelete: 'cascade'}),
    reviewerId: uuid('reviewer_id'),
    status: reviewStatus('status').notNull().default('proposed'),
    reviewNotes: text('review_notes'),
    reviewedAt: timestamp('reviewed_at', {withTimezone: true})
  },
  (table) => [
    index('source_reviews_source_idx').on(table.sourceId),
    pgPolicy('source_reviews_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${sources} s where s.id = ${table.sourceId} and s.verification_status in ('approved', 'reviewed'))`
    })
  ]
);

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    tagType: text('tag_type')
  },
  () => [
    pgPolicy('tags_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const contentTags = pgTable(
  'content_tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, {onDelete: 'cascade'})
  },
  (table) => [
    uniqueIndex('content_tags_unique').on(table.contentType, table.contentId, table.tagId),
    index('content_tags_tag_idx').on(table.tagId),
    pgPolicy('content_tags_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const contentRelationships = pgTable(
  'content_relationships',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    fromContentType: contentType('from_content_type').notNull(),
    fromContentId: uuid('from_content_id').notNull(),
    relationshipType: relationshipType('relationship_type').notNull(),
    toContentType: contentType('to_content_type').notNull(),
    toContentId: uuid('to_content_id').notNull(),
    createdBy: uuid('created_by'),
    verificationStatus: reviewStatus('verification_status').notNull().default('proposed'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('content_relationships_from_idx').on(table.fromContentType, table.fromContentId),
    index('content_relationships_to_idx').on(table.toContentType, table.toContentId),
    pgPolicy('content_relationships_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status in ('approved', 'reviewed')`
    })
  ]
);