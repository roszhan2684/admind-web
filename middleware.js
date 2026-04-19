import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    },
  );

  // Refresh session — required for SSR auth to work
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public paths — no auth required
  const publicPaths = ['/', '/login', '/auth/callback', '/privacy', '/terms', '/about', '/security', '/ai-transparency'];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith('/auth/'));

  // App paths require auth
  const appPaths = ['/dashboard', '/creative-library', '/competitors', '/recommendations',
    '/alerts', '/settings', '/brief-generator', '/ad-library', '/fatigue'];
  const isApp = appPaths.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (isApp && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If logged in user hits /login, redirect to dashboard
  if (pathname === '/login' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
