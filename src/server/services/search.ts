import {getLearnCategories} from '@/content/learn';
import {festivalGuides} from '@/content/festivals';
import {pickLocalizedText} from '@/lib/localized';
export interface SearchEntry {
  id: string;
  href: string;
  title: string;
  summary: string;
  kind: 'learn' | 'festival' | 'vrat' | 'calendar' | 'scripture';
  searchText: string;
  draft: boolean;
}
// Common transliteration variants folded to the canonical form used in
// titles and slugs. Applied to whole tokens on both query and index sides.
const TRANSLIT_ALIASES: Record<string, string> = {
  krsna: 'krishna',
  krisna: 'krishna',
  siva: 'shiva',
  shiv: 'shiva',
  visnu: 'vishnu',
  ganesh: 'ganesha',
  ganpati: 'ganesha',
  laxmi: 'lakshmi',
  luxmi: 'lakshmi',
  pooja: 'puja',
  ram: 'rama',
  ramayan: 'ramayana',
  mahabharat: 'mahabharata',
  geeta: 'gita',
  deepavali: 'diwali',
  dipavali: 'diwali',
  navaratri: 'navratri',
  ved: 'veda',
  vedas: 'veda',
  puran: 'purana',
  moksh: 'moksha',
  sansar: 'samsara',
  dharm: 'dharma',
  karm: 'karma',
  upvas: 'vrat',
  tyohar: 'festival'
};
// Preserve Devanagari marks; only remove diacritics from Latin characters.
export function normalizeQuery(value: string) {
  const cleaned = value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(
      /[āīūṛṝḷṃṁḥṅñṭḍṇśṣ]/g,
      (c) =>
        ({
          ā: 'a',
          ī: 'i',
          ū: 'u',
          ṛ: 'r',
          ṝ: 'r',
          ḷ: 'l',
          ṃ: 'm',
          ṁ: 'm',
          ḥ: 'h',
          ṅ: 'n',
          ñ: 'n',
          ṭ: 't',
          ḍ: 'd',
          ṇ: 'n',
          ś: 's',
          ṣ: 's'
        })[c] ?? c
    )
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, ' ')
    .trim();
  return cleaned
    .split(' ')
    .map((t) => TRANSLIT_ALIASES[t] ?? t)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when two words differ by at most one insertion, deletion or swap. */
export function isNearMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (edits > 0) return false;
    edits++;
    if (la === lb) {
      i++;
      j++;
    } else if (la > lb) {
      i++;
    } else {
      j++;
    }
  }
  return edits + (la - i + (lb - j)) <= 1;
}
export function getSearchEntries(locale: string): SearchEntry[] {
  const local = (v: {en: string; hi?: string}) =>
    pickLocalizedText(locale, v.en, v.hi);
  const topics = getLearnCategories()
    .flatMap((c) => c.topics)
    .map((topic) => ({
      id: `learn:${topic.slug}`,
      href: `/learn/${topic.category}/${topic.slug}`,
      title: local(topic.title),
      summary: local(topic.summary),
      kind:
        topic.category === 'scriptures'
          ? ('scripture' as const)
          : ('learn' as const),
      searchText: [
        topic.slug,
        topic.title.en,
        topic.title.hi,
        topic.summary.en,
        topic.summary.hi,
        ...topic.sections.flatMap((s) => [s.body.en, s.body.hi])
      ].join(' '),
      draft: topic.status === 'draft'
    }));
  const festivals = festivalGuides.map((g) => ({
    id: `festival:${g.slug}`,
    href: `/explore/festivals/${g.slug}`,
    title: local(g.title),
    summary: local(g.summary),
    kind: g.kind,
    searchText: [
      g.slug,
      g.title.en,
      g.title.hi,
      g.summary.en,
      g.summary.hi,
      g.slug === 'diwali' ? 'deepavali dipavali दीपावली दिवाली' : ''
    ].join(' '),
    draft: true
  }));
  const calendar = [
    ['tithi', 'Tithi', 'तिथि'],
    ['nakshatra', 'Nakshatra', 'नक्षत्र'],
    ['paksha', 'Paksha', 'पक्ष'],
    ['rahu', 'Rahu Kaal', 'राहु काल'],
    ['karana', 'Karana', 'करण'],
    ['yogaTerm', 'Yoga (calendar)', 'योग (पंचांग)'],
    ['muhuratTerm', 'Muhurat', 'मुहूर्त']
  ].map(([key, en, hi]) => ({
    id: `calendar:${key}`,
    href: `/panchang#${key}`,
    title: locale === 'hi' ? hi : en,
    summary:
      locale === 'hi'
        ? 'पंचांग का अर्थ और संदर्भ समझें।'
        : 'Understand this calendar term and its context.',
    kind: 'calendar' as const,
    searchText: `${en} ${hi} panchang पंचांग calendar`,
    draft: false
  }));
  return [...topics, ...festivals, ...calendar];
}
const stopWords = new Set([
  'what',
  'is',
  'the',
  'a',
  'an',
  'of',
  'in',
  'how',
  'do',
  'i',
  'does',
  'why',
  'to',
  'and',
  'about',
  'can',
  'me',
  'tell',
  'who',
  'whom',
  'whose',
  'when',
  'where',
  'which',
  'क्या',
  'है',
  'हैं',
  'में',
  'का',
  'की',
  'के',
  'कैसे',
  'क्यों',
  'मुझे',
  'बताएं',
  'बताएँ',
  'कौन',
  'कब',
  'कहाँ',
  'किस',
  'करें',
  'करना',
  'करे',
  'होता',
  'होती',
  'होते'
]);
export function searchContent(
  query: string,
  locale: string,
  kind?: string
): SearchEntry[] {
  const normalized = normalizeQuery(query.slice(0, 300));
  const tokens = normalized.split(' ').filter((t) => t && !stopWords.has(t));
  if (!tokens.length) return [];
  return getSearchEntries(locale)
    .filter((e) => !kind || kind === 'all' || e.kind === kind)
    .map((entry) => {
      const title = normalizeQuery(entry.title);
      const titleWords = title.split(' ').filter(Boolean);
      const hay = normalizeQuery(entry.searchText);
      let score = 0;
      let matchedAll = true;
      for (const t of tokens) {
        if (hay.includes(t)) {
          score += title.includes(t) ? 5 : 1;
          continue;
        }
        // Typo tolerance (tokens of 5+ chars): one-edit match against
        // title words only, so body text can never promote a result.
        if (t.length >= 5 && titleWords.some((w) => isNearMatch(t, w))) {
          score += 3;
          continue;
        }
        matchedAll = false;
        break;
      }
      if (!matchedAll) return {entry, score: 0};
      if (title === normalized) score += 20;
      return {entry, score};
    })
    .filter((r) => r.score > 0)
    // Higher score first; on ties prefer festival guides, then full topics,
    // then scripture introductions, with glossary stubs last.
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const rank = (k: SearchEntry['kind']) =>
        k === 'festival' || k === 'vrat' ? 0 : k === 'learn' ? 1 : k === 'scripture' ? 2 : 3;
      return rank(a.entry.kind) - rank(b.entry.kind) || a.entry.id.localeCompare(b.entry.id);
    })
    .map((r) => r.entry)
    .slice(0, 40);
}
