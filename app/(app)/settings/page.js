import { cookies } from 'next/headers';
import { createClient } from '../../../lib/supabase/server';
import { isDemoRequest, demoAuthUser, demoProfile } from '../../../lib/demo';
import SettingsClient from './SettingsClient';

export default async function SettingsPage({ searchParams }) {
  if (isDemoRequest(cookies())) {
    return (
      <SettingsClient
        user={demoAuthUser}
        profile={demoProfile}
        defaultTab={searchParams?.tab || 'profile'}
      />
    );
  }

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
