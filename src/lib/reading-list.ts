export const READING_LIST_KEY = 'sanatan.reading-list.v1';
export const READING_LIST_EVENT = 'sanatan-reading-list-change';
export function readSavedTopics(): string[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(READING_LIST_KEY) ?? '[]'
    );
    return Array.isArray(value)
      ? value.filter((v): v is string => typeof v === 'string').slice(0, 200)
      : [];
  } catch {
    return [];
  }
}
export function toggleSavedTopic(id: string): void {
  const saved = readSavedTopics();
  const next = saved.includes(id)
    ? saved.filter((v) => v !== id)
    : [...saved, id].slice(-200);
  localStorage.setItem(READING_LIST_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(READING_LIST_EVENT));
}
export function subscribeReadingList(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(READING_LIST_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(READING_LIST_EVENT, callback);
  };
}
export function readingListSnapshot() {
  try {
    return localStorage.getItem(READING_LIST_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

export interface RemoteBookmark {
  category: string;
  slug: string;
}

/** Union of local ids and account bookmarks, preserving local order first.
 *  Pure function — unit tested. */
export function mergeReadingLists(localIds: string[], remote: RemoteBookmark[]): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const id of [...localIds, ...remote.map((r) => `${r.category}/${r.slug}`)]) {
    if (typeof id === 'string' && id.includes('/') && !seen.has(id)) {
      seen.add(id);
      merged.push(id);
    }
  }
  return merged.slice(0, 200);
}

function splitId(id: string): {category: string; slug: string} | null {
  const slash = id.indexOf('/');
  if (slash <= 0 || slash === id.length - 1) return null;
  return {category: id.slice(0, slash), slug: id.slice(slash + 1)};
}

/**
 * Best-effort account sync. Pulls server bookmarks, merges with the local
 * list, pushes back anything missing server-side, and stores the union
 * locally. Never throws; any failure leaves the local list untouched.
 */
export async function syncReadingList(): Promise<'synced' | 'skipped'> {
  try {
    const me = await fetch('/api/me', {cache: 'no-store'});
    const meJson = (await me.json()) as {data?: {user?: unknown}};
    if (!meJson.data?.user) return 'skipped';
    const res = await fetch('/api/learn-bookmarks', {cache: 'no-store'});
    if (!res.ok) return 'skipped';
    const remoteJson = (await res.json()) as {
      success?: boolean;
      data?: RemoteBookmark[];
    };
    if (!remoteJson.success || !Array.isArray(remoteJson.data)) return 'skipped';
    const local = readSavedTopics();
    const merged = mergeReadingLists(local, remoteJson.data);
    const remoteIds = new Set(remoteJson.data.map((r) => `${r.category}/${r.slug}`));
    const missing = merged
      .map(splitId)
      .filter((p): p is {category: string; slug: string} => p !== null)
      .filter((p) => !remoteIds.has(`${p.category}/${p.slug}`));
    if (missing.length > 0) {
      await fetch('/api/learn-bookmarks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(missing)
      });
    }
    localStorage.setItem(READING_LIST_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event(READING_LIST_EVENT));
    return 'synced';
  } catch {
    return 'skipped';
  }
}
