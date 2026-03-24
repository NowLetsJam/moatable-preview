<template>
  <div class="insight-card">
    <div class="insight-card-title">📄 Content Gaps</div>
    <div class="insight-stat-row">
      <div class="insight-stat-big">7</div>
      <div class="insight-stat-label">gaps identified</div>
    </div>
    <div class="insight-progress">
      <span>4 created</span>
      <div class="insight-progress-bar"><div class="insight-progress-fill" style="width:57%"></div></div>
      <span style="color:#10b981;font-weight:600;">57%</span>
    </div>
    <div class="insight-result">→ +1.1K organic visits from new pages</div>
    <div class="insight-footer">
      <span class="insight-pending">3 pending</span>
      <RouterLink to="/content-gaps" class="insight-link">View all →</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
</style>
