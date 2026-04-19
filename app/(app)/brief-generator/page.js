'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Sparkles, FileText, Copy, Download, RefreshCw, ChevronDown,
  CheckCircle, Target, Users, Zap, BarChart3, ArrowRight,
  Lightbulb, MessageSquare, Play, Image, Clock, Globe,
} from 'lucide-react';
import TopBar from '../../../components/app/TopBar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */
const PLATFORMS  = ['Meta (Facebook/Instagram)', 'TikTok', 'Google Display', 'YouTube', 'LinkedIn', 'Pinterest'];
const FORMATS    = ['Short video (≤15s)', 'Long video (16–60s)', 'Static image', 'Carousel', 'Story / Reel', 'UGC style'];
const TONES      = ['Urgent / Scarcity', 'Aspirational / Lifestyle', 'Educational', 'Humorous', 'Emotional / Story', 'Direct / Product-first'];
const GOALS      = ['Drive purchases', 'Generate leads', 'Build brand awareness', 'Retarget warm audience', 'App installs', 'Newsletter signups'];
const INDUSTRIES = ['DTC / E-commerce', 'SaaS / Software', 'Finance / Fintech', 'Health & Wellness', 'Fashion / Apparel', 'Food & Beverage', 'Real Estate', 'Education', 'Travel', 'B2B Services'];

/* ------------------------------------------------------------------ */
/* Field components                                                     */
/* ------------------------------------------------------------------ */
function SelectField({ label, options, value, onChange, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input appearance-none pr-8 cursor-pointer"
        >
          <option value="">Select {label.toLowerCase()}…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
      </div>
    </div>
  );
}

function TextAreaField({ label, placeholder, value, onChange, rows = 3, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="input resize-none"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brief output sections                                                */
/* ------------------------------------------------------------------ */
function BriefSection({ title, content, accent }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(typeof content === 'string' ? content : content.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="surface rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{title}</h3>
        <button onClick={copy} className="btn-ghost p-1.5 text-xs gap-1">
          {copied ? <CheckCircle size={12} className="text-success" /> : <Copy size={12} />}
        </button>
      </div>
      {Array.isArray(content) ? (
        <ul className="flex flex-col gap-2">
          {content.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
              <span className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: `${accent}18`, color: accent }}>{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-secondary leading-relaxed">{content}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback local brief builder (when backend unavailable)              */
/* ------------------------------------------------------------------ */
function buildLocalBrief(form) {
  const product = form.product || 'your product';
  const audience = form.audience || 'your target audience';
  const platform = form.platform || 'Meta';
  const format = form.format || 'Short video';
  const tone = form.tone || 'Direct';
  const goal = form.goal || 'Drive purchases';
  const usp = form.usp || 'key benefit';

  return {
    objective: `Drive ${goal.toLowerCase()} for ${product} on ${platform} using ${format.toLowerCase()} with a ${tone.toLowerCase()} approach. Primary audience: ${audience}.`,
    hooks: [
      `"You've been doing [problem] wrong — here's the fix." (pattern interrupt)`,
      `Open with the end result: show ${audience} the transformation in the first 2 seconds.`,
      `Lead with a bold claim: "The only [product category] that [usp]."`,
    ],
    script: format.includes('video')
      ? [
          `0–3s: Hook — Show the problem or the result immediately. No logo. No brand intro.`,
          `3–8s: Agitate or demonstrate — Make the viewer feel the pain OR show the product in action.`,
          `8–12s: Proof — One data point, testimonial snippet, or before/after.`,
          `12–15s: CTA — Clear, single action. "${goal === 'Drive purchases' ? 'Shop now — limited stock' : 'Sign up free today'}."`,
        ]
      : [
          `Headline: Bold, benefit-led. Max 6 words. e.g. "Finally, [usp] that actually works."`,
          `Visual: ${tone.includes('Lifestyle') ? 'Aspirational lifestyle shot — real people, natural light' : 'Clean product-hero shot against contrasting background'}.`,
          `Body copy: One sentence of proof or social signal. e.g. "Trusted by 10,000+ [audience]."`,
          `CTA button: "${goal === 'Drive purchases' ? 'Shop now' : goal === 'Generate leads' ? 'Get started free' : 'Learn more'}" — high contrast, bottom right.`,
        ],
    ctaOptions: [
      goal === 'Drive purchases'  ? 'Shop now — offer ends Sunday' : '',
      goal === 'Generate leads'   ? 'Get your free analysis' : '',
      goal === 'Build brand awareness' ? 'See why 50K+ teams choose us' : '',
      'Start your free trial',
      'Claim your spot',
      'See it in action →',
    ].filter(Boolean).slice(0, 4),
    audienceNotes: `Target ${audience} on ${platform}. ${platform.includes('TikTok') ? 'Prioritise sound-on viewing — strong audio hook in first 1s.' : platform.includes('LinkedIn') ? 'Lead with professional ROI framing. Avoid hype language.' : 'Test both broad and interest-stacked audiences. Lookalikes from purchasers recommended.'} Estimated best-performing age bracket for ${tone.toLowerCase()} messaging: 25–44.`,
    dos: [
      `Show ${usp || 'the core benefit'} visually — don't just say it.`,
      `Use captions — ${platform.includes('Meta') || platform.includes('TikTok') ? '85%' : '60%'} of viewers watch without sound.`,
      `Keep brand logo subtle until 3s+ in — hooks first.`,
      `Use real people / faces — triggers higher emotional engagement scores.`,
    ],
    donts: [
      'Don\'t open with your company name or logo — 80% of viewers drop before 3s.',
      'Avoid stock-photo aesthetics — authenticity outperforms polish on most platforms.',
      `Don't use more than one CTA — decision paralysis kills conversion.`,
      'Avoid passive voice in headlines — active verbs convert better.',
    ],
    kpis: [
      `Target CTR: ${platform.includes('TikTok') ? '1.5–3%' : platform.includes('LinkedIn') ? '0.4–0.8%' : '2–4%'}`,
      `Hook rate (3s view through): >40%`,
      `Creative Score benchmark for this format: >72`,
      `Fatigue threshold: retire if CTR drops >30% week-over-week`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Score estimator chip                                                  */
/* ------------------------------------------------------------------ */
function PredictedScore({ form }) {
  const score = Math.min(95, Math.max(52,
    60 +
    (form.product ? 4 : 0) +
    (form.audience ? 4 : 0) +
    (form.usp ? 5 : 0) +
    (form.platform ? 3 : 0) +
    (form.format ? 3 : 0) +
    (form.tone ? 3 : 0) +
    (form.goal ? 3 : 0) +
    (form.competitors ? 5 : 0) +
    (form.extra ? 5 : 0)
  ));
  const color = score >= 80 ? '#34D399' : score >= 65 ? '#F59E0B' : '#F87171';
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: `${color}12`, border: `1px solid ${color}28` }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-xs font-semibold" style={{ color }}>Predicted score: {score}/100</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function BriefGeneratorPage() {
  const [form, setForm] = useState({
    product: '', audience: '', usp: '', platform: '',
    format: '', tone: '', goal: '', industry: '',
    competitors: '', extra: '',
  });
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const filled = Object.values(form).filter(Boolean).length;
  const canGenerate = form.product && form.audience && form.goal && form.platform;

  const generate = async () => {
    setLoading(true);
    setError(null);
    setBrief(null);

    const prompt = `You are an expert performance marketing creative strategist. Generate a comprehensive ad creative brief in JSON format.

Product/Service: ${form.product}
Target Audience: ${form.audience}
Unique Selling Point: ${form.usp || 'Not specified'}
Platform: ${form.platform}
Format: ${form.format || 'Not specified'}
Tone/Angle: ${form.tone || 'Not specified'}
Campaign Goal: ${form.goal}
Industry: ${form.industry || 'General'}
Competitors to beat: ${form.competitors || 'Not specified'}
Additional context: ${form.extra || 'None'}

Return ONLY valid JSON with this exact structure:
{
  "objective": "one paragraph campaign objective",
  "hooks": ["hook 1", "hook 2", "hook 3"],
  "script": ["scene/element 1", "scene/element 2", "scene/element 3", "scene/element 4"],
  "ctaOptions": ["cta 1", "cta 2", "cta 3", "cta 4"],
  "audienceNotes": "paragraph on audience targeting strategy",
  "dos": ["do 1", "do 2", "do 3", "do 4"],
  "donts": ["dont 1", "dont 2", "dont 3", "dont 4"],
  "kpis": ["kpi 1", "kpi 2", "kpi 3", "kpi 4"]
}`;

    try {
      const res = await axios.post(`${API_URL}/api/gemini/ask`, { prompt }, { timeout: 30000 });
      const raw = res.data?.reply || res.data?.text || '';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setBrief(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error('Could not parse AI response');
      }
    } catch (err) {
      // Fallback to local generation
      setBrief(buildLocalBrief(form));
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!brief) return;
    const text = [
      `CAMPAIGN OBJECTIVE\n${brief.objective}`,
      `\nHOOK OPTIONS\n${brief.hooks.join('\n')}`,
      `\nSCRIPT / STRUCTURE\n${brief.script.join('\n')}`,
      `\nCTA OPTIONS\n${brief.ctaOptions.join('\n')}`,
      `\nAUDIENCE NOTES\n${brief.audienceNotes}`,
      `\nDOS\n${brief.dos.join('\n')}`,
      `\nDON'TS\n${brief.donts.join('\n')}`,
      `\nKPIs TO TRACK\n${brief.kpis.join('\n')}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ACCENT_COLORS = ['#C084FC', '#60A5FA', '#F59E0B', '#34D399', '#F87171', '#A78BFA', '#FB923C', '#34D399'];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="AI Brief Generator" subtitle="Turn your goal into a performance-ready creative brief in seconds" />

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className={`grid gap-8 ${brief ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-3xl mx-auto'}`}>

            {/* ── Input panel ── */}
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-semibold text-lg text-ink-primary">Brief inputs</h2>
                  <p className="text-xs text-ink-muted mt-0.5">{filled}/10 fields filled · more = better brief</p>
                </div>
                <PredictedScore form={form} />
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-brand"
                  animate={{ width: `${(filled / 10) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Form fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Product / Service"
                    placeholder="e.g. AdMind — AI creative scoring tool for performance marketers"
                    value={form.product}
                    onChange={set('product')}
                    rows={2}
                    icon={Zap}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Target Audience"
                    placeholder="e.g. DTC founders, 25–45, running $5K–$50K/mo on Meta ads"
                    value={form.audience}
                    onChange={set('audience')}
                    rows={2}
                    icon={Users}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Unique Selling Point (USP)"
                    placeholder="e.g. Only tool that predicts creative fatigue before you spend"
                    value={form.usp}
                    onChange={set('usp')}
                    rows={2}
                    icon={Target}
                  />
                </div>
                <SelectField label="Campaign Goal" options={GOALS} value={form.goal} onChange={set('goal')} icon={BarChart3} />
                <SelectField label="Platform" options={PLATFORMS} value={form.platform} onChange={set('platform')} icon={Globe} />
                <SelectField label="Creative Format" options={FORMATS} value={form.format} onChange={set('format')} icon={Play} />
                <SelectField label="Tone / Angle" options={TONES} value={form.tone} onChange={set('tone')} icon={MessageSquare} />
                <SelectField label="Industry" options={INDUSTRIES} value={form.industry} onChange={set('industry')} icon={Globe} />
                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Competitors to beat (optional)"
                    placeholder="e.g. Foreplay, Motion.ai, Triple Whale — what they do well"
                    value={form.competitors}
                    onChange={set('competitors')}
                    rows={2}
                    icon={BarChart3}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextAreaField
                    label="Extra context (optional)"
                    placeholder="e.g. Launching for Black Friday, hero image already shot, $10K budget"
                    value={form.extra}
                    onChange={set('extra')}
                    rows={2}
                    icon={Lightbulb}
                  />
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={generate}
                disabled={!canGenerate || loading}
                className="btn-primary btn-lg justify-center shadow-glow-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <RefreshCw size={16} />
                    </motion.div>
                    AI is writing your brief…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate creative brief
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              {!canGenerate && (
                <p className="text-xs text-ink-muted text-center -mt-2">
                  Fill in Product, Audience, Goal, and Platform to generate
                </p>
              )}
            </div>

            {/* ── Brief output ── */}
            <AnimatePresence>
              {brief && (
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4"
                >
                  {/* Brief header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="ai-orb">
                        <Sparkles size={14} className="text-white" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-lg text-ink-primary">Your Creative Brief</h2>
                        <p className="text-xs text-ink-muted">AI-generated · ready to brief your team</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={generate} className="btn-ghost btn-sm gap-1.5" title="Regenerate">
                        <RefreshCw size={13} />
                        Retry
                      </button>
                      <button onClick={copyAll} className="btn-secondary btn-sm gap-1.5">
                        {copied ? <CheckCircle size={13} className="text-success" /> : <Copy size={13} />}
                        {copied ? 'Copied!' : 'Copy all'}
                      </button>
                    </div>
                  </div>

                  {/* Sections */}
                  <BriefSection title="Campaign Objective" content={brief.objective} accent={ACCENT_COLORS[0]} />
                  <BriefSection title="Hook Options (test all 3)" content={brief.hooks} accent={ACCENT_COLORS[1]} />
                  <BriefSection title="Script / Visual Structure" content={brief.script} accent={ACCENT_COLORS[2]} />
                  <BriefSection title="CTA Variants" content={brief.ctaOptions} accent={ACCENT_COLORS[3]} />
                  <BriefSection title="Audience & Targeting Notes" content={brief.audienceNotes} accent={ACCENT_COLORS[4]} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <BriefSection title="Creative Dos" content={brief.dos} accent={ACCENT_COLORS[3]} />
                    <BriefSection title="Creative Don'ts" content={brief.donts} accent={ACCENT_COLORS[4]} />
                  </div>

                  <BriefSection title="KPIs to Track" content={brief.kpis} accent={ACCENT_COLORS[6]} />

                  {/* Footer tip */}
                  <div className="ai-card rounded-xl p-4 flex items-start gap-3">
                    <Lightbulb size={15} className="text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      <span className="font-semibold text-accent">Pro tip:</span> Upload your finished creative to the{' '}
                      <a href="/creative-library" className="text-primary hover:underline">Creative Library</a>{' '}
                      after production to get an AI score and heatmap before launch.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
    </div>
  );
}
