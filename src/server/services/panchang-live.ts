import {isPanchangLiveConfigured} from '@/schemas/env';
import {samplePanchang, type PanchangContext, type PanchangData} from '@/content/panchang';

const TOKEN_URL = 'https://api.prokerala.com/token';
const API_BASE = 'https://api.prokerala.com/v2/astrology';
const FETCH_TIMEOUT_MS = 8000;
/** Day cache lives at most 12h and is capped to avoid unbounded growth. */
const DAY_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const DAY_CACHE_MAX_ENTRIES = 31;

let cachedToken: {value: string; expiresAt: number} | null = null;
/** Guards concurrent token fetches so parallel page renders share one request. */
let inflightToken: Promise<string> | null = null;
const dayCache = new Map<string, {data: PanchangData; storedAt: number}>();
/** Guards concurrent live fetches for the same day+coordinates. */
const inflightDay = new Map<string, Promise<PanchangData>>();

function pruneDayCache(): void {
  if (dayCache.size <= DAY_CACHE_MAX_ENTRIES) return;
  const oldest = [...dayCache.keys()].slice(0, dayCache.size - DAY_CACHE_MAX_ENTRIES);
  for (const key of oldest) dayCache.delete(key);
}

function readDayCache(key: string): PanchangData | null {
  const entry = dayCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.storedAt > DAY_CACHE_TTL_MS) {
    dayCache.delete(key);
    return null;
  }
  return entry.data;
}

/** Test-only escape hatch: clears module-level caches. */
export function __clearPanchangCachesForTests(): void {
  cachedToken = null;
  inflightToken = null;
  dayCache.clear();
  inflightDay.clear();
}

async function fetchToken(): Promise<string> {
  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('PROKERALA_NOT_CONFIGURED');
  }
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });
  if (!res.ok) {
    throw new Error(`PROKERALA_TOKEN_${res.status}`);
  }
  const json = (await res.json()) as {access_token?: string; expires_in?: number};
  if (!json.access_token) {
    throw new Error('PROKERALA_TOKEN_EMPTY');
  }
  // Tokens live one hour; refresh a few minutes early.
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 - 180_000
  };
  return cachedToken.value;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }
  if (inflightToken) return inflightToken;
  inflightToken = fetchToken().finally(() => {
    inflightToken = null;
  });
  return inflightToken;
}

async function prokeralaGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const token = await getAccessToken();
  const url = `${API_BASE}${path}?${new URLSearchParams(params).toString()}`;
  const res = await fetch(url, {
    headers: {Authorization: `Bearer ${token}`},
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });
  if (!res.ok) {
    throw new Error(`PROKERALA_${res.status}`);
  }
  const json = (await res.json()) as {status?: string; data?: T};
  if (json.status !== 'ok' || !json.data) {
    throw new Error('PROKERALA_BAD_RESPONSE');
  }
  return json.data;
}

interface ProkeralaSpan {
  name?: string;
  paksha?: string;
  start?: string;
  end?: string;
}

interface ProkeralaMuhurat {
  name?: string;
  period?: Array<{start?: string; end?: string}>;
}

/** Extract HH:MM in IST. Tolerates ISO strings with/without offsets. */
export function hhmm(iso: string | undefined): string | null {
  if (!iso || typeof iso !== 'string') return null;
  const trimmed = iso.trim();
  if (trimmed.length < 10) return null;
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(parsed);
    if (/^\d{2}:\d{2}$/.test(parts)) return parts;
  }
  // Fallback for non-parseable clock strings: look for HH:MM anywhere.
  const match = trimmed.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hh = match[1].padStart(2, '0');
  const mm = match[2];
  if (Number(hh) > 23 || Number(mm) > 59) return null;
  return `${hh}:${mm}`;
}

function spanRange(span: ProkeralaSpan | undefined): string | null {
  const start = hhmm(span?.start);
  const end = hhmm(span?.end);
  if (!start || !end) return null;
  return `${start}–${end}`;
}

function shortPaksha(paksha: string | undefined): string {
  if (!paksha) return '';
  return paksha.replace(' Paksha', '').replace(' पक्ष', '');
}

function first<T>(value: T[] | undefined): T | undefined {
  return Array.isArray(value) && value.length > 0 ? value[0] : undefined;
}

function normalizeMuhuratName(name: string | undefined): string {
  return (name ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function muhuratRange(list: ProkeralaMuhurat[] | undefined, name: string): string | null {
  const want = normalizeMuhuratName(name);
  const entries = Array.isArray(list) ? list : [];
  // Exact match first, then tolerant contains-match for API naming drift
  // (e.g. "Rahu Kalam" vs "Rahu", "Abhijit" vs "Abhijit Muhurat").
  const entry =
    entries.find((m) => normalizeMuhuratName(m.name) === want) ??
    entries.find(
      (m) => normalizeMuhuratName(m.name).includes(want) || want.includes(normalizeMuhuratName(m.name))
    );
  return spanRange(first(entry?.period));
}

/** IST calendar date (YYYY-MM-DD) for the given instant. */
export function istDateString(at: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(at);
  return parts;
}

export function defaultPanchangContext(date: string = istDateString()): PanchangContext {
  return {
    date,
    location: 'New Delhi',
    timeZone: 'Asia/Kolkata',
    latitude: 28.6139,
    longitude: 77.209
  };
}

async function fetchLive(context: PanchangContext): Promise<PanchangData> {
  const date = context.date ?? istDateString();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('PROKERALA_BAD_DATE');
  }
  const coords = `${context.latitude},${context.longitude}`;
  const datetime = `${date}T12:00:00+05:30`;
  const base = {ayanamsa: '1', coordinates: coords, datetime};
  // English panchang is required; Hindi names and muhurat windows are
  // best-effort so a partial provider outage still yields honest live data
  // instead of dropping all the way back to the sample fixture.
  const [enSettled, hiSettled, auspSettled, inauspSettled] = await Promise.allSettled([
    prokeralaGet<{
      tithi?: ProkeralaSpan[];
      nakshatra?: ProkeralaSpan[];
      karana?: ProkeralaSpan[];
      yoga?: ProkeralaSpan[];
      sunrise?: string;
      sunset?: string;
      moonrise?: string;
      moonset?: string;
    }>('/panchang', {...base, la: 'en'}),
    prokeralaGet<{
      tithi?: ProkeralaSpan[];
      nakshatra?: ProkeralaSpan[];
    }>('/panchang', {...base, la: 'hi'}),
    prokeralaGet<{muhurat?: ProkeralaMuhurat[]}>('/auspicious-period', base),
    prokeralaGet<{muhurat?: ProkeralaMuhurat[]}>('/inauspicious-period', base)
  ]);
  if (enSettled.status !== 'fulfilled') {
    throw enSettled.reason instanceof Error ? enSettled.reason : new Error('PROKERALA_EN_FAILED');
  }
  const en = enSettled.value;
  const hi = hiSettled.status === 'fulfilled' ? hiSettled.value : undefined;
  const ausp = auspSettled.status === 'fulfilled' ? auspSettled.value : undefined;
  const inausp = inauspSettled.status === 'fulfilled' ? inauspSettled.value : undefined;

  const tithi = first(en.tithi);
  const tithiHi = first(hi?.tithi);
  const nakshatra = first(en.nakshatra);
  const nakshatraHi = first(hi?.nakshatra);
  const pakshaEn = shortPaksha(tithi?.paksha);
  const pakshaHi = shortPaksha(tithiHi?.paksha);
  const calculatedAt = new Date().toISOString();

  const tithiNext = en.tithi?.[1];
  const nakshatraNext = en.nakshatra?.[1];
  const yoga = first(en.yoga);
  const karana = first(en.karana);

  const data: PanchangData = {
    status: 'live',
    context: {...context, date},
    provenance: {
      provider: 'prokerala',
      calculatedAt,
      convention: 'Lahiri ayanamsa'
    },
    values: {
      tithi: tithi?.name ? {en: tithi.name, hi: tithiHi?.name ?? tithi.name} : null,
      nakshatra: nakshatra?.name
        ? {en: nakshatra.name, hi: nakshatraHi?.name ?? nakshatra.name}
        : null,
      paksha: pakshaEn ? {en: pakshaEn, hi: pakshaHi || pakshaEn} : null,
      sunrise: hhmm(en.sunrise) ? {en: hhmm(en.sunrise)!, hi: hhmm(en.sunrise)!} : null,
      sunset: hhmm(en.sunset) ? {en: hhmm(en.sunset)!, hi: hhmm(en.sunset)!} : null,
      rahu: (() => {
        const range = muhuratRange(inausp?.muhurat, 'Rahu');
        return range ? {en: range, hi: range} : null;
      })(),
      muhurat: (() => {
        const range = muhuratRange(ausp?.muhurat, 'Abhijit Muhurat');
        return range ? {en: range, hi: range} : null;
      })(),
      observance: null
    },
    details: {
      ...(tithi && tithiNext
        ? {tithiTransitions: `${tithi.name} → ${tithiNext.name} · ends ${hhmm(tithi.end) ?? ''}`.trim()}
        : {}),
      ...(nakshatra && nakshatraNext
        ? {nakshatraTransitions: `${nakshatra.name} → ${nakshatraNext.name} · ends ${hhmm(nakshatra.end) ?? ''}`.trim()}
        : {}),
      ...(yoga?.name ? {yoga: `${yoga.name}${hhmm(yoga.end) ? ` · ends ${hhmm(yoga.end)}` : ''}`} : {}),
      ...(karana?.name ? {karana: `${karana.name}${hhmm(karana.end) ? ` · ends ${hhmm(karana.end)}` : ''}`} : {}),
      ...(hhmm(en.moonrise) ? {moonrise: hhmm(en.moonrise)!} : {}),
      ...(hhmm(en.moonset) ? {moonset: hhmm(en.moonset)!} : {}),
      ...(() => {
        const y = muhuratRange(inausp?.muhurat, 'Yamaganda');
        return y ? {yamaganda: y} : {};
      })(),
      ...(() => {
        const g = muhuratRange(inausp?.muhurat, 'Gulika');
        return g ? {gulika: g} : {};
      })(),
      ...(() => {
        const a = muhuratRange(ausp?.muhurat, 'Abhijit Muhurat');
        return a ? {abhijit: a} : {};
      })()
    }
  };
  // Never show a "Live" badge with no usable values — fall back honestly.
  if (!hasCriticalLiveValues(data)) {
    throw new Error('PROKERALA_EMPTY');
  }
  return data;
}

function hasCriticalLiveValues(data: PanchangData): boolean {
  const v = data.values;
  return Boolean(v.tithi || v.nakshatra || v.sunrise || v.sunset);
}

/**
 * Live-first Panchang with honest fallback. Returns the clearly labelled
 * sample fixture whenever live data is unconfigured or unreachable — never
 * throws, never invents values.
 */
export async function getDayPanchang(context?: PanchangContext): Promise<PanchangData> {
  const ctx = context ?? defaultPanchangContext();
  if (!isPanchangLiveConfigured()) {
    return samplePanchang;
  }
  const cacheKey = `${ctx.date ?? istDateString()}|${ctx.latitude},${ctx.longitude}`;
  const cached = readDayCache(cacheKey);
  if (cached) return cached;
  const inflight = inflightDay.get(cacheKey);
  if (inflight) return inflight;
  const task = (async () => {
    try {
      const live = await fetchLive(ctx);
      dayCache.set(cacheKey, {data: live, storedAt: Date.now()});
      pruneDayCache();
      return live;
    } catch (error) {
      // Log a stable code only — never tokens, coordinates in full, or bodies.
      const code = error instanceof Error ? error.message : 'UNKNOWN';
      console.error(`Live Panchang unavailable (${code}), serving sample fixture`);
      return samplePanchang;
    } finally {
      inflightDay.delete(cacheKey);
    }
  })();
  inflightDay.set(cacheKey, task);
  return task;
}
