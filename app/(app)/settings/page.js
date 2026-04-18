'use client';

import { useState } from 'react';
import {
  User, Bell, Link2, Shield, Palette, CreditCard, Users,
  ChevronRight, CheckCircle, Globe, Slack, Chrome, Plus,
  AlertTriangle, Save, Eye, EyeOff, Zap,
} from 'lucide-react';
import { demoUser, integrations, teamMembers } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

/* ------------------------------------------------------------------ */
/* Tab sidebar                                                          */
/* ------------------------------------------------------------------ */
const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Shield },
];

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */
function ProfileSection() {
  const [name, setName] = useState(demoUser.name);
  const [email] = useState(demoUser.email);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Profile</h2>
      <p className="text-sm text-ink-muted mb-6">Manage your personal details and preferences.</p>

      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold">
          {name[0]}
        </div>
        <div>
          <button className="btn-secondary btn-sm">Change photo</button>
          <p className="text-xs text-ink-muted mt-1.5">JPG, PNG or WebP · Max 2MB</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Full name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Email</label>
          <input className="input opacity-60 cursor-not-allowed" value={email} readOnly />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Role</label>
          <input className="input" defaultValue={demoUser.role} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-muted mb-1.5 uppercase tracking-wider">Company</label>
          <input className="input" defaultValue={demoUser.company} />
        </div>
      </div>

      <button onClick={save} className="btn-primary">
        {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save changes</>}
      </button>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    fatigue_email: true,
    fatigue_slack: false,
    competitor_email: true,
    competitor_slack: true,
    weekly_digest: true,
    action_alerts: true,
    performance_drop: true,
    new_insight: false,
  });
  const toggle = (k) => setSettings((s) => ({ ...s, [k]: !s[k] }));

  const groups = [
    {
      title: 'Creative Alerts',
      items: [
        { key: 'fatigue_email', label: 'Creative fatigue detected', sub: 'Email' },
        { key: 'fatigue_slack', label: 'Creative fatigue detected', sub: 'Slack' },
      ],
    },
    {
      title: 'Competitor Signals',
      items: [
        { key: 'competitor_email', label: 'Competitor narrative shift', sub: 'Email' },
        { key: 'competitor_slack', label: 'Competitor new creative burst', sub: 'Slack' },
      ],
    },
    {
      title: 'Performance',
      items: [
        { key: 'performance_drop', label: 'ROAS drops below threshold', sub: 'Email + Slack' },
        { key: 'action_alerts', label: 'New critical actions', sub: 'Email' },
        { key: 'new_insight', label: 'AI weekly insight ready', sub: 'Email' },
        { key: 'weekly_digest', label: 'Weekly digest report', sub: 'Email' },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Notifications</h2>
      <p className="text-sm text-ink-muted mb-6">Choose how and when AdMind alerts you.</p>
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">{g.title}</p>
            <div className="surface rounded-xl overflow-hidden">
              {g.items.map((item, i) => (
                <div
                  key={item.key}
                  className={`flex items-center justify-between px-4 py-3 ${
                    i !== g.items.length - 1 ? 'border-b border-border-subtle' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm text-ink-primary">{item.label}</p>
                    <p className="text-xs text-ink-muted">{item.sub}</p>
                  </div>
                  <button
                    onClick={() => toggle(item.key)}
                    className={`w-10 h-6 rounded-full transition-all duration-200 relative ${
                      settings[item.key] ? 'bg-primary' : 'bg-bg-overlay'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
                        settings[item.key] ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const statusBadge = {
    connected: 'badge-success',
    available: 'badge-muted',
    coming_soon: 'badge-secondary',
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Integrations</h2>
      <p className="text-sm text-ink-muted mb-6">Connect your ad platforms and workflow tools.</p>
      <div className="grid md:grid-cols-2 gap-3">
        {integrations.map((integ) => (
          <div key={integ.id} className="surface p-4 rounded-xl flex items-center gap-4 hover:border-border-strong transition-colors">
            <div className="text-2xl w-10 h-10 flex items-center justify-center shrink-0">{integ.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-primary">{integ.name}</p>
              <p className="text-xs text-ink-muted">{integ.description}</p>
            </div>
            <div className="shrink-0">
              {integ.status === 'connected' ? (
                <span className="badge badge-success">Connected</span>
              ) : integ.status === 'coming_soon' ? (
                <span className="badge badge-secondary">Soon</span>
              ) : (
                <button className="btn-secondary btn-sm">Connect</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-ink-primary mb-1">Team</h2>
          <p className="text-sm text-ink-muted">Manage team members and their permissions.</p>
        </div>
        <button className="btn-primary btn-sm">
          <Plus size={14} />
          Invite member
        </button>
      </div>
      <div className="surface rounded-xl overflow-hidden">
        {teamMembers.map((member, i) => (
          <div
            key={member.id}
            className={`flex items-center gap-4 px-4 py-3 ${
              i !== teamMembers.length - 1 ? 'border-b border-border-subtle' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
              {member.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-primary">{member.name}</p>
              <p className="text-xs text-ink-muted">{member.email}</p>
            </div>
            <span className={`badge ${member.role === 'Admin' ? 'badge-primary' : 'badge-muted'}`}>
              {member.role}
            </span>
            <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSection() {
  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Billing</h2>
      <p className="text-sm text-ink-muted mb-6">Manage your subscription and payment details.</p>

      {/* Current plan */}
      <div className="ai-card p-5 rounded-xl mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="badge badge-primary mb-2">Growth Plan</span>
            <p className="font-display font-bold text-2xl text-ink-primary">$299<span className="text-sm font-normal text-ink-muted">/month</span></p>
          </div>
          <button className="btn-secondary btn-sm">Upgrade</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Ad Accounts', used: 8, total: 20 },
            { label: 'Analyses', used: 312, total: 'Unlimited' },
            { label: 'Team seats', used: 5, total: 10 },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-xs text-ink-muted mb-1">{m.label}</p>
              <p className="font-mono text-sm font-bold text-ink-primary">
                {m.used} <span className="font-normal text-ink-muted">/ {m.total}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next billing */}
      <div className="surface p-4 rounded-xl flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-ink-muted mb-0.5">Next billing date</p>
          <p className="text-sm font-medium text-ink-primary">May 17, 2026</p>
        </div>
        <div>
          <p className="text-xs text-ink-muted mb-0.5">Payment method</p>
          <p className="text-sm font-medium text-ink-primary">•••• •••• •••• 4242</p>
        </div>
        <button className="btn-secondary btn-sm">Update</button>
      </div>

      <button className="text-sm text-danger hover:underline">Cancel subscription</button>
    </div>
  );
}

function SecuritySection() {
  const [showKey, setShowKey] = useState(false);
  return (
    <div>
      <h2 className="text-base font-semibold text-ink-primary mb-1">Security</h2>
      <p className="text-sm text-ink-muted mb-6">Manage authentication and API access.</p>

      <div className="surface rounded-xl mb-5 overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <p className="text-sm font-semibold text-ink-primary mb-1">Change password</p>
          <div className="grid gap-3 mt-3">
            <input type="password" placeholder="Current password" className="input" />
            <input type="password" placeholder="New password" className="input" />
            <input type="password" placeholder="Confirm new password" className="input" />
          </div>
          <button className="btn-primary btn-sm mt-3">Update password</button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-primary">Two-factor authentication</p>
            <span className="badge badge-danger">Disabled</span>
          </div>
          <p className="text-xs text-ink-muted mb-3">Add an extra layer of security to your account.</p>
          <button className="btn-secondary btn-sm">Enable 2FA</button>
        </div>
      </div>

      <div className="surface rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-ink-primary">API Key</p>
          <button onClick={() => setShowKey((v) => !v)} className="btn-ghost p-1.5">
            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 font-mono text-xs text-ink-muted bg-bg-elevated px-3 py-2 rounded-lg">
            {showKey ? 'admind_live_sk_a1b2c3d4e5f6g7h8i9j0' : '••••••••••••••••••••••••••••'}
          </code>
          <button className="btn-secondary btn-sm">Regenerate</button>
        </div>
        <p className="text-xs text-ink-muted mt-2 flex items-center gap-1">
          <AlertTriangle size={11} />
          Keep this key secret. It grants full API access.
        </p>
      </div>
    </div>
  );
}

const SECTION_MAP = {
  profile: ProfileSection,
  notifications: NotificationsSection,
  integrations: IntegrationsSection,
  team: TeamSection,
  billing: BillingSection,
  security: SecuritySection,
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const ActiveSection = SECTION_MAP[activeTab] || ProfileSection;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Settings" subtitle="Manage your workspace and account" />

      <main className="flex-1 overflow-hidden flex">
        {/* Tab sidebar */}
        <nav className="w-52 shrink-0 border-r border-border-subtle p-3 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sidebar-item w-full mb-0.5 ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl">
          <ActiveSection />
        </div>
      </main>
    </div>
  );
}
