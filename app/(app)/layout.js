import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import AppShell from '../../components/app/AppShell';

export default async function AppLayout({ children }) {
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
