import test from 'node:test';
import assert from 'node:assert/strict';
import {
  __clearPanchangCachesForTests,
  getDayPanchang,
  hhmm,
  istDateString,
  muhuratRange
} from '../src/server/services/panchang-live';
import {samplePanchang} from '../src/content/panchang';

test('istDateString returns YYYY-MM-DD in Asia/Kolkata', () => {
  const at = new Date('2026-09-19T01:00:00Z'); // 06:30 IST same day
  assert.match(istDateString(at), /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(istDateString(at), '2026-09-19');
});

test('hhmm parses ISO with offsets into IST wall time', () => {
  assert.equal(hhmm('2026-09-19T06:15:00+05:30'), '06:15');
  // Same instant expressed in UTC still renders as IST.
  assert.equal(hhmm('2026-09-19T00:45:00Z'), '06:15');
  assert.equal(hhmm(undefined), null);
  assert.equal(hhmm('not-a-time'), null);
  assert.equal(hhmm('2026-09-19T99:99:00+05:30'), null);
});

test('muhuratRange tolerates provider naming drift', () => {
  const list = [
    {name: 'Rahu Kalam', period: [{start: '2026-09-19T09:13:00+05:30', end: '2026-09-19T10:44:00+05:30'}]},
    {name: 'Abhijit', period: [{start: '2026-09-19T11:50:00+05:30', end: '2026-09-19T12:38:00+05:30'}]}
  ];
  assert.equal(muhuratRange(list, 'Rahu'), '09:13–10:44');
  assert.equal(muhuratRange(list, 'Abhijit Muhurat'), '11:50–12:38');
  assert.equal(muhuratRange(undefined, 'Rahu'), null);
  assert.equal(muhuratRange([], 'Rahu'), null);
});

test('getDayPanchang falls back to labelled sample when unconfigured', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  delete process.env.PROKERALA_CLIENT_ID;
  delete process.env.PROKERALA_CLIENT_SECRET;
  __clearPanchangCachesForTests();
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'sample');
    assert.equal(data.context.date, samplePanchang.context.date);
    assert.equal(data.provenance.calculatedAt, null);
  } finally {
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    __clearPanchangCachesForTests();
  }
});

test('getDayPanchang falls back on empty live payload, never live-with-nulls', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedFetch = globalThis.fetch;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    if (href.includes('/token')) {
      return {ok: true, json: async () => ({access_token: 'tok', expires_in: 3600})} as Response;
    }
    return {ok: true, json: async () => ({status: 'ok', data: {}})} as Response;
  }) as typeof fetch;
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'sample');
  } finally {
    globalThis.fetch = savedFetch;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});

test('getDayPanchang falls back to sample when token request is rejected', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedFetch = globalThis.fetch;
  const savedError = console.error;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  console.error = () => {};
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    if (href.includes('/token')) {
      return {ok: false, status: 401, json: async () => ({})} as Response;
    }
    return {ok: true, json: async () => ({status: 'ok', data: {}})} as Response;
  }) as typeof fetch;
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'sample');
    assert.equal(data.provenance.calculatedAt, null);
  } finally {
    globalThis.fetch = savedFetch;
    console.error = savedError;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});

test('getDayPanchang falls back to sample when required English endpoint fails', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedFetch = globalThis.fetch;
  const savedError = console.error;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  console.error = () => {};
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    if (href.includes('/token')) {
      return {ok: true, json: async () => ({access_token: 'tok', expires_in: 3600})} as Response;
    }
    if (href.includes('la=en')) {
      return {ok: false, status: 500, json: async () => ({})} as Response;
    }
    return {ok: true, json: async () => ({status: 'ok', data: {}})} as Response;
  }) as typeof fetch;
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'sample');
  } finally {
    globalThis.fetch = savedFetch;
    console.error = savedError;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});

test('getDayPanchang falls back to sample on invalid date, never throws', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedError = console.error;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  console.error = () => {};
  try {
    const data = await getDayPanchang({
      date: 'not-a-date',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'sample');
  } finally {
    console.error = savedError;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});

test('getDayPanchang stays live with English fallback when Hindi endpoint fails', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedFetch = globalThis.fetch;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    if (href.includes('/token')) {
      return {ok: true, json: async () => ({access_token: 'tok', expires_in: 3600})} as Response;
    }
    if (href.includes('la=hi')) {
      return {ok: false, status: 503, json: async () => ({})} as Response;
    }
    if (href.includes('/auspicious-period') || href.includes('/inauspicious-period')) {
      return {ok: false, status: 500, json: async () => ({})} as Response;
    }
    return {
      ok: true,
      json: async () => ({
        status: 'ok',
        data: {
          tithi: [{name: 'Ashtami', paksha: 'Krishna Paksha', start: '2026-09-19T00:00:00+05:30', end: '2026-09-19T15:27:00+05:30'}],
          nakshatra: [{name: 'Moola', start: '2026-09-19T00:00:00+05:30', end: '2026-09-20T01:43:00+05:30'}],
          sunrise: '2026-09-19T06:08:00+05:30',
          sunset: '2026-09-19T18:25:00+05:30'
        }
      })
    } as Response;
  }) as typeof fetch;
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'live');
    // Hindi names fall back to English values, never null when English exists.
    assert.equal(data.values.tithi?.en, 'Ashtami');
    assert.equal(data.values.tithi?.hi, 'Ashtami');
    assert.equal(data.values.nakshatra?.hi, 'Moola');
  } finally {
    globalThis.fetch = savedFetch;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});
test('getDayPanchang degrades gracefully when muhurat endpoints fail', async () => {
  const savedId = process.env.PROKERALA_CLIENT_ID;
  const savedSecret = process.env.PROKERALA_CLIENT_SECRET;
  const savedFetch = globalThis.fetch;
  process.env.PROKERALA_CLIENT_ID = 'test-id';
  process.env.PROKERALA_CLIENT_SECRET = 'test-secret';
  __clearPanchangCachesForTests();
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    if (href.includes('/token')) {
      return {ok: true, json: async () => ({access_token: 'tok', expires_in: 3600})} as Response;
    }
    if (href.includes('/auspicious-period') || href.includes('/inauspicious-period')) {
      return {ok: false, status: 500, json: async () => ({})} as Response;
    }
    return {
      ok: true,
      json: async () => ({
        status: 'ok',
        data: {
          tithi: [{name: 'Ashtami', paksha: 'Krishna Paksha', start: '2026-09-19T00:00:00+05:30', end: '2026-09-19T15:27:00+05:30'}],
          nakshatra: [{name: 'Moola', start: '2026-09-19T00:00:00+05:30', end: '2026-09-20T01:43:00+05:30'}],
          sunrise: '2026-09-19T06:08:00+05:30',
          sunset: '2026-09-19T18:25:00+05:30'
        }
      })
    } as Response;
  }) as typeof fetch;
  try {
    const data = await getDayPanchang({
      date: '2026-09-19',
      location: 'New Delhi',
      timeZone: 'Asia/Kolkata',
      latitude: 28.6139,
      longitude: 77.209
    });
    assert.equal(data.status, 'live');
    assert.equal(data.values.tithi?.en, 'Ashtami');
    assert.equal(data.values.rahu, null);
    assert.equal(data.values.observance, null);
  } finally {
    globalThis.fetch = savedFetch;
    if (savedId !== undefined) process.env.PROKERALA_CLIENT_ID = savedId;
    else delete process.env.PROKERALA_CLIENT_ID;
    if (savedSecret !== undefined) process.env.PROKERALA_CLIENT_SECRET = savedSecret;
    else delete process.env.PROKERALA_CLIENT_SECRET;
    __clearPanchangCachesForTests();
  }
});
