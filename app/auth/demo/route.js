import { NextResponse } from 'next/server';
import { DEMO_COOKIE, DEMO_ENABLED } from '../../../lib/demo';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  if (!DEMO_ENABLED) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Only allow same-site relative redirects
  const target = searchParams.get('redirect') || '/dashboard';
  const next = target.startsWith('/') && !target.startsWith('//') ? target : '/dashboard';

  const response = NextResponse.redirect(`${origin}${next}`);
  response.cookies.set(DEMO_COOKIE, '1', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });
  return response;
}
