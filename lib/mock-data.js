/* ================================================================
   AdMind — Demo Data  (all figures are illustrative)
================================================================ */

export const demoUser = {
  name: 'Roszhan Raj',
  email: 'roszhan@brandco.io',
  role: 'Performance Marketer',
  company: 'BrandCo',
  plan: 'Growth',
  avatar: null,
};

export const workspaceStats = {
  creativesAnalyzed: 1247,
  competitorsTracked: 8,
  alertsThisWeek: 23,
  insightsGenerated: 389,
  avgCreativeScore: 74,
};

// ── Dashboard Metrics ──────────────────────────────────────────
export const dashboardMetrics = [
  { id: 'score',     label: 'Avg Creative Score', value: '74',    delta: '+6 pts', deltaLabel: 'vs last week', trend: 'up',   color: '#5B8CFF' },
  { id: 'roas',      label: 'Blended ROAS',        value: '4.1×',  delta: '+0.6×',  deltaLabel: 'vs last week', trend: 'up',   color: '#22C7A9' },
  { id: 'alerts',    label: 'Active Alerts',       value: '7',     delta: '+5',     deltaLabel: 'new today',    trend: 'up',   color: '#F5B942' },
  { id: 'fatigue',   label: 'Fatigue Risk Ads',    value: '3',     delta: '-1',     deltaLabel: 'vs yesterday', trend: 'down', color: '#EF5F67' },
];

// ── Performance Series (7 days) ───────────────────────────────
export const performanceSeries = [
  { date: 'Mon', roas: 3.4, ctr: 2.8, score: 68 },
  { date: 'Tue', roas: 3.7, ctr: 3.1, score: 71 },
  { date: 'Wed', roas: 3.5, ctr: 2.9, score: 69 },
  { date: 'Thu', roas: 4.0, ctr: 3.6, score: 76 },
  { date: 'Fri', roas: 3.9, ctr: 3.3, score: 74 },
  { date: 'Sat', roas: 4.4, ctr: 4.0, score: 79 },
  { date: 'Sun', roas: 4.1, ctr: 3.7, score: 74 },
];

// ── AI Next Best Actions ──────────────────────────────────────
export const nextBestActions = [
  {
    id: 'nba-1',
    priority: 'critical',
    category: 'Creative Fatigue',
    action: 'Pause "Summer Sale v2" — fatigue score at 91%',
    rationale: 'CTR has dropped 42% over 7 days. The creative has been running 49 days with no refresh. Continued spend is burning budget with diminishing returns.',
    impact: 'Est. +18% ROAS recovery',
    effort: '< 15 min',
    confidence: '94%',
    briefPreview: `BRIEF: Urgency creative refresh\nAudience: Retargeting 25-44\nHook: Scarcity + countdown\nFormat: 9:16 video, 15s\nCTA: "Grab yours before it's gone"`,
  },
  {
    id: 'nba-2',
    priority: 'critical',
    category: 'Competitor Response',
    action: 'Launch UGC creative to counter NovaBrand\'s push',
    rationale: 'NovaBrand launched 6 UGC-style creatives targeting your 25–34 segment. Your library has zero UGC formats. This is a narrative gap competitors are exploiting.',
    impact: 'Protect 23% audience share',
    effort: '2–3 days brief',
    confidence: '88%',
    briefPreview: `BRIEF: UGC authenticity creative\nAudience: Prospecting 25-34\nHook: Customer success story\nFormat: Square video, 30s\nCTA: "See why 10k+ chose us"`,
  },
  {
    id: 'nba-3',
    priority: 'high',
    category: 'Scaling Opportunity',
    action: 'Scale "Product Demo v3" — ROAS holding at 5.2×',
    rationale: 'Product Demo v3 has maintained ROAS above 5× for 12 days. Frequency is low (1.3). This creative has headroom to scale before fatigue sets in.',
    impact: 'Est. +$12k revenue/week',
    effort: 'Budget reallocation only',
    confidence: '91%',
    briefPreview: null,
  },
  {
    id: 'nba-4',
    priority: 'medium',
    category: 'Budget Optimization',
    action: 'Shift 30% of display budget to video',
    rationale: 'Your video creatives average a 82 creative score vs 61 for static. Video ROAS is 2.3× higher despite a 18% higher CPM. The numbers favor a reallocation.',
    impact: 'Est. +8% overall ROAS',
    effort: '1 hour',
    confidence: '79%',
    briefPreview: null,
  },
];

// ── Competitor Feed ───────────────────────────────────────────
export const competitorFeed = [
  {
    id: 'cf-1',
    competitor: 'NovaBrand',
    severity: 'high',
    summary: 'Launched 6 UGC-style creatives targeting the 25–34 segment — direct overlap with your core audience.',
    time: '2h ago',
  },
  {
    id: 'cf-2',
    competitor: 'Adidas',
    severity: 'medium',
    summary: 'Shifted 40% of new creatives to sustainability messaging. Possible new audience segment test.',
    time: '6h ago',
  },
  {
    id: 'cf-3',
    competitor: 'Under Armour',
    severity: 'high',
    summary: 'Running aggressive 30% off promo. 8 price-point ads launched in the last 24h.',
    time: '14h ago',
  },
  {
    id: 'cf-4',
    competitor: 'Puma',
    severity: 'low',
    summary: 'Influencer lifestyle creative spike — lower production quality, higher authenticity signal.',
    time: '1d ago',
  },
];

// ── Creative Library ──────────────────────────────────────────
export const creativeLibrary = [
  { id: 'cr-1', name: 'Hero Launch v3',        type: 'image', format: '1:1',  score: 88, status: 'active',  impressions: '284K', ctr: '3.8%', roas: '4.9×' },
  { id: 'cr-2', name: 'Urgency Countdown A',   type: 'video', format: '9:16', score: 82, status: 'scaling', impressions: '156K', ctr: '4.2%', roas: '5.2×' },
  { id: 'cr-3', name: 'Benefit Stack v2',      type: 'image', format: '1:1',  score: 44, status: 'review',  impressions: '98K',  ctr: '1.1%', roas: '1.8×' },
  { id: 'cr-4', name: 'Social Proof Carousel', type: 'image', format: '4:5',  score: 76, status: 'active',  impressions: '210K', ctr: '2.9%', roas: '3.7×' },
  { id: 'cr-5', name: 'Founder Story 15s',     type: 'video', format: '9:16', score: 91, status: 'scaling', impressions: '420K', ctr: '5.1%', roas: '6.1×' },
  { id: 'cr-6', name: 'Summer Sale v2',        type: 'image', format: '1:1',  score: 38, status: 'paused',  impressions: '67K',  ctr: '0.8%', roas: '1.2×' },
];

// ── Competitors ───────────────────────────────────────────────
export const competitors = [
  {
    name: 'NovaBrand',
    category: 'DTC Apparel',
    primaryMarket: 'US / UK',
    threat: 'high',
    activeCreatives: 34,
    estimatedSpend: '$85K/wk',
    topFormat: 'UGC Video',
    primaryChannel: 'Meta',
    engagement: 6.2,
    creativeVolume: 85,
    spendSignal: 90,
    ugcMix: 70,
    videoShare: 65,
    narrativeShifts: [
      { angle: 'Shifted to UGC authenticity (6 new creatives)', severity: 'high', time: '2h ago' },
      { angle: 'Testing fear-of-loss copy across retargeting', severity: 'medium', time: '3d ago' },
    ],
    aiWarning: 'NovaBrand is directly targeting your 25–34 segment with UGC formats you don\'t have. Act within 48h to avoid audience erosion.',
  },
  {
    name: 'Adidas',
    category: 'Athletic Wear',
    primaryMarket: 'Global',
    threat: 'medium',
    activeCreatives: 48,
    estimatedSpend: '$220K/wk',
    topFormat: 'Static Image',
    primaryChannel: 'Google',
    engagement: 4.8,
    creativeVolume: 70,
    spendSignal: 75,
    ugcMix: 30,
    videoShare: 45,
    narrativeShifts: [
      { angle: 'Sustainability messaging pivot (40% of new ads)', severity: 'medium', time: '6h ago' },
    ],
    aiWarning: 'Adidas is testing sustainability angles — could signal a category narrative shift. Monitor over next 2 weeks.',
  },
  {
    name: 'Under Armour',
    category: 'Athletic Wear',
    primaryMarket: 'US',
    threat: 'medium',
    activeCreatives: 22,
    estimatedSpend: '$60K/wk',
    topFormat: 'Video',
    primaryChannel: 'Meta',
    engagement: 3.9,
    creativeVolume: 55,
    spendSignal: 60,
    ugcMix: 25,
    videoShare: 55,
    narrativeShifts: [
      { angle: 'Aggressive price promotion (30% off, limited time)', severity: 'high', time: '14h ago' },
    ],
    aiWarning: 'UA\'s promo push may pull price-sensitive customers. Consider a value-framing creative to counter.',
  },
  {
    name: 'Puma',
    category: 'Lifestyle Apparel',
    primaryMarket: 'EU / US',
    threat: 'low',
    activeCreatives: 18,
    estimatedSpend: '$40K/wk',
    topFormat: 'UGC',
    primaryChannel: 'TikTok',
    engagement: 5.1,
    creativeVolume: 45,
    spendSignal: 40,
    ugcMix: 80,
    videoShare: 75,
    narrativeShifts: [
      { angle: 'Influencer lifestyle UGC spike (+6 creatives)', severity: 'low', time: '1d ago' },
    ],
    aiWarning: null,
  },
];

// ── Narrative Timeline (share of voice by month) ──────────────
export const narrativeTimeline = [
  { month: 'Jul', NovaBrand: 18, Adidas: 32, 'Under Armour': 15, Puma: 20 },
  { month: 'Aug', NovaBrand: 22, Adidas: 30, 'Under Armour': 18, Puma: 22 },
  { month: 'Sep', NovaBrand: 25, Adidas: 28, 'Under Armour': 20, Puma: 19 },
  { month: 'Oct', NovaBrand: 30, Adidas: 27, 'Under Armour': 22, Puma: 21 },
  { month: 'Nov', NovaBrand: 36, Adidas: 25, 'Under Armour': 20, Puma: 24 },
];

// ── Fatigue Data ──────────────────────────────────────────────
export const fatigueData = [
  { name: 'Hero Launch v3',        score: 88, daysRunning: 8,  fatigue: 12, status: 'healthy'  },
  { name: 'Urgency Countdown A',   score: 82, daysRunning: 11, fatigue: 28, status: 'watch'    },
  { name: 'Social Proof Carousel', score: 76, daysRunning: 9,  fatigue: 22, status: 'watch'    },
  { name: 'Founder Story 15s',     score: 91, daysRunning: 6,  fatigue: 8,  status: 'healthy'  },
  { name: 'Benefit Stack v2',      score: 44, daysRunning: 28, fatigue: 74, status: 'critical' },
  { name: 'Summer Sale v2',        score: 38, daysRunning: 49, fatigue: 91, status: 'critical' },
  { name: 'Back to School',        score: 61, daysRunning: 18, fatigue: 52, status: 'risk'     },
];

// ── Alerts ────────────────────────────────────────────────────
export const alerts = [
  {
    id: 'a-1',
    type: 'competitor',
    severity: 'critical',
    title: 'NovaBrand launched 6 creatives targeting your audience',
    description: 'UGC-style ads detected in your 25–34 retargeting segment. Recommend immediate creative response.',
    action: 'Create brief',
    time: '2h ago',
    read: false,
  },
  {
    id: 'a-2',
    type: 'fatigue',
    severity: 'high',
    title: '"Benefit Stack v2" is critically fatigued',
    description: 'CTR dropped 42% over 7 days. Creative has been running 28 days with no refresh.',
    action: 'Pause creative',
    time: '4h ago',
    read: false,
  },
  {
    id: 'a-3',
    type: 'fatigue',
    severity: 'high',
    title: '"Summer Sale v2" score below threshold (38/100)',
    description: 'Creative score dropped below 40. Recommend immediate retirement to stop wasted spend.',
    action: 'Retire creative',
    time: '6h ago',
    read: false,
  },
  {
    id: 'a-4',
    type: 'competitor',
    severity: 'medium',
    title: 'Adidas shifted messaging to sustainability',
    description: 'Adidas running 14 eco-focused ads. Possible opportunity in premium eco-segment.',
    action: null,
    time: '8h ago',
    read: true,
  },
  {
    id: 'a-5',
    type: 'opportunity',
    severity: 'medium',
    title: 'Founder story format outperforming — scale opportunity',
    description: 'Your founder-story ad scores 91. No competitors are using this format. Strong scale signal.',
    action: 'Scale budget',
    time: '12h ago',
    read: true,
  },
  {
    id: 'a-6',
    type: 'competitor',
    severity: 'low',
    title: 'Under Armour running aggressive promo campaign',
    description: '30% off promotion detected. 8 price-point ads launched in last 24h.',
    action: null,
    time: '1d ago',
    read: true,
  },
  {
    id: 'a-7',
    type: 'system',
    severity: 'low',
    title: 'Weekly intelligence report ready',
    description: 'Your Nov 4–10 competitive intelligence report is ready to view.',
    action: 'View report',
    time: '2d ago',
    read: true,
  },
];

// ── Reports ───────────────────────────────────────────────────
export const reports = [
  { id: 'r-1', name: 'Weekly Creative Performance', period: 'Nov 4–10',    status: 'ready',    type: 'performance', createdAt: '2024-11-10' },
  { id: 'r-2', name: 'Competitor Intelligence',     period: 'Oct 2024',    status: 'ready',    type: 'competitive', createdAt: '2024-11-01' },
  { id: 'r-3', name: 'Creative Fatigue Analysis',   period: 'Q4 2024',     status: 'ready',    type: 'creative',    createdAt: '2024-10-31' },
  { id: 'r-4', name: 'Monthly Executive Summary',   period: 'October 2024',status: 'ready',    type: 'executive',   createdAt: '2024-11-01' },
  { id: 'r-5', name: 'AI Recommendations Digest',   period: 'Nov 11–17',   status: 'building', type: 'ai',          createdAt: '2024-11-11' },
];

// ── Team Members ──────────────────────────────────────────────
export const teamMembers = [
  { id: 't-1', name: 'Roszhan Raj',   email: 'roszhan@brandco.io',  role: 'Admin',  status: 'active'  },
  { id: 't-2', name: 'Aanya Sharma',  email: 'aanya@brandco.io',    role: 'Admin',  status: 'active'  },
  { id: 't-3', name: 'Marcus Chen',   email: 'marcus@brandco.io',   role: 'Member', status: 'active'  },
  { id: 't-4', name: 'Priya Menon',   email: 'priya@brandco.io',    role: 'Member', status: 'active'  },
  { id: 't-5', name: 'Jake Williams', email: 'jake@brandco.io',     role: 'Viewer', status: 'invited' },
];

// ── Integrations ──────────────────────────────────────────────
export const integrations = [
  { id: 'meta',     name: 'Meta Ads',     description: 'Facebook & Instagram creative library',       status: 'connected', icon: '📘' },
  { id: 'google',   name: 'Google Ads',   description: 'Google Display & Search campaigns',           status: 'connected', icon: '🔵' },
  { id: 'tiktok',   name: 'TikTok Ads',  description: 'TikTok for Business creative library',         status: 'available', icon: '🎵' },
  { id: 'linkedin', name: 'LinkedIn Ads', description: 'B2B ad creative intelligence',                status: 'available', icon: '💼' },
  { id: 'slack',    name: 'Slack',        description: 'Get alerts and digests in Slack',             status: 'connected', icon: '💬' },
  { id: 'notion',   name: 'Notion',       description: 'Export reports and insights',                 status: 'available', icon: '📝' },
  { id: 'zapier',   name: 'Zapier',       description: 'Automate workflows with 5,000+ apps',         status: 'available', icon: '⚡' },
  { id: 'hubspot',  name: 'HubSpot',      description: 'Sync insights to your CRM',                   status: 'coming_soon', icon: '🧡' },
];

// ── Creative Genome ───────────────────────────────────────────
export const genomeData = [
  { id: 'g-1', label: 'Urgency / Scarcity',     x: 80, y: 30, size: 55, score: 84, count: 8,  color: '#EF5F67' },
  { id: 'g-2', label: 'Lifestyle / Aspirational',x: 25, y: 20, size: 70, score: 78, count: 14, color: '#5B8CFF' },
  { id: 'g-3', label: 'Social Proof',            x: 50, y: 55, size: 45, score: 72, count: 6,  color: '#22C7A9' },
  { id: 'g-4', label: 'Product Feature',         x: 15, y: 65, size: 60, score: 58, count: 10, color: '#7B61FF' },
  { id: 'g-5', label: 'Founder / Story',         x: 70, y: 70, size: 40, score: 91, count: 4,  color: '#F5B942' },
  { id: 'g-6', label: 'Price / Promo',           x: 40, y: 35, size: 35, score: 42, count: 5,  color: '#74809A' },
];
