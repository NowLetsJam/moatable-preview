<template>
  <div class="insight-card">
    <div class="insight-card-title">🔍 Keyword Opportunities</div>
    <div class="insight-stat-row">
      <div class="insight-stat-big">18</div>
      <div class="insight-stat-label">gaps identified</div>
    </div>
    <div class="insight-progress">
      <span>12 executed</span>
      <div class="insight-progress-bar"><div class="insight-progress-fill" style="width:67%"></div></div>
      <span style="color:#10b981;font-weight:600;">67%</span>
    </div>
    <div class="insight-result">→ +3.2K organic visits generated</div>
    <div class="insight-footer">
      <span class="insight-pending">6 pending</span>
      <RouterLink to="/keyword-gap" class="insight-link">View all →</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
</style>
