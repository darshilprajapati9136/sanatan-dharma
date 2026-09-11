import {drizzle, type PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export {isDatabaseConfigured} from '@/schemas/env';

type Database = PostgresJsDatabase<typeof schema>;

let cachedClient: postgres.Sql | null = null;
let cachedDb: Database | null = null;

export function getDb(): Database {
  if (cachedDb) {
    return cachedDb;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Set it in your environment before using the database.');
  }

  const client = cachedClient ?? postgres(databaseUrl, {max: 5, prepare: false});
  cachedClient = client;

  cachedDb = drizzle(client, {schema});
  return cachedDb;
}