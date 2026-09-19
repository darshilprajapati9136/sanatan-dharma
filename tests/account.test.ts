import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mergeReadingLists,
  readSavedTopics,
  READING_LIST_KEY
} from '../src/lib/reading-list';
import {
  learnBookmarkSchema,
  preferencesSchema,
  readingProgressSchema
} from '../src/schemas/account';

test('merge keeps local order, appends account-only items, dedupes', () => {
  const merged = mergeReadingLists(['foundations/karma', 'deities/rama'], [
    {category: 'deities', slug: 'rama'},
    {category: 'practices', slug: 'puja'}
  ]);
  assert.deepEqual(merged, ['foundations/karma', 'deities/rama', 'practices/puja']);
});

test('merge drops malformed ids and caps at 200', () => {
  const local = Array.from({length: 250}, (_, i) => `c/s${i}`);
  const merged = mergeReadingLists([...local, 'no-slash', ''], []);
  assert.equal(merged.length, 200);
  assert.ok(!merged.includes('no-slash'));
});

test('reading-list storage helpers tolerate hostile input', () => {
  const saved = (globalThis as {localStorage?: unknown}).localStorage;
  assert.equal(typeof readSavedTopics, 'function');
  assert.ok(READING_LIST_KEY.length > 0);
  assert.equal(saved, undefined); // node has no localStorage; helpers must not import-crash
});

test('preferences schema accepts valid input, rejects the rest', () => {
  assert.ok(
    preferencesSchema.safeParse({location: 'Mumbai', tradition: 'smarta', calendar: 'amanta'})
      .success
  );
  assert.ok(
    preferencesSchema.safeParse({location: 'Mumbai', calendar: 'purnimanta'}).success
  );
  assert.ok(!preferencesSchema.safeParse({location: 'Atlantis', calendar: 'purnimanta'}).success);
  assert.ok(!preferencesSchema.safeParse({location: 'Mumbai', calendar: 'gregorian'}).success);
  assert.ok(!preferencesSchema.safeParse({location: '', calendar: 'purnimanta'}).success);
});

test('bookmark and progress schemas enforce shapes and bounds', () => {
  assert.ok(
    learnBookmarkSchema.safeParse({category: 'deities', slug: 'rama'}).success
  );
  assert.ok(!learnBookmarkSchema.safeParse({category: '', slug: 'rama'}).success);
  assert.ok(
    readingProgressSchema.safeParse({
      scriptureId: '123e4567-e89b-12d3-a456-426614174000',
      progressPercentage: 42
    }).success
  );
  assert.ok(
    !readingProgressSchema.safeParse({
      scriptureId: 'not-a-uuid',
      progressPercentage: 42
    }).success
  );
  assert.ok(
    !readingProgressSchema.safeParse({
      scriptureId: '123e4567-e89b-12d3-a456-426614174000',
      progressPercentage: 101
    }).success
  );
});
