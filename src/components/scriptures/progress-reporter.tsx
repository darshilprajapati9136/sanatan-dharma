'use client';

import {useEffect, useRef} from 'react';

/**
 * Reports scripture reading progress best-effort. Renders nothing; any
 * failure (signed out, table missing, network) is silently ignored so
 * reading never depends on the account backend.
 */
export function ProgressReporter({
  scriptureId,
  sectionId,
  sectionIndex,
  sectionTotal
}: {
  scriptureId: string;
  sectionId: string;
  sectionIndex: number;
  sectionTotal: number;
}) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    // Honest completion: position within the ordered section list.
    const progressPercentage =
      sectionTotal > 0
        ? Math.min(100, Math.max(0, Math.round(((sectionIndex + 1) / sectionTotal) * 100)))
        : 0;
    (async () => {
      try {
        const me = await fetch('/api/me', {cache: 'no-store'});
        const meJson = (await me.json()) as {data?: {user?: unknown}};
        if (!meJson.data?.user) return;
        await fetch('/api/reading-progress', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            scriptureId,
            lastSectionId: sectionId,
            progressPercentage
          })
        });
      } catch {
        // Silent: progress is enhancement-only.
      }
    })();
  }, [scriptureId, sectionId, sectionIndex, sectionTotal]);
  return null;
}
