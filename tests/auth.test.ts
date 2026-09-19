import test from 'node:test';
import assert from 'node:assert/strict';
import {getSafeNextPath} from '../src/server/services/auth';

test('safe next paths keep localized in-app targets', () => {
  assert.equal(getSafeNextPath('/en/profile', 'en'), '/en/profile');
  assert.equal(getSafeNextPath('/hi/learn/foundations', 'hi'), '/hi/learn/foundations');
  assert.equal(getSafeNextPath('/en/ask?q=karma', 'en'), '/en/ask?q=karma');
});

test('unsafe next targets fall back to the locale profile', () => {
  assert.equal(getSafeNextPath(undefined, 'en'), '/en/profile');
  assert.equal(getSafeNextPath('', 'hi'), '/hi/profile');
  assert.equal(getSafeNextPath('https://evil.example/en/profile', 'en'), '/en/profile');
  assert.equal(getSafeNextPath('//evil.example/hi', 'hi'), '/hi/profile');
  assert.equal(getSafeNextPath('/fr/profile', 'en'), '/en/profile');
  assert.equal(getSafeNextPath('/en/../hi/profile', 'en'), '/en/profile');
  assert.equal(getSafeNextPath('/profile', 'en'), '/en/profile');
  assert.equal(getSafeNextPath('en/profile', 'en'), '/en/profile');
});
