<template>
  <div class="nav-sub">
    <div class="sub-nav-items">
      <RouterLink to="/setup" class="sub-nav-item" active-class="active">Setup</RouterLink>
      <RouterLink to="/performance" class="sub-nav-item" active-class="active">Performance</RouterLink>
      <RouterLink v-if="showActivities" to="/activities" class="sub-nav-item" active-class="active">Activities</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { userState } from '../../store/user.js'

// Activities tab only visible when user is paid AND has completed setup
const showActivities = computed(() => userState.isPaid && userState.hasCompetitors)
</script>

<style scoped>
</style>
