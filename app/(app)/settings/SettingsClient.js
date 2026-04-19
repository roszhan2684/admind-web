'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, Bell, Link2, Shield, CreditCard, Users,
  CheckCircle, Save, Eye, EyeOff, AlertTriangle, Plus,
  Trash2, Edit2, X, RefreshCw, LogOut,
} from 'lucide-react';
import { integrations, teamMembers } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';
import { createClient } from '../../../lib/supabase/client';

const TABS = [
  { id: 'profile',       label: 'Profile',       icon: User       },
  { id: 'notifications', label: 'Notifications',  icon: Bell       },
  { id: 'integrations',  label: 'Integrations',   icon: Link2      },
  { id: 'team',          label: 'Team',           icon: Users      },
  { id: 'billing',       label: 'Billing',        icon: CreditCard },
  { id: 'security',      label: 'Security',       icon: Shield     },
];

/* ------------------------------------------------------------------ */
/* Profile                                                              */
/* ------------------------------------------------------------------ */
function ProfileSection({ user, profile }) {
  const [name, setName]       = useState(profile?.full_name || user.email?.split('@')[0] || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [role, setRole]       = useState(profile?.role || '');
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase
      .from('profiles')
      .upsert({ id: user.id, email: user.email, full_name: name, company, role, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Profile</h2>
      <p className="text-sm text-ink-muted mb-6">Your personal details and display preferences.</p>

      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold shadow-glow-primary">
          {(name || user.email || 'U')[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-ink-primary">{name || user.email}</p>
          <p className="text-xs text-ink-muted">{user.email}</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-danger/10 border border-danger/25 mb-4 text-sm text-danger">
          <AlertTriangle size={14} />{error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Display name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Email</label>
          <input className="input opacity-50 cursor-not-allowed" value={user.email} readOnly />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Role</label>
          <input className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Performance Marketer" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Company</label>
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. BrandCo" />
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? (
          <><RefreshCw size={14} className="animate-spin" /> Saving…</>
        ) : saved ? (
          <><CheckCircle size={14} className="text-success" /> Saved!</>
        ) : (
          <><Save size={14} /> Save changes</>
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Notifications                                                        */
/* ------------------------------------------------------------------ */
function NotificationsSection() {
  const [settings, setSettings] = useState({
    fatigue_email: true, fatigue_slack: false,
    competitor_email: true, competitor_slack: true,
    weekly_digest: true, action_alerts: true,
    performance_drop: true, new_insight: false,
  });
  const toggle = (k) => setSettings((s) => ({ ...s, [k]: !s[k] }));
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const groups = [
    { title: 'Creative Alerts', items: [
      { key: 'fatigue_email', label: 'Creative fatigue detected', sub: 'Email' },
      { key: 'fatigue_slack', label: 'Creative fatigue detected', sub: 'Slack' },
    ]},
    { title: 'Competitor Signals', items: [
      { key: 'competitor_email', label: 'Competitor narrative shift', sub: 'Email' },
      { key: 'competitor_slack', label: 'Competitor new creative burst', sub: 'Slack' },
    ]},
    { title: 'Performance', items: [
      { key: 'performance_drop', label: 'ROAS drops below threshold', sub: 'Email + Slack' },
      { key: 'action_alerts', label: 'New critical actions', sub: 'Email' },
      { key: 'new_insight', label: 'AI weekly insight ready', sub: 'Email' },
      { key: 'weekly_digest', label: 'Weekly digest report', sub: 'Email' },
    ]},
  ];

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Notifications</h2>
      <p className="text-sm text-ink-muted mb-6">Choose how and when AdMind alerts you.</p>
      <div className="flex flex-col gap-6 mb-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">{g.title}</p>
            <div className="surface rounded-xl overflow-hidden">
              {g.items.map((item, i) => (
                <div key={item.key} className={`flex items-center justify-between px-4 py-3 ${i !== g.items.length - 1 ? 'border-b border-border-subtle' : ''}`}>
                  <div>
                    <p className="text-sm text-ink-primary">{item.label}</p>
                    <p className="text-xs text-ink-muted">{item.sub}</p>
                  </div>
                  <button onClick={() => toggle(item.key)} className={`w-10 h-6 rounded-full transition-all duration-200 relative ${settings[item.key] ? 'bg-primary' : 'bg-bg-overlay'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${settings[item.key] ? 'left-5' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={save} className="btn-primary">
        {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save preferences</>}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Integrations                                                         */
/* ------------------------------------------------------------------ */
function IntegrationsSection() {
  const [connected, setConnected] = useState(
    integrations.filter((i) => i.status === 'connected').map((i) => i.id)
  );

  const toggle = (id) => setConnected((c) =>
    c.includes(id) ? c.filter((x) => x !== id) : [...c, id]
  );

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Integrations</h2>
      <p className="text-sm text-ink-muted mb-6">Connect your ad platforms and workflow tools.</p>
      <div className="grid md:grid-cols-2 gap-3">
        {integrations.map((integ) => {
          const isConnected = connected.includes(integ.id);
          const isSoon = integ.status === 'coming_soon';
          return (
            <div key={integ.id} className="surface p-4 rounded-xl flex items-center gap-4 hover:border-border-strong transition-colors">
              <div className="text-2xl w-10 h-10 flex items-center justify-center shrink-0">{integ.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-primary">{integ.name}</p>
                <p className="text-xs text-ink-muted">{integ.description}</p>
              </div>
              {isSoon ? (
                <span className="badge badge-secondary">Soon</span>
              ) : isConnected ? (
                <button
                  onClick={() => toggle(integ.id)}
                  className="btn-ghost btn-sm text-danger hover:bg-danger/10 gap-1.5"
                >
                  <Trash2 size={12} /> Disconnect
                </button>
              ) : (
                <button onClick={() => toggle(integ.id)} className="btn-secondary btn-sm">Connect</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */
function TeamSection({ userEmail }) {
  const [members, setMembers] = useState(teamMembers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [inviting, setInviting] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [editId, setEditId] = useState(null);

  const invite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate API
    setMembers((prev) => [...prev, {
      id: `t-${Date.now()}`, name: inviteEmail.split('@')[0], email: inviteEmail, role: inviteRole, status: 'invited',
    }]);
    setInviteEmail('');
    setInviting(false);
    setInviteSent(true);
    setShowInvite(false);
    setTimeout(() => setInviteSent(false), 3000);
  };

  const removeMember = (id) => {
    if (!confirm('Remove this team member?')) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateRole = (id, role) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m));
    setEditId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-ink-primary mb-1">Team</h2>
          <p className="text-sm text-ink-muted">Manage members and their access levels.</p>
        </div>
        <div className="flex gap-2">
          {inviteSent && <span className="badge badge-success self-center">Invite sent!</span>}
          <button onClick={() => setShowInvite((v) => !v)} className="btn-primary btn-sm">
            <Plus size={14} /> Invite member
          </button>
        </div>
      </div>

      {/* Invite form */}
      {showInvite && (
        <form onSubmit={invite} className="surface p-4 rounded-xl mb-5 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Email</label>
            <input type="email" className="input" placeholder="colleague@company.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Role</label>
            <select className="input w-32" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
              {['Admin', 'Member', 'Viewer'].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button type="submit" disabled={inviting} className="btn-primary btn-sm shrink-0">
            {inviting ? <RefreshCw size={13} className="animate-spin" /> : 'Send invite'}
          </button>
          <button type="button" onClick={() => setShowInvite(false)} className="btn-ghost p-2 shrink-0"><X size={14} /></button>
        </form>
      )}

      <div className="surface rounded-xl overflow-hidden">
        {members.map((member, i) => (
          <div key={member.id} className={`flex items-center gap-4 px-4 py-3 ${i !== members.length - 1 ? 'border-b border-border-subtle' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
              {member.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-primary">{member.name}</p>
              <p className="text-xs text-ink-muted">{member.email}</p>
            </div>

            {editId === member.id ? (
              <select
                autoFocus
                defaultValue={member.role}
                onBlur={(e) => updateRole(member.id, e.target.value)}
                onChange={(e) => updateRole(member.id, e.target.value)}
                className="input text-xs py-1 px-2 w-28"
              >
                {['Admin', 'Member', 'Viewer'].map((r) => <option key={r}>{r}</option>)}
              </select>
            ) : (
              <span className={`badge ${member.role === 'Admin' ? 'badge-primary' : member.role === 'Viewer' ? 'badge-muted' : 'badge-secondary'}`}>
                {member.role}
              </span>
            )}

            <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{member.status}</span>

            {member.email !== userEmail && (
              <div className="flex gap-1 shrink-0">
                <button onClick={() => setEditId(editId === member.id ? null : member.id)} className="btn-ghost p-1.5" title="Edit role">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => removeMember(member.id)} className="btn-ghost p-1.5 text-danger hover:bg-danger/10" title="Remove">
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Billing                                                              */
/* ------------------------------------------------------------------ */
function BillingSection() {
  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Billing</h2>
      <p className="text-sm text-ink-muted mb-6">Manage your subscription and payment details.</p>
      <div className="ai-card p-5 rounded-xl mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="badge badge-primary mb-2 inline-block">Growth Plan</span>
            <p className="font-display font-bold text-2xl text-ink-primary">$299<span className="text-sm font-normal text-ink-muted">/month</span></p>
          </div>
          <button className="btn-secondary btn-sm">Upgrade plan</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ label: 'Ad Accounts', used: 8, total: 20 }, { label: 'Analyses', used: 312, total: 'Unlimited' }, { label: 'Team seats', used: 5, total: 10 }].map((m) => (
            <div key={m.label}>
              <p className="text-xs text-ink-muted mb-1">{m.label}</p>
              <p className="font-mono text-sm font-bold text-ink-primary">{m.used} <span className="font-normal text-ink-muted">/ {m.total}</span></p>
            </div>
          ))}
        </div>
      </div>
      <div className="surface p-4 rounded-xl flex items-center justify-between mb-5">
        <div><p className="text-xs text-ink-muted mb-0.5">Next billing date</p><p className="text-sm font-medium text-ink-primary">May 19, 2026</p></div>
        <div><p className="text-xs text-ink-muted mb-0.5">Payment method</p><p className="text-sm font-medium text-ink-primary">•••• 4242</p></div>
        <button className="btn-secondary btn-sm"><Edit2 size={12} /> Update card</button>
      </div>
      <button className="text-sm text-danger hover:underline flex items-center gap-1">
        <Trash2 size={13} /> Cancel subscription
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Security                                                             */
/* ------------------------------------------------------------------ */
function SecuritySection({ user }) {
  const router = useRouter();
  const [showKey, setShowKey] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');

  const deleteAccount = async () => {
    if (confirmDelete !== user.email) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    // In production: call a server action or API route to delete the user record
    router.push('/');
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Security</h2>
      <p className="text-sm text-ink-muted mb-6">Manage authentication and account access.</p>

      {/* Email auth info */}
      <div className="surface rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-ink-primary mb-1">Authentication method</p>
        <p className="text-xs text-ink-muted mb-3">You sign in with a one-time code sent to <span className="text-ink-primary">{user.email}</span>. No password to manage or forget.</p>
        <span className="badge badge-success"><CheckCircle size={10} /> OTP Email Auth active</span>
      </div>

      {/* API Key */}
      <div className="surface rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-ink-primary">API Key</p>
          <div className="flex gap-2">
            <button onClick={() => setShowKey((v) => !v)} className="btn-ghost p-1.5">{showKey ? <EyeOff size={14} /> : <Eye size={14} />}</button>
            <button className="btn-secondary btn-sm"><RefreshCw size={12} /> Regenerate</button>
          </div>
        </div>
        <code className="block font-mono text-xs text-ink-muted bg-bg-elevated px-3 py-2 rounded-lg">
          {showKey ? `admind_live_sk_${user.id?.slice(0, 16)}` : '••••••••••••••••••••••••••••••••'}
        </code>
        <p className="text-xs text-ink-muted mt-2 flex items-center gap-1">
          <AlertTriangle size={11} /> Keep this secret. Full API access.
        </p>
      </div>

      {/* Delete account */}
      <div className="surface rounded-xl p-5 border border-danger/20">
        <p className="text-sm font-semibold text-danger mb-1 flex items-center gap-2"><AlertTriangle size={14} /> Delete account</p>
        <p className="text-xs text-ink-muted mb-4">This permanently deletes your workspace, all briefs, creatives, and analysis history. This cannot be undone.</p>
        <label className="block text-xs font-semibold text-ink-muted mb-2 uppercase tracking-wider">Type your email to confirm</label>
        <input
          className="input mb-3"
          placeholder={user.email}
          value={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.value)}
        />
        <button
          onClick={deleteAccount}
          disabled={confirmDelete !== user.email || deleting}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-danger hover:bg-danger/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {deleting ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
          Permanently delete account
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function SettingsClient({ user, profile, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const sections = {
    profile:       <ProfileSection user={user} profile={profile} />,
    notifications: <NotificationsSection />,
    integrations:  <IntegrationsSection />,
    team:          <TeamSection userEmail={user.email} />,
    billing:       <BillingSection />,
    security:      <SecuritySection user={user} />,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Settings" subtitle="Manage your workspace and account" />
      <main className="flex-1 overflow-hidden flex">
        <nav className="w-52 shrink-0 border-r border-border-subtle p-3 overflow-y-auto">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`sidebar-item w-full mb-0.5 ${activeTab === tab.id ? 'active' : ''}`}>
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl">
          {sections[activeTab]}
        </div>
      </main>
    </div>
  );
}
