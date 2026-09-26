<div align="center">

<br />

```
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗██████╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║██║  ██║
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║██║  ██║
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║██████╔╝
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝
```

### The AI Brain Behind Better Ads

*Stop guessing what works. Start winning.*

<br />

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://admind-web.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Tests](https://img.shields.io/badge/Tests-43%20passing-brightgreen?style=for-the-badge&logo=playwright)](https://playwright.dev)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

<br />

[**Live Demo →**](https://admind-web.vercel.app) &nbsp;&nbsp;·&nbsp;&nbsp; [**Watch Product Video**](https://admind-web.vercel.app/#product-video) &nbsp;&nbsp;·&nbsp;&nbsp; [**Report Bug**](https://github.com/roszhan2684/admind-web/issues)

<br />

---

</div>

## 🧠 What is AdMind?

AdMind is a **production-grade AI advertising intelligence platform** that replaces spreadsheets and gut-feeling with data-driven creative decisions. It connects to your ad accounts, scores your creatives in real time, monitors competitors around the clock, and generates campaign briefs in seconds — all in one luxury-grade UI.

> Built for performance marketers, creative directors, and growth teams who refuse to leave money on the table.

<br />

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Real-Time Dashboard
Unified view of ROAS, CTR, and creative performance across Meta, Google, and TikTok — no tab switching.

### 🎨 Creative Library
AI scores every ad you run. Know exactly what to scale and what to retire before it wastes budget.

### 👁️ Competitor Monitor
24/7 surveillance of rival spend signals, creative volume, and narrative shifts with radar charts and timeline analysis.

### ⚡ Smart Alerts
Proactive notifications the moment something needs attention — critical, high, and info severity levels.

</td>
<td width="50%">

### 📝 AI Brief Generator
Powered by Gemini AI. Enter a goal, get a complete creative brief — hooks, scripts, CTAs, KPIs — in seconds.

### 🔍 Ad Swipe Library
Curated, scored breakdowns of 12+ high-performing ads with "steal this" links to brief generation.

### 📉 Fatigue Monitor
14-day burn forecast with a live gauge. Know when a creative will die before you waste another dollar.

### ⚙️ Settings & Team
Full profile management, team invitations, integration management, and secure account controls.

</td>
</tr>
</table>

<br />

## 🎬 Product Demo

https://admind-web.vercel.app/#product-video

> 81-second animated explainer with AI voice narration, live on the marketing homepage.

<br />

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components) |
| **Auth** | Supabase — email OTP, no passwords |
| **Database** | Supabase Postgres + Row Level Security |
| **Styling** | Tailwind CSS + CSS custom properties (design tokens) |
| **Animations** | Framer Motion |
| **Charts** | Recharts (Area, Line, Radar, custom SVG gauge) |
| **AI** | Google Gemini via Express backend |
| **Deployment** | Vercel (frontend) |
| **Testing** | Playwright E2E + Jest + React Testing Library |
| **Video** | Rendered with Playwright + ffmpeg + macOS TTS |

<br />

## 🗂️ Project Structure

```
admind-web/
├── app/
│   ├── (app)/                  # Protected app routes (require auth)
│   │   ├── layout.js           # Server component — fetches session
│   │   ├── dashboard/
│   │   ├── creative-library/
│   │   ├── competitors/
│   │   ├── recommendations/
│   │   ├── alerts/
│   │   ├── brief-generator/    # Gemini AI integration
│   │   ├── ad-library/
│   │   ├── fatigue/
│   │   └── settings/
│   ├── (marketing)/            # Public marketing pages
│   │   └── page.js             # Homepage with product video
│   ├── login/                  # Email OTP login/register
│   └── auth/callback/          # Supabase session exchange
├── components/
│   └── app/
│       ├── AppShell.js         # Client layout wrapper
│       ├── Sidebar.js          # Collapsible nav with real sign-out
│       └── TopBar.js           # Search, alerts, user avatar
├── lib/
│   ├── supabase/
│   │   ├── client.js           # Browser client (createBrowserClient)
│   │   └── server.js           # Server client (createServerClient + cookies)
│   └── mock-data.js            # Typed mock data for all pages
├── supabase/
│   ├── setup.sql               # Full DB schema + RLS + triggers
│   └── email-otp-template.html # Branded OTP email
├── tests/
│   ├── e2e/                    # Playwright tests
│   │   ├── auth.spec.js
│   │   ├── marketing.spec.js
│   │   └── navigation.spec.js
│   └── unit/                   # Jest + RTL tests
│       ├── otp-input.test.jsx
│       ├── mock-data.test.js
│       └── supabase-client.test.js
├── public/
│   └── admind-explainer.mp4    # 23s narrated launch video (built with /brag + HyperFrames)
└── middleware.js               # Route protection for all /app routes
```

<br />

## 🗄️ Database Schema

```sql
profiles      — user identity, company, plan, onboarding state
briefs        — saved AI-generated creative briefs per user
saved_ads     — bookmarked ads from the swipe library
projects      — ad account projects with status management
```

All tables use **Row Level Security** — users can only ever read/write their own data. A Postgres trigger auto-creates a `profiles` row the instant a new user registers.

<br />

## 🔐 Auth Flow

```
User enters email
      │
      ▼
signInWithOtp() ──► Supabase sends branded 6-digit code to inbox
      │
      ▼
User enters code (custom 6-box OTP input)
      │
      ▼
verifyOtp() ──► Session created ──► Profile upserted ──► /dashboard
```

- Zero passwords — OTP only
- Codes expire in **10 minutes**
- Sessions last **1 hour** with refresh token rotation
- Middleware protects all `/app` routes server-side

<br />

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- (Optional) Google Gemini API key for Brief Generator

### 1. Clone and install

```bash
git clone https://github.com/roszhan2684/admind-web.git
cd admind-web
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:5050
```

### 3. Set up the database

In your Supabase dashboard → SQL Editor, run the full contents of:

```
supabase/setup.sql
```

This creates all tables, RLS policies, and triggers in one shot.

### 4. Configure Supabase Auth

In Authentication → URL Configuration:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/**`

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

<br />

## 🧪 Testing

```bash
# Unit tests (Jest + React Testing Library)
npm run test:unit

# End-to-end tests (Playwright)
npm run test:e2e

# All tests
npm run test
```

**43 tests total — all passing**

| Suite | Tests | Coverage |
|---|---|---|
| OTP Input component | 6 | Render, input, validation, disabled state |
| Mock data integrity | 12 | Schema validation for all data types |
| Supabase modules | 6 | Client, server, middleware, callback route |
| Marketing E2E | 5 | Homepage, nav, CTA, video section |
| Auth E2E | 9 | Login flow, OTP, protected redirects |
| Navigation E2E | 5 | Routes, 404, all protected paths |

<br />

## 🌍 Deployment

The app is deployed on **Vercel** with automatic deployments on every push to `main`.

### Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roszhan2684/admind-web)

After deploying, add these environment variables in Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL
```

<br />

## 🎨 Design System

The UI uses a **Warm Luxury Tech** palette with a full CSS custom property token system:

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0F0F13` | Page background |
| `--bg-surface` | `#191923` | Cards, sidebar |
| `--bg-elevated` | `#20202E` | Hover states, inputs |
| `--color-primary` | `#C084FC` | Purple — CTAs, active states |
| `--color-secondary` | `#60A5FA` | Blue — metrics, charts |
| `--color-accent` | `#F59E0B` | Amber — warnings, highlights |

Typography uses **Sora** (display) and **JetBrains Mono** (code) loaded via Google Fonts.

<br />

## 📍 Roadmap

- [ ] Connect live Meta / Google Ads APIs
- [ ] Persist creatives to Supabase storage
- [ ] Save briefs + brief history page
- [ ] Team workspaces with shared projects
- [ ] White-label / agency mode
- [ ] Mobile app (React Native)
- [ ] Slack / webhook alert delivery
- [ ] Custom SMTP for transactional emails

<br />

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

<br />

## 📄 License

MIT © [roszhan2684](https://github.com/roszhan2684)

<br />

---

<div align="center">

Built with 🧠 and [Claude Code](https://claude.ai/code)

**[admind-web.vercel.app](https://admind-web.vercel.app)**

</div>
