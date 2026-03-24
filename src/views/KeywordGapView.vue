<template>
  <div class="content">
    <div class="breadcrumb">
      <RouterLink to="/performance">Performance</RouterLink>
      <span class="breadcrumb-sep">›</span>
      <span>Keyword Gap</span>
    </div>

    <div class="page-header">
      <div>
        <h1>Keyword Gap</h1>
        <div style="font-size:12px;color:#9ca3af;margin-top:3px;">Keywords your competitors rank for — that you don't</div>
      </div>
      <span class="page-header-meta">Last updated: Mar 11, 2026</span>
    </div>

    <div class="stat-row">
      <div class="stat-card active" @click="activeStat = 'missing'">
        <div class="stat-label">Missing</div>
        <div class="stat-value">2.1K</div>
      </div>
      <div class="stat-card" @click="activeStat = 'weak'">
        <div class="stat-label">Weak</div>
        <div class="stat-value">600</div>
      </div>
      <div class="stat-card" @click="activeStat = 'traffic'">
        <div class="stat-label">Potential Traffic</div>
        <div class="stat-value">42K</div>
      </div>
      <div class="stat-card" @click="activeStat = 'shared'">
        <div class="stat-label">Shared</div>
        <div class="stat-value">523</div>
      </div>
      <div class="stat-card-empty"></div>
    </div>

    <div class="tab-bar">
      <div class="tabs">
        <div
          v-for="tab in ['Opportunities', 'Missing', 'Weak', 'Shared', 'Unique', 'All']"
          :key="tab"
          class="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </div>
      </div>
      <div class="results-count">1,234 results</div>
    </div>

    <div class="kw-table-wrap">
      <table class="kw-table">
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Intent</th>
            <th style="text-align:center">You</th>
            <th style="text-align:center">AGENT 1 <span class="sort-arrow">↓</span></th>
            <th style="text-align:center">AGENT 2 <span class="sort-arrow">↕</span></th>
            <th style="text-align:center">AGENT 3 <span class="sort-arrow">↕</span></th>
            <th style="text-align:center">AGENT 4 <span class="sort-arrow">↕</span></th>
            <th style="text-align:center">AGENT 5 <span class="sort-arrow">↕</span></th>
            <th style="text-align:right">Volume <span class="sort-arrow">↕</span></th>
            <th>Difficulty <span class="sort-arrow">↕</span></th>
            <th style="text-align:right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in keywordRows" :key="i" :class="{ 'row-highlight': row.highlight }">
            <td class="td-keyword">{{ row.kw }}</td>
            <td class="td-intent"><span class="intent-tag">{{ row.intent }}</span></td>
            <td class="td-you">{{ row.you }}</td>
            <td v-for="(agent, j) in row.agents" :key="j" class="td-agent" :class="{ best: j === 0 }">
              {{ agent }}
            </td>
            <td class="td-vol">{{ row.vol }}</td>
            <td class="td-diff">
              <div class="diff-wrap">
                <div class="diff-bar-track"><div class="diff-bar-fill" :class="row.diffClass"></div></div>
                <span class="diff-num">{{ row.diff }}</span>
              </div>
            </td>
            <td class="td-action">
              <span class="act-status" :class="resolvedAction(row).type">
                <span v-if="resolvedAction(row).type === 'creating'" class="act-dot-pulse"></span>
                <template v-if="resolvedAction(row).type === 'creating'">Creating blog...</template>
                <template v-else-if="resolvedAction(row).type === 'scheduled'">◷ Scheduled · {{ row.action.date }}</template>
                <template v-else-if="resolvedAction(row).type === 'published'">✓ Blog published</template>
                <template v-else-if="resolvedAction(row).type === 'skipped'">
                  — Skipped
                  <span class="act-tip" :data-tip="row.action.reason">ⓘ</span>
                </template>
                <template v-else-if="resolvedAction(row).type === 'monitoring'">
                  ◉ Monitoring
                  <span v-if="row.action.reason" class="act-tip" :data-tip="row.action.reason">ⓘ</span>
                </template>
                <template v-else-if="resolvedAction(row).type === 'no-action'">—</template>
                <!-- Manual mode: awaiting manual -->
                <template v-else-if="resolvedAction(row).type === 'manual-pending'">
                  ⏸ Paused. Write it manually
                  <button class="btn-mark-done" @click.stop="markDone(row.kw)">Mark done</button>
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

const activeStat = ref('missing')
const activeTab = ref('Opportunities')

// In manual mode, convert creating/scheduled blog tasks to manual-pending
function resolvedAction(row) {
  if (userState.blogMode !== 'manual') return row.action
  if (['creating', 'scheduled'].includes(row.action.type)) {
    if (userState.manuallyCompleted.includes(row.kw)) {
      return { type: 'manual-done' }
    }
    return { type: 'manual-pending' }
  }
  return row.action
}

function markDone(kw) {
  if (!userState.manuallyCompleted.includes(kw)) {
    userState.manuallyCompleted.push(kw)
  }
}

const keywordRows = [
  { kw: 'homes for sale beverly hills',       intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'creating' } },
  { kw: 'luxury real estate los angeles',      intent: 'Commercial',    you: '-', agents: [8, 15, 42, 3, 21], vol: '3.2K', diff: 52, diffClass: 'mid', highlight: true,
    action: { type: 'scheduled', date: 'Apr 5' } },
  { kw: 'real estate agent malibu',            intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'published' } },
  { kw: 'buy house west hollywood',            intent: 'Transactional', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'skipped', reason: 'too competitive' } },
  { kw: 'bel air property listings',           intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'skipped', reason: 'out of service area' } },
  { kw: 'sunset strip condos for sale',        intent: 'Transactional', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 68, diffClass: 'high',
    action: { type: 'monitoring', reason: 'Difficulty too high right now — watching for changes' } },
  { kw: 'hollywood hills real estate',         intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'scheduled', date: 'Apr 8' } },
  { kw: 'santa monica homes for sale',         intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '2.4K', diff: 45, diffClass: 'mid',
    action: { type: 'skipped', reason: 'low traffic potential' } },
  { kw: 'pasadena luxury homes',               intent: 'Commercial',    you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'monitoring' } },
  { kw: 'top real estate agents los angeles',  intent: 'Informational', you: '-', agents: [6, 12, 56, 0, 32], vol: '1.9K', diff: 34, diffClass: 'low',
    action: { type: 'skipped', reason: 'similar content exists' } },
]
</script>

<style scoped>
/* override global margin-bottom so .content gap controls spacing */
.breadcrumb { margin-bottom: 0; }
.page-header { margin-bottom: 0; }
.stat-row    { margin-bottom: 0; }
.tab-bar     { margin-bottom: 0; }
.agent-row   { margin-bottom: 0; }

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

/* Published — green solid */
.act-status.published { color: #059669; font-weight: 600; }

/* Skipped — gray */
.act-status.skipped { color: #9ca3af; font-weight: 400; }

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
