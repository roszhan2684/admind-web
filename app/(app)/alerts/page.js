'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, AlertTriangle, TrendingUp, Zap, CheckCircle,
  Filter, X, Clock, ArrowRight,
} from 'lucide-react';
import { alerts } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

const TYPE_ICON = {
  fatigue: AlertTriangle,
  competitor: TrendingUp,
  performance: Zap,
  budget: Zap,
};

const SEV_CONFIG = {
  critical: { bg: 'bg-danger/8', border: 'border-danger/25', text: 'text-danger', badge: 'badge-danger' },
  high:     { bg: 'bg-warning/8', border: 'border-warning/25', text: 'text-warning', badge: 'badge-warning' },
  medium:   { bg: 'bg-primary/6', border: 'border-primary/20', text: 'text-primary', badge: 'badge-primary' },
  low:      { bg: 'bg-bg-elevated', border: 'border-border-default', text: 'text-ink-muted', badge: 'badge-muted' },
};

function AlertItem({ alert, onDismiss }) {
  const cfg = SEV_CONFIG[alert.severity] || SEV_CONFIG.low;
  const Icon = TYPE_ICON[alert.type] || Bell;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, scale: 0.97 }}
      className={`flex items-start gap-4 p-4 rounded-xl border ${cfg.bg} ${cfg.border} ${!alert.read ? 'ring-1 ring-inset ring-primary/10' : ''}`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${cfg.text}`}
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`badge ${cfg.badge}`}>{alert.severity}</span>
          <span className="text-xs text-ink-muted capitalize">{alert.type}</span>
          {!alert.read && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </div>
        <h3 className="text-sm font-semibold text-ink-primary mb-1 leading-snug">{alert.title}</h3>
        <p className="text-xs text-ink-muted leading-relaxed">{alert.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-ink-muted flex items-center gap-1">
            <Clock size={11} /> {alert.time}
          </span>
          {alert.action && (
            <button className="text-xs text-primary flex items-center gap-1 hover:underline">
              {alert.action} <ArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => onDismiss(alert.id)}
        className="btn-ghost p-1.5 shrink-0 text-ink-muted hover:text-danger"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function AlertsPage() {
  const [dismissed, setDismissed] = useState(new Set());
  const [filter, setFilter] = useState('all');

  const dismiss = (id) => setDismissed((prev) => new Set([...prev, id]));

  const visible = alerts.filter((a) => {
    if (dismissed.has(a.id)) return false;
    if (filter === 'unread') return !a.read;
    if (filter === 'all') return true;
    return a.severity === filter || a.type === filter;
  });

  const unreadCount = alerts.filter((a) => !a.read && !dismissed.has(a.id)).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Alert Center" subtitle="Stay ahead of every critical signal" />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* Summary row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Unread', count: unreadCount, color: '#C084FC' },
            { label: 'Critical', count: alerts.filter((a) => a.severity === 'critical' && !dismissed.has(a.id)).length, color: '#EF5F67' },
            { label: 'High', count: alerts.filter((a) => a.severity === 'high' && !dismissed.has(a.id)).length, color: '#F5B942' },
            { label: 'Resolved', count: dismissed.size, color: '#22C55E' },
          ].map((s) => (
            <div key={s.label} className="metric-card flex items-center gap-3">
              <p className="metric-value" style={{ color: s.color, fontSize: '1.5rem' }}>{s.count}</p>
              <p className="text-xs text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {['all', 'unread', 'critical', 'high', 'fatigue', 'competitor'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f ? 'bg-primary text-white' : 'surface text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            className="btn-ghost text-xs text-danger"
            onClick={() => alerts.forEach((a) => dismiss(a.id))}
          >
            Dismiss all
          </button>
        </div>

        {/* Alert list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {visible.map((alert) => (
              <AlertItem key={alert.id} alert={alert} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <div className="text-center py-20">
              <Bell size={40} className="text-ink-muted mx-auto mb-3 opacity-40" />
              <p className="text-ink-primary font-semibold">No alerts</p>
              <p className="text-sm text-ink-muted">You're all caught up.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
