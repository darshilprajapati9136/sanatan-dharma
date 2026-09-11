import {sql} from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core';
import {contentType, locale, progressStatus, timestamps, verificationStatus} from './common';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const learningPaths = pgTable(
  'learning_paths',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    difficultyLevel: text('difficulty_level').notNull().default('beginner'),
    estimatedDuration: text('estimated_duration'),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    publishedAt: timestamp('published_at', {withTimezone: true})
  },
  (table) => [
    pgPolicy('learning_paths_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status = 'published'`
    })
  ]
);

export const learningPathLocalizations = pgTable(
  'learning_path_localizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    learningPathId: uuid('learning_path_id')
      .notNull()
      .references(() => learningPaths.id, {onDelete: 'cascade'}),
    locale: locale('locale').notNull(),
    title: text('title').notNull(),
    description: text('description')
  },
  (table) => [
    uniqueIndex('learning_path_localizations_path_locale_unique').on(table.learningPathId, table.locale),
    pgPolicy('learning_path_localizations_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${learningPaths} l where l.id = ${table.learningPathId} and l.verification_status = 'published')`
    })
  ]
);

export const learningModules = pgTable(
  'learning_modules',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    learningPathId: uuid('learning_path_id')
      .notNull()
      .references(() => learningPaths.id, {onDelete: 'cascade'}),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    position: integer('position').notNull(),
    isRequired: text('is_required').notNull().default('true')
  },
  (table) => [
    uniqueIndex('learning_modules_path_position_unique').on(table.learningPathId, table.position),
    index('learning_modules_content_idx').on(table.contentType, table.contentId),
    pgPolicy('learning_modules_select_published', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`exists(select 1 from ${learningPaths} l where l.id = ${table.learningPathId} and l.verification_status = 'published')`
    })
  ]
);

export const userLearningProgress = pgTable(
  'user_learning_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    learningPathId: uuid('learning_path_id').references(() => learningPaths.id),
    moduleId: uuid('module_id')
      .notNull()
      .references(() => learningModules.id),
    status: progressStatus('status').notNull().default('not_started'),
    startedAt: timestamp('started_at', {withTimezone: true}),
    completedAt: timestamp('completed_at', {withTimezone: true}),
    lastAccessedAt: timestamp('last_accessed_at', {withTimezone: true})
  },
  (table) => [
    uniqueIndex('user_learning_progress_unique').on(table.userId, table.learningPathId, table.moduleId),
    index('user_learning_progress_user_idx').on(table.userId),
    pgPolicy('progress_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('progress_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('progress_update_own', {
      for: 'update',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`,
      withCheck: sql`user_id = auth.uid()`
    })
  ]
);