import {sql} from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';
import {contentType, contentUsage, mediaCategory, reportCategory, reviewStatus, reviewType, timestamps} from './common';
import {licenses, sources} from './knowledge';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const contentReviews = pgTable(
  'content_reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    reviewerId: uuid('reviewer_id'),
    reviewType: reviewType('review_type').notNull().default('editorial'),
    status: reviewStatus('status').notNull().default('proposed'),
    notes: text('notes'),
    createdAt: timestamps.createdAt,
    completedAt: timestamp('completed_at', {withTimezone: true})
  },
  (table) => [
    index('content_reviews_content_idx').on(table.contentType, table.contentId),
    pgPolicy('content_reviews_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const contentRevisions = pgTable(
  'content_revisions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    revisionNumber: integer('revision_number').notNull(),
    changedBy: uuid('changed_by'),
    changeSummary: text('change_summary'),
    snapshot: jsonb('snapshot'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('content_revisions_content_idx').on(table.contentType, table.contentId)
  ]
);

export const contentReports = pgTable(
  'content_reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    reportType: reportCategory('report_type').notNull(),
    description: text('description'),
    status: text('status').notNull().default('open'),
    assignedTo: uuid('assigned_to'),
    createdAt: timestamps.createdAt,
    resolvedAt: timestamp('resolved_at', {withTimezone: true})
  },
  (table) => [
    index('content_reports_content_idx').on(table.contentType, table.contentId),
    pgPolicy('content_reports_insert_any', {
      for: 'insert',
      to: ['anon', 'authenticated'],
      withCheck: sql`true`
    })
  ]
);

export const mediaAssets = pgTable(
  'media_assets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    storagePath: text('storage_path').notNull(),
    mediaType: mediaCategory('media_type').notNull(),
    title: text('title'),
    altText: text('alt_text'),
    copyrightStatus: text('copyright_status'),
    licenseId: uuid('license_id').references(() => licenses.id),
    sourceId: uuid('source_id').references(() => sources.id),
    uploadedBy: uuid('uploaded_by'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('media_assets_source_idx').on(table.sourceId),
    pgPolicy('media_assets_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const contentMedia = pgTable(
  'content_media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    mediaId: uuid('media_id')
      .notNull()
      .references(() => mediaAssets.id, {onDelete: 'cascade'}),
    usageType: contentUsage('usage_type').notNull().default('hero'),
    position: integer('position').notNull().default(0)
  },
  (table) => [
    index('content_media_content_idx').on(table.contentType, table.contentId),
    pgPolicy('content_media_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${mediaAssets} m where m.id = ${table.mediaId})`
    })
  ]
);

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  action: text('action').notNull(),
  entityType: text('entity_type'),
  entityId: text('entity_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: text('ip_address'),
  createdAt: timestamps.createdAt
});

export const appSettings = pgTable(
  'app_settings',
  {
    key: text('key').primaryKey(),
    value: text('value'),
    description: text('description'),
    updatedBy: uuid('updated_by'),
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    pgPolicy('app_settings_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`key in ('maintenance_mode', 'default_locale')`
    })
  ]
);