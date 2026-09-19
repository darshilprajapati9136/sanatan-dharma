import test from 'node:test';
import assert from 'node:assert/strict';
import {isNearMatch, normalizeQuery, searchContent} from '../src/server/services/search';

// Top-1 expectations verified against the corpus on 2026-09-19.
// `calendar:*` for "panchang" accepts any calendar term (all match equally).
const EN_CASES: Array<[string, string]> = [
  ['karma', 'learn:karma'],
  ['dharma', 'learn:dharma'],
  ['atman', 'learn:atman'],
  ['moksha', 'learn:moksha'],
  ['samsara', 'learn:samsara'],
  ['bhakti', 'learn:bhakti'],
  ['puja', 'learn:puja'],
  ['meditation', 'learn:meditation-basics'],
  ['yoga', 'learn:yoga-overview'],
  ['temple', 'learn:temple-traditions'],
  ['diwali', 'festival:diwali'],
  ['holi', 'festival:holi'],
  ['ekadashi', 'festival:ekadashi'],
  ['krishna', 'learn:krishna'],
  ['shiva', 'learn:shiva'],
  ['vishnu', 'learn:vishnu'],
  ['rama', 'learn:rama'],
  ['hanuman', 'learn:hanuman'],
  ['ganesha', 'learn:ganesha'],
  ['ramayana', 'learn:ramayana'],
  ['mahabharata', 'learn:mahabharata'],
  ['gita', 'learn:bhagavad-gita'],
  ['veda', 'learn:vedas'],
  ['upanishad', 'learn:upanishads'],
  ['mantra', 'learn:mantra-japa'],
  ['pilgrimage', 'learn:pilgrimage-sites'],
  ['dana', 'learn:dana-seva'],
  ['seva', 'learn:dana-seva'],
  ['pradosh', 'festival:pradosh'],
  ['navratri', 'festival:navratri'],
  ['janmashtami', 'festival:janmashtami'],
  ['dussehra', 'festival:dussehra'],
  ['tithi', 'calendar:tithi'],
  ['nakshatra', 'calendar:nakshatra'],
  ['rahu', 'calendar:rahu'],
  ['What is karma?', 'learn:karma'],
  ['What is dharma?', 'learn:dharma'],
  ['How do I do puja?', 'learn:puja'],
  // Transliteration variants
  ['krsna', 'learn:krishna'],
  ['siva', 'learn:shiva'],
  ['ganesh', 'learn:ganesha'],
  ['pooja', 'learn:puja'],
  ['deepavali', 'festival:diwali'],
  ['geeta', 'learn:bhagavad-gita'],
  ['ramayan', 'learn:ramayana'],
  ['mahabharat', 'learn:mahabharata'],
  ['karm', 'learn:karma'],
  ['dharm', 'learn:dharma'],
  ['moksh', 'learn:moksha'],
  // Typos (one edit)
  ['karrma', 'learn:karma'],
  ['shjva', 'learn:shiva']
];

const HI_CASES: Array<[string, string]> = [
  ['कर्म', 'learn:karma'],
  ['धर्म', 'learn:dharma'],
  ['आत्मा', 'learn:atman'],
  ['मोक्ष', 'learn:moksha'],
  ['संसार', 'learn:samsara'],
  ['भक्ति', 'learn:bhakti'],
  ['पूजा', 'learn:puja'],
  ['ध्यान', 'learn:meditation-basics'],
  ['योग', 'learn:yoga-overview'],
  ['मंदिर', 'learn:temple-traditions'],
  ['दीपावली', 'festival:diwali'],
  ['दिवाली', 'festival:diwali'],
  ['होली', 'festival:holi'],
  ['एकादशी', 'festival:ekadashi'],
  ['कृष्ण', 'learn:krishna'],
  ['शिव', 'learn:shiva'],
  ['विष्णु', 'learn:vishnu'],
  ['राम', 'learn:rama'],
  ['हनुमान', 'learn:hanuman'],
  ['गणेश', 'learn:ganesha'],
  ['रामायण', 'learn:ramayana'],
  ['महाभारत', 'learn:mahabharata'],
  ['गीता', 'learn:bhagavad-gita'],
  ['वेद', 'learn:vedas'],
  ['उपनिषद', 'learn:upanishads'],
  ['मंत्र', 'learn:mantra-japa'],
  ['तीर्थ', 'learn:pilgrimage-sites'],
  ['दान', 'learn:dana-seva'],
  ['सेवा', 'learn:dana-seva'],
  ['प्रदोष', 'festival:pradosh'],
  ['नवरात्रि', 'festival:navratri'],
  ['जन्माष्टमी', 'festival:janmashtami'],
  ['रक्षाबंधन', 'festival:raksha-bandhan'],
  ['दशहरा', 'festival:dussehra'],
  ['तिथि', 'calendar:tithi'],
  ['नक्षत्र', 'calendar:nakshatra'],
  ['राहु', 'calendar:rahu'],
  ['कर्म क्या है', 'learn:karma'],
  ['धर्म क्या है', 'learn:dharma'],
  ['मोक्ष क्या है', 'learn:moksha'],
  ['पूजा कैसे करें', 'learn:puja'],
  ['व्रत', 'festival:ekadashi'],
  ['देवी', 'learn:devi'],
  ['लक्ष्मी', 'learn:devi'],
  ['सरस्वती', 'learn:devi'],
  ['शिवरात्रि', 'festival:maha-shivaratri'],
  ['मकर संक्रांति', 'festival:makar-sankranti'],
  ['कृष्ण जन्म', 'festival:janmashtami'],
  ['राम कथा', 'learn:rama'],
  ['हनुमान चालीसा', 'learn:hanuman']
];

const ABSTAIN_QUERIES = [
  'dhamma xyzzy',
  'काल्पनिक xyzzy',
  'unfindable xyz',
  'quantum blockchain crypto',
  'asdfgh jklm',
  'ganesah',
  'what is the'
];

test('English evaluation set resolves to the expected concept', () => {
  for (const [query, expected] of EN_CASES) {
    assert.equal(searchContent(query, 'en')[0]?.id, expected, `query: ${query}`);
  }
});

test('Hindi evaluation set resolves to the expected concept', () => {
  for (const [query, expected] of HI_CASES) {
    assert.equal(searchContent(query, 'hi')[0]?.id, expected, `query: ${query}`);
  }
});

test('panchang matches a calendar term in both locales', () => {
  for (const locale of ['en', 'hi']) {
    const top = searchContent(locale === 'hi' ? 'पंचांग' : 'panchang', locale)[0]?.id ?? '';
    assert.ok(top.startsWith('calendar:'), `locale: ${locale}, got: ${top}`);
  }
});

test('unanswerable queries abstain instead of fabricating', () => {
  for (const query of ABSTAIN_QUERIES) {
    assert.equal(searchContent(query, 'en').length, 0, `query: ${query}`);
    assert.equal(searchContent(query, 'hi').length, 0, `query: ${query}`);
  }
});

test('Ask serves reading for answerable questions, empty state otherwise', () => {
  // Mirrors src/app/[locale]/ask/page.tsx: searchContent(q).slice(0, 5).
  const ask = (q: string, locale: string) => searchContent(q, locale).slice(0, 5);
  const answerable: Array<[string, string]> = [
    ['What is dharma?', 'en'],
    ['Who is Hanuman?', 'en'],
    ['When is Navratri?', 'en'],
    ['धर्म क्या है?', 'hi'],
    ['हनुमान कौन हैं?', 'hi'],
    ['दीपावली कब है?', 'hi']
  ];
  for (const [q, locale] of answerable) {
    assert.ok(ask(q, locale).length > 0, `ask: ${q}`);
  }
  for (const q of ABSTAIN_QUERIES) {
    assert.equal(ask(q, 'en').length, 0, `ask en: ${q}`);
    assert.equal(ask(q, 'hi').length, 0, `ask hi: ${q}`);
  }
});

test('normalization folds diacritics and transliteration variants', () => {  assert.equal(normalizeQuery('KĀRMA'), 'karma');
  assert.equal(normalizeQuery('krsna'), 'krishna');
  assert.equal(normalizeQuery('pooja'), 'puja');
  assert.equal(normalizeQuery('कर्म'), 'कर्म');
  assert.ok(isNearMatch('karrma', 'karma'));
  assert.ok(isNearMatch('shjva', 'shiva'));
  assert.ok(!isNearMatch('ganesah', 'ganesha'));
});
