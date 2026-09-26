import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../../lib/supabase/server';
import { isDemoRequest, demoAuthUser, demoProfile } from '../../lib/demo';
import AppShell from '../../components/app/AppShell';

export default async function AppLayout({ children }) {
  if (isDemoRequest(cookies())) {
    const demoUser = {
      id: demoAuthUser.id,
      email: demoAuthUser.email,
      name: demoProfile.full_name,
      company: demoProfile.company,
      plan: demoProfile.plan,
      avatar: null,
      demo: true,
    };
    return <AppShell user={demoUser}>{children}</AppShell>;
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const currentUser = {
    id: user.id,
    email: user.email,
    name: profile?.full_name || user.email.split('@')[0],
    company: profile?.company || '',
    plan: profile?.plan || 'Starter',
    avatar: profile?.avatar_url || null,
  };

  return <AppShell user={currentUser}>{children}</AppShell>;
}
