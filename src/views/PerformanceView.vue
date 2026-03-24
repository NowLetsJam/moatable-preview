<template>
  <!-- Unpaid: show landing page -->
  <SeoBoosterLandingView v-if="!userState.isPaid" @upgrade="userState.isPaid = true" />

  <!-- Paid but onboarding incomplete -->
  <OnboardingView v-else-if="!userState.hasCompetitors" />

  <!-- Dashboard -->
  <div v-else>
    <PerformanceBanner />

    <div class="content">
      <!-- ROW 1 · Market Share (large) | Agent Plan (small) -->
      <div class="row row-main" style="margin-top: 40px;">
        <div class="col-main-large">
          <AgentLeaderboard />
        </div>
        <div class="col-main-small">
          <AgentPlanCard />
        </div>
      </div>

      <!-- ROW 2 · Traffic (full width) -->
      <TrafficChart />

      <!-- ROW 3 · AEO summary row (collapsible) -->
      <AeoCard />

      <!-- ROW 4 · Keyword Rankings (with gap entry points in footer) -->
      <KeywordRankingsTable />
    </div>
  </div>
</template>

<script setup>
import { userState } from '../store/user.js'
import SeoBoosterLandingView from './SeoBoosterLandingView.vue'
import OnboardingView from './OnboardingView.vue'
import PerformanceBanner from '../components/PerformanceBanner.vue'
import AgentLeaderboard from '../components/AgentLeaderboard.vue'
import AgentPlanCard from '../components/AgentPlanCard.vue'
import TrafficChart from '../components/TrafficChart.vue'
import AeoCard from '../components/AeoCard.vue'
import KeywordRankingsTable from '../components/KeywordRankingsTable.vue'
</script>

<style scoped>
.row-main {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 14px;
}
.col-main-large {
  min-width: 0;
}
.col-main-small {
  min-width: 0;
}
</style>
