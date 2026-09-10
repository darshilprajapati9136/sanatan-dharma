import {NextResponse} from 'next/server';

export function GET() {
  return NextResponse.json({
    success: true,
    status: 'ok',
    service: 'sanatan-dharam',
    time: new Date().toISOString()
  });
}