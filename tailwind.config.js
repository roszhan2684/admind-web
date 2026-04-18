/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)',   'system-ui', 'sans-serif'],
        display: ['var(--font-sora)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },
      colors: {
        /* ── Backgrounds ── */
        bg: {
          primary:  '#0B1020',
          surface:  '#121A2B',
          elevated: '#182238',
          overlay:  '#1E2A40',
        },
        /* ── Brand ── */
        primary:   { DEFAULT: '#5B8CFF', hover: '#4A7BEE', dim: 'rgba(91,140,255,0.12)' },
        secondary: { DEFAULT: '#7B61FF', hover: '#6A50EE', dim: 'rgba(123,97,255,0.12)' },
        accent:    { DEFAULT: '#22C7A9', hover: '#1AB99C', dim: 'rgba(34,199,169,0.12)' },
        /* ── Semantic ── */
        warning:  { DEFAULT: '#F5B942', dim: 'rgba(245,185,66,0.12)' },
        danger:   { DEFAULT: '#EF5F67', dim: 'rgba(239,95,103,0.12)' },
        success:  { DEFAULT: '#22C55E', dim: 'rgba(34,197,94,0.12)'  },
        /* ── Text ── */
        ink: {
          primary:   '#F5F7FB',
          secondary: '#A7B0C0',
          muted:     '#74809A',
          disabled:  '#4A5568',
        },
        /* ── Borders ── */
        border: {
          DEFAULT: '#26324A',
          subtle:  '#1E2A3C',
          strong:  '#364560',
        },
      },
      borderRadius: {
        sm:   '6px',
        DEFAULT: '10px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        '2xl':'24px',
        '3xl':'32px',
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'elevated':'0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
        'glow-primary':  '0 0 24px rgba(91,140,255,0.25)',
        'glow-accent':   '0 0 24px rgba(34,199,169,0.25)',
        'glow-secondary':'0 0 24px rgba(123,97,255,0.2)',
        'modal': '0 24px 64px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #5B8CFF 0%, #7B61FF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #22C7A9 0%, #5B8CFF 100%)',
        'gradient-dark': 'linear-gradient(180deg, #121A2B 0%, #0B1020 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(91,140,255,0.06) 0%, rgba(123,97,255,0.04) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'fade-up':    'fadeUp 0.5s ease-out',
        'fade-down':  'fadeDown 0.4s ease-out',
        'slide-in':   'slideIn 0.35s ease-out',
        'slide-out':  'slideOut 0.3s ease-in',
        'scale-in':   'scaleIn 0.3s ease-out',
        'shimmer':    'shimmer 1.8s infinite linear',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'count-up':   'countUp 1s ease-out',
        'spin-slow':  'spin 3s linear infinite',
        'glow':       'glow 2s ease-in-out infinite alternate',
        'marquee':    'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:    { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeDown:  { from: { opacity: '0', transform: 'translateY(-10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:   { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideOut:  { from: { opacity: '1', transform: 'translateX(0)' }, to: { opacity: '0', transform: 'translateX(-16px)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        pulseSoft: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        glow:      { from: { boxShadow: '0 0 12px rgba(91,140,255,0.2)' }, to: { boxShadow: '0 0 28px rgba(91,140,255,0.5)' } },
        marquee:   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
