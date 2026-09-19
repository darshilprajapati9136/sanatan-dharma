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
// Preserve Devanagari marks; only remove diacritics from Latin characters.
export function normalizeQuery(value: string) {
  return value
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
    ['rahu', 'Rahu Kaal', 'राहु काल']
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
  'बताएँ'
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
      const hay = normalizeQuery(entry.searchText);
      const matches = tokens.filter((t) => hay.includes(t));
      const score =
        matches.length === tokens.length
          ? matches.reduce((n, t) => n + (title.includes(t) ? 5 : 1), 0) +
            (title === normalized ? 20 : 0)
          : 0;
      return {entry, score};
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .map((r) => r.entry)
    .slice(0, 40);
}
