const FLAG_RED = '#ef4444';

export const ACTIVITY_FLAGS = [
  {
    label: 'Jan 5',
    color: FLAG_RED,
    title: 'Technical · Jan 5',
    actions: ['Initial site audit completed', 'Fixed 42 broken internal links', 'Submitted updated sitemap to Google'],
    results: ['Crawl errors reduced by 68%', 'Indexed pages increased from 24 → 41'],
    traffic: { organic: 72, ai: 7, others: 13 }
  },
  {
    label: 'Jan 19',
    color: FLAG_RED,
    title: 'Content · Jan 19',
    actions: ['Published 3 community spotlight pages (Los Feliz, Silver Lake, Echo Park)'],
    results: ['+340 impressions in first week', '5 long-tail keywords entered top 20'],
    traffic: { organic: 85, ai: 9, others: 14 }
  },
  {
    label: 'Feb 3',
    color: FLAG_RED,
    title: 'AI · Feb 3',
    actions: ['Added structured FAQ schema to 12 listing pages', 'Optimized 8 pages for AI snippet eligibility'],
    results: ['AI mention rate 0% → 3%', 'Featured snippet captured for "Beverly Hills buyer agent"'],
    traffic: { organic: 101, ai: 14, others: 15 }
  },
  {
    label: 'Feb 12',
    color: FLAG_RED,
    title: 'Competitive · Feb 12',
    actions: ['Identified 31 keyword gaps vs top 3 competitors', 'Targeted 8 high-opportunity terms with new landing pages'],
    results: ['+2 positions average rank improvement', '3 competitor keywords captured'],
    traffic: { organic: 118, ai: 18, others: 14 }
  },
  {
    label: 'Feb 24',
    color: FLAG_RED,
    title: 'Content + Technical · Feb 24',
    actions: ['Published 4 SEO blog posts on LA market trends', 'Auto-fixed 11 meta descriptions', 'Improved page speed score on 6 pages'],
    results: ['+780 impressions', 'Page speed 61 → 78', '4 keywords moved to page 1'],
    traffic: { organic: 145, ai: 23, others: 16 }
  },
  {
    label: 'Mar 1',
    color: FLAG_RED,
    title: 'Technical · Mar 1',
    actions: ['Ran monthly crawl audit', 'Fixed 7 duplicate title tags', 'Re-canonicalized 4 paginated listing pages'],
    results: ['Duplicate content warnings cleared', 'Google re-indexed 11 pages within 48 hrs'],
    traffic: { organic: 155, ai: 26, others: 16 }
  },
  {
    label: 'Mar 3',
    color: FLAG_RED,
    title: 'Content · Mar 3',
    actions: ['Published 5 SEO-optimized blog posts on Beverly Hills market trends'],
    results: ['+1.2K impressions', '3 keywords moved to page 1'],
    traffic: { organic: 165, ai: 28, others: 17 }
  },
  {
    label: 'Mar 5',
    color: FLAG_RED,
    title: 'AI · Mar 5',
    actions: ['Added "People Also Ask" structured data to 10 listing pages', 'Updated agent bio page with citation-friendly Q&A format'],
    results: ['2 new featured snippets captured', 'AI mention rate 4% → 6%'],
    traffic: { organic: 172, ai: 31, others: 17 }
  },
  {
    label: 'Mar 7',
    color: FLAG_RED,
    title: 'Competitive · Mar 7',
    actions: ['Refreshed 9 competitor-overlap pages with updated pricing & market data', 'Added internal links from top-traffic pages to new blog posts'],
    results: ['Average position improved 4.1 → 3.2 on 9 pages', '+6 new backlinks from local news sites'],
    traffic: { organic: 182, ai: 33, others: 18 }
  },
  {
    label: 'Mar 10',
    color: FLAG_RED,
    title: 'Technical + AI · Mar 10',
    actions: ['Auto-fixed 18 meta tags', 'Optimized 6 pages for AI citability'],
    results: ['Site health 57 → 71', 'AI mention rate 5% → 8%'],
    traffic: { organic: 205, ai: 42, others: 20 }
  },
  {
    label: 'Mar 12',
    color: FLAG_RED,
    title: 'Content · Mar 12',
    actions: ['Published "2026 LA Housing Market Forecast" long-form guide', 'Added video embed + transcript to 3 neighborhood pages'],
    results: ['+890 impressions in 48 hrs', '6 keywords entered top 10'],
    traffic: { organic: 214, ai: 46, others: 19 }
  },
  {
    label: 'Mar 14',
    color: FLAG_RED,
    title: 'AI · Mar 14',
    actions: ['Submitted 14 updated pages to Google AI indexing API', 'Rewrote 5 property description pages for conversational AI match'],
    results: ['AI Referral traffic +31% week-over-week', 'SOV increased 9% → 13% in ChatGPT results'],
    traffic: { organic: 221, ai: 51, others: 17 }
  },
  {
    label: 'Mar 17',
    color: FLAG_RED,
    title: 'Content · Mar 17',
    actions: ['Published 2 neighborhood guide pages (Bel Air, Malibu Beachfront)'],
    results: ['+420 organic visits in 48 hrs', '8 new keyword rankings'],
    traffic: { organic: 245, ai: 58, others: 15 }
  },
  {
    label: 'Mar 19',
    color: FLAG_RED,
    title: 'Competitive + Technical · Mar 19',
    actions: ['Stole 5 top keywords from Luxury Presence with refreshed landing pages', 'Compressed images site-wide, reducing avg load time by 1.2s'],
    results: ['Organic rank improved on 5 high-value terms', 'Core Web Vitals LCP score 3.8s → 2.4s'],
    traffic: { organic: 252, ai: 61, others: 16 }
  },
];

export const TRAFFIC_PERIODS = (function() {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const END    = new Date(2026, 2, 19); // Mar 19
  const TOTAL  = 90;

  const BUMPS = {
    // Jan 5 – Technical audit
    'Jan 5':  { org: 8,  ai: 1 },
    'Jan 6':  { org: 5,  ai: 1 },
    'Jan 7':  { org: 3,  ai: 0 },
    // Jan 19 – Community pages
    'Jan 19': { org: 12, ai: 2 },
    'Jan 20': { org: 8,  ai: 1 },
    'Jan 21': { org: 5,  ai: 1 },
    // Feb 3 – AI schema
    'Feb 3':  { org: 10, ai: 4 },
    'Feb 4':  { org: 7,  ai: 3 },
    'Feb 5':  { org: 4,  ai: 2 },
    // Feb 12 – Competitive
    'Feb 12': { org: 14, ai: 3 },
    'Feb 13': { org: 9,  ai: 2 },
    'Feb 14': { org: 5,  ai: 1 },
    // Feb 24 – Content + Technical
    'Feb 24': { org: 16, ai: 4 },
    'Feb 25': { org: 10, ai: 3 },
    'Feb 26': { org: 6,  ai: 2 },
    // Mar 1 – Technical audit
    'Mar 1':  { org: 10, ai: 2 },
    'Mar 2':  { org: 6,  ai: 1 },
    // Mar 3 – Content
    'Mar 3':  { org: 16, ai: 5 },
    'Mar 4':  { org: 10, ai: 3 },
    // Mar 5 – AI snippets
    'Mar 5':  { org: 11, ai: 4 },
    'Mar 6':  { org: 7,  ai: 2 },
    // Mar 7 – Competitive
    'Mar 7':  { org: 13, ai: 4 },
    'Mar 8':  { org: 8,  ai: 2 },
    'Mar 9':  { org: 4,  ai: 1 },
    // Mar 10 – Technical + AI
    'Mar 10': { org: 22, ai: 8 },
    'Mar 11': { org: 14, ai: 5 },
    'Mar 12': { org: 8,  ai: 3 },
    // Mar 12 – Content long-form
    'Mar 12': { org: 14, ai: 4 },
    'Mar 13': { org: 9,  ai: 3 },
    // Mar 14 – AI indexing
    'Mar 14': { org: 17, ai: 7 },
    'Mar 15': { org: 11, ai: 5 },
    'Mar 16': { org: 6,  ai: 3 },
    // Mar 17 – Content
    'Mar 17': { org: 18, ai: 6 },
    'Mar 18': { org: 10, ai: 4 },
    // Mar 19 – Competitive + Technical
    'Mar 19': { org: 14, ai: 4 },
  };

  const labels = [], organic = [], ai = [], others = [];

  for (let i = TOTAL - 1; i >= 0; i--) {
    const d = new Date(END);
    d.setDate(END.getDate() - i);
    const lbl = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
    labels.push(lbl);

    const t    = (TOTAL - 1 - i) / (TOTAL - 1);
    const ease = t * t * (3 - 2 * t);

    let org = Math.round(68 + (245 - 68) * ease + (Math.sin(i * 1.9) * 3.5));
    let aiV = Math.round(6  + (58  - 6)  * Math.pow(ease, 1.3) + (Math.sin(i * 2.3) * 1.5));
    let oth = Math.round(13 + Math.sin(i * 0.7) * 3.5);

    const bump = BUMPS[lbl];
    if (bump) { org += bump.org; aiV += bump.ai; }

    organic.push(Math.max(60, org));
    ai.push(Math.max(4, aiV));
    others.push(Math.max(8, oth));
  }

  const last7org  = organic.slice(-7).reduce((a,b)=>a+b,0);
  const last7ai   = ai.slice(-7).reduce((a,b)=>a+b,0);
  const last7oth  = others.slice(-7).reduce((a,b)=>a+b,0);

  return {
    '7D': {
      summary: {
        total: last7org + last7ai + last7oth,
        delta: '↑ +38% vs previous 7 days',
        sublabel: 'total visits last 7 days'
      },
      labels:  labels.slice(-7),
      organic: organic.slice(-7),
      ai:      ai.slice(-7),
      others:  others.slice(-7),
      maxTicks: 7
    },
    '30D': {
      summary: {
        total: organic.slice(-1)[0] + ai.slice(-1)[0] + others.slice(-1)[0],
        delta: '↑ +115% vs previous 30 days',
        sublabel: 'latest daily visits'
      },
      labels:  labels.slice(-30),
      organic: organic.slice(-30),
      ai:      ai.slice(-30),
      others:  others.slice(-30),
      maxTicks: 6
    },
    '90D': {
      summary: {
        total: organic.slice(-1)[0] + ai.slice(-1)[0] + others.slice(-1)[0],
        delta: '↑ +171% vs previous 90 days',
        sublabel: 'latest daily visits'
      },
      labels,
      organic,
      ai,
      others,
      maxTicks: 7
    }
  };
})();
