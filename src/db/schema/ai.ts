import {sql} from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';
import {aiRole, contentType, locale, timestamps, verificationStatus} from './common';
import {sources} from './knowledge';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const aiConversations = pgTable(
  'ai_conversations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    title: text('title'),
    locale: locale('locale').notNull().default('en'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    deletedAt: timestamp('deleted_at', {withTimezone: true})
  },
  (table) => [
    index('ai_conversations_user_idx').on(table.userId),
    pgPolicy('ai_conversations_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid() and deleted_at is null`
    }),
    pgPolicy('ai_conversations_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`user_id = auth.uid()`
    }),
    pgPolicy('ai_conversations_update_own', {
      for: 'update',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`,
      withCheck: sql`user_id = auth.uid()`
    })
  ]
);

export const aiMessages = pgTable(
  'ai_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => aiConversations.id, {onDelete: 'cascade'}),
    role: aiRole('role').notNull(),
    messageText: text('message_text').notNull(),
    model: text('model'),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('ai_messages_conversation_idx').on(table.conversationId),
    pgPolicy('ai_messages_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`exists(select 1 from ${aiConversations} c where c.id = ${table.conversationId} and c.user_id = auth.uid() and c.deleted_at is null)`
    }),
    pgPolicy('ai_messages_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`exists(select 1 from ${aiConversations} c where c.id = ${table.conversationId} and c.user_id = auth.uid())`
    })
  ]
);

export const aiMessageCitations = pgTable(
  'ai_message_citations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    messageId: uuid('message_id')
      .notNull()
      .references(() => aiMessages.id, {onDelete: 'cascade'}),
    sourceId: uuid('source_id').references(() => sources.id),
    contentType: contentType('content_type'),
    contentId: uuid('content_id'),
    chunkId: uuid('chunk_id'),
    citationOrder: integer('citation_order').notNull().default(0)
  },
  (table) => [
    index('ai_message_citations_message_idx').on(table.messageId),
    pgPolicy('ai_message_citations_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`exists(select 1 from ${aiMessages} m join ${aiConversations} c on c.id = m.conversation_id where m.id = ${table.messageId} and c.user_id = auth.uid() and c.deleted_at is null)`
    })
  ]
);

export const knowledgeChunks = pgTable(
  'knowledge_chunks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: contentType('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    sourceId: uuid('source_id').references(() => sources.id),
    locale: locale('locale').notNull().default('en'),
    chunkText: text('chunk_text').notNull(),
    chunkIndex: integer('chunk_index').notNull().default(0),
    verificationStatus: verificationStatus('verification_status').notNull().default('draft'),
    metadata: jsonb('metadata'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  (table) => [
    index('knowledge_chunks_content_idx').on(table.contentType, table.contentId),
    index('knowledge_chunks_source_idx').on(table.sourceId),
    pgPolicy('knowledge_chunks_select_approved', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`verification_status in ('verified', 'published')`
    })
  ]
);

export const aiUsage = pgTable(
  'ai_usage',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id'),
    sessionId: text('session_id'),
    requestType: text('request_type'),
    model: text('model'),
    inputTokens: integer('input_tokens'),
    outputTokens: integer('output_tokens'),
    estimatedCost: numeric('estimated_cost'),
    success: boolean('success').notNull().default(true),
    createdAt: timestamps.createdAt
  },
  (table) => [
    index('ai_usage_user_idx').on(table.userId),
    pgPolicy('ai_usage_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    })
  ]
);