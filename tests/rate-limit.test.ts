import test from 'node:test';
import assert from 'node:assert/strict';
import {__clearRateLimitsForTests, checkRateLimit, clientIdentity} from '../src/lib/rate-limit';

test('allows up to the limit then blocks until the window resets', () => {
  __clearRateLimitsForTests();
  const now = 1_000_000;
  assert.equal(checkRateLimit('ip:ask', 3, 60_000, now).allowed, true);
  assert.equal(checkRateLimit('ip:ask', 3, 60_000, now).allowed, true);
  const last = checkRateLimit('ip:ask', 3, 60_000, now);
  assert.equal(last.allowed, true);
  assert.equal(last.remaining, 0);
  const blocked = checkRateLimit('ip:ask', 3, 60_000, now + 1000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.resetAfterMs > 0);
  // New window admits again.
  assert.equal(checkRateLimit('ip:ask', 3, 60_000, now + 61_000).allowed, true);
  __clearRateLimitsForTests();
});

test('buckets are independent per key', () => {
  __clearRateLimitsForTests();
  const now = 2_000_000;
  checkRateLimit('a', 1, 60_000, now);
  assert.equal(checkRateLimit('a', 1, 60_000, now).allowed, false);
  assert.equal(checkRateLimit('b', 1, 60_000, now).allowed, true);
  __clearRateLimitsForTests();
});

test('client identity prefers the forwarded chain', () => {
  assert.equal(clientIdentity('1.2.3.4, 5.6.7.8', '9.9.9.9'), '1.2.3.4');
  assert.equal(clientIdentity(null, '9.9.9.9'), '9.9.9.9');
  assert.equal(clientIdentity(null, ''), 'unknown');
});
