/**
 * @jest-environment node
 */

describe('Supabase client module', () => {
  it('lib/supabase/client.js exports a createClient function', () => {
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.join(__dirname, '../../lib/supabase/client.js'),
      'utf-8',
    );
    expect(src).toContain('createClient');
    expect(src).toContain('createBrowserClient');
    expect(src).toContain('NEXT_PUBLIC_SUPABASE_URL');
    expect(src).toContain('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  });

  it('lib/supabase/server.js exports a createClient function', () => {
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.join(__dirname, '../../lib/supabase/server.js'),
      'utf-8',
    );
    expect(src).toContain('createClient');
    expect(src).toContain('createServerClient');
    expect(src).toContain('cookies');
  });

  it('middleware.js exists and protects app routes', () => {
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.join(__dirname, '../../middleware.js'),
      'utf-8',
    );
    expect(src).toContain('/dashboard');
    expect(src).toContain('/login');
    expect(src).toContain('redirect');
  });

  it('auth callback route exists', () => {
    const fs = require('fs');
    const path = require('path');
    const exists = fs.existsSync(
      path.join(__dirname, '../../app/auth/callback/route.js'),
    );
    expect(exists).toBe(true);
  });
});
