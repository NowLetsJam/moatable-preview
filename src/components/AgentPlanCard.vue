<template>
  <div class="plan-card">

    <!-- Header -->
    <div class="plan-header">
      <div class="plan-header-left">
        <div class="plan-agent-dot-wrap">
          <span class="pulse-ring plan-pulse"></span>
          <span class="pulse-dot-inner plan-pulse-inner"></span>
        </div>
        <div class="plan-header-titles">
          <div class="plan-title-row">
            <div class="plan-title">Agent Plan</div>
            <button
              type="button"
              class="plan-settings-btn"
              aria-label="设置"
              title="设置"
              @click="$emit('open-settings')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <div class="plan-week">{{ AGENT_PLAN.weekLabel }}</div>
        </div>
      </div>
      <div class="plan-counts">
        <span class="plan-count-chip running">{{ AGENT_PLAN.inProgress.length }} running</span>
        <span class="plan-count-chip queued">{{ AGENT_PLAN.queued.length }} queued</span>
      </div>
    </div>

    <!-- Scrollable week timeline -->
    <div class="plan-scroll" ref="scrollBox">

      <!-- Upcoming: grouped by date -->
      <template v-for="group in groupedQueued" :key="'qg-' + group.dateKey">
        <div class="plan-group-label">
          <span class="plan-group-dot"></span>
          {{ group.dateLabel }}
        </div>
        <div
          v-for="task in group.items"
          :key="'q-' + task.id"
          class="plan-item"
          :class="{ 'item-manual-pending': isManualBlogTask(task) }"
        >
          <div class="plan-item-title" :class="isManualBlogTask(task) ? '' : 'muted'">
            {{ isManualBlogTask(task) ? task.task.replace(/^Scheduled to publish blog related to /i, 'Blog: ') : task.task }}
          </div>
          <div class="plan-item-bottom">
            <span v-if="isManualBlogTask(task)" class="plan-pill manual-pending">⏸ Paused. Write it manually</span>
            <span v-else class="plan-pill scheduled">◷ Scheduled</span>
          </div>
        </div>
      </template>

      <!-- NOW: today's date -->
      <div class="plan-group-label now" ref="nowMarker">
        <span class="plan-group-dot now">
          <span class="plan-dot-pulse"></span>
        </span>
        {{ todayLabel }}
      </div>
      <div
        v-for="task in AGENT_PLAN.inProgress"
        :key="'ip-' + task.id"
        class="plan-item"
        :class="isManualBlogTask(task) ? 'item-manual-pending' : 'running'"
      >
        <div class="plan-item-title" :class="isManualBlogTask(task) ? '' : ''">
          {{ isManualBlogTask(task) ? task.task.replace(/^Writing blog related to /i, 'Blog: ') : task.task }}
        </div>
        <div class="plan-item-bottom">
          <span v-if="isManualBlogTask(task)" class="plan-pill manual-pending">⏸ Paused. Write it manually</span>
          <span v-else class="plan-pill running">
            <span class="plan-chip-dot"></span>Running
          </span>
        </div>
      </div>

      <!-- Done: grouped by date -->
      <template v-for="group in groupedDone" :key="'dg-' + group.dateKey">
        <div class="plan-group-label">
          <span class="plan-group-dot"></span>
          {{ group.dateLabel }}
        </div>
        <div v-for="(item, i) in group.items" :key="'done-' + group.dateKey + i" class="plan-item done">
          <div v-if="item.blogPost" class="plan-blog-row">
            <a :href="item.blogPost.url" class="plan-thumb">
              <img src="https://cdn.lofty.com/image/fs/web-site/2026316/17/5b4d0f58-4a61-4289-afda-d61f5e67e825/sample.png" alt="" class="plan-thumb-img" />
            </a>
            <div class="plan-blog-info">
              <a :href="item.blogPost.url" class="plan-blog-title">{{ item.blogPost.title }}</a>
              <span class="plan-pill done">✓ Published</span>
            </div>
          </div>
          <div v-else class="plan-item-title muted">{{ item.action }}</div>
          <div v-if="!item.blogPost" class="plan-item-bottom">
            <span class="plan-pill done">✓ Done</span>
          </div>
        </div>
      </template>

    </div>

    <!-- Footer -->
    <div class="plan-footer">
      <RouterLink to="/activities" class="plan-view-all">View all activities →</RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { AGENT_PLAN } from '../data/agentPlan.js'
import { userState } from '../store/user.js'

defineEmits(['open-settings'])

// In manual mode, queued content tasks are treated as "pending manual"
const isManualBlogTask = (task) =>
  userState.blogMode === 'manual' && task.type === 'content'
import { TIMELINE_DATA } from '../data/activities.js'

const MONTH_MAP = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 }

const getDayLabel = (date, month) => {
  const d = new Date(2026, MONTH_MAP[month], date)
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  return `${weekday}, ${month} ${date}`
}

const parseScheduledDate = (str) => {
  // "Mar 22" → { month: 'Mar', date: 22 }
  const [month, date] = str.split(' ')
  return { month, date: parseInt(date) }
}

// Today label
const todayLabel = getDayLabel(20, 'Mar')

// Grouped upcoming (queued) by scheduledDate
const groupedQueued = computed(() => {
  const map = {}
  AGENT_PLAN.queued.forEach(task => {
    const key = task.scheduledDate || 'TBD'
    if (!map[key]) {
      const parsed = parseScheduledDate(task.scheduledDate)
      map[key] = { dateKey: key, dateLabel: getDayLabel(parsed.date, parsed.month), items: [] }
    }
    map[key].items.push(task)
  })
  return Object.values(map)
})

// Grouped done (this week) by date
const groupedDone = computed(() => {
  const map = {}
  TIMELINE_DATA
    .filter(item => item.month === 'Mar' && item.date >= 17 && item.date <= 23)
    .forEach(item => {
      const key = `${item.month}-${item.date}`
      if (!map[key]) map[key] = { dateKey: key, dateLabel: getDayLabel(item.date, item.month), items: [] }
      map[key].items.push(item)
    })
  return Object.values(map)
})

const scrollBox = ref(null)
const nowMarker = ref(null)

onMounted(async () => {
  await nextTick()
  if (scrollBox.value && nowMarker.value) {
    scrollBox.value.scrollTop = nowMarker.value.offsetTop - scrollBox.value.offsetTop - 16
  }
})

const badgeBg = (type) => {
  const map = { content: '#f5f3ff', technical: '#fef3c7', ai: '#eff6ff', competitive: '#ecfdf5' }
  return map[type] || '#f9fafb'
}

const typeColor = (type) => {
  const map = { content: '#7c3aed', technical: '#d97706', ai: '#2563eb', competitive: '#059669' }
  return map[type] || '#6b7280'
}
</script>

<style scoped>
/* ── Card shell ── */
.plan-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min(380px, calc(100vh - 220px));
  overflow: hidden;
}

/* ── Header ── */
.plan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  border-bottom: 1px solid #f4f4f4;
  flex-shrink: 0;
}
.plan-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}
.plan-header-titles {
  min-width: 0;
  flex: 1;
}
.plan-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.plan-settings-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin: -4px -4px -4px 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}
.plan-settings-btn:hover {
  color: #4b5563;
  background: #f3f4f6;
}
.plan-settings-btn:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 1px;
}
.plan-agent-dot-wrap {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.plan-pulse {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  opacity: 0.5;
  animation: pulse-ring 2s ease-out infinite;
}
.plan-pulse-inner {
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: #22c55e;
}
@keyframes pulse-ring {
  0%   { transform: scale(0.85); opacity: 0.6; }
  70%  { transform: scale(1.3);  opacity: 0; }
  100% { transform: scale(0.85); opacity: 0; }
}
.plan-title {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
}
.plan-week {
  font-size: 10.5px;
  color: #b0b7c3;
  margin-top: 1px;
}
.plan-counts {
  display: flex;
  gap: 5px;
}
.plan-count-chip {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}
.plan-count-chip.running { background: #dcfce7; color: #16a34a; }
.plan-count-chip.queued  { background: #eff6ff; color: #3b82f6; }

/* ── Scroll area ── */
.plan-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 14px 10px 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}
/* Vertical timeline line */
.plan-scroll::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: #e9eaec;
  border-radius: 1px;
}
.plan-scroll::-webkit-scrollbar { width: 3px; }
.plan-scroll::-webkit-scrollbar-track { background: transparent; }
.plan-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }

/* ── Group labels (like act-date-header) ── */
.plan-group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0.3px;
  margin-top: 4px;
  position: relative;
}
.plan-group-label.now {
  color: #16a34a;
}

/* Dot on the timeline line */
.plan-group-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #3b82f6;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1.5px #3b82f6;
  position: absolute;
  left: -23px;
  top: 50%;
  transform: translateY(-50%);
}
.plan-group-dot.now {
  background: #22c55e;
  box-shadow: 0 0 0 1.5px #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  left: -24px;
}
.plan-dot-pulse {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  animation: chip-pulse 1.6s ease-in-out infinite;
}

/* ── Item cards ── */
.plan-item {
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 9px 11px 8px;
  background: #fff;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.plan-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  border-color: #e5e7eb;
}
.plan-item.running {
  border-color: #bbf7d0;
  background: #f8fffe;
}
.plan-item.done {
  background: #fafafa;
}

/* Top row: badge + date */
.plan-item-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
}
.plan-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 5px;
}
.plan-item-date {
  font-size: 10px;
  color: #b0b7c3;
  font-weight: 500;
}

/* Task title */
.plan-item-title {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.4;
  margin-bottom: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.plan-item-title.muted { color: #9ca3af; }

/* Blog post row (thumbnail + title link) */
.plan-blog-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 7px;
}
.plan-thumb {
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9eaec;
  text-decoration: none;
  transition: opacity 0.15s;
}
.plan-thumb:hover { opacity: 0.85; }
.plan-thumb-img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  display: block;
}
.plan-blog-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.plan-blog-title {
  font-size: 12px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.4;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s;
}
.plan-blog-title:hover { color: #2563eb; }

/* Bottom row */
.plan-item-bottom {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 6px;
  border-top: 1px solid #f4f4f4;
}

/* Pills */
.plan-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  flex-shrink: 0;
  max-width: 80px;
}
.plan-pill.running        { background: #dcfce7; color: #16a34a; }
.plan-pill.scheduled      { background: #eff6ff; color: #3b82f6; }
.plan-pill.done           { background: #f0fdf4; color: #059669; }
.plan-pill.manual-pending { background: #fff7ed; color: #d97706; font-weight: 700; max-width: none; white-space: nowrap; }

/* Item card in manual-pending state */
.plan-item.item-manual-pending {
  border-color: #fde68a;
  background: #fffbeb;
}

.plan-chip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
  animation: chip-pulse 1.6s ease-in-out infinite;
}
@keyframes chip-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* ── Footer ── */
.plan-footer {
  padding: 10px 16px 14px;
  border-top: 1px solid #f4f4f4;
  text-align: center;
  flex-shrink: 0;
}
.plan-view-all {
  font-size: 11.5px;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.15s;
}
.plan-view-all:hover { color: #1d4ed8; text-decoration: underline; }
</style>
