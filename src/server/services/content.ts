import {and, desc, eq} from 'drizzle-orm';
import {getDb} from '@/db';
import {concepts, conceptLocalizations, festivals, festivalLocalizations} from '@/db/schema';
import {createClient} from '@/lib/supabase/server';

/**
 * Phase 1 content reads go through the Supabase API client (PostgREST) so
 * live Row Level Security applies. The direct-Database (Drizzle) path is kept
 * only for the not-yet-released Learn/Explore helpers below.
 */
async function getContentClient() {
  return createClient();
}

export async function listPublishedScriptures() {
  const supabase = await getContentClient();

  if (!supabase) {
    return [];
  }

  const {data, error} = await supabase
    .from('scriptures')
    .select('id,slug,tradition,title_en,title_hi,description_en,description_hi,created_at,updated_at')
    .eq('is_published', true)
    .order('slug', {ascending: true});

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    tradition: (row.tradition as string | null) ?? null,
    titleEn: (row.title_en as string | null) ?? null,
    titleHi: (row.title_hi as string | null) ?? null,
    descriptionEn: (row.description_en as string | null) ?? null,
    descriptionHi: (row.description_hi as string | null) ?? null,
    createdAt: row.created_at as string | null,
    updatedAt: row.updated_at as string | null
  }));
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

export async function countScriptureVerses(scriptureId: string) {
  const supabase = await getContentClient();

  if (!supabase) {
    return 0;
  }

  const {count} = await supabase
    .from('verses')
    .select('id', {count: 'exact', head: true})
    .eq('scripture_id', scriptureId);

  return count ?? 0;
}

export async function getScriptureStructure(slug: string) {
  const supabase = await getContentClient();

  if (!supabase) {
    return null;
  }

  const {data: scriptureRows} = await supabase
    .from('scriptures')
    .select('id,slug,tradition,title_en,title_hi,description_en,description_hi')
    .eq('slug', slug)
    .eq('is_published', true)
    .limit(1);

  const scriptureRow = scriptureRows?.[0];

  if (!scriptureRow) {
    return null;
  }

  const scripture = {
    id: scriptureRow.id as string,
    slug: scriptureRow.slug as string,
    tradition: (scriptureRow.tradition as string | null) ?? null,
    titleEn: (scriptureRow.title_en as string | null) ?? null,
    titleHi: (scriptureRow.title_hi as string | null) ?? null,
    descriptionEn: (scriptureRow.description_en as string | null) ?? null,
    descriptionHi: (scriptureRow.description_hi as string | null) ?? null
  };

  const {data: sectionRows} = await supabase
    .from('scripture_sections')
    .select(
      'id,parent_id,section_number,slug,title_en,title_hi,description_en,description_hi,sort_order'
    )
    .eq('scripture_id', scripture.id)
    .order('sort_order', {ascending: true, nullsFirst: false});

  const sections = (sectionRows ?? []).map((row) => ({
    id: row.id as string,
    parentId: (row.parent_id as string | null) ?? null,
    sectionNumber: (row.section_number as string | null) ?? null,
    slug: row.slug as string,
    titleEn: (row.title_en as string | null) ?? null,
    titleHi: (row.title_hi as string | null) ?? null,
    descriptionEn: (row.description_en as string | null) ?? null,
    descriptionHi: (row.description_hi as string | null) ?? null,
    sortOrder: (row.sort_order as string | null) ?? null
  }));

  const verseCount = await countScriptureVerses(scripture.id);
  return {...scripture, sections, verseCount};
}

export async function getScriptureSection(scriptureId: string, sectionSlug: string) {
  const supabase = await getContentClient();

  if (!supabase) {
    return null;
  }

  const {data: sectionRows} = await supabase
    .from('scripture_sections')
    .select(
      'id,scripture_id,parent_id,section_number,slug,title_en,title_hi,description_en,description_hi,sort_order'
    )
    .eq('scripture_id', scriptureId)
    .eq('slug', sectionSlug)
    .limit(1);

  const row = sectionRows?.[0];

  if (!row) {
    return null;
  }

  return {
    id: row.id as string,
    scriptureId: row.scripture_id as string,
    parentId: (row.parent_id as string | null) ?? null,
    sectionNumber: (row.section_number as string | null) ?? null,
    slug: row.slug as string,
    titleEn: (row.title_en as string | null) ?? null,
    titleHi: (row.title_hi as string | null) ?? null,
    descriptionEn: (row.description_en as string | null) ?? null,
    descriptionHi: (row.description_hi as string | null) ?? null,
    sortOrder: (row.sort_order as string | null) ?? null
  };
}

export async function getSectionVerses(sectionId: string, locale: 'en' | 'hi') {
  const supabase = await getContentClient();

  if (!supabase) {
    return [];
  }

  const {data: verseRows} = await supabase
    .from('verses')
    .select('id,verse_number,text_devanagari,transliteration,sort_order')
    .eq('section_id', sectionId)
    .order('sort_order', {ascending: true, nullsFirst: false});

  if (!verseRows || verseRows.length === 0) {
    return [];
  }

  const verseIds = verseRows.map((row) => row.id as string);
  const languages = locale === 'hi' ? ['hi', 'en'] : ['en'];

  const {data: translationRows} = await supabase
    .from('translations')
    .select('verse_id,language,translation,translator,source_id')
    .in('verse_id', verseIds)
    .in('language', languages);

  const sourceIds = Array.from(
    new Set(
      (translationRows ?? [])
        .map((row) => row.source_id as string | null)
        .filter((value): value is string => value != null)
    )
  );

  let sourcesById = new Map<string, {title: string | null; author: string | null}>();

  if (sourceIds.length > 0) {
    const {data: sourceRows} = await supabase
      .from('sources')
      .select('id,title,author')
      .in('id', sourceIds);

    sourcesById = new Map(
      (sourceRows ?? []).map((row) => [
        row.id as string,
        {
          title: (row.title as string | null) ?? null,
          author: (row.author as string | null) ?? null
        }
      ])
    );
  }

  const translationsByVerse = new Map<
    string,
    Array<{
      language: string;
      translation: string | null;
      translator: string | null;
      sourceId: string | null;
    }>
  >();

  for (const row of translationRows ?? []) {
    const verseId = row.verse_id as string;
    const list = translationsByVerse.get(verseId) ?? [];
    list.push({
      language: row.language as string,
      translation: (row.translation as string | null) ?? null,
      translator: (row.translator as string | null) ?? null,
      sourceId: (row.source_id as string | null) ?? null
    });
    translationsByVerse.set(verseId, list);
  }

  return verseRows.map((row) => {
    const verseId = row.id as string;
    const options = translationsByVerse.get(verseId) ?? [];
    const preferred =
      options.find((option) => option.language === locale) ??
      options.find((option) => option.language === 'en');
    const source = preferred?.sourceId ? sourcesById.get(preferred.sourceId) : undefined;

    return {
      id: verseId,
      verseNumber: row.verse_number as string,
      textDevanagari: (row.text_devanagari as string | null) ?? null,
      transliteration: (row.transliteration as string | null) ?? null,
      sortOrder: (row.sort_order as string | null) ?? null,
      translation: preferred?.translation ?? null,
      translator: preferred?.translator ?? null,
      sourceTitle: source?.title ?? null,
      sourceAuthor: source?.author ?? null,
      isFallback:
        locale !== 'en' &&
        options.every((option) => option.language !== locale) &&
        preferred != null
    };
  });
}