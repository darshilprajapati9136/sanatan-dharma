import {NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {getDb, isDatabaseConfigured} from '@/db';
import {userPreferences} from '@/db/schema';
import {getSession} from '@/server/services/auth';
import {preferencesSchema} from '@/schemas/account';

function unavailable() {
  return NextResponse.json(
    {success: false, reason: 'UNAVAILABLE'},
    {status: 503}
  );
}

export async function GET() {
  const {user} = await getSession();
  if (!user) {
    return NextResponse.json({success: false, reason: 'UNAUTHENTICATED'}, {status: 401});
  }
  if (!isDatabaseConfigured()) return unavailable();
  try {
    const rows = await getDb()
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, user.id))
      .limit(1);
    return NextResponse.json({success: true, data: rows[0] ?? null});
  } catch {
    // Table/columns may not exist until migration 0002 is applied.
    return unavailable();
  }
}

export async function PUT(request: Request) {
  const {user} = await getSession();
  if (!user) {
    return NextResponse.json({success: false, reason: 'UNAUTHENTICATED'}, {status: 401});
  }
  if (!isDatabaseConfigured()) return unavailable();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({success: false, reason: 'INVALID_BODY'}, {status: 400});
  }
  const parsed = preferencesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({success: false, reason: 'INVALID_BODY'}, {status: 400});
  }
  try {
    await getDb()
      .insert(userPreferences)
      .values({userId: user.id, ...parsed.data})
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {...parsed.data, updatedAt: new Date()}
      });
    return NextResponse.json({success: true});
  } catch {
    return unavailable();
  }
}
