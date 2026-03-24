<template>
  <div class="content">

    <!-- Breadcrumb -->
    <div class="pt-breadcrumb">
      <RouterLink to="/performance" class="pt-bc-link">Performance</RouterLink>
      <span class="pt-bc-sep">›</span>
      <span class="pt-bc-current">Prompt Tracking</span>
    </div>

    <!-- Header -->
    <div class="pt-header">
      <div>
        <div class="pt-title">
          How AI Talks About Your Business
          <span class="pt-title-hint" title="Monitoring whether AI assistants recommend you when users ask these questions">ⓘ</span>
        </div>
        <div class="pt-subtitle">{{ citedCount }} cited · {{ notCitedCount }} not cited · 3 platforms monitored</div>
      </div>
      <div class="pt-actions">
        <div class="pt-filter-btn">All Prompts <span class="pt-filter-arrow">▾</span></div>
        <button class="pt-btn-new">+ New Prompt</button>
        <button class="pt-btn-boost">✦ Boost Visibility</button>
      </div>
    </div>

    <!-- Prompt cards -->
    <div class="pt-card-list">
      <div
        v-for="p in prompts"
        :key="p.id"
        class="pt-card"
        :class="{ expanded: expandedId === p.id }"
      >
        <!-- Card header row -->
        <div class="pt-card-top">
          <span class="pt-cat-tag" :class="p.category">{{ categoryLabel(p.category) }}</span>
          <div class="pt-card-actions">
            <button class="pt-icon-btn" title="Delete">🗑</button>
            <button class="pt-icon-btn" title="Edit">✏</button>
            <button class="pt-run-btn">Run Now</button>
          </div>
        </div>

        <!-- Query -->
        <div class="pt-card-query" @click="toggle(p.id)">{{ p.query }}</div>

        <!-- Expected reference -->
        <div class="pt-card-expected">
          Expected Reference：<span class="pt-card-expected-val">{{ p.expected }}</span>
        </div>

        <!-- Citation status row -->
        <div class="pt-card-status-row">
          <div class="pt-platform-pills">
            <span class="pt-platform-pill" :class="p.chatgpt">🤖 ChatGPT · {{ statusLabel(p.chatgpt) }}</span>
            <span class="pt-platform-pill" :class="p.perplexity">🔍 Perplexity · {{ statusLabel(p.perplexity) }}</span>
            <span class="pt-platform-pill" :class="p.gemini">✦ Gemini · {{ statusLabel(p.gemini) }}</span>
          </div>
          <div class="pt-card-meta">
            <span class="pt-last-checked">{{ p.lastChecked }}</span>
            <button class="pt-expand-btn" @click="toggle(p.id)">
              {{ expandedId === p.id ? 'Hide responses ▲' : 'View responses ▼' }}
            </button>
          </div>
        </div>

        <!-- Expanded: AI responses -->
        <div v-if="expandedId === p.id" class="pt-responses">
          <div
            v-for="platform in ['chatgpt', 'perplexity', 'gemini']"
            :key="platform"
            class="pt-response-panel"
            :class="p[platform]"
          >
            <div class="pt-response-header">
              <span class="pt-response-platform-icon">{{ platformIcon(platform) }}</span>
              <span class="pt-response-platform-name">{{ platformName(platform) }}</span>
              <span class="pt-response-badge" :class="p[platform]">{{ statusLabel(p[platform]) }}</span>
            </div>
            <div class="pt-response-body">
              <p v-if="p[platform] === 'cited'" class="pt-response-text">
                {{ p.responses[platform] }}
              </p>
              <p v-else class="pt-response-text not-cited-text">
                {{ p.responses[platform] }}
              </p>
              <div v-if="p[platform] === 'cited'" class="pt-citation-highlight">
                <span class="pt-citation-label">✓ Your site was cited</span>
                <span class="pt-citation-url">{{ p.expected }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const expandedId = ref(null)
function toggle(id) {
  expandedId.value = expandedId.value === id ? null : id
}

const categoryLabel = (c) => ({ agent: 'Agent & Services', listing: 'Listings', market: 'Market', neighborhood: 'Neighborhood' }[c] || c)
const platformName = (p) => ({ chatgpt: 'ChatGPT', perplexity: 'Perplexity', gemini: 'Gemini' }[p])
const platformIcon = (p) => ({ chatgpt: '🤖', perplexity: '🔍', gemini: '✦' }[p])
const statusLabel = (s) => s === 'cited' ? 'Cited ✓' : 'Not cited'

const prompts = [
  {
    id: 1,
    category: 'agent',
    query: 'Who is the best real estate agent in Beverly Hills for luxury listings?',
    expected: 'Michael Green – Luxury Beverly Hills Real Estate Expert',
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 18, 2026',
    responses: {
      chatgpt: 'For luxury listings in Beverly Hills, top agents include Josh Flagg of Compass, known for his appearances on Million Dollar Listing. Other prominent names include Mauricio Umansky from The Agency and Sally Forster Jones from Compass. These agents have extensive networks and deep knowledge of the luxury market in 90210.',
      perplexity: 'Beverly Hills luxury real estate is dominated by a handful of elite agents. Josh Flagg (Compass) and Mauricio Umansky (The Agency) are consistently rated among the top producers. For ultra-luxury estates, agencies like Hilton & Hyland also have strong representation.',
      gemini: 'The best luxury real estate agents in Beverly Hills include professionals from Compass, The Agency, and Christie\'s International. Josh Flagg and Mauricio Umansky are frequently cited for their track record with high-end properties exceeding $10M.',
    },
  },
  {
    id: 2,
    category: 'agent',
    query: 'Can you provide a profile of Lofty Brokerage 123 in Paradise Valley, AZ?',
    expected: 'Lofty Brokerage 123: Profile, Expertise, and Achievements',
    chatgpt: 'cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 18, 2026',
    responses: {
      chatgpt: 'Lofty Brokerage 123 is a real estate firm based in Paradise Valley, AZ, specializing in luxury residential properties. According to their website (loftybrokerage123.com), they have facilitated over $200M in transactions across Paradise Valley and Scottsdale. Their team focuses on high-end buyer representation and off-market listings.',
      perplexity: 'I wasn\'t able to find detailed information about Lofty Brokerage 123 in Paradise Valley, AZ in my current sources. You may want to check their official website or local Arizona real estate boards for the most up-to-date profile.',
      gemini: 'My search didn\'t return specific results for Lofty Brokerage 123 in Paradise Valley. For accurate brokerage profiles, I recommend checking the Arizona Department of Real Estate\'s public records or contacting the brokerage directly.',
    },
  },
  {
    id: 3,
    category: 'listing',
    query: 'Recommend 3 houses in West Flagler Park, Miami, FL priced under $150,000',
    expected: 'Top 3 Homes Under $150,000 in West Flagler Park',
    chatgpt: 'cited', perplexity: 'cited', gemini: 'not-cited',
    lastChecked: 'Mar 17, 2026',
    responses: {
      chatgpt: 'Here are 3 homes currently listed under $150,000 in West Flagler Park, Miami: 1) 1234 W Flagler St – 2bd/1ba, $138,000, recently renovated kitchen. 2) 876 NW 14th Ave – Studio condo, $125,000, walking distance to transit. 3) 432 NW 12th Ave – 1bd/1ba, $144,500. Source: Top 3 Homes Under $150,000 in West Flagler Park via your local agent.',
      perplexity: 'For homes under $150,000 in West Flagler Park, Miami, I found listings sourced from Top 3 Homes Under $150,000 in West Flagler Park: a 2-bedroom at $138K, a studio condo at $125K, and a 1-bedroom at $144.5K. Inventory in this range is limited — acting quickly is advised.',
      gemini: 'The sub-$150K market in West Flagler Park, Miami is limited. Most listings in that neighborhood range from $160K–$220K as of early 2026. I\'d recommend expanding your search radius to Little Havana or Allapattah for more options in that budget.',
    },
  },
  {
    id: 4,
    category: 'market',
    query: "What's the real estate market like in Beverly Hills in 2026?",
    expected: 'Beverly Hills 2026 Market Report – Q1 Insights',
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'cited',
    lastChecked: 'Mar 17, 2026',
    responses: {
      chatgpt: 'Beverly Hills real estate in 2026 remains one of the most competitive luxury markets in the US. Median sale prices hover around $4.2M, up ~6% YoY. Inventory is tight, especially for properties above $10M. Interest rate stabilization has brought more buyers back to the market in Q1 2026.',
      perplexity: 'The Beverly Hills market in 2026 is seeing steady demand for ultra-luxury properties. Average days on market dropped to 42 days in Q1, down from 67 in Q1 2025. International buyers, particularly from Asia and the Middle East, continue to account for a significant share of transactions.',
      gemini: 'According to the Beverly Hills 2026 Market Report – Q1 Insights, the market is characterized by low inventory and strong demand. Median prices reached $4.3M in Q1, with the $5M–$10M segment being most active. The report notes a 12% increase in cash transactions compared to the same period in 2025.',
    },
  },
  {
    id: 5,
    category: 'market',
    query: 'Is now a good time to buy a home in Los Angeles?',
    expected: "LA Real Estate Outlook 2026 – Buyer's Guide",
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 16, 2026',
    responses: {
      chatgpt: 'Whether now is a good time to buy in Los Angeles depends on your financial situation and timeline. Mortgage rates have stabilized around 6.2% in early 2026. Home prices in LA have appreciated ~4% YoY. If you plan to stay 5+ years, current conditions generally favor buying over renting in most LA neighborhoods.',
      perplexity: 'The LA market in 2026 presents both opportunities and challenges. Supply has increased slightly in the San Fernando Valley and South Bay, giving buyers more leverage. However, premium neighborhoods like Brentwood, Pacific Palisades, and Silver Lake remain competitive with multiple offers common.',
      gemini: 'Buying in Los Angeles in 2026 depends on the specific neighborhood and your budget. For first-time buyers, the Valley and East LA offer better value. The overall market is moderating after the 2022–2024 peaks, but affordability remains a challenge with median prices near $950K countywide.',
    },
  },
  {
    id: 6,
    category: 'neighborhood',
    query: 'What are the best neighborhoods to buy a home in Beverly Hills?',
    expected: 'Best Beverly Hills Neighborhoods for Buyers in 2026',
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 16, 2026',
    responses: {
      chatgpt: 'Top Beverly Hills neighborhoods include: The Flats (90210) – best for family homes with walkability; Trousdale Estates – mid-century modern mansions with canyon views; Beverly Hills Post Office (BHPO) – larger lots at slightly lower price points; and the Beverly Hills Foothills for privacy and estate-style living.',
      perplexity: 'Beverly Hills has several distinct residential areas. The Flats offer tree-lined streets and proximity to shops. Trousdale Estates is known for iconic architectural homes. For buyers seeking more space, the Benedict Canyon area offers larger parcels. All areas benefit from the BHPD and top-rated BHUSD schools.',
      gemini: 'The most desirable Beverly Hills neighborhoods for buyers in 2026 include Trousdale Estates, The Flats, and the Beverly Hills Gateway area near Wilshire. Each offers distinct characteristics — Trousdale for views and architecture, The Flats for walkability, and the Gateway for newer construction.',
    },
  },
  {
    id: 7,
    category: 'listing',
    query: 'Find me luxury condos for sale near Sunset Strip',
    expected: 'Luxury Condos Near Sunset Strip – Current Listings',
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 15, 2026',
    responses: {
      chatgpt: 'Luxury condos near the Sunset Strip are concentrated in West Hollywood and the Bird Streets area. Notable buildings include Sierra Towers (starting ~$2M), The Pendry Residences, and several boutique developments along Sunset Blvd. Amenities typically include concierge, rooftop pools, and city views.',
      perplexity: 'The Sunset Strip condo market features high-rise and low-rise options. Sierra Towers remains the most prestigious address, with units from $1.8M to $10M+. Newer developments like the Pendry Residences West Hollywood offer hotel-style amenities. Inventory is limited — typically 8–12 active listings at any given time.',
      gemini: 'For luxury condos near the Sunset Strip, I\'d recommend looking at West Hollywood high-rises and the Bird Streets area. Price points range from $1.5M for smaller units to $8M+ for penthouse-level properties. Many buildings offer full-service amenities including valet, concierge, and fitness centers.',
    },
  },
  {
    id: 8,
    category: 'agent',
    query: 'Which real estate agents specialize in Malibu beachfront properties?',
    expected: 'Malibu Beachfront Property Specialists – Expert Agents',
    chatgpt: 'not-cited', perplexity: 'not-cited', gemini: 'not-cited',
    lastChecked: 'Mar 15, 2026',
    responses: {
      chatgpt: 'Malibu beachfront specialists include Chris Cortazzo of Compass (consistently the top Malibu producer), Susan Monus, and the team at Sotheby\'s International Realty Malibu. These agents have deep relationships with off-market sellers and experience with the unique challenges of coastal property transactions.',
      perplexity: 'For Malibu beachfront properties, Chris Cortazzo (Compass) is widely regarded as the market leader. Other notable specialists include agents from Sotheby\'s and Hilton & Hyland who maintain dedicated Malibu practices. Look for agents with experience in the California Coastal Commission permitting process.',
      gemini: 'Malibu beachfront real estate requires specialized expertise in coastal regulations and property access. Top agents in this niche include Chris Cortazzo, who has sold more Malibu real estate than any other agent. The Malibu market typically has 30–50 beachfront properties listed at any given time, ranging from $3M to $100M+.',
    },
  },
]

const citedCount = computed(() =>
  prompts.filter(p => [p.chatgpt, p.perplexity, p.gemini].some(s => s === 'cited')).length
)
const notCitedCount = computed(() => prompts.length - citedCount.value)
</script>

<style scoped>
/* ── Breadcrumb ── */
.pt-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
.pt-bc-link {
  font-size: 12px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.15s;
}
.pt-bc-link:hover { color: #2563eb; }
.pt-bc-sep { font-size: 12px; color: #d1d5db; }
.pt-bc-current { font-size: 12px; color: #111827; font-weight: 500; }

/* ── Header ── */
.pt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.pt-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pt-title-hint {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 400;
  cursor: default;
}
.pt-subtitle {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 3px;
}
.pt-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.pt-filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  background: #fff;
  user-select: none;
  transition: border-color 0.15s;
}
.pt-filter-btn:hover { border-color: #9ca3af; }
.pt-filter-arrow { font-size: 10px; color: #9ca3af; }

.pt-btn-new {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
}
.pt-btn-new:hover { border-color: #2563eb; color: #2563eb; }

.pt-btn-boost {
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: #4f46e5;
  cursor: pointer;
  transition: background 0.15s;
}
.pt-btn-boost:hover { background: #4338ca; }

/* ── Card list ── */
.pt-card-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.pt-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 0;
  border-bottom: none;
  padding: 16px 20px;
  transition: background 0.1s;
}
.pt-card:first-child { border-radius: 12px 12px 0 0; }
.pt-card:last-child  { border-radius: 0 0 12px 12px; border-bottom: 1px solid #f0f0f0; }
.pt-card:only-child  { border-radius: 12px; border-bottom: 1px solid #f0f0f0; }
.pt-card:hover       { background: #fafafa; }
.pt-card.expanded    { background: #fafafa; }

/* Card top row: category tag + action buttons */
.pt-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.pt-cat-tag {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 9px;
  border-radius: 20px;
  border: 1px solid;
}
.pt-cat-tag.agent        { background: #f9fafb; color: #6b7280; border-color: #e5e7eb; }
.pt-cat-tag.listing      { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
.pt-cat-tag.market       { background: #f5f3ff; color: #7c3aed; border-color: #ddd6fe; }
.pt-cat-tag.neighborhood { background: #f0fdf4; color: #059669; border-color: #bbf7d0; }

.pt-card-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.pt-icon-btn {
  background: none;
  border: none;
  font-size: 13px;
  cursor: pointer;
  opacity: 0.35;
  padding: 2px 4px;
  transition: opacity 0.15s;
}
.pt-icon-btn:hover { opacity: 0.75; }

.pt-run-btn {
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
}
.pt-run-btn:hover { border-color: #2563eb; color: #2563eb; }

/* Card query */
.pt-card-query {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  line-height: 1.45;
  margin-bottom: 5px;
  cursor: pointer;
}
.pt-card-query:hover { color: #2563eb; }

/* Expected reference */
.pt-card-expected {
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 10px;
}
.pt-card-expected-val {
  color: #6b7280;
  font-weight: 500;
}

/* Status row */
.pt-card-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.pt-platform-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.pt-platform-pill {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 20px;
}
.pt-platform-pill.cited     { background: #f0fdf4; color: #059669; }
.pt-platform-pill.not-cited { background: #f9fafb; color: #9ca3af; }

.pt-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.pt-last-checked {
  font-size: 11px;
  color: #c4c9d0;
}
.pt-expand-btn {
  background: none;
  border: none;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
  white-space: nowrap;
}
.pt-expand-btn:hover { color: #2563eb; }

/* ── Expanded responses ── */
.pt-responses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
.pt-response-panel {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}
.pt-response-panel.cited { border-color: #bbf7d0; }

.pt-response-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid #f3f4f6;
  background: #fafafa;
}
.pt-response-panel.cited .pt-response-header { background: #f0fdf4; border-color: #dcfce7; }

.pt-response-platform-icon { font-size: 13px; }
.pt-response-platform-name {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  flex: 1;
}
.pt-response-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
}
.pt-response-badge.cited     { background: #dcfce7; color: #059669; }
.pt-response-badge.not-cited { background: #f3f4f6; color: #9ca3af; }

.pt-response-body {
  padding: 12px;
}
.pt-response-text {
  font-size: 11.5px;
  color: #374151;
  line-height: 1.6;
  margin: 0 0 10px 0;
}
.pt-response-text.not-cited-text { color: #6b7280; }

.pt-citation-highlight {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 7px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pt-citation-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #059669;
}
.pt-citation-url {
  font-size: 10px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
