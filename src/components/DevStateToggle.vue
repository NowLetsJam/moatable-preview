<template>
  <div class="dev-toggle">
    <div class="dev-label">DEV</div>

    <!-- User states -->
    <button
      v-for="s in userStates"
      :key="s.key"
      class="dev-btn"
      :class="{ active: currentUserKey === s.key }"
      @click="applyUser(s)"
    >{{ s.label }}</button>

    <div class="dev-divider"></div>

    <!-- Blog quota states -->
    <button
      v-for="s in quotaStates"
      :key="s.key"
      class="dev-btn quota"
      :class="{ active: currentQuotaKey === s.key }"
      @click="applyQuota(s)"
    >{{ s.label }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { userState } from '../store/user.js'

// ── User states ────────────────────────────────────
const userStates = [
  { key: 'unpaid',      label: 'Unpaid',        isPaid: false, hasCompetitors: false },
  { key: 'onboarding',  label: 'Paid · Setup',  isPaid: true,  hasCompetitors: false },
  { key: 'active',      label: 'Active',         isPaid: true,  hasCompetitors: true  },
]

const currentUserKey = computed(() => {
  if (!userState.isPaid) return 'unpaid'
  if (!userState.hasCompetitors) return 'onboarding'
  return 'active'
})

function applyUser(s) {
  userState.isPaid = s.isPaid
  userState.hasCompetitors = s.hasCompetitors
  if (!s.hasCompetitors) {
    userState.competitors = []
    userState.prompts = []
  }
}

// ── Blog quota states ──────────────────────────────
const quotaStates = [
  { key: 'quota-ok',       label: 'Quota OK'      },
  { key: 'quota-out',      label: 'Quota Out'     },
  { key: 'manual-mode',    label: 'Manual Mode'   },
  { key: 'quota-restored', label: 'Quota Renewed' },
]

const currentQuotaKey = computed(() => {
  if (userState.showQuotaRestoredBanner) return 'quota-restored'
  if (userState.blogMode === 'manual') return 'manual-mode'
  if (userState.blogUsed >= userState.blogQuota) return 'quota-out'
  return 'quota-ok'
})

function applyQuota(s) {
  userState.showQuotaModal = false
  userState.showQuotaRestoredBanner = false
  userState.blogMode = 'auto'
  userState.manuallyCompleted = []

  if (s.key === 'quota-ok') {
    userState.blogUsed = 3
  } else if (s.key === 'quota-out') {
    userState.blogUsed = userState.blogQuota
    userState.showQuotaModal = true
  } else if (s.key === 'manual-mode') {
    userState.blogUsed = userState.blogQuota
    userState.blogMode = 'manual'
  } else if (s.key === 'quota-restored') {
    // Simulate renewal in manual mode: reset quota, restore auto
    userState.blogMode = 'auto'
    userState.blogUsed = 0
    userState.showQuotaRestoredBanner = true
    setTimeout(() => { userState.showQuotaRestoredBanner = false }, 5000)
  }
}
</script>

<style scoped>
.dev-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1f2937;
  border-radius: 10px;
  padding: 7px 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  flex-wrap: wrap;
  max-width: 600px;
}
.dev-label {
  font-size: 10px;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.8px;
  margin-right: 4px;
}
.dev-btn {
  font-size: 11px;
  font-weight: 500;
  color: #9ca3af;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.dev-btn:hover { color: #fff; border-color: #6b7280; }
.dev-btn.active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}
.dev-btn.quota.active {
  background: #d97706;
  border-color: #d97706;
}
.dev-divider {
  width: 1px;
  height: 18px;
  background: #374151;
  margin: 0 2px;
  flex-shrink: 0;
}
</style>
