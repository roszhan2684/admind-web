'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, Bell, Sparkles, ChevronDown, X, ArrowRight,
  AlertTriangle, TrendingUp, Zap,
} from 'lucide-react';
import { alerts, demoUser } from '../../lib/mock-data';

function NotificationPanel({ onClose }) {
  const recent = alerts.slice(0, 5);
  const iconMap = { critical: AlertTriangle, high: TrendingUp, info: Zap };
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-full mt-2 w-80 surface-elevated rounded-xl shadow-modal overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <span className="text-sm font-semibold text-ink-primary">Alerts</span>
        <div className="flex items-center gap-2">
          <span className="badge badge-danger">3 new</span>
          <button onClick={onClose} className="text-ink-muted hover:text-ink-primary">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {recent.map((alert) => {
          const Icon = iconMap[alert.severity] || Zap;
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-bg-elevated transition-colors border-b border-border-subtle last:border-0 ${
                !alert.read ? 'bg-primary/4' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.severity === 'critical'
                    ? 'bg-danger/15 text-danger'
                    : alert.severity === 'high'
                    ? 'bg-warning/15 text-warning'
                    : 'bg-primary/15 text-primary'
                }`}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ink-primary leading-snug">{alert.title}</p>
                <p className="text-xs text-ink-muted mt-0.5 truncate">{alert.description}</p>
              </div>
              {!alert.read && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2.5 border-t border-border-subtle">
        <Link
          href="/alerts"
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          View all alerts
          <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function TopBar({ title, subtitle }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = alerts.filter((a) => !a.read).length;

  return (
    <header
      className="flex items-center gap-4 px-6 border-b border-border-subtle glass-strong"
      style={{ height: 60 }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        {title && (
          <div>
            <h1 className="text-sm font-semibold text-ink-primary truncate">{title}</h1>
            {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <div
          className={`flex items-center gap-2 bg-bg-elevated rounded-lg border transition-all duration-200 ${
            searchFocused ? 'border-primary w-64' : 'border-border-default w-48'
          }`}
        >
          <Search size={14} className="text-ink-muted ml-3 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-ink-primary placeholder:text-ink-muted outline-none py-2 pr-3 w-full"
          />
        </div>
      </div>

      {/* AI Quick insight */}
      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 ai-card rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
        <Sparkles size={12} />
        Ask AI
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-elevated text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <Bell size={16} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
          )}
        </button>
        <AnimatePresence>
          {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold cursor-pointer">
        {demoUser.name[0]}
      </div>
    </header>
  );
}
