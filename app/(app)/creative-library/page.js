'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Search, Filter, Grid3X3, List, Sparkles, TrendingUp,
  TrendingDown, Eye, Play, Image, AlertTriangle, CheckCircle,
  X, ArrowUpRight, Cpu, BarChart3, Clock, Target,
} from 'lucide-react';
import { creativeLibrary } from '../../../lib/mock-data';
import TopBar from '../../../components/app/TopBar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
const scoreColor = (s) =>
  s >= 80 ? '#22C55E' : s >= 60 ? '#F5B942' : '#EF5F67';

const statusBadge = {
  active:  'badge-success',
  scaling: 'badge-primary',
  review:  'badge-warning',
  paused:  'badge-muted',
};

/* ------------------------------------------------------------------ */
/* Upload Drop Zone                                                     */
/* ------------------------------------------------------------------ */
function UploadZone({ onFile }) {
  const [dragging, setDragging] = useState(false);

  const handle = useCallback((file) => {
    if (!file) return;
    const ok = file.type.startsWith('image/') || file.type.startsWith('video/');
    if (ok) onFile(file);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer group ${
        dragging ? 'border-primary bg-primary/8' : 'border-border-strong hover:border-primary hover:bg-primary/4'
      }`}
      onClick={() => document.getElementById('creative-file-input').click()}
    >
      <input
        id="creative-file-input"
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handle(e.target.files[0])}
      />
      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
        <Upload size={24} className="text-primary" />
      </div>
      <p className="text-sm font-semibold text-ink-primary mb-1">Drop your creative here</p>
      <p className="text-xs text-ink-muted">Images (JPG, PNG, WebP) or Videos (MP4, MOV) up to 100MB</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analysis result panel                                                */
/* ------------------------------------------------------------------ */
function AnalysisPanel({ file, result, onClose }) {
  const s = result?.score ?? 0;
  const c = scoreColor(s);
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed right-0 top-0 h-full w-96 bg-bg-surface border-l border-border-default shadow-modal overflow-y-auto z-40"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-ink-primary flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            AI Analysis
          </h3>
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={16} />
          </button>
        </div>

        {/* Score ring */}
        <div className="flex items-center gap-4 mb-5 p-4 surface rounded-xl">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-mono text-2xl font-bold"
            style={{ background: `${c}18`, color: c, border: `3px solid ${c}` }}
          >
            {s}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-primary">Creative Score</p>
            <p className="text-xs text-ink-muted">
              {s >= 80 ? 'High performer' : s >= 60 ? 'Average performer' : 'Needs improvement'}
            </p>
            {result?.emotion && (
              <p className="text-xs text-ink-secondary mt-1">Detected emotion: <span className="text-ink-primary font-medium">{result.emotion}</span></p>
            )}
          </div>
        </div>

        {/* Heatmap */}
        {result?.heatmap_url && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Attention Heatmap</p>
            <img
              src={result.heatmap_url}
              alt="Heatmap"
              className="w-full rounded-xl border border-border-default"
            />
          </div>
        )}

        {/* Insight */}
        {result?.insight && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">AI Insight</p>
            <div className="ai-card p-4 rounded-xl text-sm text-ink-secondary leading-relaxed">
              {typeof result.insight === 'string'
                ? (() => {
                    try {
                      const parsed = JSON.parse(result.insight);
                      return parsed.insight_summary || result.insight;
                    } catch {
                      return result.insight;
                    }
                  })()
                : result.insight?.insight_summary || JSON.stringify(result.insight)}
            </div>
          </div>
        )}

        {/* Sub-scores */}
        {result && (
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Composition', value: result.composition_score ?? Math.round(s * 0.9) },
              { label: 'Color', value: result.color_score ?? Math.round(s * 1.05) },
              { label: 'Text Clarity', value: result.text_score ?? Math.round(s * 0.85) },
              { label: 'Engagement', value: result.engagement_score ?? Math.round(s * 0.95) },
            ].map((sub) => {
              const capped = Math.min(100, sub.value);
              const c2 = scoreColor(capped);
              return (
                <div key={sub.label} className="surface p-3 rounded-lg">
                  <p className="text-xs text-ink-muted mb-1">{sub.label}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${capped}%`, background: c2 }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: c2 }}>{capped}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Creative card (grid view)                                            */
/* ------------------------------------------------------------------ */
function CreativeCard({ creative, onSelect }) {
  const c = scoreColor(creative.score);
  return (
    <div
      className="surface rounded-xl overflow-hidden group hover:border-border-strong hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={() => onSelect(creative)}
    >
      {/* Thumbnail */}
      <div className="relative h-36 bg-bg-elevated flex items-center justify-center">
        <span className="text-4xl">{creative.type === 'video' ? '🎬' : '🖼️'}</span>
        <div className="absolute top-2 right-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
            style={{ background: `${c}25`, color: c, border: `1px solid ${c}40` }}
          >
            {creative.score}
          </div>
        </div>
        {creative.status === 'active' && (
          <div className="absolute bottom-2 left-2">
            <span className="badge badge-success">Live</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-ink-primary truncate mb-1">{creative.name}</p>
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>{creative.impressions} impr</span>
          <span className="font-mono">{creative.roas} ROAS</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function CreativeLibraryPage() {
  const [view, setView] = useState('grid'); // grid | list
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [uploadFile, setUploadFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = creativeLibrary.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter || c.type === filter;
    return matchSearch && matchFilter;
  });

  const handleFile = useCallback((file) => {
    setUploadFile(file);
    setResult(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!uploadFile) return;
    setAnalyzing(true);
    setProgress(0);
    setError(null);
    const formData = new FormData();
    formData.append('file', uploadFile);
    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        onUploadProgress: (e) => {
          setProgress(e.total ? Math.round((e.loaded * 100) / e.total) : 0);
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Check backend connection.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Creative Library" subtitle="Manage and analyze your ad creatives" />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* Upload section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-ink-primary mb-3 flex items-center gap-2">
            <Cpu size={15} className="text-primary" />
            Analyze New Creative
          </h2>
          {!uploadFile ? (
            <UploadZone onFile={handleFile} />
          ) : (
            <div className="surface p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                {uploadFile.type.startsWith('video') ? '🎬' : '🖼️'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-primary truncate">{uploadFile.name}</p>
                <p className="text-xs text-ink-muted">{(uploadFile.size / 1024 / 1024).toFixed(1)} MB</p>
                {analyzing && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-brand transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-ink-muted mt-1">Analyzing… {progress}%</p>
                  </div>
                )}
                {error && <p className="text-xs text-danger mt-1">{error}</p>}
                {result && (
                  <p className="text-xs text-success mt-1 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Analysis complete — score: {result.score}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {result ? (
                  <button
                    onClick={() => setSelected({ name: uploadFile.name, type: uploadFile.type.startsWith('video') ? 'video' : 'image', score: result.score })}
                    className="btn-secondary btn-sm"
                  >
                    View results
                  </button>
                ) : (
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="btn-primary btn-sm disabled:opacity-50"
                  >
                    <Sparkles size={13} />
                    {analyzing ? 'Analyzing…' : 'Analyze'}
                  </button>
                )}
                <button
                  onClick={() => { setUploadFile(null); setResult(null); setError(null); }}
                  className="btn-ghost p-2"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Library header */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Search creatives…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 h-9 text-sm"
              />
            </div>
            <div className="flex gap-1 surface rounded-lg p-1">
              {['all', 'active', 'video', 'image'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                    filter === f ? 'bg-primary text-white' : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-1 surface rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-primary text-white' : 'text-ink-muted hover:text-ink-primary'}`}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-primary text-white' : 'text-ink-muted hover:text-ink-primary'}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Grid / List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((c) => (
              <CreativeCard key={c.id} creative={c} onSelect={setSelected} />
            ))}
          </div>
        ) : (
          <div className="surface rounded-xl overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Creative</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Impressions</th>
                  <th>CTR</th>
                  <th>ROAS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const color = scoreColor(c.score);
                  return (
                    <tr key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center text-lg">
                            {c.type === 'video' ? '🎬' : '🖼️'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-ink-primary">{c.name}</p>
                            <p className="text-xs text-ink-muted capitalize">{c.type} · {c.format}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
                          style={{ background: `${color}18`, color }}
                        >
                          {c.score}
                        </div>
                      </td>
                      <td><span className={`badge ${statusBadge[c.status]}`}>{c.status}</span></td>
                      <td className="font-mono text-sm">{c.impressions}</td>
                      <td className="font-mono text-sm">{c.ctr}</td>
                      <td className="font-mono text-sm" style={{ color }}>{c.roas}</td>
                      <td>
                        <button className="btn-ghost p-1.5" onClick={(e) => { e.stopPropagation(); setSelected(c); }}>
                          <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Side panel for selected creative */}
      <AnimatePresence>
        {(selected || result) && (
          <AnalysisPanel
            file={uploadFile}
            result={result || { score: selected?.score ?? 75, emotion: 'Neutral' }}
            onClose={() => { setSelected(null); setResult(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
