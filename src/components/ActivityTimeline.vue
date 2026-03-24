<template>
  <div>
    <!-- Filter bar -->
    <div class="act-filter-bar">
      <button
        v-for="f in filtersWithCount"
        :key="f.key"
        class="act-filter-btn"
        :class="{ active: activeFilter === f.key }"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
        <span class="act-filter-count">{{ f.count }}</span>
      </button>
    </div>

    <!-- Scrollable container -->
    <div class="act-scroll" ref="scrollBox">

      <!-- ── THIS WEEK: Scheduled (grouped by date) ── -->
      <template v-for="group in filteredQueuedGroups" :key="'qg-' + group.dateKey">
        <div class="act-date-header">
          <span class="act-date-dot"></span>
          <span>{{ group.dateLabel }}</span>
        </div>
        <div
          v-for="task in group.items"
          :key="'q-' + task.id"
          class="act-card"
        >
          <div class="act-card-main">
            <div class="act-card-body">
              <div class="act-card-top">
                <span class="act-tag" style="color: gray;background: #f2f2f2;">{{ task.badge }}</span>
                <span v-if="task.agent" class="act-card-agent">{{ task.agent }}</span>
              </div>
              <div class="act-blog-title-text">{{ task.task }}</div>
            </div>
          </div>
          <div class="act-card-bottom">
            <span class="act-pill scheduled">◷ Scheduled</span>
            <span v-if="task.scheduledDate" class="act-sched-date">{{ task.scheduledDate }}</span>
            <div v-if="task.why" class="act-why-wrap">
              <button class="act-why-btn" @click="toggle('q-' + task.id)">
                {{ open.has('q-' + task.id) ? '▾ Hide reasoning' : '▸ Why?' }}
              </button>
            </div>
          </div>
          <div v-if="task.why && open.has('q-' + task.id)" class="act-why-body">
            {{ task.why }}
          </div>
        </div>
      </template>

      <!-- ── THIS WEEK: Running ── -->
      <template v-if="filteredInProgress.length">
        <div class="act-date-header" ref="nowMarker">
          <span class="act-date-dot act-date-dot--now"></span>
          <span>{{ todayLabel }}</span>
        </div>
        <div
          v-for="task in filteredInProgress"
          :key="'ip-' + task.id"
          class="act-card running"
        >
          <div class="act-card-main">
            <div class="act-card-body">
              <div class="act-card-top">
                <span class="act-tag" style="color: gray;background: #f2f2f2;">{{ task.badge }}</span>
                <span v-if="task.agent" class="act-card-agent">{{ task.agent }}</span>
              </div>
              <div class="act-blog-title-text">{{ task.task }}</div>
            </div>
          </div>
          <div class="act-card-bottom">
            <span class="act-pill running">
              <span class="act-chip-dot"></span>Running
            </span>
            <div v-if="task.why" class="act-why-wrap">
              <button class="act-why-btn" @click="toggle('ip-' + task.id)">
                {{ open.has('ip-' + task.id) ? '▾ Hide reasoning' : '▸ Why?' }}
              </button>
            </div>
          </div>
          <div v-if="task.why && open.has('ip-' + task.id)" class="act-why-body">
            {{ task.why }}
          </div>
        </div>
      </template>

      <!-- ── Historical: grouped by day ── -->
      <template v-for="group in filteredGroups" :key="group.dayKey">
        <div class="act-date-header">
          <span class="act-date-dot"></span>
          <span>{{ group.dayLabel }}</span>
        </div>

        <div
          v-for="(item, idx) in group.items"
          :key="`${item.date}-${item.month}-${idx}`"
          class="act-card done"
        >
          <div class="act-card-main">
            <div class="act-card-body">
              <div class="act-card-top">
                <span class="act-tag" style="color: gray;background: #f2f2f2;">{{ item.badge }}</span>
                <span v-if="item.agent" class="act-card-agent">{{ item.agent }}</span>
              </div>
              <div style="display: flex; flex-direction: row; gap: 20px;">
                    <!-- Blog post thumbnail (left side) -->
                    <a v-if="item.blogPost" :href="item.blogPost.url" class="act-thumb">
                      <img class="act-thumb-img" src="https://cdn.lofty.com/image/fs/web-site/2026316/17/5b4d0f58-4a61-4289-afda-d61f5e67e825/sample.png" alt="" />
                    </a>
                    <div>
                      <div class="act-card-action">{{ item.action }}</div>
                      <div v-if="item.blogPost" class="act-blog-title-text">{{ item.blogPost.title }}</div>
                      <div v-if="item.blogPost" class="act-blog-title-desc">
                          Having years of experience on the market, we’ve learned how important a trustworthy mortgage lender is during your real estate journey. Put your faith in a leading lender awarded for the exquisite customer service and appreciated for the competitive offers. Choose the business that pair knowledge, individual approach, and integrity, taking care of the most satisfactory results for you.
                      </div>
                    </div>
              </div>
             
            </div>
          </div>

          <!-- Bottom row: pill + link + why -->
          <div class="act-card-bottom">
            <span v-if="item.blogPost" class="act-pill done">✓ Published</span>
            <span v-else class="act-pill competitive">✓ Done</span>
            <RouterLink v-if="item.link" :to="item.link.url" class="act-card-link">{{ item.link.label }}</RouterLink>
            <div v-if="item.reason" class="act-why-wrap">
              <button class="act-why-btn" @click="toggle(item.date + item.month + idx)">
                {{ open.has(item.date + item.month + idx) ? '▾ Hide reasoning' : '▸ Why?' }}
              </button>
            </div>
          </div>

          <div v-if="item.reason && open.has(item.date + item.month + idx)" class="act-why-body">
            {{ item.reason }}
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { TIMELINE_DATA, ACTIVITY_FILTER_TYPES, getTypeColor } from '../data/activities.js'
import { AGENT_PLAN } from '../data/agentPlan.js'

// ── Pure helpers (defined first, no TDZ risk) ──────────────────────────────

const MONTH_MAP = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 }

function getDayLabel(date, month) {
  const d = new Date(2026, MONTH_MAP[month], date)
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  return `${weekday}, ${month} ${date}`
}

function badgeBg(type) {
  const map = { content: '#f5f3ff', technical: '#fef3c7', ai: '#eff6ff', competitive: '#ecfdf5' }
  return map[type] || '#f9fafb'
}

// ── Reactive state ─────────────────────────────────────────────────────────

const activeFilter = ref('all')
const open = ref(new Set())
const scrollBox = ref(null)
const nowMarker = ref(null)

// ── Non-reactive constants that use helpers ────────────────────────────────

const todayLabel = getDayLabel(20, 'Mar')

// ── Methods ────────────────────────────────────────────────────────────────

function toggle(key) {
  const s = new Set(open.value)
  s.has(key) ? s.delete(key) : s.add(key)
  open.value = s
}

function matchesFilter(item) {
  return activeFilter.value === 'all' || item.type === activeFilter.value
}

// ── Computeds ──────────────────────────────────────────────────────────────

const filteredQueued     = computed(() => AGENT_PLAN.queued.filter(matchesFilter))
const filteredInProgress = computed(() => AGENT_PLAN.inProgress.filter(matchesFilter))
const thisWeekItems      = computed(() => [...filteredQueued.value, ...filteredInProgress.value])

const filteredQueuedGroups = computed(() => {
  const map = {}
  filteredQueued.value.forEach(task => {
    const key = task.scheduledDate || 'TBD'
    if (!map[key]) {
      const [month, day] = (task.scheduledDate || '').split(' ')
      map[key] = { dateKey: key, dateLabel: getDayLabel(parseInt(day), month), items: [] }
    }
    map[key].items.push(task)
  })
  return Object.values(map)
})

const filtersWithCount = computed(() =>
  ACTIVITY_FILTER_TYPES.map(f => {
    const histCount    = f.key === 'all' ? TIMELINE_DATA.length : TIMELINE_DATA.filter(i => i.type === f.key).length
    const queuedCount  = AGENT_PLAN.queued.filter(i => f.key === 'all' || i.type === f.key).length
    const runningCount = AGENT_PLAN.inProgress.filter(i => f.key === 'all' || i.type === f.key).length
    return { ...f, count: histCount + queuedCount + runningCount }
  })
)

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? TIMELINE_DATA
    : TIMELINE_DATA.filter(i => i.type === activeFilter.value)
)

const filteredGroups = computed(() => {
  const map = {}
  filtered.value.forEach(item => {
    const key = `${item.month}-${item.date}`
    if (!map[key]) map[key] = {
      dayKey: key,
      dayLabel: getDayLabel(item.date, item.month),
      items: []
    }
    map[key].items.push(item)
  })
  return Object.values(map)
})

// ── Lifecycle ──────────────────────────────────────────────────────────────

onMounted(async () => {
  // Pre-open all why/reason panels
  const keys = new Set()
  AGENT_PLAN.queued.forEach(t => { if (t.why) keys.add('q-' + t.id) })
  AGENT_PLAN.inProgress.forEach(t => { if (t.why) keys.add('ip-' + t.id) })
  TIMELINE_DATA.forEach((item, idx) => { if (item.reason) keys.add(item.date + item.month + idx) })
  open.value = keys

  await nextTick()
  if (scrollBox.value && nowMarker.value) {
    scrollBox.value.scrollTop = nowMarker.value.offsetTop - scrollBox.value.offsetTop - 16
  }
})
</script>

<style scoped>
/* ── Filter bar ── */
.act-filter-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.act-filter-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.act-filter-btn:hover { border-color: #2563eb; color: #2563eb; }
.act-filter-btn.active { background: #2563eb; border-color: #2563eb; color: #fff; }
.act-filter-count { font-size: 11px; opacity: 0.7; }
.act-filter-btn.active .act-filter-count { opacity: 0.85; }

/* ── Scroll container ── */
.act-scroll {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc( 100vh - 200px );
  overflow-y: auto;
  padding-right: 4px;
  padding-left: 26px;
  position: relative;
}
/* The vertical timeline line */
.act-scroll::before {
  content: '';
  position: absolute;
  left: 9px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: #e9eaec;
  border-radius: 1px;
}
.act-scroll::-webkit-scrollbar { width: 3px; }
.act-scroll::-webkit-scrollbar-track { background: transparent; }
.act-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }

/* ── Date section header ── */
.act-date-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.3px;
  margin-top: 6px;
  position: relative;
}
/* Dot sits on the timeline line */
.act-date-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #3b82f6;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1.5px #3b82f6;
  position: absolute;
  left: -21px;
  top: 50%;
  transform: translateY(-50%);
}
.act-date-dot--now {
  background: #22c55e;
  box-shadow: 0 0 0 1.5px #22c55e;
}


/* ── Card ── */
.act-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 14px 16px 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.15s, border-color 0.15s;
}
.act-card:hover {
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
  border-color: #e5e7eb;
}
.act-card.running {
  border-color: #bbf7d0;
  background: #f8fffe;
}
.act-card.done {
  border-color: #f0f0f0;
}

/* ── Card main row (thumb + body) ── */
.act-card-main {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 10px;
}

/* Thumbnail (blog posts only) */
.act-thumb {
  display: block;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9eaec;
  text-decoration: none;
  transition: border-color 0.15s, opacity 0.15s;
}
.act-thumb:hover {
  border-color: #93c5fd;
  opacity: 0.9;
}
.act-thumb-img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

/* Body (flex: 1) */
.act-card-body { flex: 1; min-width: 0; }

/* Card top row: tag + agent */
.act-card-top {
  display: flex;
  align-items: center;
  gap: 7px;
}
.act-tag {
    padding: 5px 10px;
    border-radius: 8px 0 6px 0;
    flex-shrink: 0;
    position: relative;
    top: -14px;
    left: -17px;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.8px;
    text-transform: uppercase;
}
.act-card-agent {
  font-size: 11px;
  color: #b0b7c3;
  font-weight: 400;
}

/* Action title */
.act-card-action {
  font-size: 12px;
  color: #6b7280;
  margin: 3px 0 8px 0;
}

/* Blog post title text (below action) */
.act-blog-title-text {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.5;  

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.act-blog-title-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 10px 0;
  line-height: 1.8;

}

/* ── Card bottom row: pill + meta/why ── */
.act-card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #f4f4f4;
}

/* Status pills */
.act-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  flex-shrink: 0;
}
.act-pill.scheduled { background: #eff6ff; color: #3b82f6; }
.act-sched-date {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 20px;
}
.act-pill.running   { background: #dcfce7; color: #16a34a; }
.act-pill.done        { background: #f0fdf4; color: #059669; }
.act-pill.competitive { background: #f0fdf4; color: #059669; }
.act-card-link {
  font-size: 11px;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  margin-left: 4px;
}
.act-card-link:hover { text-decoration: underline; }

.act-chip-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #22c55e;
  animation: chip-pulse 1.6s ease-in-out infinite;
}
@keyframes chip-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* Meta text (impact / eta) */
.act-card-meta {
  font-size: 11px;
  color: #b0b7c3;
  margin-left: auto;
}
.act-card-meta.running { color: #34d399; }

/* Why did the agent do this? */
.act-why-wrap { margin-left: auto; }
.act-why-btn {
  background: none;
  border: none;
  font-size: 11px;
  color: #c4c9d4;
  cursor: pointer;
  padding: 0;
  font-weight: 500;
  transition: color 0.15s;
}
.act-why-btn:hover { color: #3b82f6; }
.act-why-body {
  margin-top: 8px;
  font-size: 11.5px;
  color: #6b7280;
  line-height: 1.65;
  border-left: 2px solid #e9eaec;
  padding-left: 12px;
  padding-bottom: 2px;
}
</style>
