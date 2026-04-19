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
          primary:  '#0F0F13',
          surface:  '#191923',
          elevated: '#20202E',
          overlay:  '#26263A',
        },
        /* ── Brand ── */
        primary:   { DEFAULT: '#C084FC', hover: '#D8A4FF', dim: 'rgba(192,132,252,0.12)' },
        secondary: { DEFAULT: '#60A5FA', hover: '#93C5FD', dim: 'rgba(96,165,250,0.12)'  },
        accent:    { DEFAULT: '#F59E0B', hover: '#FCD34D', dim: 'rgba(245,158,11,0.12)'  },
        /* ── Semantic ── */
        warning:  { DEFAULT: '#F59E0B', dim: 'rgba(245,158,11,0.12)'  },
        danger:   { DEFAULT: '#F87171', dim: 'rgba(248,113,113,0.12)' },
        success:  { DEFAULT: '#34D399', dim: 'rgba(52,211,153,0.12)'  },
        /* ── Text ── */
        ink: {
          primary:   '#FAFAFA',
          secondary: '#B3B8C5',
          muted:     '#6B7280',
          disabled:  '#4B5563',
        },
        /* ── Borders ── */
        border: {
          DEFAULT: '#2A2A3E',
          subtle:  '#1E1E2C',
          strong:  '#3D3D5C',
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
        'glow-primary':  '0 0 28px rgba(192,132,252,0.35)',
        'glow-accent':   '0 0 28px rgba(245,158,11,0.30)',
        'glow-secondary':'0 0 28px rgba(96,165,250,0.25)',
        'modal': '0 24px 64px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F59E0B 0%, #C084FC 100%)',
        'gradient-dark': 'linear-gradient(180deg, #191923 0%, #0F0F13 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(192,132,252,0.07) 0%, rgba(96,165,250,0.04) 100%)',
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
        glow:      { from: { boxShadow: '0 0 12px rgba(192,132,252,0.2)' }, to: { boxShadow: '0 0 32px rgba(192,132,252,0.6)' } },
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
