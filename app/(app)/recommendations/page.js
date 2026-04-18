'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Filter, CheckCircle, ArrowRight, Target, Clock,
  TrendingUp, AlertTriangle, Sparkles, ChevronDown, X,
} from 'lucide-react';
import { nextBestActions } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

const PRIORITY_CONFIG = {
  critical: {
    bg: 'bg-danger/8',
    border: 'border-danger/25',
    text: 'text-danger',
    badge: 'badge-danger',
    icon: AlertTriangle,
  },
  high: {
    bg: 'bg-warning/8',
    border: 'border-warning/25',
    text: 'text-warning',
    badge: 'badge-warning',
    icon: TrendingUp,
  },
  medium: {
    bg: 'bg-primary/6',
    border: 'border-primary/20',
    text: 'text-primary',
    badge: 'badge-primary',
    icon: Zap,
  },
};

function ActionDetail({ action, onClose }) {
  const cfg = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed right-0 top-0 h-full w-[420px] bg-bg-surface border-l border-border-default shadow-modal overflow-y-auto z-40"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="ai-orb">
              <Sparkles size={14} className="text-white" />
            </div>
            <h3 className="font-semibold text-ink-primary">Action Details</h3>
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5"><X size={16} /></button>
        </div>

        {/* Priority banner */}
        <div className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 mb-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className={cfg.text} />
            <span className={`text-sm font-bold uppercase tracking-wide ${cfg.text}`}>{action.priority} priority</span>
          </div>
          <h2 className="text-base font-semibold text-ink-primary leading-snug">{action.action}</h2>
        </div>

        {/* Rationale */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">AI Rationale</p>
          <p className="text-sm text-ink-secondary leading-relaxed">{action.rationale}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Expected Impact', value: action.impact, icon: Target },
            { label: 'Effort Required', value: action.effort, icon: Clock },
            { label: 'Category', value: action.category, icon: TrendingUp },
            { label: 'Confidence', value: action.confidence ?? '87%', icon: Sparkles },
          ].map((m) => (
            <div key={m.label} className="surface p-3 rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <m.icon size={12} className="text-ink-muted" />
                <p className="text-xs text-ink-muted">{m.label}</p>
              </div>
              <p className="text-sm font-semibold text-ink-primary">{m.value}</p>
            </div>
          ))}
        </div>

        {/* AI Brief preview */}
        {action.briefPreview && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Auto-Generated Brief</p>
            <div className="ai-card p-4 rounded-xl text-xs text-ink-secondary leading-relaxed font-mono whitespace-pre-line">
              {action.briefPreview}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button className="btn-primary w-full justify-center">
            <CheckCircle size={14} />
            Mark as done
          </button>
          <button className="btn-secondary w-full justify-center">
            <ArrowRight size={14} />
            Generate full brief
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ActionCard({ action, onSelect }) {
  const cfg = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
  const Icon = cfg.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`border rounded-2xl p-5 ${cfg.bg} ${cfg.border} hover:brightness-110 transition-all duration-200 cursor-pointer group`}
      onClick={() => onSelect(action)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.text}`}
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`badge ${cfg.badge}`}>{action.priority}</span>
            <span className="text-xs text-ink-muted">{action.category}</span>
          </div>
          <h3 className="text-sm font-semibold text-ink-primary mb-1.5 leading-snug">{action.action}</h3>
          <p className="text-xs text-ink-muted leading-relaxed">{action.rationale}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Target size={11} /> {action.impact}
            </span>
            <span className="text-xs text-ink-muted flex items-center gap-1">
              <Clock size={11} /> {action.effort}
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="btn-ghost p-1.5 text-xs"
            onClick={(e) => { e.stopPropagation(); onSelect(action); }}
          >
            View
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function RecommendationsPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(new Set());

  const filtered = nextBestActions.filter((a) => {
    if (done.has(a.id)) return false;
    if (filter === 'all') return true;
    return a.priority === filter || a.category?.toLowerCase().includes(filter);
  });

  const priorityCounts = {
    critical: nextBestActions.filter((a) => a.priority === 'critical' && !done.has(a.id)).length,
    high: nextBestActions.filter((a) => a.priority === 'high' && !done.has(a.id)).length,
    medium: nextBestActions.filter((a) => a.priority === 'medium' && !done.has(a.id)).length,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="AI Recommendations" subtitle="Your prioritized action queue, updated in real time" />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* Header stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Critical', count: priorityCounts.critical, color: '#EF5F67', badge: 'badge-danger' },
            { label: 'High Priority', count: priorityCounts.high, color: '#F5B942', badge: 'badge-warning' },
            { label: 'Medium', count: priorityCounts.medium, color: '#5B8CFF', badge: 'badge-primary' },
          ].map((s) => (
            <div key={s.label} className="surface p-4 rounded-xl flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.count}
              </div>
              <div>
                <p className="text-xs text-ink-muted">{s.label}</p>
                <p className="text-xs text-ink-secondary">actions pending</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI summary */}
        <div className="ai-card p-4 rounded-xl mb-5 flex items-start gap-3">
          <div className="ai-orb shrink-0">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary mb-1">Decision Brief</p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {priorityCounts.critical} critical actions require immediate attention. Your top opportunity is refreshing fatigued creatives in the 25–34 demographic before ROAS drops further. Competitor NovaBrand's recent UGC push makes this time-sensitive.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-5">
          {['all', 'critical', 'high', 'medium'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f ? 'bg-primary text-white' : 'surface text-ink-secondary hover:text-ink-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Action list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filtered.map((action) => (
              <ActionCard key={action.id} action={action} onSelect={setSelected} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CheckCircle size={40} className="text-success mx-auto mb-3" />
              <p className="text-ink-primary font-semibold">All caught up!</p>
              <p className="text-sm text-ink-muted">No pending actions in this category.</p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <ActionDetail action={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
