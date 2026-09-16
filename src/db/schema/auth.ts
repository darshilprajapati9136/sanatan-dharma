import {sql} from 'drizzle-orm';
import {pgTable, primaryKey, text, timestamp, uuid} from 'drizzle-orm/pg-core';
import {locale, timestamps, userRoleName} from './common';
import {pgPolicy} from 'drizzle-orm/pg-core';

export const profiles = pgTable(
  'profiles',
  {
    // Live schema: profiles.id IS auth.users.id (UUID PK, no separate user_id column).
    id: uuid('id').primaryKey(),
    displayName: text('display_name'),
    username: text('username'),
    avatarUrl: text('avatar_url'),
    preferredLanguage: locale('preferred_language').notNull().default('en'),
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  },
  () => [
    pgPolicy('profiles_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`id = auth.uid()`
    }),
    pgPolicy('profiles_insert_own', {
      for: 'insert',
      to: 'authenticated',
      withCheck: sql`id = auth.uid()`
    }),
    pgPolicy('profiles_update_own', {
      for: 'update',
      to: 'authenticated',
      using: sql`id = auth.uid()`,
      withCheck: sql`id = auth.uid()`
    })
  ]
);

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: userRoleName('name').notNull().unique(),
    description: text('description')
  },
  () => [
    pgPolicy('roles_select_public', {
      for: 'select',
      to: ['anon', 'authenticated'],
      using: sql`true`
    })
  ]
);

export const userRoles = pgTable(
  'user_roles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => profiles.id),
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id),
    assignedAt: timestamp('assigned_at', {withTimezone: true}).notNull().defaultNow(),
    assignedBy: uuid('assigned_by')
  },
  (table) => [
    primaryKey({columns: [table.userId, table.roleId]}),
    pgPolicy('user_roles_select_own', {
      for: 'select',
      to: 'authenticated',
      using: sql`user_id = auth.uid()`
    })
  ]
);