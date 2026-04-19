'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  Activity, AlertTriangle, CheckCircle, Clock, TrendingDown,
  Zap, Eye, ArrowRight, Flame, Shield,
} from 'lucide-react';
import { fatigueData } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function statusConfig(status) {
  return {
    healthy:  { color: '#34D399', bg: 'bg-success/10',  border: 'border-success/25',  badge: 'badge-success', label: 'Healthy',  icon: CheckCircle },
    watch:    { color: '#F59E0B', bg: 'bg-warning/10',  border: 'border-warning/25',  badge: 'badge-warning', label: 'Watch',    icon: Eye         },
    risk:     { color: '#F59E0B', bg: 'bg-warning/10',  border: 'border-warning/25',  badge: 'badge-warning', label: 'At risk',  icon: AlertTriangle},
    critical: { color: '#F87171', bg: 'bg-danger/10',   border: 'border-danger/25',   badge: 'badge-danger',  label: 'Critical', icon: Flame       },
  }[status] || { color: '#6B7280', bg: 'bg-bg-elevated', border: 'border-border-default', badge: 'badge-muted', label: status, icon: Eye };
}

/* Predict fatigue over next 14 days based on current rate */
function buildFatigueForecast(creative) {
  const today = creative.fatigue;
  const dailyIncrease = creative.status === 'critical' ? 2.5 : creative.status === 'risk' ? 1.8 : creative.status === 'watch' ? 1.0 : 0.4;
  const days = Array.from({ length: 14 }, (_, i) => {
    const projected = Math.min(100, today + dailyIncrease * i);
    return {
      day: i === 0 ? 'Today' : `Day ${i}`,
      fatigue: Math.round(projected),
      predicted: i > 0,
    };
  });
  // Retirement day = when fatigue hits 85
  const retireDay = days.find((d) => d.fatigue >= 85);
  return { days, retireDay };
}

/* ------------------------------------------------------------------ */
/* Fatigue gauge                                                        */
/* ------------------------------------------------------------------ */
function FatigueGauge({ value, color }) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={72} height={72} viewBox="0 0 72 72" className="shrink-0">
      <circle cx="36" cy="36" r="28" fill="none" stroke="#2A2A3E" strokeWidth="6" />
      <circle
        cx="36" cy="36" r="28"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: 'stroke-dashoffset 0.7s ease' }}
      />
      <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill={color} fontFamily="monospace">
        {value}%
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Creative row card                                                    */
/* ------------------------------------------------------------------ */
function CreativeRow({ creative, selected, onSelect }) {
  const cfg = statusConfig(creative.status);
  const Icon = cfg.icon;
  const daysLeft = creative.fatigue >= 85 ? 0 : Math.round((85 - creative.fatigue) / (creative.fatigue / creative.daysRunning * 1.1 || 1));

  return (
    <button
      onClick={() => onSelect(creative)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? `${cfg.bg} ${cfg.border}`
          : 'surface hover:border-border-strong'
      }`}
    >
      <div className="flex items-center gap-4">
        <FatigueGauge value={creative.fatigue} color={cfg.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-semibold text-ink-primary truncate">{creative.name}</span>
            <span className={`badge ${cfg.badge}`}>
              <Icon size={9} />
              {cfg.label}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1"><Clock size={11} /> {creative.daysRunning} days running</span>
            <span className="flex items-center gap-1"><Activity size={11} /> Score: {creative.score}</span>
            {daysLeft > 0 && creative.status !== 'healthy' && (
              <span className="flex items-center gap-1 text-warning">
                <AlertTriangle size={11} />
                ~{daysLeft}d to critical
              </span>
            )}
          </div>
        </div>
        {creative.status === 'critical' && (
          <div className="shrink-0">
            <span className="flex items-center gap-1 text-xs font-semibold text-danger animate-pulse">
              <Flame size={13} /> Retire now
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Forecast chart                                                       */
/* ------------------------------------------------------------------ */
function ForecastChart({ creative }) {
  const { days, retireDay } = buildFatigueForecast(creative);
  const cfg = statusConfig(creative.status);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="surface-elevated px-3 py-2 rounded-xl border border-border-strong shadow-modal text-xs">
        <p className="text-ink-muted mb-1">{label}</p>
        <p className="font-mono font-bold" style={{ color: cfg.color }}>Fatigue: {payload[0].value}%</p>
        {payload[0].payload.predicted && (
          <p className="text-ink-muted mt-0.5">Projected</p>
        )}
      </div>
    );
  };

  return (
    <div className="surface p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-ink-primary">Fatigue Forecast — {creative.name}</h3>
          <p className="text-xs text-ink-muted mt-0.5">14-day projection based on current decay rate</p>
        </div>
        {retireDay && (
          <div className="px-3 py-1.5 rounded-xl bg-danger/10 border border-danger/25">
            <p className="text-xs font-semibold text-danger">Hits 85% on {retireDay.day}</p>
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={days} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gFatigue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cfg.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={cfg.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2C" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
          <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
          <ReferenceLine y={85} stroke="#F87171" strokeDasharray="4 4" label={{ value: 'Retire threshold', position: 'right', fontSize: 10, fill: '#F87171' }} />
          <ReferenceLine y={60} stroke="#F59E0B" strokeDasharray="4 4" label={{ value: 'Watch threshold', position: 'right', fontSize: 10, fill: '#F59E0B' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            dataKey="fatigue"
            stroke={cfg.color}
            strokeWidth={2.5}
            fill="url(#gFatigue)"
            dot={(props) => {
              if (!props.payload.predicted) return (
                <circle key={props.index} cx={props.cx} cy={props.cy} r={4} fill={cfg.color} stroke="none" />
              );
              return (
                <circle key={props.index} cx={props.cx} cy={props.cy} r={2.5} fill="none" stroke={cfg.color} strokeWidth={1.5} strokeDasharray="2 2" />
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3 text-xs text-ink-muted">
        <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded" style={{ background: cfg.color }} /> Actual</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded border border-dashed" style={{ borderColor: cfg.color }} /> Projected</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded bg-danger" /> Retire threshold (85%)</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI Recommendation panel                                              */
/* ------------------------------------------------------------------ */
function AIRecommendation({ creative }) {
  const recs = {
    critical: [
      `Pause this creative immediately. It has passed the 85% fatigue threshold and continued spend is burning budget with no return.`,
      `Brief a fresh creative using the same core angle — what made this ad work initially is still valid, the creative just needs refreshing.`,
      `Test 2–3 new variants: try a UGC-style version, a different hook framing, and a format change (e.g. static → video).`,
    ],
    risk: [
      `Start preparing a replacement creative now — you have approximately 4–7 days before CTR begins declining sharply.`,
      `A/B test a new variant at 20% budget allocation while the current creative is still converting.`,
      `Consider refreshing just the hook/first-3-seconds — often this alone resets fatigue curves significantly.`,
    ],
    watch: [
      `Monitor daily. Set an alert if CTR drops more than 15% week-over-week.`,
      `Begin ideating on a follow-up creative — no urgency yet, but don't be caught unprepared.`,
      `Consider testing in a new audience segment to extend the creative's useful life.`,
    ],
    healthy: [
      `This creative is performing well. Continue scaling confidently.`,
      `Begin building a successor creative now so you have it ready when fatigue eventually sets in.`,
      `This is a strong performer — document what's working: hook, format, tone, and audience. Use the Brief Generator to replicate it.`,
    ],
  };

  const recommendations = recs[creative.status] || recs.healthy;

  return (
    <div className="ai-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="ai-orb">
          <Zap size={14} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-primary">AI Recommendation</p>
          <p className="text-xs text-ink-muted">Based on fatigue trajectory</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
              style={{ background: 'rgba(192,132,252,0.15)', color: '#C084FC' }}
            >
              {i + 1}
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
      <a href="/brief-generator" className="btn-primary btn-sm mt-4 inline-flex">
        <Zap size={13} />
        Generate replacement brief
        <ArrowRight size={13} />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function FatiguePage() {
  const [selected, setSelected] = useState(fatigueData[0]);
  const [filter, setFilter] = useState('all');

  const counts = {
    critical: fatigueData.filter((c) => c.status === 'critical').length,
    risk:     fatigueData.filter((c) => c.status === 'risk').length,
    watch:    fatigueData.filter((c) => c.status === 'watch').length,
    healthy:  fatigueData.filter((c) => c.status === 'healthy').length,
  };

  const filtered = fatigueData.filter((c) => filter === 'all' || c.status === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Fatigue Monitor" subtitle="Predict creative decay before it costs you ROAS" />

      <main className="flex-1 overflow-hidden flex flex-col px-6 py-6">
        {/* Summary strip */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { key: 'critical', label: 'Critical',  color: '#F87171', icon: Flame        },
            { key: 'risk',     label: 'At Risk',   color: '#F59E0B', icon: AlertTriangle },
            { key: 'watch',    label: 'Watch',     color: '#F59E0B', icon: Eye           },
            { key: 'healthy',  label: 'Healthy',   color: '#34D399', icon: Shield        },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(filter === s.key ? 'all' : s.key)}
              className={`metric-card flex items-center gap-3 cursor-pointer transition-all ${filter === s.key ? 'ring-2 ring-offset-1 ring-offset-bg-primary' : ''}`}
              style={filter === s.key ? { '--tw-ring-color': s.color } : {}}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                <s.icon size={18} />
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-ink-primary">{counts[s.key]}</p>
                <p className="text-xs text-ink-muted">{s.label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-5 gap-5 flex-1 overflow-hidden">
          {/* Creative list */}
          <div className="lg:col-span-2 flex flex-col gap-2 overflow-y-auto">
            {filtered.map((creative) => (
              <CreativeRow
                key={creative.name}
                creative={creative}
                selected={selected?.name === creative.name}
                onSelect={setSelected}
              />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10">
                <Shield size={32} className="text-success mx-auto mb-2" />
                <p className="text-sm text-ink-primary font-semibold">No {filter} creatives</p>
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto">
            {selected ? (
              <>
                <ForecastChart creative={selected} />
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Days Running', value: `${selected.daysRunning}d`, icon: Clock },
                    { label: 'Creative Score', value: selected.score, icon: Activity },
                    { label: 'Current Fatigue', value: `${selected.fatigue}%`, icon: TrendingDown },
                  ].map((s) => (
                    <div key={s.label} className="surface p-4 rounded-xl text-center">
                      <s.icon size={16} className="text-ink-muted mx-auto mb-2" />
                      <p className="font-mono text-xl font-bold text-ink-primary">{s.value}</p>
                      <p className="text-xs text-ink-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <AIRecommendation creative={selected} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Activity size={40} className="text-ink-muted mx-auto mb-3 opacity-30" />
                  <p className="text-ink-secondary">Select a creative to see its forecast</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
