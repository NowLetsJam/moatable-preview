<template>
  <div class="content">
    <div class="breadcrumb">
      <RouterLink to="/performance">Performance</RouterLink>
      <span class="breadcrumb-sep">›</span>
      <span>Content Gaps</span>
    </div>

    <div class="page-header">
      <div>
        <h1>Content Gaps</h1>
        <div style="font-size:12px;color:#9ca3af;margin-top:3px;">Topics and page types your competitors cover — that you're missing</div>
      </div>
      <span class="page-header-meta">Updated weekly</span>
    </div>

    <div class="agent-row">
      <div v-for="agent in agents" :key="agent.key" class="agent-card" :class="{ active: activeAgent === agent.key, you: agent.key === 'you' }" @click="activeAgent = agent.key">
        <div class="agent-card-name">{{ agent.name }}</div>
        <div class="agent-card-stats">
          <div class="agent-stat-block">
            <div class="agent-stat-num">10 <span class="agent-stat-pct" :class="agent.key === 'agent5' ? 'down' : ''">{{ agent.pct }}</span></div>
            <div class="agent-stat-label">New Pages</div>
          </div>
          <div class="agent-stat-divider"></div>
          <div class="agent-stat-block">
            <div class="agent-stat-num">4.5K</div>
            <div class="agent-stat-label">All Pages</div>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-bar">
      <div class="tabs">
        <div
          v-for="tab in ['New', 'Top', 'Top Gaining', 'All']"
          :key="tab"
          class="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </div>
      </div>

      <div class="agent-select-wrap">
        Showing pages of
        <div class="agent-select">
          <select v-model="selectedAgent">
            <option>AGENT 1</option>
            <option>AGENT 2</option>
            <option>AGENT 3</option>
            <option>AGENT 4</option>
            <option>AGENT 5</option>
          </select>
          <span class="agent-select-arrow">↓</span>
        </div>
      </div>

      <div class="action-filter" :class="{ on: showActionOnly }" @click="showActionOnly = !showActionOnly">
        <div class="radio-circle"></div>
        Show only items needing action.
      </div>

      <div class="results-count">1,234 results</div>
    </div>

    <div class="table-wrap">
      <table class="cg-table">
        <colgroup>
          <col style="width: 22%;" />
          <col style="width: 8%;" />
          <col style="width: 9%;" />
          <col style="width: 6%;" />
          <col style="width: 10%;" />
          <col style="width: 14%;" />
          <col style="width: 18%;" />
          <col style="width: 13%;" />
        </colgroup>
        <thead>
          <tr>
            <th>URL</th>
            <th>Traffic <span class="sort-arrow">↓</span></th>
            <th>Traffic Change <span class="sort-arrow">↕</span></th>
            <th>Is New <span class="sort-arrow">↕</span></th>
            <th>Type</th>
            <th>Topic</th>
            <th>Note</th>
            <th style="text-align:right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in contentGapRows.filter(filterContentGaps)" :key="i">
            <td>
              <div class="td-url-title">{{ row.title }}</div>
              <div class="td-url-path">{{ row.url }}</div>
            </td>
            <td class="td-traffic">{{ row.traffic }}</td>
            <td class="td-change">{{ row.change }}</td>
            <td class="td-isnew" :class="{ yes: row.isNew }">{{ row.isNew ? '✓' : '' }}</td>
            <td><span class="type-tag" :class="row.typeCls">{{ row.type }}</span></td>
            <td class="td-topic">{{ row.topic }}</td>
            <td class="td-note">{{ row.note }}</td>
            <td class="td-action">
              <span class="act-status" :class="resolvedAction(row).type">
                <span v-if="resolvedAction(row).type === 'creating'" class="act-dot-pulse"></span>
                <template v-if="resolvedAction(row).type === 'creating'">Creating blog...</template>
                <template v-else-if="resolvedAction(row).type === 'scheduled'">◷ Scheduled · {{ row.action.date }}</template>
                <template v-else-if="resolvedAction(row).type === 'published'">✓ Published</template>
                <template v-else-if="resolvedAction(row).type === 'page-created'">✓ Page created</template>
                <template v-else-if="resolvedAction(row).type === 'skipped'">
                  — Skipped
                  <span class="act-tip" :data-tip="row.action.reason">ⓘ</span>
                </template>
                <template v-else-if="resolvedAction(row).type === 'manual'">
                  <button class="btn-add-page">{{ row.action.label || 'Add Page' }}</button>
                </template>
                <template v-else-if="resolvedAction(row).type === 'monitoring'">
                  ◉ Monitoring
                  <span v-if="row.action.reason" class="act-tip" :data-tip="row.action.reason">ⓘ</span>
                </template>
                <template v-else-if="resolvedAction(row).type === 'no-action'">—</template>
                <!-- Manual mode: blog awaiting manual writing -->
                <template v-else-if="resolvedAction(row).type === 'manual-pending'">
                  ⏸ Paused. Write it manually
                  <button class="btn-mark-done" @click.stop="markDone(row.url)">Mark done</button>
                </template>
                <!-- Manual mode: manually completed -->
                <template v-else-if="resolvedAction(row).type === 'manual-done'">
                  ✓ Manually completed
                </template>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="page-btn disabled">‹</div>
      <div class="page-btn active">1</div>
      <div class="page-btn">2</div>
      <div class="page-btn">3</div>
      <div class="page-btn">4</div>
      <div class="page-btn">5</div>
      <div class="page-ellipsis">…</div>
      <div class="page-btn">124</div>
      <div class="page-btn">›</div>
    </div>
  </div><!-- .content -->
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { userState } from '../store/user.js'

const activeAgent = ref('you')
const activeTab = ref('New')
const selectedAgent = ref('AGENT 1')
const showActionOnly = ref(false)

const agents = [
  { key: 'you',    name: 'YOU',     pct: '+40%' },
  { key: 'agent1', name: 'AGENT 1', pct: '+40%' },
  { key: 'agent2', name: 'AGENT 2', pct: '+40%' },
  { key: 'agent3', name: 'AGENT 3', pct: '+40%' },
  { key: 'agent4', name: 'AGENT 4', pct: '+40%' },
  { key: 'agent5', name: 'AGENT 5', pct: '-5%' },
]

const contentGapRows = [
  {
    title: 'Beverly Hills Market Report Q1',
    url: 'domain.com/blog/beverly-hills-market-q1',
    traffic: '5.1K', change: '+1.2K', isNew: true,
    type: 'Blog', typeCls: 'blog',
    topic: 'beverly hills market trends',
    note: 'Competitors publish monthly market reports',
    action: { type: 'creating' },
  },
  {
    title: 'Luxury Condos Near Sunset Strip',
    url: 'domain.com/blog/sunset-strip-condos',
    traffic: '3.8K', change: '+900', isNew: true,
    type: 'Blog', typeCls: 'blog',
    topic: 'sunset strip luxury condos',
    note: 'High-traffic topic, no existing coverage',
    action: { type: 'scheduled', date: 'Apr 5' },
  },
  {
    title: 'Santa Monica Neighborhood Guide',
    url: 'domain.com/neighborhoods/santa-monica',
    traffic: '4.2K', change: '+600', isNew: true,
    type: 'Neighborhood', typeCls: 'neighborhood',
    topic: 'santa monica neighborhood guide',
    note: 'Missing neighborhood page — requires local info',
    action: { type: 'manual', label: 'Add Page' },
  },
  {
    title: 'Is Now a Good Time to Buy in LA?',
    url: 'domain.com/blog/buy-home-los-angeles-2026',
    traffic: '6.1K', change: '+2.1K', isNew: true,
    type: 'Blog', typeCls: 'blog',
    topic: 'LA real estate buyer outlook 2026',
    note: 'Evergreen topic with seasonal spikes',
    action: { type: 'published' },
  },
  {
    title: 'Pasadena Area Page',
    url: 'domain.com/areas/pasadena',
    traffic: '2.9K', change: '+400', isNew: true,
    type: 'Area', typeCls: 'area',
    topic: 'pasadena homes for sale',
    note: 'New service area — needs agent review',
    action: { type: 'manual', label: 'Add Page' },
  },
  {
    title: 'Malibu Beachfront Homes Guide',
    url: 'domain.com/blog/malibu-beachfront-homes',
    traffic: '3.3K', change: '+500', isNew: false,
    type: 'Blog', typeCls: 'blog',
    topic: 'malibu beachfront properties',
    note: 'High difficulty — top 3 spots dominated',
    action: { type: 'skipped', reason: 'too competitive' },
  },
  {
    title: 'West Hollywood Condo Listings',
    url: 'domain.com/listings/west-hollywood-condos',
    traffic: '1.8K', change: '+200', isNew: false,
    type: 'About', typeCls: 'about',
    topic: 'west hollywood condos',
    note: 'Already covered via listings feed',
    action: { type: 'no-action' },
  },
  {
    title: 'Bel Air Estate Tour Blog',
    url: 'domain.com/blog/bel-air-estate-tour',
    traffic: '1.2K', change: '+150', isNew: false,
    type: 'Blog', typeCls: 'blog',
    topic: 'bel air estate listings',
    note: 'Scheduled for next content cycle',
    action: { type: 'scheduled', date: 'Apr 10' },
  },
  {
    title: 'Century City High-Rise Guide',
    url: 'domain.com/blog/century-city-high-rise',
    traffic: '900', change: '+80', isNew: false,
    type: 'Blog', typeCls: 'blog',
    topic: 'century city high rise condos',
    note: 'Traffic too low to justify effort',
    action: { type: 'skipped', reason: 'low traffic potential' },
  },
  {
    title: 'Hollywood Hills Real Estate Trends',
    url: 'domain.com/blog/hollywood-hills-trends',
    traffic: '2.1K', change: '+300', isNew: false,
    type: 'Blog', typeCls: 'blog',
    topic: 'hollywood hills market',
    note: 'Watching for traffic growth before acting',
    action: { type: 'monitoring', reason: 'Traffic still low — will act if it exceeds 3K/mo' },
  },
]

const filterContentGaps = (row) => {
  if (showActionOnly.value) {
    return ['creating', 'scheduled', 'manual'].includes(row.action.type)
  }
  return true
}

// In manual mode, Blog type creating/scheduled entries become manual-pending
function resolvedAction(row) {
  if (userState.blogMode !== 'manual') return row.action
  if (row.type === 'Blog' && ['creating', 'scheduled'].includes(row.action.type)) {
    if (userState.manuallyCompleted.includes(row.url)) {
      return { type: 'manual-done' }
    }
    return { type: 'manual-pending' }
  }
  return row.action
}

function markDone(url) {
  if (!userState.manuallyCompleted.includes(url)) {
    userState.manuallyCompleted.push(url)
  }
}
</script>

<style scoped>
/* override global margin-bottom so .content gap controls spacing */
.breadcrumb { margin-bottom: 0; }
.page-header { margin-bottom: 0; }
.stat-row    { margin-bottom: 0; }
.agent-row   { margin-bottom: 0; }
.filter-bar  { margin-bottom: 0; }

/* ── Action status column ── */
.act-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  white-space: nowrap;
  font-weight: 500;
}

/* Creating — green + pulse dot */
.act-status.creating { color: #059669; font-weight: 600; }
.act-dot-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  flex-shrink: 0;
  animation: act-pulse 1.6s ease-in-out infinite;
}
@keyframes act-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* Scheduled — blue */
.act-status.scheduled { color: #2563eb; }

/* Published / page-created — green solid */
.act-status.published,
.act-status.page-created { color: #059669; font-weight: 600; }

/* Skipped — gray */
.act-status.skipped { color: #9ca3af; font-weight: 400; }

/* Manual — button */
.btn-add-page {
  padding: 4px 12px;
  border: 1px solid #2563eb;
  border-radius: 6px;
  background: #fff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.btn-add-page:hover {
  background: #2563eb;
  color: #fff;
}

/* Monitoring — mid-gray */
.act-status.monitoring { color: #9ca3af; }

/* No action — very light */
.act-status.no-action { color: #d1d5db; }

/* Manual pending — orange */
.act-status.manual-pending { color: #d97706; font-weight: 600; gap: 7px; }
.btn-mark-done {
  padding: 2px 9px;
  border: 1px solid #d97706;
  border-radius: 5px;
  background: #fff;
  color: #d97706;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn-mark-done:hover { background: #d97706; color: #fff; }

/* Manual done — green */
.act-status.manual-done { color: #059669; font-weight: 600; }

/* Tooltip icon + popup */
.act-tip {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  color: #c4c9d0;
  cursor: default;
  margin-left: 2px;
}
.act-tip::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  right: 0;
  background: #1e293b;
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 20;
  letter-spacing: 0;
  text-transform: none;
}
.act-tip:hover::after { opacity: 1; }
</style>
