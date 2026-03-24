<template>
  <!-- Unpaid: show landing page -->
  <SeoBoosterLandingView v-if="!userState.isPaid" @upgrade="userState.isPaid = true" />

  <!-- Paid but onboarding incomplete -->
  <OnboardingView v-else-if="!userState.hasCompetitors" />

  <!-- Dashboard -->
  <div v-else class="content" style="flex-direction:row;">
    <ActivitySummaryCard />
    <ActivityTimeline />
  </div>
</template>

<script setup>
import { userState } from '../store/user.js'
import SeoBoosterLandingView from './SeoBoosterLandingView.vue'
import OnboardingView from './OnboardingView.vue'
import ActivitySummaryCard from '../components/ActivitySummaryCard.vue'
import ActivityTimeline from '../components/ActivityTimeline.vue'
</script>

<style scoped>
</style>
