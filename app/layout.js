import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'AdMind — AI Ad Creative Intelligence',
  description:
    'Analyze your advertisement creatives with AI: emotion detection, object recognition, creative scoring, heatmaps, and strategic Gemini insights.',
  keywords: ['ad analysis', 'AI', 'creative score', 'emotion detection', 'heatmap', 'advertising'],
  openGraph: {
    title: 'AdMind — AI Ad Creative Intelligence',
    description: 'Upload your ad. Get AI-powered insights in seconds.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#030712',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="antialiased bg-gray-950 text-gray-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
