import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;

Sentry.init({
  dsn: dsn || undefined,
  // No PII by default: never attach user emails or search/ask question text.
  sendDefaultPii: false,
  tracesSampleRate: 0.1,
  // Search URLs carry question text — strip query strings from reports.
  beforeSend(event) {
    if (event.request?.url) {
      try {
        const url = new URL(event.request.url);
        url.search = '';
        event.request.url = url.toString();
      } catch {
        // Keep the event; a malformed URL is not worth dropping it over.
      }
    }
    return event;
  },
  // 404s and user-caused 4xx are noise, not crashes.
  ignoreErrors: ['NEXT_NOT_FOUND']
});
