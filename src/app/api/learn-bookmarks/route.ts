import {NextResponse} from 'next/server';
import {and, eq} from 'drizzle-orm';
import {getDb, isDatabaseConfigured} from '@/db';
import {learnBookmarks} from '@/db/schema';
import {getSession} from '@/server/services/auth';
import {learnBookmarkSchema} from '@/schemas/account';

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
      .select({
        category: learnBookmarks.category,
        slug: learnBookmarks.slug
      })
      .from(learnBookmarks)
      .where(eq(learnBookmarks.userId, user.id));
    return NextResponse.json({success: true, data: rows});
  } catch {
    // Table exists only after migration 0002 is applied.
    return unavailable();
  }
}

export async function POST(request: Request) {
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
  const items = Array.isArray(body) ? body : [body];
  if (items.length > 200) {
    return NextResponse.json({success: false, reason: 'TOO_MANY'}, {status: 400});
  }
  const parsed = items.map((item) => learnBookmarkSchema.safeParse(item));
  if (parsed.some((p) => !p.success)) {
    return NextResponse.json({success: false, reason: 'INVALID_BODY'}, {status: 400});
  }
  try {
    const db = getDb();
    for (const p of parsed) {
      if (!p.success) continue;
      await db
        .insert(learnBookmarks)
        .values({userId: user.id, ...p.data})
        .onConflictDoNothing();
    }
    return NextResponse.json({success: true});
  } catch {
    return unavailable();
  }
}

export async function DELETE(request: Request) {
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
  const parsed = learnBookmarkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({success: false, reason: 'INVALID_BODY'}, {status: 400});
  }
  try {
    await getDb()
      .delete(learnBookmarks)
      .where(
        and(
          eq(learnBookmarks.userId, user.id),
          eq(learnBookmarks.category, parsed.data.category),
          eq(learnBookmarks.slug, parsed.data.slug)
        )
      );
    return NextResponse.json({success: true});
  } catch {
    return unavailable();
  }
}
