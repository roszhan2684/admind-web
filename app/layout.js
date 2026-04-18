import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: { default: 'AdMind — The Decision OS for Modern Marketing', template: '%s | AdMind' },
  description: 'AdMind transforms your ad data into competitive clarity and confident decisions. Creative intelligence, competitor monitoring, and AI-driven next actions for marketers who move fast.',
  keywords: ['ad intelligence', 'creative analytics', 'competitor monitoring', 'AI marketing', 'ad creative scoring', 'marketing decisions'],
  authors: [{ name: 'AdMind' }],
  creator: 'AdMind',
  openGraph: {
    title: 'AdMind — The Decision OS for Modern Marketing',
    description: 'Know what\'s working. Know what to do next.',
    type: 'website',
    siteName: 'AdMind',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdMind — The Decision OS for Modern Marketing',
    description: 'Creative intelligence and AI-powered decisions for modern marketing teams.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0B1020',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sora: 'Sora', system-ui, sans-serif;
            --font-jetbrains: 'JetBrains Mono', Menlo, monospace;
          }
        `}</style>
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: '#0B1020', color: '#F5F7FB' }}>
        {children}
      </body>
    </html>
  );
}
