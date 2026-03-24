export const TIMELINE_DATA = [
  // ── Mar 17 ──────────────────────────────────────────────
  {
    date: 17, month: 'Mar', type: 'content', badge: 'Content', agent: '',
    action: 'Published new blog',
    reason: 'Keyword gap analysis found "Bel Air living guide" had 3 competitors ranking on page 1 — you had zero pages targeting this term. High search volume, low competition.',
    blogPost: { title: 'What Salary To Afford A $1,000,000 House in LA?', url: '/blog/bel-air-living-guide' },
  },
  {
    date: 17, month: 'Mar', type: 'content', badge: 'Content', agent: '',
    action: 'Published new blog',
    reason: '"Malibu beachfront neighborhoods" had strong competitor coverage and zero presence from your site. Paired with the Bel Air guide to maximize topical authority in the same publish cycle.',
    blogPost: { title: 'How to find the right mortgage lender?', url: '/blog/malibu-beachfront-neighborhoods' },
  },
  // ── Mar 14 ──────────────────────────────────────────────
  {
    date: 14, month: 'Mar', type: 'competitive', badge: 'Competitive', agent: '',
    action: 'Monitored 4 competitors — found 12 keyword opportunities',
    link: { label: 'View keyword gaps →', url: '/keyword-gap' },
    reason: 'Weekly scan vs. Liam Johnson, Emma Wilson, The Altman Brothers, and Sarah Chen. 12 terms where all competitors rank top-10 but you don\'t appear at all. The agent prioritized 4 high-traffic, low-competition terms for immediate action.',
  },
  // ── Mar 12 ──────────────────────────────────────────────
  {
    date: 12, month: 'Mar', type: 'competitive', badge: 'Competitive', agent: '',
    action: 'Monitored The Altman Brothers — found 3 new pages',
    link: { label: 'View content gaps →', url: '/content-gaps' },
    reason: 'The Altman Brothers published 2 new luxury buyer guides and 1 Malibu area page this week. Each unanswered competitor page widens your content gap — early detection lets the agent respond within days instead of months.',
  },
  // ── Mar 10 ──────────────────────────────────────────────
  {
    date: 10, month: 'Mar', type: 'content', badge: 'Content', agent: '',
    action: 'Generated content plan for the next 7 days — 5 blog posts queued',
    reason: 'Based on latest keyword gap and competitor scan results. Posts were prioritized by traffic potential and competition level. The plan targets a mix of neighborhood guides and buyer-intent articles.',
  },
  // ── Mar 7 ──────────────────────────────────────────────
  {
    date: 7, month: 'Mar', type: 'competitive', badge: 'Competitive', agent: '',
    action: 'Monitored 5 competitors — found 18 keyword opportunities',
    link: { label: 'View keyword gaps →', url: '/keyword-gap' },
    reason: 'This week\'s scan showed 18 terms where all competitors rank in the top 10 but you don\'t appear at all. The agent actioned 6 immediately — the remaining 12 are queued for the coming weeks.',
  },
  // ── Mar 5 ──────────────────────────────────────────────
  {
    date: 5, month: 'Mar', type: 'competitive', badge: 'Competitive', agent: '',
    action: '6 areas covered by competitors that you haven\'t covered — manual action needed',
    link: { label: 'View items needing action →', url: '/content-gaps?filter=needs-action' },
    reason: 'These 6 gaps require a dedicated landing page rather than a blog post — only you can create new pages on your site. The agent has flagged them and is waiting for your input.',
  },
  // ── Mar 3 ──────────────────────────────────────────────
  {
    date: 3, month: 'Mar', type: 'content', badge: 'Content', agent: '',
    action: 'Published new blog',
    reason: 'Content audit showed your site had only 4 blog posts vs. Liam Johnson\'s 47. This post targeted the highest-volume buyer-intent term in Beverly Hills.',
    blogPost: { title: 'Beverly Hills Market Trends 2026', url: '/blog/beverly-hills-market-trends-2026' },
  },
  {
    date: 3, month: 'Mar', type: 'content', badge: 'Content', agent: '',
    action: 'Published new blog',
    reason: 'Luxury buyer guides are one of the highest-intent content types for Beverly Hills — directly answers what high-net-worth buyers search for before engaging an agent.',
    blogPost: { title: 'Luxury Buyer\'s Guide — Beverly Hills 2026', url: '/blog/luxury-buyers-guide-beverly-hills' },
  },
]

export const ACTIVITY_FILTER_TYPES = [
  { key: 'all',         label: 'All' },
  { key: 'content',     label: 'Content' },
  { key: 'competitive', label: 'Competitive' },
]

const typeColors = {
  content:     '#7c3aed',
  competitive: '#065f46',
}

export function getTypeColor(type) {
  return typeColors[type] || typeColors.content
}
