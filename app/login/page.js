'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, Eye, EyeOff, Sparkles, Github, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [mode, setMode] = useState('signin'); // signin | signup
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Demo: navigate to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[100px]" />
      </div>
      <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
            <Brain size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-primary">AdMind</span>
        </div>

        <div className="surface rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex surface rounded-xl p-1 mb-7">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'signin' ? 'bg-primary text-white' : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'signup' ? 'bg-primary text-white' : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Create account
            </button>
          </div>

          <h1 className="font-display font-bold text-xl text-ink-primary mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Start your free trial'}
          </h1>
          <p className="text-sm text-ink-muted mb-6">
            {mode === 'signin'
              ? 'Sign in to your AdMind workspace.'
              : '14 days free. No credit card required.'}
          </p>

          {/* Social logins */}
          <div className="flex gap-3 mb-5">
            <button className="btn-secondary flex-1 justify-center text-sm">
              <span className="text-base">G</span>
              Google
            </button>
            <button className="btn-secondary flex-1 justify-center text-sm">
              <Github size={15} />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border-default" />
            <span className="text-xs text-ink-muted">or with email</span>
            <div className="flex-1 h-px bg-border-default" />
          </div>

          {/* Form */}
          <form onSubmit={submit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5">Full name</label>
                <input type="text" placeholder="Alex Rivera" className="input" required />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Password</label>
                {mode === 'signin' && (
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary btn-lg justify-center shadow-glow-primary mt-1">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Demo shortcut */}
          <div className="mt-5 p-3 rounded-xl bg-primary/8 border border-primary/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={13} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Demo mode</span>
            </div>
            <p className="text-xs text-ink-muted mb-2">Try the full product without signing up.</p>
            <Link href="/dashboard" className="text-xs text-primary hover:underline flex items-center gap-1">
              Enter demo dashboard
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-ink-muted mt-5">
          By continuing you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
