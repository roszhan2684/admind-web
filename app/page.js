'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Brain, Zap, TrendingUp, Eye, Shield, BarChart3, ArrowRight,
  CheckCircle, ChevronDown, Menu, X, Sparkles, Target, Users,
  Play, Star, AlertTriangle, Lock, Globe, Cpu, LineChart,
  MessageSquare, Layers, RefreshCw, Clock, Award, ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Scroll-triggered FadeUp wrapper                                     */
/* ------------------------------------------------------------------ */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Product', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'For teams', href: '#personas' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong border-b border-border-subtle' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow-primary">
            <Brain className="w-4.5 h-4.5 text-white" size={18} />
          </div>
          <span className="font-display font-bold text-lg text-ink-primary tracking-tight">AdMind</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-2 text-sm text-ink-secondary hover:text-ink-primary transition-colors rounded-md hover:bg-bg-elevated"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
          <Link href="/login" className="btn-primary btn-sm">
            Start free trial
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden btn-ghost p-2"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border-subtle px-6 pb-6"
          >
            <div className="pt-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-ink-secondary hover:text-ink-primary"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/login" className="btn-secondary text-center">Sign in</Link>
                <Link href="/login" className="btn-primary justify-center">Start free trial</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* App Preview (hero browser mockup)                                   */
/* ------------------------------------------------------------------ */
function AppPreview() {
  const metrics = [
    { label: 'Creative Score', value: '8.4', delta: '+12%', color: '#C084FC' },
    { label: 'CTR', value: '3.2%', delta: '+0.8%', color: '#F59E0B' },
    { label: 'ROAS', value: '4.1×', delta: '+0.6×', color: '#60A5FA' },
    { label: 'Fatigue Risk', value: '18%', delta: '-9%', color: '#F5B942' },
  ];
  const actions = [
    { icon: '⚡', text: 'Pause "Summer Sale" — fatigue at 84%', priority: 'critical' },
    { icon: '🎯', text: 'Launch UGC variant for 35–44 segment', priority: 'high' },
    { icon: '📊', text: 'Scale "Product Demo" — ROAS 5.2×', priority: 'high' },
  ];
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-modal border border-border-default">
      {/* Browser chrome */}
      <div className="bg-bg-elevated px-4 py-2.5 flex items-center gap-2 border-b border-border-subtle">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-danger/70" />
          <div className="w-3 h-3 rounded-full bg-warning/70" />
          <div className="w-3 h-3 rounded-full bg-success/70" />
        </div>
        <div className="flex-1 mx-3 bg-bg-overlay rounded-md px-3 py-1 text-xs text-ink-muted font-mono">
          app.admind.ai/dashboard
        </div>
      </div>

      {/* App shell */}
      <div className="bg-bg-surface flex" style={{ height: 340 }}>
        {/* Mini sidebar */}
        <div className="w-10 bg-bg-primary border-r border-border-subtle flex flex-col items-center py-3 gap-3">
          <div className="w-5 h-5 rounded bg-gradient-brand opacity-90" />
          {[BarChart3, Brain, Eye, Target, Users].map((Icon, i) => (
            <div
              key={i}
              className={`w-6 h-6 flex items-center justify-center rounded ${
                i === 0 ? 'bg-primary/20 text-primary' : 'text-ink-muted'
              }`}
            >
              <Icon size={12} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden p-4">
          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {metrics.map((m) => (
              <div key={m.label} className="surface p-2.5 rounded-lg">
                <div className="text-xs text-ink-muted mb-1">{m.label}</div>
                <div className="font-mono text-sm font-bold text-ink-primary">{m.value}</div>
                <div className="text-xs mt-0.5" style={{ color: m.color }}>{m.delta}</div>
              </div>
            ))}
          </div>

          {/* AI Actions */}
          <div className="ai-card p-3 rounded-lg mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-brand flex items-center justify-center">
                <Sparkles size={9} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-ink-primary">AI Next Best Actions</span>
              <span className="badge badge-primary ml-auto text-[9px] px-1.5">3 urgent</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {actions.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-bg-elevated/60 text-xs text-ink-secondary"
                >
                  <span>{a.icon}</span>
                  <span className="truncate">{a.text}</span>
                  <span
                    className={`ml-auto shrink-0 text-[9px] font-bold px-1 py-0.5 rounded ${
                      a.priority === 'critical'
                        ? 'bg-danger/20 text-danger'
                        : 'bg-warning/20 text-warning'
                    }`}
                  >
                    {a.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini chart placeholder */}
          <div className="surface p-2.5 rounded-lg flex items-end gap-1 h-12 overflow-hidden">
            {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: `rgba(192,132,252,${0.3 + i * 0.05})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-60 -left-60 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[100px]" />
        <div className="absolute top-60 -right-60 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[100px]" />
      </div>

      <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <span className="section-label">
            <Sparkles size={11} />
            AI-Powered Creative Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-xl mb-6 max-w-5xl mx-auto"
        >
          The{' '}
          <span className="gradient-text">Decision OS</span>
          <br />
          for Modern Marketing
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-ink-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AdMind turns your ad data into competitive clarity and confident decisions.
          Creative scoring, competitor monitoring, and AI next-best-actions — in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
        >
          <Link href="/login" className="btn-primary btn-lg shadow-glow-primary">
            Start for free — no card needed
            <ArrowRight size={16} />
          </Link>
          <a href="#features" className="btn-secondary btn-lg">
            <Play size={14} />
            See how it works
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-ink-muted mb-16"
        >
          Trusted by 200+ performance teams · Free 14-day trial · Cancel anytime
        </motion.p>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
          style={{
            filter: 'drop-shadow(0 48px 96px rgba(0,0,0,0.6))',
          }}
        >
          <AppPreview />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ink-muted">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-ink-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social proof strip                                                   */
/* ------------------------------------------------------------------ */
function SocialProof() {
  const logos = ['Ogilvy', 'Dentsu', 'Havas', 'Monks', 'TBWA', 'GroupM', 'Publicis', 'Omnicom'];
  return (
    <section className="py-12 border-y border-border-subtle overflow-hidden bg-bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-semibold text-ink-muted tracking-widest uppercase">
          Trusted by teams at
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          {[...logos, ...logos].map((l, i) => (
            <span key={i} className="text-ink-muted font-display font-semibold text-lg opacity-40 whitespace-nowrap">
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Problem Section                                                      */
/* ------------------------------------------------------------------ */
function ProblemSection() {
  const pains = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'You\'re flying blind on creative',
      desc: 'Ad performance data is scattered across Meta, TikTok, Google — and none of it tells you *why* a creative works or when it\'s dying.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Competitors move faster than you can watch',
      desc: 'By the time you notice a rival\'s winning angle, they\'ve already captured the narrative. You\'re always a week behind.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Decisions take too long',
      desc: 'Hours in spreadsheets. Endless stakeholder syncs. Gut-feel calls that don\'t scale. Your team can\'t move at the speed the market demands.',
    },
  ];
  return (
    <section className="py-24 px-6" id="problem">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <AlertTriangle size={11} />
            The Problem
          </span>
          <h2 className="text-display-lg mt-4">
            Marketing is drowning in data<br />
            <span className="gradient-text-teal">and starving for decisions</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="surface p-8 h-full group hover:border-border-strong transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger mb-5">
                  {p.icon}
                </div>
                <h3 className="font-display font-semibold text-lg text-ink-primary mb-3">{p.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features Section                                                     */
/* ------------------------------------------------------------------ */
function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      color: '#C084FC',
      tag: 'Creative Intelligence',
      title: 'Know exactly why your ads win or lose',
      desc: 'AdMind scores every creative on emotion, composition, fatigue, and message clarity. No more guessing — get a number you can act on.',
      bullets: ['Multi-modal AI scoring (image + video)', 'Frame-by-frame heatmaps', 'Fatigue detection & decay curves'],
    },
    {
      icon: Eye,
      color: '#F59E0B',
      tag: 'Competitor Intelligence',
      title: 'Track rivals before their ads land',
      desc: 'Monitor competitor creative strategy in real time. See angle shifts, budget signals, and narrative plays before they dominate your category.',
      bullets: ['Narrative shift detection', 'Creative angle classification', 'Spend signal modeling'],
    },
    {
      icon: Zap,
      color: '#60A5FA',
      tag: 'AI Decision Engine',
      title: 'AI tells you exactly what to do next',
      desc: 'AdMind\'s Decision Engine synthesizes all signals into a prioritized action queue. No more meetings to decide what to test.',
      bullets: ['Priority-ranked action queue', 'Confidence scores + rationale', 'One-click brief generation'],
    },
    {
      icon: Layers,
      color: '#F5B942',
      tag: 'Creative Genome',
      title: 'Map your creative DNA',
      desc: 'Cluster your ads by visual + narrative patterns. Spot what\'s overused, what\'s underexplored, and where your next winner hides.',
      bullets: ['Semantic creative clustering', 'Pattern gap analysis', 'Portfolio heat maps'],
    },
    {
      icon: BarChart3,
      color: '#22C55E',
      tag: 'Performance Analytics',
      title: 'Platform-agnostic performance truth',
      desc: 'Unified metrics across Meta, TikTok, Google, and YouTube. One source of truth, zero tab-switching, instant cross-platform insights.',
      bullets: ['Cross-platform ROAS normalization', 'Cohort attribution', 'Custom metric builder'],
    },
    {
      icon: Shield,
      color: '#EF5F67',
      tag: 'Brand Safety',
      title: 'Never publish an off-brand ad again',
      desc: 'Pre-flight checks on every creative: brand compliance, regulatory flags, and tone scoring — all before you spend a dollar.',
      bullets: ['Brand voice scoring', 'Regulatory red-flag detection', 'Auto-flagging for review'],
    },
  ];

  return (
    <section className="py-24 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <Sparkles size={11} />
            Product
          </span>
          <h2 className="text-display-lg mt-4">
            Everything your team needs to<br />
            <span className="gradient-text">win the creative arms race</span>
          </h2>
          <p className="text-ink-secondary mt-4 max-w-xl mx-auto">
            Six interconnected modules. One unified intelligence layer.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="surface p-7 h-full group hover:border-border-strong hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                  >
                    <f.icon size={18} style={{ color: f.color }} />
                  </div>
                  <span
                    className="text-xs font-bold tracking-wide uppercase"
                    style={{ color: f.color }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base text-ink-primary mb-2">{f.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed mb-4">{f.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {f.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-ink-muted">
                      <CheckCircle size={12} style={{ color: f.color, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How It Works                                                         */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: RefreshCw,
      title: 'Connect your ad accounts',
      desc: 'One-click integrations with Meta, TikTok, Google, and YouTube. AdMind ingests your creative library and performance data automatically.',
    },
    {
      num: '02',
      icon: Cpu,
      title: 'AI analyzes everything',
      desc: 'Our multimodal models score every creative, track competitor movements, and synthesize cross-platform signals into a unified intelligence feed.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Act on what matters',
      desc: 'The Decision Engine surfaces your next best actions with confidence scores and rationale. Brief your team, launch tests, or automate responses — all in AdMind.',
    },
  ];

  return (
    <section className="py-24 px-6 bg-bg-surface/40 border-y border-border-subtle" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <Play size={11} />
            How It Works
          </span>
          <h2 className="text-display-lg mt-4">
            From raw ad data to<br />
            <span className="gradient-text">decisive action in minutes</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />

          {steps.map((s, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow-primary mx-auto">
                    <s.icon size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-bg-elevated border border-border-strong flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-primary">{s.num}</span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink-primary mb-3">{s.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Personas (tabs)                                                      */
/* ------------------------------------------------------------------ */
function PersonasSection() {
  const [active, setActive] = useState(0);
  const personas = [
    {
      label: 'Founders',
      icon: Award,
      headline: 'Make every ad dollar count',
      body: 'You don\'t have time for gut-feel. AdMind gives solo founders and lean teams the same creative intelligence as enterprise agencies — at a fraction of the cost.',
      bullets: ['Know which creative drives CAC down before you scale', 'Monitor competitors without hiring an analyst', 'Automated weekly reports for your investor deck'],
      stat: { value: '3.2×', label: 'average ROAS improvement' },
    },
    {
      label: 'Performance',
      icon: TrendingUp,
      headline: 'Optimize at the speed of the algorithm',
      body: 'Performance marketers need signal, not noise. AdMind surfaces fatigue alerts, angle gaps, and winning variants before the platform data catches up.',
      bullets: ['Catch creative fatigue 4 days before CPA spikes', 'Frame-level heatmaps for video iteration', 'Automated brief generation from winning signals'],
      stat: { value: '47%', label: 'reduction in creative iteration cycles' },
    },
    {
      label: 'Agencies',
      icon: Users,
      headline: 'Deliver smarter briefs, win more pitches',
      body: 'Impress clients with real competitive intelligence. AdMind gives your strategy team ammunition that goes beyond "we saw this ad on Facebook."',
      bullets: ['Competitive landscape decks, auto-generated', 'White-label reporting for every client', 'Cross-client pattern discovery'],
      stat: { value: '2.8×', label: 'faster brief-to-launch cycles' },
    },
    {
      label: 'Brand Teams',
      icon: Globe,
      headline: 'Protect the brand. Accelerate the message.',
      body: 'Brand consistency and performance don\'t have to fight each other. AdMind ensures every ad passes brand safety checks and drives business results.',
      bullets: ['Pre-flight brand compliance scoring', 'Tone and sentiment alignment', 'Global market competitive monitoring'],
      stat: { value: '91%', label: 'brand compliance rate' },
    },
  ];
  const p = personas[active];
  return (
    <section className="py-24 px-6" id="personas">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-12">
          <span className="section-label mb-4 inline-flex">
            <Users size={11} />
            Built for every role
          </span>
          <h2 className="text-display-lg mt-4">
            One platform. Every marketing team.
          </h2>
        </FadeUp>

        {/* Tab pills */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 surface rounded-xl">
            {personas.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === i
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <h3 className="text-display-md mb-4">{p.headline}</h3>
              <p className="text-ink-secondary leading-relaxed mb-6">{p.body}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="btn-primary inline-flex">
                Start free trial
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="surface-elevated p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-64">
              <p className="font-mono text-6xl font-bold gradient-text mb-2">{p.stat.value}</p>
              <p className="text-ink-secondary text-sm max-w-48">{p.stat.label}</p>
              <div className="mt-6 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="text-warning fill-warning" />
                ))}
              </div>
              <p className="text-xs text-ink-muted mt-2">Based on 200+ team results</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust / Security                                                     */
/* ------------------------------------------------------------------ */
function TrustSection() {
  const pillars = [
    { icon: Lock, title: 'SOC 2 Type II', desc: 'Independently audited. Your data is never used to train our models.' },
    { icon: Globe, title: 'GDPR Compliant', desc: 'Full compliance with EU data protection regulations. Data residency options available.' },
    { icon: Shield, title: 'End-to-end encryption', desc: 'All data encrypted in transit and at rest. AES-256 + TLS 1.3.' },
    { icon: Eye, title: 'Zero data sharing', desc: 'Your creative library and performance data stay yours. No cross-customer data leakage.' },
  ];
  return (
    <section className="py-24 px-6 bg-bg-surface/40 border-y border-border-subtle" id="trust">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <Shield size={11} />
            Security & Trust
          </span>
          <h2 className="text-display-lg mt-4">
            Enterprise-grade security.<br />
            <span className="gradient-text-teal">Startup-grade speed.</span>
          </h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="surface p-6 h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
                  <p.icon size={20} />
                </div>
                <h3 className="font-semibold text-ink-primary mb-2">{p.title}</h3>
                <p className="text-ink-muted text-xs leading-relaxed">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing (simplified 3-tier)                                          */
/* ------------------------------------------------------------------ */
function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      desc: 'For solo founders and small teams getting started.',
      cta: 'Start free trial',
      features: ['5 connected ad accounts', '500 creative analyses/mo', 'Competitor monitoring (3 brands)', 'AI action queue', 'Email reports'],
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$299',
      desc: 'For performance teams scaling aggressively.',
      cta: 'Start free trial',
      features: ['20 ad accounts', 'Unlimited creative analyses', 'Competitor monitoring (15 brands)', 'Creative Genome clusters', 'Slack + Notion integrations', 'Priority support'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'For agencies and large brand teams.',
      cta: 'Talk to sales',
      features: ['Unlimited accounts', 'White-label reporting', 'Custom integrations', 'Dedicated CSM', 'SLA + SSO', 'GDPR data residency'],
      highlight: false,
    },
  ];
  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <Star size={11} />
            Pricing
          </span>
          <h2 className="text-display-lg mt-4">Simple, transparent pricing</h2>
          <p className="text-ink-secondary mt-4">14-day free trial on all plans. No credit card required.</p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className={`relative p-8 rounded-2xl h-full flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-brand border border-primary/30 shadow-glow-primary'
                    : 'surface'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-white/80' : 'text-ink-secondary'}`}>
                    {plan.name}
                  </p>
                  <p className={`text-4xl font-display font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-ink-primary'}`}>
                    {plan.price}
                    {plan.price !== 'Custom' && <span className="text-base font-normal opacity-60">/mo</span>}
                  </p>
                  <p className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-ink-muted'}`}>{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-white/90' : 'text-ink-secondary'}`}>
                      <CheckCircle size={14} className={plan.highlight ? 'text-white' : 'text-accent'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA Banner                                                           */
/* ------------------------------------------------------------------ */
function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden p-12 text-center">
            <div className="absolute inset-0 bg-gradient-brand opacity-90" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-display-md text-white mb-4">
                Ready to move faster than your competitors?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join 200+ teams who replaced gut-feel with AI-powered creative decisions.
                Set up in 10 minutes. See results in the first week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/login"
                  className="px-8 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all inline-flex items-center gap-2"
                >
                  Start free — no card needed
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:hello@admind.ai"
                  className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Creative Intelligence', href: '#features' },
        { label: 'Competitor Monitor', href: '#features' },
        { label: 'Decision Engine', href: '#features' },
        { label: 'Integrations', href: '#' },
        { label: 'Changelog', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: 'mailto:hello@admind.ai' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Security', href: '/security' },
        { label: 'AI Transparency', href: '/ai-transparency' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ];
  return (
    <footer className="border-t border-border-subtle bg-bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Brain size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-ink-primary">AdMind</span>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed mb-4 max-w-48">
              The Decision OS for modern marketing teams.
            </p>
            <p className="text-xs text-ink-muted">© 2026 AdMind, Inc.</p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">{s.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            Built with care for marketers who move fast.
          </p>
          <div className="flex items-center gap-1 text-xs text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page assembly                                                        */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <PersonasSection />
      <TrustSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
