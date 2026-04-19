'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Sparkles, TrendingUp, TrendingDown, ArrowRight, AlertTriangle,
  Zap, Target, Clock, ChevronRight, BarChart3, Eye, CheckCircle,
  MoreHorizontal, Play, Pause,
} from 'lucide-react';
import {
  dashboardMetrics, performanceSeries, nextBestActions,
  competitorFeed, creativeLibrary, demoUser,
} from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

/* ------------------------------------------------------------------ */
/* Metric card                                                          */
/* ------------------------------------------------------------------ */
function MetricCard({ metric }) {
  const isUp = metric.trend === 'up';
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">{metric.label}</p>
          <p className="metric-value">{metric.value}</p>
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${metric.color}18`, border: `1px solid ${metric.color}28` }}
        >
          <BarChart3 size={16} style={{ color: metric.color }} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded ${
            isUp ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
          }`}
        >
          <TrendIcon size={11} />
          {metric.delta}
        </div>
        <span className="text-xs text-ink-muted">{metric.deltaLabel}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI Action card                                                       */
/* ------------------------------------------------------------------ */
const priorityConfig = {
  critical: { bg: 'bg-danger/10', border: 'border-danger/25', text: 'text-danger', dot: 'bg-danger' },
  high:     { bg: 'bg-warning/10', border: 'border-warning/25', text: 'text-warning', dot: 'bg-warning' },
  medium:   { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary', dot: 'bg-primary' },
};

function ActionCard({ action }) {
  const cfg = priorityConfig[action.priority] || priorityConfig.medium;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} ${cfg.border} group hover:brightness-110 transition-all duration-200`}>
      <div className={`w-2 h-2 rounded-full ${cfg.dot} mt-1.5 shrink-0 animate-pulse`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold uppercase tracking-wider ${cfg.text}`}>{action.priority}</span>
          <span className="text-xs text-ink-muted">{action.category}</span>
        </div>
        <p className="text-sm font-medium text-ink-primary leading-snug mb-1">{action.action}</p>
        <p className="text-xs text-ink-muted">{action.rationale}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-ink-muted flex items-center gap-1">
            <Target size={11} />
            {action.impact}
          </span>
          <span className="text-xs text-ink-muted flex items-center gap-1">
            <Clock size={11} />
            {action.effort}
          </span>
        </div>
      </div>
      <button className="shrink-0 px-3 py-1.5 bg-bg-elevated rounded-lg text-xs font-medium text-ink-secondary hover:text-primary hover:bg-primary/10 transition-colors">
        Act
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Competitor feed item                                                 */
/* ------------------------------------------------------------------ */
function CompetitorFeedItem({ event }) {
  const sev = event.severity;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-0">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
          sev === 'high' ? 'bg-danger/15 text-danger' : sev === 'medium' ? 'bg-warning/15 text-warning' : 'bg-primary/15 text-primary'
        }`}
      >
        {event.competitor[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-ink-primary">{event.competitor}</span>
          <span
            className={`badge ${
              sev === 'high' ? 'badge-danger' : sev === 'medium' ? 'badge-warning' : 'badge-primary'
            }`}
          >
            {sev}
          </span>
        </div>
        <p className="text-xs text-ink-secondary leading-snug">{event.summary}</p>
        <p className="text-xs text-ink-muted mt-1">{event.time}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Creative row                                                         */
/* ------------------------------------------------------------------ */
function CreativeRow({ creative }) {
  const scoreColor =
    creative.score >= 80 ? '#22C55E' : creative.score >= 60 ? '#F5B942' : '#EF5F67';
  const statusBadge = {
    active: 'badge-success',
    review: 'badge-warning',
    paused: 'badge-muted',
    scaling: 'badge-primary',
  };
  return (
    <tr className="group">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-lg shrink-0">
            {creative.type === 'video' ? '🎬' : '🖼️'}
          </div>
          <div>
            <p className="text-sm font-medium text-ink-primary">{creative.name}</p>
            <p className="text-xs text-ink-muted capitalize">{creative.type} · {creative.format}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
            style={{ background: `${scoreColor}18`, color: scoreColor }}
          >
            {creative.score}
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`badge ${statusBadge[creative.status] || 'badge-muted'}`}>
          {creative.status}
        </span>
      </td>
      <td className="py-3 px-4 font-mono text-sm text-ink-secondary">{creative.impressions}</td>
      <td className="py-3 px-4 font-mono text-sm text-ink-secondary">{creative.ctr}</td>
      <td className="py-3 px-4 font-mono text-sm" style={{ color: scoreColor }}>{creative.roas}</td>
      <td className="py-3 px-4">
        <button className="btn-ghost p-1.5">
          <MoreHorizontal size={14} />
        </button>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/* Custom tooltip                                                       */
/* ------------------------------------------------------------------ */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface-elevated px-3 py-2.5 rounded-xl border border-border-strong shadow-modal">
      <p className="text-xs font-semibold text-ink-muted mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-ink-secondary capitalize">{p.dataKey}:</span>
          <span className="font-mono font-semibold text-ink-primary">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function DashboardPage() {
  const criticalCount = nextBestActions.filter((a) => a.priority === 'critical').length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title={`Good morning, ${demoUser.name.split(' ')[0]}`}
        subtitle="Here's what's happening with your ads today"
      />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* ── AI Banner ── */}
        <div className="ai-card rounded-xl p-4 mb-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-sm font-semibold text-ink-primary">AI Decision Brief</h2>
              <span className="badge badge-danger">{criticalCount} critical</span>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Your top performer "Product Demo v3" shows ROAS 5.2× but creative fatigue is rising (78%). Competitor NovaBrand launched 6 new UGC creatives targeting your core 25–34 segment. Immediate action recommended: refresh your UGC pipeline and scale the product demo while it still converts.
            </p>
          </div>
          <Link
            href="/recommendations"
            className="btn-primary btn-sm shrink-0"
          >
            View actions
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dashboardMetrics.map((m) => (
            <MetricCard key={m.id} metric={m} />
          ))}
        </div>

        {/* ── Main 2-col ── */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {/* Performance chart */}
          <div className="lg:col-span-2 surface p-5 rounded-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-ink-primary">Performance Overview</h3>
                <p className="text-xs text-ink-muted mt-0.5">Last 7 days · All platforms</p>
              </div>
              <div className="flex gap-2 text-xs">
                {[
                  { key: 'roas', color: '#C084FC' },
                  { key: 'ctr', color: '#F59E0B' },
                  { key: 'score', color: '#60A5FA' },
                ].map((l) => (
                  <div key={l.key} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                    <span className="text-ink-muted capitalize">{l.key}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceSeries} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRoas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCtr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2C" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area dataKey="roas" stroke="#C084FC" strokeWidth={2} fill="url(#gRoas)" dot={false} />
                <Area dataKey="ctr" stroke="#F59E0B" strokeWidth={2} fill="url(#gCtr)" dot={false} />
                <Area dataKey="score" stroke="#60A5FA" strokeWidth={2} fill="url(#gScore)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Competitor feed */}
          <div className="surface p-5 rounded-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-ink-primary">Competitor Activity</h3>
              <Link href="/competitors" className="text-xs text-primary flex items-center gap-1 hover:underline">
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              {competitorFeed.map((event) => (
                <CompetitorFeedItem key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>

        {/* ── AI Actions + Creative grid ── */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* AI Next Best Actions */}
          <div className="surface p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Zap size={13} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-ink-primary">Next Best Actions</h3>
              </div>
              <Link href="/recommendations" className="text-xs text-primary flex items-center gap-1 hover:underline">
                All actions <ChevronRight size={11} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {nextBestActions.slice(0, 3).map((action) => (
                <ActionCard key={action.id} action={action} />
              ))}
            </div>
          </div>

          {/* Creative Library preview */}
          <div className="surface p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-ink-primary">Top Creatives</h3>
              <Link href="/creative-library" className="text-xs text-primary flex items-center gap-1 hover:underline">
                View library <ChevronRight size={11} />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {creativeLibrary.slice(0, 3).map((c) => {
                const scoreColor = c.score >= 80 ? '#22C55E' : c.score >= 60 ? '#F5B942' : '#EF5F67';
                return (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-elevated border border-border-subtle hover:border-border-strong transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-bg-overlay flex items-center justify-center text-lg shrink-0">
                      {c.type === 'video' ? '🎬' : '🖼️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-primary truncate">{c.name}</p>
                      <p className="text-xs text-ink-muted">{c.impressions} impr · {c.ctr} CTR</p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-bold shrink-0"
                      style={{ background: `${scoreColor}18`, color: scoreColor, border: `1px solid ${scoreColor}28` }}
                    >
                      {c.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
