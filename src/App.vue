<template>
  <div id="app">
    <AppNav />
    <AppSubNav />
    <RouterView />
    <DevStateToggle />
    <QuotaExhaustedModal />
  </div>
</template>

<script setup>
import AppNav from './components/layout/AppNav.vue'
import AppSubNav from './components/layout/AppSubNav.vue'
import DevStateToggle from './components/DevStateToggle.vue'
import QuotaExhaustedModal from './components/QuotaExhaustedModal.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
