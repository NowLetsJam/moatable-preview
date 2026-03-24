import { reactive } from 'vue'

/**
 * Global user state (prototype uses reactive, production can switch to Pinia)
 *
 * isPaid              — Whether subscribed to SEO Autopilot
 * hasCompetitors      — Whether onboarding is complete (competitors configured)
 * competitors         — List of user-selected competitors
 * prompts             — List of user-selected prompt tracking items
 *
 * blogQuota           — Total blog quota for this month (basic plan: 10 posts)
 * blogUsed            — Quota consumed this month
 * blogMode            — 'auto' | 'manual'
 *                       auto: agent auto-executes blog generation
 *                       manual: quota exhausted, user chose manual writing, agent only suggests
 * manuallyCompleted   — List of item IDs manually marked complete (keyword or url strings)
 *
 * showQuotaModal          — Whether to show "quota exhausted" modal
 * showQuotaRestoredBanner — Briefly show "restored" notification after renewal
 */
export const userState = reactive({
  isPaid: false,
  hasCompetitors: false,
  competitors: [],
  prompts: [],

  blogQuota: 10,
  blogUsed: 0,
  blogMode: 'auto',       // 'auto' | 'manual'
  manuallyCompleted: [],  // IDs of items manually marked as complete

  showQuotaModal: false,
  showQuotaRestoredBanner: false,
})
