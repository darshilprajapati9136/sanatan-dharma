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
