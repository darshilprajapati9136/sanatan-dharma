import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
}

export async function onRequestError(
  err: Error & {digest?: string},
  request: {path: string; method: string; headers: Record<string, string | string[] | undefined>},
  context: {routerKind: string; routePath: string; routeType: string}
) {
  Sentry.captureRequestError(err, request, context);
  // Serverless freezes after the response: flush before the hook resolves.
  await Sentry.flush(2000);
}
