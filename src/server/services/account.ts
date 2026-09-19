import {eq} from 'drizzle-orm';
import {getDb, isDatabaseConfigured} from '@/db';
import {userPreferences} from '@/db/schema';

/** Server-side preference read. Returns null when signed out, unconfigured,
 *  or when the table/columns do not exist yet (migration 0002 unapplied). */
export async function getPreferences(
  userId: string | undefined
): Promise<typeof userPreferences.$inferSelect | null> {
  if (!userId || !isDatabaseConfigured()) return null;
  try {
    const rows = await getDb()
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}
