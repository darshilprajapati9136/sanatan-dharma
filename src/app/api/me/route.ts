import {NextResponse} from 'next/server';
import {getCurrentProfile, getSession} from '@/server/services/auth';

export async function GET() {
  const {user} = await getSession();
  const profile = await getCurrentProfile();

  return NextResponse.json({
    success: true,
    data: {
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name ?? null,
            createdAt: user.created_at
          }
        : null,
      profile
    }
  });
}