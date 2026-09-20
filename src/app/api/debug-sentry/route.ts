import {NextResponse} from 'next/server';

// TEMPORARY verification route for the Sentry integration check.
// Deleted immediately after the test error is confirmed in Sentry Issues.
export async function GET() {
  throw new Error('SENTRY_VERIFICATION_PROBE_do_not_alert');
}

export async function POST() {
  return NextResponse.json({ok: true});
}
