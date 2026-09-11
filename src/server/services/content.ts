import {and, desc, eq, sql} from 'drizzle-orm';
import {getDb} from '@/db';
import {
  concepts,
  conceptLocalizations,
  festivals,
  festivalLocalizations,
  scriptureLocalizations,
  scriptures,
  verses
} from '@/db/schema';

export async function listPublishedScriptures(locale: 'en' | 'hi') {
  const db = getDb();

  return db
    .select({
      id: scriptures.id,
      slug: scriptures.slug,
      canonicalName: scriptures.canonicalName,
      sanskritName: scriptures.sanskritName,
      scriptureType: scriptures.scriptureType,
      primaryLanguage: scriptures.primaryLanguage,
      structureType: scriptures.structureType,
      verificationStatus: scriptures.verificationStatus,
      publishedAt: scriptures.publishedAt,
      title: scriptureLocalizations.title,
      description: scriptureLocalizations.description,
      summary: scriptureLocalizations.summary
    })
    .from(scriptures)
    .innerJoin(
      scriptureLocalizations,
      and(eq(scriptureLocalizations.scriptureId, scriptures.id), eq(scriptureLocalizations.locale, locale))
    )
    .where(eq(scriptures.verificationStatus, 'published'))
    .orderBy(desc(scriptures.publishedAt));
}

export async function listPublishedConcepts(locale: 'en' | 'hi') {
  const db = getDb();

  return db
    .select({
      id: concepts.id,
      slug: concepts.slug,
      canonicalName: concepts.canonicalName,
      sanskritName: concepts.sanskritName,
      difficultyLevel: concepts.difficultyLevel,
      verificationStatus: concepts.verificationStatus,
      publishedAt: concepts.publishedAt,
      title: conceptLocalizations.title,
      shortDefinition: conceptLocalizations.shortDefinition
    })
    .from(concepts)
    .innerJoin(
      conceptLocalizations,
      and(eq(conceptLocalizations.conceptId, concepts.id), eq(conceptLocalizations.locale, locale))
    )
    .where(eq(concepts.verificationStatus, 'published'))
    .orderBy(desc(concepts.publishedAt));
}

export async function listPublishedFestivals(locale: 'en' | 'hi') {
  const db = getDb();

  return db
    .select({
      id: festivals.id,
      slug: festivals.slug,
      canonicalName: festivals.canonicalName,
      sanskritName: festivals.sanskritName,
      verificationStatus: festivals.verificationStatus,
      publishedAt: festivals.publishedAt,
      name: festivalLocalizations.name,
      shortDescription: festivalLocalizations.shortDescription
    })
    .from(festivals)
    .innerJoin(
      festivalLocalizations,
      and(eq(festivalLocalizations.festivalId, festivals.id), eq(festivalLocalizations.locale, locale))
    )
    .where(eq(festivals.verificationStatus, 'published'))
    .orderBy(desc(festivals.publishedAt));
}

export async function countPublishedVerses() {
  const db = getDb();

  const [row] = await db
    .select({count: sql<number>`count(*)::int`})
    .from(verses)
    .where(eq(verses.verificationStatus, 'published'));

  return row?.count ?? 0;
}

export async function getScriptureStructure(slug: string, locale: 'en' | 'hi') {
  const db = getDb();

  const [scripture] = await db
    .select({
      id: scriptures.id,
      slug: scriptures.slug,
      canonicalName: scriptures.canonicalName,
      sanskritName: scriptures.sanskritName,
      scriptureType: scriptures.scriptureType,
      structureType: scriptures.structureType,
      title: scriptureLocalizations.title,
      description: scriptureLocalizations.description
    })
    .from(scriptures)
    .innerJoin(
      scriptureLocalizations,
      and(eq(scriptureLocalizations.scriptureId, scriptures.id), eq(scriptureLocalizations.locale, locale))
    )
    .where(and(eq(scriptures.slug, slug), eq(scriptures.verificationStatus, 'published')))
    .limit(1);

  if (!scripture) {
    return null;
  }

  const verseCount = await countPublishedVerses();
  return {...scripture, verseCount};
}