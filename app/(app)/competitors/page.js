'use client';

import { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Eye, TrendingUp, AlertTriangle, ChevronRight, ExternalLink, Zap } from 'lucide-react';
import {
  competitors, narrativeTimeline, competitorFeed,
} from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

const COLORS = ['#5B8CFF', '#22C7A9', '#7B61FF', '#F5B942', '#EF5F67'];

/* ------------------------------------------------------------------ */
/* Radar spider chart                                                   */
/* ------------------------------------------------------------------ */
function CompetitorRadar({ competitor }) {
  if (!competitor) return null;
  const data = [
    { axis: 'Creative Vol.', value: competitor.creativeVolume },
    { axis: 'Spend Signal', value: competitor.spendSignal },
    { axis: 'Engagement', value: competitor.engagement },
    { axis: 'UGC Mix', value: competitor.ugcMix },
    { axis: 'Video Share', value: competitor.videoShare },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid stroke="#26324A" />
        <PolarAngleAxis dataKey="axis" tick={{ fill: '#74809A', fontSize: 11 }} />
        <Radar dataKey="value" stroke="#5B8CFF" fill="#5B8CFF" fillOpacity={0.2} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Narrative timeline chart                                             */
/* ------------------------------------------------------------------ */
function NarrativeTimeline() {
  return (
    <div className="surface p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-ink-primary">Narrative Share of Voice</h3>
        <span className="text-xs text-ink-muted">Last 5 months</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={narrativeTimeline}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A2438" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#74809A', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#74809A', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip
            contentStyle={{ background: '#182238', border: '1px solid #364560', borderRadius: 10, fontSize: 12 }}
            labelStyle={{ color: '#A7B0C0' }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: '#74809A' }} />
          {competitors.slice(0, 4).map((c, i) => (
            <Line
              key={c.name}
              type="monotone"
              dataKey={c.name}
              stroke={COLORS[i]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Competitor card                                                      */
/* ------------------------------------------------------------------ */
function CompetitorCard({ competitor, color, active, onClick }) {
  const threat = competitor.threat;
  const threatConfig = {
    high: { class: 'badge-danger', label: 'High threat' },
    medium: { class: 'badge-warning', label: 'Medium' },
    low: { class: 'badge-muted', label: 'Low' },
  };
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        active
          ? 'bg-primary/8 border-primary/30'
          : 'surface hover:border-border-strong hover:bg-bg-elevated/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: color }}
          >
            {competitor.name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-primary">{competitor.name}</p>
            <p className="text-xs text-ink-muted">{competitor.category}</p>
          </div>
        </div>
        <span className={`badge ${threatConfig[threat]?.class}`}>
          {threatConfig[threat]?.label}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Creatives', value: competitor.activeCreatives },
          { label: 'Spend', value: competitor.estimatedSpend },
          { label: 'Eng. Rate', value: `${competitor.engagement}%` },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-xs text-ink-muted">{m.label}</p>
            <p className="font-mono text-xs font-bold text-ink-primary">{m.value}</p>
          </div>
        ))}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function CompetitorsPage() {
  const [selected, setSelected] = useState(competitors[0]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Competitor Intelligence" subtitle="Track rival creative strategy in real time" />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left: competitor list */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye size={14} className="text-primary" />
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Monitored Brands</span>
            </div>
            {competitors.map((c, i) => (
              <CompetitorCard
                key={c.name}
                competitor={c}
                color={COLORS[i]}
                active={selected?.name === c.name}
                onClick={() => setSelected(c)}
              />
            ))}
          </div>

          {/* Right: detail */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Detail header */}
            {selected && (
              <div className="surface p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display font-semibold text-lg text-ink-primary">{selected.name}</h2>
                    <p className="text-xs text-ink-muted">{selected.category} · {selected.primaryMarket}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`badge ${selected.threat === 'high' ? 'badge-danger' : selected.threat === 'medium' ? 'badge-warning' : 'badge-muted'}`}>
                      {selected.threat} threat
                    </span>
                    <button className="btn-secondary btn-sm">
                      <ExternalLink size={12} />
                      View ads
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Active Creatives', value: selected.activeCreatives },
                    { label: 'Est. Weekly Spend', value: selected.estimatedSpend },
                    { label: 'Top Format', value: selected.topFormat },
                    { label: 'Primary Channel', value: selected.primaryChannel },
                  ].map((m) => (
                    <div key={m.label} className="surface-elevated p-3 rounded-lg">
                      <p className="text-xs text-ink-muted mb-1">{m.label}</p>
                      <p className="font-mono text-sm font-bold text-ink-primary">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Radar + insights */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Creative Fingerprint</p>
                    <CompetitorRadar competitor={selected} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Recent Narrative Shifts</p>
                    <div className="flex flex-col gap-2">
                      {selected.narrativeShifts?.map((shift, i) => (
                        <div key={i} className={`flex items-start gap-2 p-3 rounded-lg ${
                          shift.severity === 'high' ? 'bg-danger/8 border border-danger/20' : 'bg-warning/8 border border-warning/20'
                        }`}>
                          <AlertTriangle size={12} className={shift.severity === 'high' ? 'text-danger mt-0.5' : 'text-warning mt-0.5'} />
                          <div>
                            <p className="text-xs font-medium text-ink-primary">{shift.angle}</p>
                            <p className="text-xs text-ink-muted">{shift.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selected.aiWarning && (
                      <div className="mt-3 ai-card p-3 rounded-lg">
                        <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                          <Zap size={11} />
                          AI Warning
                        </p>
                        <p className="text-xs text-ink-secondary leading-relaxed">{selected.aiWarning}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Narrative timeline */}
            <NarrativeTimeline />

            {/* Recent events */}
            <div className="surface p-5 rounded-xl">
              <h3 className="text-sm font-semibold text-ink-primary mb-4">Recent Activity Feed</h3>
              <div className="flex flex-col">
                {competitorFeed.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        event.severity === 'high'
                          ? 'bg-danger/15 text-danger'
                          : event.severity === 'medium'
                          ? 'bg-warning/15 text-warning'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {event.competitor[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-ink-primary">{event.competitor}</span>
                        <span className={`badge ${event.severity === 'high' ? 'badge-danger' : event.severity === 'medium' ? 'badge-warning' : 'badge-primary'}`}>
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-xs text-ink-secondary leading-snug">{event.summary}</p>
                      <p className="text-xs text-ink-muted mt-1">{event.time}</p>
                    </div>
                    <button className="btn-ghost p-1.5 shrink-0">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
