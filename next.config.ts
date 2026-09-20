import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {withSentryConfig} from '@sentry/nextjs/config';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withSentryConfig(withNextIntl(nextConfig), {
  // No auth token in this repo: skip sourcemap upload (stack traces still
  // symbolicated from the built output). Set SENTRY_AUTH_TOKEN to enable.
  sourcemaps: {disable: true},
  silent: true
});