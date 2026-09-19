/**
 * RAG activation gate. Retrieval-augmented generation stays OFF until every
 * condition below holds — this module is the single chokepoint a future
 * provider integration must pass through.
 *
 * Product rules enforced here (see docs: AI Architecture RAG Specification):
 * 1. Explicit opt-in (`RAG_ENABLED=true`) plus a provider key. Never on by default.
 * 2. Citations may only reference approved local content ids
 *    (`learn:*`, `festival:*`, `calendar:*`, `scripture:*`). Anything else
 *    is rejected, never silently dropped.
 * 3. Abstention is a first-class response: when no approved evidence supports
 *    an answer, the caller must serve the fixed abstention text and reading
 *    pointers instead of generating.
 * 4. Calendar calculation is never delegated: Panchang values stay on the
 *    provider boundary (`src/server/services/panchang-live.ts`).
 */

export const APPROVED_CONTENT_PREFIXES = ['learn:', 'festival:', 'calendar:', 'scripture:'] as const;

export const RAG_MAX_INPUT_CHARS = 300;

export function isRagEnabled(): boolean {
  return process.env.RAG_ENABLED === 'true' && Boolean(process.env.AI_API_KEY);
}

export interface CitationCheck {
  valid: boolean;
  invalid: string[];
}

/**
 * Every citation must resolve to an approved local record. `resolve` answers
 * whether an id exists in the approved corpus (local index today, approved
 * database rows later). Unknown ids fail the whole set.
 */
export function validateCitations(ids: string[], resolve: (id: string) => boolean): CitationCheck {
  const invalid = ids.filter(
    (id) =>
      !APPROVED_CONTENT_PREFIXES.some((prefix) => id.startsWith(prefix)) || !resolve(id)
  );
  return {valid: invalid.length === 0, invalid};
}

export function abstainResponse(locale: string): {text: string; readingIds: string[]} {
  return {
    text:
      locale === 'hi'
        ? 'इस प्रश्न के लिए स्वीकृत सामग्री में पर्याप्त आधार नहीं है। कृपया नीचे दिया गया पाठ पढ़ें या प्रश्न बदलें।'
        : 'There is not enough approved material to answer this question. Please read the suggested material below or rephrase the question.',
    readingIds: ['learn:dharma', 'learn:karma']
  };
}

export type RagGuard = {blocked: true; reason: string} | {blocked: false};

/** Call before any provider request. Returns `blocked` unless RAG is enabled. */
export function guardRagRequest(input: string): RagGuard {
  if (!isRagEnabled()) return {blocked: true, reason: 'RAG_DISABLED'};
  if (!input || input.trim().length === 0) return {blocked: true, reason: 'RAG_EMPTY_INPUT'};
  if (input.length > RAG_MAX_INPUT_CHARS) return {blocked: true, reason: 'RAG_INPUT_TOO_LONG'};
  return {blocked: false};
}
