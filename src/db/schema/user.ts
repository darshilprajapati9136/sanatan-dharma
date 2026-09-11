import {sql} from 'drizzle-orm';
import {boolean, index, integer, pgTable, text, timestamp, uniqueIndex, uuid} from 'drizzle-orm/pg-core';
import {contentType, timestamps} from './common';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const bookmarks = pgTable(
  'bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    createdAt: timestamps.createdAt
  },
  (table) => [
    uniqueIndex('bookmarks_user_content_unique').on(table.userId, table.contentType, table.contentId),
    index('bookmarks_user_idx').on(table.userId),
    pgPolicy('bookmarks_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('bookmarks_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('bookmarks_delete_own', {
      for: 'delete',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    })
  ]
);

export const readingHistory = pgTable(
  'reading_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    firstViewedAt: timestamp('first_viewed_at', {withTimezone: true}).notNull().defaultNow(),
    lastViewedAt: timestamp('last_viewed_at', {withTimezone: true}).notNull().defaultNow(),
    viewCount: integer('view_count').notNull().default(1)
  },
  (table) => [
    uniqueIndex('reading_history_user_content_unique').on(table.userId, table.contentType, table.contentId),
    index('reading_history_user_idx').on(table.userId),
    pgPolicy('history_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('history_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('history_update_own', {
      for: 'update',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`,
      withCheck: sql`user_id = auth.uid()`
    })
  ]
);

export const userPreferences = pgTable(
  'user_preferences',
  {
    userId: uuid('user_id').primaryKey(),
    dailyShlokaEnabled: boolean('daily_shloka_enabled').notNull().default(true),
    festivalNotificationsEnabled: boolean('festival_notifications_enabled').notNull().default(false),
    learningRemindersEnabled: boolean('learning_reminders_enabled').notNull().default(false),
    defaultTranslationId: uuid('default_translation_id'),
    defaultCommentaryId: uuid('default_commentary_id'),
    preferredReadingMode: text('preferred_reading_mode').notNull().default('simple'),
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    pgPolicy('preferences_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('preferences_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('preferences_update_own', {
      for: 'update',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`,
      withCheck: sql`user_id = auth.uid()`
    })
  ]
);