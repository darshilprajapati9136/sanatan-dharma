import {NextResponse} from 'next/server';
import {and, eq} from 'drizzle-orm';
import {getDb, isDatabaseConfigured} from '@/db';
import {readingProgress} from '@/db/schema';
import {getSession} from '@/server/services/auth';
import {readingProgressSchema} from '@/schemas/account';

function unavailable() {
  return NextResponse.json(
    {success: false, reason: 'UNAVAILABLE'},
    {status: 503}
  );
}

export async function GET(request: Request) {
  const {user} = await getSession();
  if (!user) {
    return NextResponse.json({success: false, reason: 'UNAUTHENTICATED'}, {status: 401});
  }
  if (!isDatabaseConfigured()) return unavailable();
  const {searchParams} = new URL(request.url);
  const scriptureId = searchParams.get('scriptureId');
  if (!scriptureId) {
    return NextResponse.json({success: false, reason: 'INVALID_QUERY'}, {status: 400});
  }
  try {
    const rows = await getDb()
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, user.id),
          eq(readingProgress.scriptureId, scriptureId)
        )
      )
      .limit(1);
    return NextResponse.json({success: true, data: rows[0] ?? null});
  } catch {
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
  const parsed = readingProgressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({success: false, reason: 'INVALID_BODY'}, {status: 400});
  }
  try {
    await getDb()
      .insert(readingProgress)
      .values({
        userId: user.id,
        scriptureId: parsed.data.scriptureId,
        lastSectionId: parsed.data.lastSectionId ?? null,
        lastVerseId: parsed.data.lastVerseId ?? null,
        progressPercentage: String(parsed.data.progressPercentage)
      })
      .onConflictDoUpdate({
        target: [readingProgress.userId, readingProgress.scriptureId],
        set: {
          lastSectionId: parsed.data.lastSectionId ?? null,
          lastVerseId: parsed.data.lastVerseId ?? null,
          progressPercentage: String(parsed.data.progressPercentage),
          updatedAt: new Date()
        }
      });
    return NextResponse.json({success: true});
  } catch {
    return unavailable();
  }
}
