<template>
  <div class="banner-wrap">

    <!-- Quota recovery notification banner (prioritized display, auto-disappears after 5s) -->
    <div v-if="userState.showQuotaRestoredBanner" class="banner banner-restored">
      <div class="banner-agent-status">
        <span class="banner-pulse-wrap">
          <span class="banner-pulse-ring" style="border-color:#34d399;"></span>
          <span class="banner-pulse-dot"  style="background:#34d399;"></span>
        </span>
        <span class="banner-agent-label">
          🎉 Quota restored — agent is back on track
        </span>
      </div>
      <RouterLink to="/activities" style="color:#34d399; text-decoration:none;">View plan →</RouterLink>
    </div>

    <!-- Running normally (manual mode also uses the same banner, no separate distinction) -->
    <div v-else :class="['banner', currentItem.type]">
      <div class="banner-agent-status">
        <span class="banner-pulse-wrap">
          <span class="banner-pulse-ring"></span>
          <span class="banner-pulse-dot"></span>
        </span>
        <span class="banner-agent-label">Agents running...</span>
      </div>
      <RouterLink to="/activities" style="color: lightgreen; text-decoration: none;">→</RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { BANNER_ITEMS } from '../data/banner.js'
import { userState } from '../store/user.js'

const currentIndex = ref(0)
const items = BANNER_ITEMS
const currentItem = computed(() => items[currentIndex.value])

let bannerTimer = null

const advanceBanner = () => {
  currentIndex.value = (currentIndex.value + 1) % items.length
}

const goBanner = (idx) => {
  currentIndex.value = idx
  clearInterval(bannerTimer)
  bannerTimer = setInterval(advanceBanner, 5000)
}

onMounted(() => { bannerTimer = setInterval(advanceBanner, 5000) })
onUnmounted(() => { clearInterval(bannerTimer) })
</script>

<style scoped>
.banner-restored {
  background: linear-gradient(90deg, #064e3b, #065f46) !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>
