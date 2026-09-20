import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || undefined,
  sendDefaultPii: false,
  tracesSampleRate: 0.1,
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
  ignoreErrors: ['NEXT_NOT_FOUND']
});
