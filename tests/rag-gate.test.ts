import test from 'node:test';
import assert from 'node:assert/strict';
import {
  abstainResponse,
  guardRagRequest,
  isRagEnabled,
  validateCitations
} from '../src/server/services/rag-gate';

const KNOWN = new Set(['learn:karma', 'festival:ekadashi', 'calendar:tithi']);

test('RAG is off by default and blocks every request', () => {
  const savedFlag = process.env.RAG_ENABLED;
  const savedKey = process.env.AI_API_KEY;
  delete process.env.RAG_ENABLED;
  delete process.env.AI_API_KEY;
  try {
    assert.equal(isRagEnabled(), false);
    assert.deepEqual(guardRagRequest('What is karma?'), {blocked: true, reason: 'RAG_DISABLED'});
  } finally {
    if (savedFlag !== undefined) process.env.RAG_ENABLED = savedFlag;
    if (savedKey !== undefined) process.env.AI_API_KEY = savedKey;
  }
});

test('RAG needs both the flag and a provider key', () => {
  const savedFlag = process.env.RAG_ENABLED;
  const savedKey = process.env.AI_API_KEY;
  try {
    process.env.RAG_ENABLED = 'true';
    delete process.env.AI_API_KEY;
    assert.equal(isRagEnabled(), false);
    process.env.AI_API_KEY = 'test-key';
    assert.equal(isRagEnabled(), true);
    assert.deepEqual(guardRagRequest('What is karma?'), {blocked: false});
    assert.deepEqual(guardRagRequest(''), {blocked: true, reason: 'RAG_EMPTY_INPUT'});
    assert.deepEqual(guardRagRequest('x'.repeat(301)), {blocked: true, reason: 'RAG_INPUT_TOO_LONG'});
  } finally {
    if (savedFlag !== undefined) process.env.RAG_ENABLED = savedFlag;
    else delete process.env.RAG_ENABLED;
    if (savedKey !== undefined) process.env.AI_API_KEY = savedKey;
    else delete process.env.AI_API_KEY;
  }
});

test('citations must resolve to approved local records', () => {
  const resolve = (id: string) => KNOWN.has(id);
  assert.deepEqual(validateCitations(['learn:karma', 'calendar:tithi'], resolve), {
    valid: true,
    invalid: []
  });
  // Unknown id fails even with an approved prefix.
  assert.equal(validateCitations(['learn:made-up'], resolve).valid, false);
  // Unapproved prefix fails even if resolvable.
  assert.equal(validateCitations(['web:random-article'], () => true).valid, false);
  // Draft/unapproved material (not in the resolver) fails.
  assert.equal(validateCitations(['learn:karma'], () => false).valid, false);
});

test('abstention is bilingual with safe reading pointers', () => {
  const en = abstainResponse('en');
  const hi = abstainResponse('hi');
  assert.ok(en.text.length > 0 && hi.text.length > 0);
  assert.notEqual(en.text, hi.text);
  assert.deepEqual(en.readingIds, ['learn:dharma', 'learn:karma']);
});
