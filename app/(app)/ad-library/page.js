'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bookmark, BookmarkCheck, ExternalLink, Sparkles,
  Filter, Grid3X3, X, TrendingUp, Eye, Copy, CheckCircle,
  ChevronDown, Tag, Globe, Play, Image as ImageIcon,
} from 'lucide-react';
import TopBar from '../../../components/app/TopBar';

/* ------------------------------------------------------------------ */
/* Ad library data                                                      */
/* ------------------------------------------------------------------ */
const AD_LIBRARY = [
  {
    id: 'ad-1', brand: 'Gymshark', industry: 'Fashion', platform: 'Meta', format: 'Video',
    angle: 'Lifestyle / Aspirational', score: 91, estCtr: '4.8%', estRoas: '5.2×',
    hook: '"Train like you mean it." — Opens on athlete mid-rep, zero intro.',
    why: 'No brand reveal until 4s. Pure emotion first. Strong UGC feel despite high production.',
    emoji: '🏋️', tags: ['UGC style', 'Athlete', 'No logo intro'],
  },
  {
    id: 'ad-2', brand: 'Notion', industry: 'SaaS', platform: 'LinkedIn', format: 'Static',
    angle: 'Educational', score: 84, estCtr: '0.9%', estRoas: '3.8×',
    hook: `"Stop switching apps. Your team's brain, in one place."`,
    why: 'Clean headline that names the pain exactly. No jargon. Single visual showing the product solving the problem.',
    emoji: '📝', tags: ['B2B', 'Pain-led', 'Clean design'],
  },
  {
    id: 'ad-3', brand: 'NovaBrand', industry: 'DTC / E-commerce', platform: 'TikTok', format: 'Video',
    angle: 'Urgency / Scarcity', score: 88, estCtr: '3.9%', estRoas: '4.6×',
    hook: '"Only 47 left in stock — here\'s why they\'re selling out."',
    why: 'Combines scarcity with social proof. TikTok-native editing rhythm. Creator-style face-to-camera with product.',
    emoji: '⚡', tags: ['Scarcity', 'Face-to-camera', 'TikTok-native'],
  },
  {
    id: 'ad-4', brand: 'Headspace', industry: 'Health & Wellness', platform: 'Meta', format: 'Video',
    angle: 'Emotional / Story', score: 87, estCtr: '3.1%', estRoas: '4.1×',
    hook: '"I used to wake up dreading the day. Then I tried 5 minutes."',
    why: 'First-person hook creates instant identification. Soft audio design signals calm. Perfect brand-tone match.',
    emoji: '🧠', tags: ['Emotional', 'First-person', 'Story arc'],
  },
  {
    id: 'ad-5', brand: 'Stripe', industry: 'Finance / Fintech', platform: 'Google Display', format: 'Static',
    angle: 'Direct / Product-first', score: 79, estCtr: '0.6%', estRoas: '6.8×',
    hook: '"Payments infrastructure for the internet."',
    why: 'Pure positioning. No fluff. Trusts brand awareness. Minimalist visual = premium signal in a cluttered space.',
    emoji: '💳', tags: ['Minimalist', 'B2B', 'Positioning'],
  },
  {
    id: 'ad-6', brand: 'Magic Spoon', industry: 'Food & Beverage', platform: 'Meta', format: 'Carousel',
    angle: 'Humorous', score: 82, estCtr: '3.6%', estRoas: '3.9×',
    hook: '"Cereal for adults who peaked in 4th grade." — Slide 1.',
    why: 'Self-aware humour immediately filters in ideal customer. Carousel reveals nutrition facts with punchlines.',
    emoji: '🥣', tags: ['Humorous', 'Carousel', 'Self-aware'],
  },
  {
    id: 'ad-7', brand: 'Loom', industry: 'SaaS', platform: 'YouTube', format: 'Video',
    angle: 'Educational', score: 86, estCtr: '2.2%', estRoas: '5.4×',
    hook: '"Stop writing emails. Do this instead." — Screen recording starts immediately.',
    why: 'Pattern interrupt + immediate demo. No talking head. Shows, doesn\'t tell. Clear CTA at 25s.',
    emoji: '🎬', tags: ['Demo-first', 'YouTube', 'Screen recording'],
  },
  {
    id: 'ad-8', brand: 'Allbirds', industry: 'Fashion', platform: 'Instagram', format: 'Static',
    angle: 'Aspirational / Lifestyle',  score: 77, estCtr: '2.8%', estRoas: '3.4×',
    hook: '"Made from trees. Made for humans."',
    why: 'Eco-credentials lead without preaching. Lifestyle photo — actual humans, not models. Earthy palette matches brand values.',
    emoji: '🌿', tags: ['Eco', 'Lifestyle', 'Clean copy'],
  },
  {
    id: 'ad-9', brand: 'Duolingo', industry: 'Education', platform: 'TikTok', format: 'Video',
    angle: 'Humorous', score: 93, estCtr: '5.2%', estRoas: '—',
    hook: 'Duo the owl dramatically chasing the user. Zero context. Pure chaos.',
    why: 'Leans into meme culture. Brand character is the hero. Awareness play — doesn\'t need conversion hooks.',
    emoji: '🦉', tags: ['Meme', 'Brand character', 'Awareness'],
  },
  {
    id: 'ad-10', brand: 'Hims', industry: 'Health & Wellness', platform: 'Meta', format: 'Video',
    angle: 'Direct / Product-first', score: 85, estCtr: '3.3%', estRoas: '4.7×',
    hook: '"Hair loss is treatable. We just don\'t talk about it."',
    why: 'Taboo-breaking hook with empathy. No shame framing. Doctor social proof at 8s. Strong DTC structure.',
    emoji: '💊', tags: ['Taboo-breaking', 'Empathy', 'Doctor proof'],
  },
  {
    id: 'ad-11', brand: 'Figma', industry: 'SaaS', platform: 'LinkedIn', format: 'Video',
    angle: 'Educational', score: 80, estCtr: '0.8%', estRoas: '7.2×',
    hook: '"Your design team ships 3× faster with this one workflow change."',
    why: 'ROI quantified in headline. Speaks to the buyer (PM / team lead), not just the user. Demo shows the feature in 12s.',
    emoji: '🎨', tags: ['ROI-led', 'B2B', 'Workflow'],
  },
  {
    id: 'ad-12', brand: 'Calm', industry: 'Health & Wellness', platform: 'YouTube', format: 'Video',
    angle: 'Emotional / Story', score: 89, estCtr: '2.9%', estRoas: '4.3×',
    hook: 'Opens with 3 seconds of silence over a natural scene. No music. No voiceover.',
    why: 'The silence IS the hook — disruptive in a noisy feed. Instantly communicates the product\'s purpose without saying a word.',
    emoji: '🌊', tags: ['Silence hook', 'Nature', 'Emotional'],
  },
];

const ANGLES  = ['All', 'Lifestyle / Aspirational', 'Urgency / Scarcity', 'Educational', 'Humorous', 'Emotional / Story', 'Direct / Product-first'];
const FORMATS = ['All', 'Video', 'Static', 'Carousel'];
const PLATFORMS = ['All', 'Meta', 'TikTok', 'LinkedIn', 'YouTube', 'Google Display', 'Instagram'];
const INDUSTRIES = ['All', 'DTC / E-commerce', 'SaaS', 'Health & Wellness', 'Fashion', 'Finance / Fintech', 'Education', 'Food & Beverage'];

function scoreColor(s) {
  return s >= 85 ? '#34D399' : s >= 70 ? '#F59E0B' : '#F87171';
}

/* ------------------------------------------------------------------ */
/* Detail side panel                                                    */
/* ------------------------------------------------------------------ */
function AdDetail({ ad, onClose, saved, onSave }) {
  const [copied, setCopied] = useState(false);
  const c = scoreColor(ad.score);
  const copy = () => {
    navigator.clipboard.writeText(`Hook: ${ad.hook}\n\nWhy it works: ${ad.why}\n\nTags: ${ad.tags.join(', ')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25 }}
      className="fixed right-0 top-0 h-full w-[400px] bg-bg-surface border-l border-border-default shadow-modal overflow-y-auto z-40"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{ad.emoji}</div>
            <div>
              <p className="font-semibold text-ink-primary">{ad.brand}</p>
              <p className="text-xs text-ink-muted">{ad.industry} · {ad.platform}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button onClick={copy} className="btn-ghost p-2">
              {copied ? <CheckCircle size={15} className="text-success" /> : <Copy size={15} />}
            </button>
            <button onClick={() => onSave(ad.id)} className="btn-ghost p-2">
              {saved ? <BookmarkCheck size={15} className="text-accent" /> : <Bookmark size={15} />}
            </button>
            <button onClick={onClose} className="btn-ghost p-2"><X size={15} /></button>
          </div>
        </div>

        {/* Score + stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="surface p-3 rounded-xl text-center">
            <div className="font-mono text-xl font-bold mb-0.5" style={{ color: c }}>{ad.score}</div>
            <div className="text-xs text-ink-muted">Score</div>
          </div>
          <div className="surface p-3 rounded-xl text-center">
            <div className="font-mono text-xl font-bold text-ink-primary mb-0.5">{ad.estCtr}</div>
            <div className="text-xs text-ink-muted">Est. CTR</div>
          </div>
          <div className="surface p-3 rounded-xl text-center">
            <div className="font-mono text-xl font-bold text-ink-primary mb-0.5">{ad.estRoas}</div>
            <div className="text-xs text-ink-muted">Est. ROAS</div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="badge badge-secondary">{ad.format}</span>
          <span className="badge badge-primary">{ad.angle}</span>
          {ad.tags.map((t) => <span key={t} className="badge badge-muted">{t}</span>)}
        </div>

        {/* Hook */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">The Hook</p>
          <div className="ai-card p-4 rounded-xl">
            <p className="text-sm text-ink-primary font-medium leading-relaxed italic">"{ad.hook}"</p>
          </div>
        </div>

        {/* Why it works */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Why It Works</p>
          <p className="text-sm text-ink-secondary leading-relaxed">{ad.why}</p>
        </div>

        {/* Steal this */}
        <div className="surface rounded-xl p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-2">Steal This</p>
          <p className="text-xs text-ink-muted leading-relaxed">
            Apply this pattern to your own product. Use the{' '}
            <a href="/brief-generator" className="text-primary hover:underline">Brief Generator</a>{' '}
            with "{ad.angle}" as your angle to get a full brief based on this approach.
          </p>
          <a href="/brief-generator" className="btn-primary btn-sm mt-3 w-full justify-center">
            <Sparkles size={13} />
            Use this angle in Brief Generator
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Ad card                                                              */
/* ------------------------------------------------------------------ */
function AdCard({ ad, onSelect, saved, onSave }) {
  const c = scoreColor(ad.score);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="surface rounded-2xl overflow-hidden hover:border-border-strong hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(ad)}
    >
      {/* Thumbnail */}
      <div className="relative h-32 bg-bg-elevated flex items-center justify-center">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{ad.emoji}</span>
        <div className="absolute top-2.5 right-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
            style={{ background: `${c}20`, color: c, border: `1px solid ${c}35` }}
          >
            {ad.score}
          </div>
        </div>
        <button
          className="absolute top-2.5 left-2.5 p-1.5 rounded-lg bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onSave(ad.id); }}
        >
          {saved ? <BookmarkCheck size={14} className="text-accent" /> : <Bookmark size={14} className="text-ink-muted" />}
        </button>
        <div className="absolute bottom-2 left-2.5 flex gap-1">
          <span className="badge badge-muted text-[9px] px-1.5">{ad.format}</span>
          <span className="badge badge-muted text-[9px] px-1.5">{ad.platform}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-ink-primary">{ad.brand}</p>
          <span className="text-xs text-ink-muted">{ad.industry}</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2 mb-3">
          <span className="text-primary font-medium">Hook:</span> {ad.hook}
        </p>
        <div className="flex flex-wrap gap-1">
          {ad.tags.slice(0, 2).map((t) => (
            <span key={t} className="badge badge-muted text-[9px] px-1.5">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function AdLibraryPage() {
  const [search, setSearch]     = useState('');
  const [angle, setAngle]       = useState('All');
  const [format, setFormat]     = useState('All');
  const [platform, setPlatform] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved]       = useState(new Set());
  const [showSaved, setShowSaved] = useState(false);

  const toggleSave = (id) => setSaved((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const filtered = useMemo(() => {
    return AD_LIBRARY.filter((ad) => {
      const matchSearch = search === '' ||
        ad.brand.toLowerCase().includes(search.toLowerCase()) ||
        ad.hook.toLowerCase().includes(search.toLowerCase()) ||
        ad.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchAngle    = angle    === 'All' || ad.angle    === angle;
      const matchFormat   = format   === 'All' || ad.format   === format;
      const matchPlatform = platform === 'All' || ad.platform === platform;
      const matchIndustry = industry === 'All' || ad.industry === industry;
      const matchSaved    = !showSaved || saved.has(ad.id);
      return matchSearch && matchAngle && matchFormat && matchPlatform && matchIndustry && matchSaved;
    });
  }, [search, angle, format, platform, industry, saved, showSaved]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Ad Swipe Library" subtitle="12 high-scoring real ads — study what works, steal the pattern" />

      <main className="flex-1 overflow-hidden flex flex-col px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48 max-w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search brand, hook, tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 h-9 text-sm"
            />
          </div>

          {[
            { label: 'Angle', opts: ANGLES, val: angle, set: setAngle },
            { label: 'Format', opts: FORMATS, val: format, set: setFormat },
            { label: 'Platform', opts: PLATFORMS, val: platform, set: setPlatform },
            { label: 'Industry', opts: INDUSTRIES, val: industry, set: setIndustry },
          ].map((f) => (
            <div key={f.label} className="relative">
              <select
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                className="input h-9 text-sm pr-8 appearance-none cursor-pointer min-w-32"
              >
                {f.opts.map((o) => <option key={o} value={o}>{o === 'All' ? `All ${f.label}s` : o}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
            </div>
          ))}

          <button
            onClick={() => setShowSaved((v) => !v)}
            className={`flex items-center gap-1.5 px-3 h-9 rounded-lg border text-sm font-medium transition-all ${
              showSaved
                ? 'bg-accent/15 border-accent/30 text-accent'
                : 'surface text-ink-secondary hover:text-ink-primary border-border-default'
            }`}
          >
            <Bookmark size={13} />
            Saved ({saved.size})
          </button>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-ink-muted">{filtered.length} ads</p>
          <p className="text-xs text-ink-muted hidden md:block">Click any ad to see the breakdown + steal the hook</p>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <span className="text-4xl mb-3">🔍</span>
              <p className="text-ink-primary font-semibold">No ads match</p>
              <p className="text-sm text-ink-muted">Try clearing filters</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filtered.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onSelect={setSelected}
                    saved={saved.has(ad.id)}
                    onSave={toggleSave}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <AdDetail
            ad={selected}
            onClose={() => setSelected(null)}
            saved={saved.has(selected.id)}
            onSave={toggleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
