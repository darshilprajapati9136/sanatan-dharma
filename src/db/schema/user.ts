import {sql} from 'drizzle-orm';
import {boolean, index, numeric, pgTable, text, uniqueIndex, uuid} from 'drizzle-orm/pg-core';
import {timestamps} from './common';
import {scriptures, scriptureSections, verses} from './scripture';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const bookmarks = pgTable(
  'bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    verseId: uuid('verse_id')
      .notNull()
      .references(() => verses.id, {onDelete: 'cascade'}),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('bookmarks_user_idx').on(table.userId),
    index('bookmarks_verse_idx').on(table.verseId),
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

export const readingProgress = pgTable(
  'reading_progress',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    // Live schema: references auth.users(id). Kept as a plain column here like
    // bookmarks.userId; the FK lives in the live database, which is untouched.
    userId: uuid('user_id').notNull(),
    scriptureId: uuid('scripture_id')
      .notNull()
      .references(() => scriptures.id),
    lastSectionId: uuid('last_section_id').references(() => scriptureSections.id),
    lastVerseId: uuid('last_verse_id').references(() => verses.id),
    progressPercentage: numeric('progress_percentage'),
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    uniqueIndex('reading_progress_user_scripture_unique').on(table.userId, table.scriptureId),
    index('reading_progress_user_idx').on(table.userId),
    pgPolicy('reading_progress_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('reading_progress_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('reading_progress_update_own', {
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
    // Added for account preferences (migration 0002, NOT yet applied to live DB).
    location: text('location').notNull().default('New Delhi'),
    tradition: text('tradition'),
    calendar: text('calendar').notNull().default('purnimanta'),
    updatedAt: timestamps.updatedAt
  },
  () => [
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

/**
 * Browser-saved Learn articles synced to the account (migration 0003,
 * NOT yet applied to live DB). Verse bookmarks keep using `bookmarks`.
 */
export const learnBookmarks = pgTable(
  'learn_bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    category: text('category').notNull(),
    slug: text('slug').notNull(),
    createdAt: timestamps.createdAt
  },
  (table) => [
    uniqueIndex('learn_bookmarks_user_content_unique').on(
      table.userId,
      table.category,
      table.slug
    ),
    index('learn_bookmarks_user_idx').on(table.userId),
    pgPolicy('learn_bookmarks_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    }),
    pgPolicy('learn_bookmarks_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('learn_bookmarks_delete_own', {
      for: 'delete',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    })
  ]
);