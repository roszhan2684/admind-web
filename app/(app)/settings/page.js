import { createClient } from '../../../lib/supabase/server';
import SettingsClient from './SettingsClient';

export default async function SettingsPage({ searchParams }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <SettingsClient
      user={user}
      profile={profile || {}}
      defaultTab={searchParams?.tab || 'profile'}
    />
  );
}
