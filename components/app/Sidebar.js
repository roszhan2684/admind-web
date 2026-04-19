'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, LayoutDashboard, ImagePlay, Eye, Zap, Bell,
  Settings, ChevronLeft, ChevronRight, Sparkles, TrendingUp,
  Users, LogOut, ChevronDown, FileText, Library, Activity,
} from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

const NAV = [
  {
    section: 'Core',
    items: [
      { href: '/dashboard',        icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/creative-library', icon: ImagePlay,       label: 'Creative Library' },
      { href: '/competitors',      icon: Eye,             label: 'Competitors' },
      { href: '/recommendations',  icon: Zap,             label: 'Recommendations', badge: '4' },
    ],
  },
  {
    section: 'AI Tools',
    items: [
      { href: '/brief-generator',  icon: FileText,   label: 'Brief Generator', badge: 'new', badgeType: 'accent' },
      { href: '/ad-library',       icon: Library,    label: 'Ad Library',      badge: 'new', badgeType: 'accent' },
      { href: '/fatigue',          icon: Activity,   label: 'Fatigue Monitor' },
    ],
  },
  {
    section: 'Insights',
    items: [
      { href: '/alerts', icon: Bell, label: 'Alerts', badge: '3', badgeType: 'danger' },
    ],
  },
  {
    section: 'Account',
    items: [
      { href: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar({ collapsed, onCollapse, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userOpen, setUserOpen] = useState(false);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || '';
  const initials = displayName[0]?.toUpperCase() || 'U';

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-bg-surface border-r border-border-default overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-15 border-b border-border-subtle" style={{ height: 60 }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0 shadow-glow-primary">
          <Brain size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="font-display font-bold text-base text-ink-primary whitespace-nowrap"
            >
              AdMind
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* AI Insight pill */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 py-3 border-b border-border-subtle"
          >
            <div className="ai-card rounded-lg px-3 py-2.5 flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={9} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary mb-0.5">AI Insight</p>
                <p className="text-xs text-ink-muted leading-snug">4 actions need your attention today</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto overflow-x-hidden">
        {NAV.map((group) => (
          <div key={group.section} className="mb-1">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sidebar-section"
                >
                  {group.section}
                </motion.p>
              )}
            </AnimatePresence>
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`sidebar-item mb-0.5 ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <item.icon size={16} className="shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!collapsed && item.badge && (
                    <span
                      className={`badge text-xs px-1.5 py-0.5 ${
                        item.badgeType === 'danger'  ? 'badge-danger'  :
                        item.badgeType === 'accent'  ? 'badge-warning' :
                        'badge-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User menu */}
      <div className="border-t border-border-subtle p-2">
        <button
          onClick={() => setUserOpen((v) => !v)}
          className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-bg-elevated transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 text-left overflow-hidden"
              >
                <p className="text-xs font-medium text-ink-primary truncate">{displayName}</p>
                <p className="text-xs text-ink-muted truncate">{displayEmail}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <ChevronDown
              size={14}
              className={`text-ink-muted transition-transform ${userOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        <AnimatePresence>
          {userOpen && !collapsed && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-1 surface rounded-lg overflow-hidden"
            >
              <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-xs text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated transition-colors">
                <Settings size={13} />
                Settings
              </Link>
              <Link href="/settings?tab=billing" className="flex items-center gap-2 px-3 py-2 text-xs text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated transition-colors">
                <TrendingUp size={13} />
                Billing
              </Link>
              <button
                onClick={signOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger hover:bg-bg-elevated transition-colors"
              >
                <LogOut size={13} />
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onCollapse}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-elevated border border-border-strong flex items-center justify-center text-ink-muted hover:text-ink-primary hover:border-primary transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
