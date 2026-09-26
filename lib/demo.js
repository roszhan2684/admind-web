// Demo session: lets people explore the app (which runs on mock data)
// without a Supabase account, e.g. when the auth project is unavailable.
export const DEMO_COOKIE = 'admind_demo';

export const DEMO_ENABLED = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

export const demoAuthUser = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'demo@admind.ai',
};

export const demoProfile = {
  full_name: 'Demo User',
  company: 'BrandCo',
  role: 'Performance Marketer',
  plan: 'Growth',
};

export function isDemoRequest(cookieStore) {
  return DEMO_ENABLED && cookieStore.get(DEMO_COOKIE)?.value === '1';
}

export function clearDemoCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `${DEMO_COOKIE}=; Max-Age=0; path=/`;
  }
}
