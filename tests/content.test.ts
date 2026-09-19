import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSearchEntries,
  normalizeQuery,
  searchContent
} from '../src/server/services/search';
import {samplePanchang} from '../src/content/panchang';
import {festivalGuides} from '../src/content/festivals';
import {getLearnTopic, getLearnCategories} from '../src/content/learn';
import en from '../messages/en.json';
import hi from '../messages/hi.json';

test('Hindi and English question retrieval finds the same concept', () => {
  assert.equal(searchContent('What is karma?', 'en')[0]?.id, 'learn:karma');
  assert.equal(searchContent('कर्म क्या है?', 'hi')[0]?.id, 'learn:karma');
  assert.equal(searchContent('dharma', 'hi')[0]?.id, 'learn:dharma');
  assert.equal(normalizeQuery('KĀRMA'), 'karma');
  assert.equal(normalizeQuery('कर्म'), 'कर्म');
});
test('filters and unknown queries do not fabricate results', () => {
  assert.equal(searchContent('unfindable xyz', 'en').length, 0);
  assert.equal(searchContent('what is the', 'en').length, 0);
  assert.equal(searchContent('Diwali', 'en', 'vrat').length, 0);
  assert.equal(
    searchContent('Ekadashi', 'en', 'vrat')[0]?.id,
    'festival:ekadashi'
  );
  assert.equal(
    searchContent('तिथि', 'hi', 'calendar')[0]?.id,
    'calendar:tithi'
  );
  assert.equal(
    searchContent('गीता', 'hi', 'scripture')[0]?.id,
    'learn:bhagavad-gita'
  );
});
test('Panchang fixture can never be mistaken for dated live data', () => {
  assert.equal(samplePanchang.status, 'sample');
  assert.equal(samplePanchang.context.date, null);
  assert.equal(samplePanchang.provenance.calculatedAt, null);
  assert.equal(samplePanchang.values.muhurat, null);
  assert.equal(samplePanchang.values.observance, null);
});
test('indexed content links resolve to local records', () => {
  for (const entry of getSearchEntries('en')) {
    if (entry.href.startsWith('/learn/')) {
      const [, , category, slug] = entry.href.split('/');
      assert.ok(getLearnTopic(category, slug), entry.href);
    }
    if (entry.href.startsWith('/explore/festivals/'))
      assert.ok(festivalGuides.some((g) => entry.href.endsWith('/' + g.slug)));
  }
  const slugs = getLearnCategories().flatMap((c) =>
    c.topics.map((t) => t.slug)
  );
  assert.equal(new Set(slugs).size, slugs.length);
});
test('festival dates are well-formed, ordered and honestly noted', () => {
  const dated = festivalGuides.filter((g) => g.dates && g.dates.length > 0);
  // Twice-monthly vrats stay dateless and direct readers to local calendars.
  for (const g of festivalGuides.filter((x) => x.kind === 'vrat')) {
    assert.equal(g.dates, undefined, g.slug);
  }
  assert.ok(dated.length >= 9, `expected dated guides, got ${dated.length}`);
  for (const g of dated) {
    const years = g.dates!.map((d) => d.year);
    assert.deepEqual(years, [...years].sort((a, b) => a - b), g.slug);
    for (const d of g.dates!) {
      assert.match(d.date, /^\d{4}-\d{2}-\d{2}$/, `${g.slug} ${d.year}`);
      assert.ok(d.basis.length > 0, `${g.slug} basis`);
      if (d.endDate) {
        assert.match(d.endDate, /^\d{4}-\d{2}-\d{2}$/, `${g.slug} end`);
        assert.ok(d.endDate >= d.date, `${g.slug} range`);
      }
      if (d.note) assert.ok(d.note.en.length > 0 && d.note.hi!.length > 0, `${g.slug} note`);
    }
  }
});
test('new interface messages are complete in both locales', () => {
  assert.deepEqual(Object.keys(en.daily).sort(), Object.keys(hi.daily).sort());
  for (const value of Object.values(hi.daily)) assert.ok(value.length > 0);
});
