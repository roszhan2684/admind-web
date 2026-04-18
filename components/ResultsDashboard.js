'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Sparkles, Star, Users, Layout, Shield, Palette,
  Type, Package, Tag, Flame, Brain, TrendingUp, Clock, Film,
  AlertTriangle, CheckCircle2, Info, ChevronDown, ChevronUp,
  Copy, Check, ImageIcon, VideoIcon, RefreshCw, Zap,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */
function parseFencedJson(s) {
  if (typeof s !== 'string') return null;
  const cleaned = s.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function parseInsight(insight) {
  if (!insight) return null;
  if (typeof insight === 'string') return parseFencedJson(insight) ?? { insight_summary: insight };
  if (typeof insight === 'object') {
    if (typeof insight.insight_summary === 'string') {
      return parseFencedJson(insight.insight_summary) ?? { insight_summary: insight.insight_summary };
    }
    return insight;
  }
  return null;
}

function fmt(val) {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'number') return val % 1 === 0 ? String(val) : val.toFixed(2);
  return String(val);
}

/* ─────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────── */

/** Animated SVG score ring */
function ScoreRing({ score, size = 124 }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(score, 100) / 100) * circ;
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  const glowClass = score >= 70 ? 'score-glow-green' : score >= 40 ? 'score-glow-amber' : 'score-glow-red';
  const label = score >= 70 ? 'Excellent' : score >= 40 ? 'Good' : 'Needs Work';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`relative ${glowClass}`} style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" style={{ overflow: 'visible' }}>
          {/* Track */}
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={7} />
          {/* Fill */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-black text-white leading-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-gray-500 font-medium">/100</span>
        </div>
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

/** Animated bar for an emotion */
function EmotionBar({ emotion, pct, isTop, delay = 0 }) {
  const EMOJI = {
    happy: '😊', sad: '😢', angry: '😠', surprised: '😲',
    fearful: '😨', disgusted: '🤢', neutral: '😐',
    joy: '😄', excitement: '🤩', trust: '🤝', fear: '😨',
  };
  const emoji = EMOJI[emotion?.toLowerCase()] || '🎭';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-gray-200">
          <span className="text-base">{emoji}</span>
          <span className="capitalize font-medium">{emotion}</span>
          {isTop && (
            <span className="text-[10px] px-1.5 py-0.5 bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/20">
              top
            </span>
          )}
        </span>
        <span className="text-sm text-gray-500 font-mono tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #7c3aed, #a855f7)` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay }}
        />
      </div>
    </div>
  );
}

/** Clickable color swatch */
function ColorSwatch({ color }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.12, y: -5 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleCopy}
      className="group flex flex-col items-center gap-1.5"
      title={`Copy ${color}`}
    >
      <div
        className="w-11 h-11 rounded-2xl shadow-lg border border-white/10 ring-0 group-hover:ring-2 ring-white/20 transition-all"
        style={{ background: color }}
      />
      <span
        className={`text-[10px] font-mono transition-colors ${
          copied ? 'text-green-400' : 'text-gray-600 group-hover:text-gray-400'
        }`}
      >
        {copied ? '✓ copied' : color}
      </span>
    </motion.button>
  );
}

/** Tag chip */
function TagChip({ label, variant = 'default' }) {
  const styles = {
    default:  'bg-gray-800 text-gray-300 border-gray-700/60',
    object:   'bg-blue-900/30 text-blue-300 border-blue-700/40',
    category: 'bg-cyan-900/30 text-cyan-300 border-cyan-700/40',
    brand:    'bg-violet-900/30 text-violet-300 border-violet-700/40',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}

/** Generic stat tile */
function StatTile({ label, value, icon: Icon, color = 'violet', sub }) {
  const map = {
    violet: { bg: 'from-violet-600/15 to-purple-900/10', border: 'border-violet-500/20', icon: 'text-violet-400' },
    cyan:   { bg: 'from-cyan-600/15 to-blue-900/10',     border: 'border-cyan-500/20',   icon: 'text-cyan-400'   },
    green:  { bg: 'from-green-600/15 to-emerald-900/10', border: 'border-green-500/20',  icon: 'text-green-400'  },
    amber:  { bg: 'from-amber-600/15 to-yellow-900/10',  border: 'border-amber-500/20',  icon: 'text-amber-400'  },
    red:    { bg: 'from-red-600/15 to-rose-900/10',      border: 'border-red-500/20',    icon: 'text-red-400'    },
    pink:   { bg: 'from-pink-600/15 to-rose-900/10',     border: 'border-pink-500/20',   icon: 'text-pink-400'   },
  };
  const c = map[color] || map.violet;

  return (
    <div className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-4 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <Icon className={`w-4 h-4 ${c.icon}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

/** Section wrapper with entrance animation */
function Section({ title, icon: Icon, iconColor = 'text-violet-400', iconBg = 'bg-violet-900/40', children, delay = 0, collapsible = false }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => collapsible && setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-6 py-5 ${collapsible ? 'hover:bg-white/[0.02] transition-colors cursor-pointer' : 'cursor-default'}`}
      >
        <div className={`w-8 h-8 rounded-xl ${iconBg} border border-white/5 flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <h3 className="font-semibold text-gray-100 flex-1 text-left">{title}</h3>
        {collapsible && (
          <span className="text-gray-600">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main ResultsDashboard
───────────────────────────────────────────────────────────────── */
export default function ResultsDashboard({ result, file, previewUrl, apiUrl, onReset }) {
  const isVideo = result.media_type === 'video';
  const insight = parseInsight(result.insight);

  const score = typeof result.creative_score === 'number' ? result.creative_score : null;
  const emotion = result.dominant_emotion || result.video_emotions?.summary?.final_top;
  const emotionConf = typeof result.emotion_confidence === 'number' ? result.emotion_confidence : null;
  const palette = result.color_palette || result.color_palette_global || [];
  const heatmaps = result.keyframe_heatmaps || (result.heatmap_url ? [result.heatmap_url] : []);
  const nsfwSafe = result.nsfw?.is_safe ?? true;

  // Video emotion breakdown
  const ve = result.video_emotions || {};
  const veSummary = ve.summary || {};
  const topEmotions = veSummary.counts
    ? Object.entries(veSummary.counts)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
    : result.top_emotions || [];
  const totalEmotionCount = topEmotions.reduce((s, e) => s + (e.count || 0), 0) || 1;

  const avgFaces =
    typeof veSummary.avg_faces_per_sec === 'number'
      ? veSummary.avg_faces_per_sec
      : result.avg_faces_per_frame;

  return (
    <div className="relative z-10 min-h-screen pb-20">
      {/* ── Sticky Nav ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-gray-950/85 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center gap-4">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">New Analysis</span>
          </motion.button>

          {/* Brand */}
          <div className="flex items-center gap-2 mx-auto">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-black gradient-text-sm text-base">AdMind</span>
          </div>

          {/* File name */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 max-w-[180px] hidden sm:flex">
            {isVideo
              ? <VideoIcon className="w-3 h-3 text-cyan-600 flex-shrink-0" />
              : <ImageIcon className="w-3 h-3 text-violet-600 flex-shrink-0" />
            }
            <span className="truncate">{file?.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-5">
        {/* ── Hero Card ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row gap-0">
            {/* Preview thumbnail */}
            <div className="sm:w-64 lg:w-80 flex-shrink-0 relative">
              {isVideo ? (
                <video
                  src={previewUrl}
                  className="w-full h-52 sm:h-full object-cover bg-black"
                  controls
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Ad creative"
                  className="w-full h-52 sm:h-full object-cover bg-gray-900"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/80 hidden sm:block" />
            </div>

            {/* Overview */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-start gap-6">
                {score !== null && <ScoreRing score={score} size={120} />}

                <div className="flex-1 min-w-0 space-y-4">
                  {/* File info */}
                  <div>
                    <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-1">Analyzed Creative</p>
                    <p className="text-lg font-bold text-white truncate">{file?.name || 'Ad Creative'}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${isVideo ? 'bg-cyan-900/40 text-cyan-400' : 'bg-violet-900/40 text-violet-400'}`}>
                        {isVideo ? '🎬 Video' : '🖼 Image'}
                      </span>
                      {isVideo && result.duration_sec && (
                        <span>{result.duration_sec}s · {result.frames_analyzed} frames · {result.fps_used} fps</span>
                      )}
                    </p>
                  </div>

                  {/* Dominant emotion */}
                  {emotion && (
                    <div>
                      <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-1">Dominant Emotion</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl font-bold capitalize text-violet-300">{emotion}</span>
                        {emotionConf !== null && (
                          <span className="text-xs px-2 py-0.5 bg-violet-900/40 text-violet-400 border border-violet-500/25 rounded-full">
                            {Math.round(emotionConf * 100)}% conf
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Safety badge */}
                  <div className="flex items-center gap-2">
                    {nsfwSafe ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-900/30 border border-green-500/25 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">Content Safe</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/30 border border-red-500/25 rounded-full">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">NSFW Detected</span>
                      </div>
                    )}
                    {isVideo && result.nsfw?.frames_checked && (
                      <span className="text-xs text-gray-600">
                        ({result.nsfw.safe_votes}/{result.nsfw.frames_checked} frames safe)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Grid ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {score !== null && (
            <StatTile label="Creative Score" value={score} icon={Star} color="violet" sub="out of 100" />
          )}
          {typeof result.face_count === 'number' && (
            <StatTile label="Faces" value={result.face_count} icon={Users} color="cyan" sub="detected" />
          )}
          {(result.layout_balance || result.layout_balance_avg) && (
            <StatTile
              label="Layout Balance"
              value={fmt(result.layout_balance || result.layout_balance_avg)}
              icon={Layout} color="amber"
            />
          )}
          {!isVideo && result.alignment?.best_caption?.score != null && (
            <StatTile
              label="Caption Alignment"
              value={Number(result.alignment.best_caption.score).toFixed(2)}
              icon={TrendingUp} color="green"
            />
          )}
          {isVideo && result.duration_sec && (
            <StatTile label="Duration" value={`${result.duration_sec}s`} icon={Clock} color="cyan" sub={`${result.frames_analyzed} frames`} />
          )}
          {isVideo && typeof avgFaces !== 'undefined' && (
            <StatTile label="Avg Faces/Sec" value={typeof avgFaces === 'number' ? avgFaces.toFixed(1) : fmt(avgFaces)} icon={Users} color="pink" />
          )}
          {isVideo && result.fps_used && (
            <StatTile label="FPS Analyzed" value={result.fps_used} icon={Film} color="amber" />
          )}
        </motion.div>

        {/* ── Two-column grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Emotion Analysis */}
          {(emotion || topEmotions.length > 0) && (
            <Section title="Emotion Analysis" icon={Zap} iconColor="text-violet-400" iconBg="bg-violet-900/40" delay={0.15}>
              <div className="space-y-3">
                {/* Single dominant (image) */}
                {emotion && !topEmotions.length && (
                  <EmotionBar
                    emotion={emotion}
                    pct={emotionConf !== null ? Math.round(emotionConf * 100) : 85}
                    isTop delay={0.1}
                  />
                )}
                {/* Video top emotions */}
                {topEmotions.slice(0, 6).map((e, i) => (
                  <EmotionBar
                    key={i}
                    emotion={e.label}
                    pct={Math.round((e.count / totalEmotionCount) * 100)}
                    isTop={i === 0}
                    delay={0.1 + i * 0.07}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Color Palette */}
          {palette.length > 0 && (
            <Section title="Color Palette" icon={Palette} iconColor="text-pink-400" iconBg="bg-pink-900/30" delay={0.2}>
              <div className="flex flex-wrap gap-4">
                {palette.map((color, i) => (
                  <ColorSwatch key={i} color={color} />
                ))}
              </div>
              <p className="text-[11px] text-gray-700 mt-4">Click any swatch to copy its hex code</p>
            </Section>
          )}

          {/* OCR Text */}
          {(result.text_content || result.ocr_excerpt) && (
            <Section title="OCR Text Extraction" icon={Type} iconColor="text-cyan-400" iconBg="bg-cyan-900/30" delay={0.25} collapsible>
              <div className="bg-gray-800/50 border border-white/5 rounded-xl p-4 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {String(result.text_content || result.ocr_excerpt || '').trim() || '(no text detected)'}
              </div>
            </Section>
          )}

          {/* Detected Objects */}
          {((result.detected_objects?.length > 0) || (result.objects_top?.length > 0)) && (
            <Section title="Detected Objects" icon={Package} iconColor="text-blue-400" iconBg="bg-blue-900/30" delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {(result.detected_objects || []).map((o, i) => (
                  <TagChip key={i} label={String(o)} variant="object" />
                ))}
                {(result.objects_top || []).map((o, i) => (
                  <TagChip key={`vt${i}`} label={`${o.label} ×${o.count}`} variant="object" />
                ))}
              </div>
            </Section>
          )}

          {/* Top Categories */}
          {result.top_categories?.length > 0 && (
            <Section title="Top Categories" icon={Tag} iconColor="text-teal-400" iconBg="bg-teal-900/30" delay={0.35}>
              <div className="flex flex-wrap gap-2">
                {result.top_categories.map((c, i) => (
                  <TagChip
                    key={i}
                    label={
                      typeof c === 'string'
                        ? c
                        : `${c.label ?? c.name ?? '—'}${c.score != null ? ` · ${Number(c.score).toFixed(2)}` : ''}`
                    }
                    variant="category"
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Brands */}
          {result.brands?.length > 0 && (
            <Section title="Brand Detection" icon={Tag} iconColor="text-amber-400" iconBg="bg-amber-900/30" delay={0.4}>
              <div className="space-y-2">
                {result.brands.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
                  >
                    <span className="font-semibold text-gray-200">{b.brand}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">conf {b.confidence}</span>
                      <span className="text-[11px] px-2 py-0.5 bg-gray-800 border border-gray-700/50 rounded-md text-gray-400">
                        {b.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Caption (image only) */}
          {!isVideo && result.alignment?.best_caption?.text && (
            <Section title="Best Caption Match" icon={Info} iconColor="text-sky-400" iconBg="bg-sky-900/30" delay={0.42}>
              <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-300 leading-relaxed">
                "{result.alignment.best_caption.text}"
              </blockquote>
              <p className="text-xs text-gray-600 mt-3">
                Alignment score: <span className="font-mono text-gray-400">{Number(result.alignment.best_caption.score ?? 0).toFixed(4)}</span>
              </p>
            </Section>
          )}
        </div>

        {/* ── Heatmaps ──────────────────────────────────────────── */}
        {heatmaps.length > 0 && (
          <Section
            title={isVideo ? 'Keyframe Attention Heatmaps' : 'Attention Heatmap'}
            icon={Flame}
            iconColor="text-orange-400"
            iconBg="bg-orange-900/30"
            delay={0.45}
          >
            {isVideo ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {heatmaps.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="relative group overflow-hidden rounded-xl border border-white/5"
                  >
                    <img
                      src={String(h).startsWith('http') ? h : `${apiUrl}/outputs/${h}`}
                      alt={`Keyframe heatmap ${i + 1}`}
                      className="w-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[11px] text-gray-300">Frame {i + 1}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <motion.img
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  src={String(heatmaps[0]).startsWith('http') ? heatmaps[0] : `${apiUrl}/outputs/${heatmaps[0]}`}
                  alt="Attention heatmap"
                  className="max-w-lg w-full rounded-xl border border-white/5 shadow-xl"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="text-[11px] text-gray-700 mt-3">
              Warm areas indicate predicted viewer attention focus zones
            </p>
          </Section>
        )}

        {/* ── Gemini AI Insights ────────────────────────────────── */}
        {(insight || result.insight_error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="insight-card rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-violet-500/15">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 rounded-xl blur-md opacity-30" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                  <Brain className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white">Gemini AI Insights</h3>
                <p className="text-[11px] text-violet-400/70">Strategic recommendations powered by Google Gemini</p>
              </div>
              <div className="ml-auto">
                <span className="text-[11px] px-2.5 py-1 bg-violet-900/50 text-violet-300 border border-violet-500/30 rounded-full font-medium">
                  ✦ AI Generated
                </span>
              </div>
            </div>

            {/* Insight error */}
            {result.insight_error && !insight && (
              <div className="px-6 py-4 flex items-center gap-2.5 text-amber-400 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{String(result.insight_error)}</span>
              </div>
            )}

            {/* Insight content */}
            {insight && (
              <div className="px-6 pb-6 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {insight.emotion && (
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                    <p className="text-[11px] text-violet-400 uppercase tracking-widest mb-2 font-semibold">Emotional Tone</p>
                    <p className="text-gray-200 capitalize font-medium text-base">{String(insight.emotion)}</p>
                  </div>
                )}

                {insight.insight_summary && (
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 md:col-span-2">
                    <p className="text-[11px] text-violet-400 uppercase tracking-widest mb-2 font-semibold">Strategic Summary</p>
                    <p className="text-gray-200 leading-relaxed">{String(insight.insight_summary)}</p>
                  </div>
                )}

                {insight.weakness && (
                  <div className="bg-red-500/[0.06] border border-red-500/20 rounded-xl p-4">
                    <p className="text-[11px] text-red-400 uppercase tracking-widest mb-2 font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3" /> Weakness
                    </p>
                    <p className="text-gray-300 leading-relaxed text-sm">{String(insight.weakness)}</p>
                  </div>
                )}

                {Array.isArray(insight.suggestions) && insight.suggestions.length > 0 && (
                  <div className="bg-green-500/[0.06] border border-green-500/20 rounded-xl p-4">
                    <p className="text-[11px] text-green-400 uppercase tracking-widest mb-3 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" /> Suggestions
                    </p>
                    <ul className="space-y-2">
                      {insight.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">→</span>
                          <span className="leading-relaxed">{String(s)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Video per-second timeline (collapsible debug) ──────── */}
        {isVideo && ve.per_second?.length > 0 && (
          <Section
            title="Per-Second Emotion Timeline"
            icon={Film}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-900/30"
            delay={0.6}
            collapsible
          >
            <div className="overflow-x-auto">
              <div className="flex gap-1.5 pb-2 min-w-max">
                {ve.per_second.slice(0, 60).map((sec, i) => {
                  const emo = sec.dominant_emotion || 'neutral';
                  const COLOR = {
                    happy: '#10b981', neutral: '#6b7280', sad: '#3b82f6',
                    angry: '#ef4444', surprised: '#f59e0b', fearful: '#8b5cf6',
                    disgusted: '#84cc16', joy: '#06b6d4',
                  };
                  const color = COLOR[emo.toLowerCase()] || '#6b7280';
                  return (
                    <div
                      key={i}
                      title={`${i}s: ${emo} (${sec.face_count ?? 0} faces)`}
                      className="flex flex-col items-center gap-1 cursor-default"
                    >
                      <div
                        className="w-3 rounded-sm transition-opacity hover:opacity-80"
                        style={{ height: 32, background: color, opacity: 0.75 }}
                      />
                      {i % 5 === 0 && (
                        <span className="text-[9px] text-gray-600 font-mono">{i}s</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries({
                happy: '#10b981', neutral: '#6b7280', sad: '#3b82f6',
                angry: '#ef4444', surprised: '#f59e0b',
              }).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                  <span className="capitalize">{label}</span>
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ── Re-analyze CTA ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-violet-500/40 hover:text-violet-300 hover:bg-violet-900/10 transition-all duration-200 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another Creative
          </button>
        </motion.div>
      </div>
    </div>
  );
}
