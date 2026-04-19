'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowRight, Mail, RefreshCw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

/* ------------------------------------------------------------------ */
/* OTP 6-box input                                                      */
/* ------------------------------------------------------------------ */
function OTPInput({ value, onChange, disabled }) {
  const inputs = useRef([]);

  const handleChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, '').slice(-1);
    const arr = value.split('');
    arr[i] = v;
    const next = arr.join('');
    onChange(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste) { onChange(paste.padEnd(6, '').slice(0, 6)); inputs.current[Math.min(paste.length, 5)]?.focus(); }
    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className={`w-12 h-14 text-center text-xl font-mono font-bold rounded-xl border transition-all outline-none
            ${value[i]
              ? 'border-primary bg-primary/10 text-ink-primary'
              : 'border-border-default bg-bg-elevated text-ink-primary'
            }
            focus:border-primary focus:ring-2 focus:ring-primary/20
            disabled:opacity-40`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const urlError = searchParams.get('error');

  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(urlError ? 'Authentication failed. Please try again.' : null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const supabase = createClient();

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (otp.length === 6 && step === 'otp') verifyOtp();
  }, [otp]);

  /* ── Step 1: send OTP ── */
  const sendOtp = async (e) => {
    e?.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setStep('otp');
      setResendCooldown(60);
    }
  };

  /* ── Step 2: verify OTP ── */
  const verifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp,
      type: 'email',
    });

    if (err) {
      setLoading(false);
      setError('Invalid code. Check your email and try again.');
      setOtp('');
      return;
    }

    // Create/update profile on first login
    if (data?.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id', ignoreDuplicates: false });
    }

    router.push(redirect);
    router.refresh();
  };

  const resend = async () => {
    if (resendCooldown > 0) return;
    setOtp('');
    setError(null);
    await sendOtp();
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>
      <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-primary">
            <Brain size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-primary">AdMind</span>
        </Link>

        <div className="surface rounded-2xl p-8 shadow-modal">
          <AnimatePresence mode="wait">

            {/* ── Step 1: Email ── */}
            {step === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-7">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-4">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <h1 className="font-display font-bold text-2xl text-ink-primary mb-2">Welcome to AdMind</h1>
                  <p className="text-sm text-ink-muted">Enter your email — we'll send a 6-digit code. No password needed.</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-danger/10 border border-danger/25 mb-5"
                  >
                    <AlertCircle size={15} className="text-danger shrink-0" />
                    <p className="text-sm text-danger">{error}</p>
                  </motion.div>
                )}

                <form onSubmit={sendOtp} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input text-base"
                      autoFocus
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="btn-primary btn-lg justify-center shadow-glow-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                          <RefreshCw size={16} />
                        </motion.div>
                        Sending code…
                      </>
                    ) : (
                      <>
                        Continue with email
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-ink-muted mt-6">
                  By continuing you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms</Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* ── Step 2: OTP ── */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-7">
                  <div className="w-12 h-12 rounded-2xl bg-success/15 border border-success/25 flex items-center justify-center mx-auto mb-4">
                    <Mail size={22} className="text-success" />
                  </div>
                  <h1 className="font-display font-bold text-2xl text-ink-primary mb-2">Check your email</h1>
                  <p className="text-sm text-ink-muted">
                    We sent a 6-digit code to<br />
                    <span className="font-semibold text-ink-primary">{email}</span>
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-danger/10 border border-danger/25 mb-5"
                  >
                    <AlertCircle size={15} className="text-danger shrink-0" />
                    <p className="text-sm text-danger">{error}</p>
                  </motion.div>
                )}

                <div className="mb-6">
                  <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={otp.length !== 6 || loading}
                  className="btn-primary btn-lg w-full justify-center shadow-glow-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none mb-4"
                >
                  {loading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                        <RefreshCw size={16} />
                      </motion.div>
                      Verifying…
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Verify code
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { setStep('email'); setOtp(''); setError(null); }}
                    className="btn-ghost text-sm gap-1.5"
                  >
                    <ArrowLeft size={14} />
                    Change email
                  </button>
                  <button
                    onClick={resend}
                    disabled={resendCooldown > 0}
                    className="btn-ghost text-sm disabled:opacity-40"
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                  </button>
                </div>

                <p className="text-xs text-ink-muted text-center mt-5">
                  Can't find it? Check your spam folder. Code expires in 10 minutes.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPageWrapper() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
