<template>
  <div class="card" style="padding: 0; overflow: hidden; position: relative;">
    <span class="corner-badge aeo-badge">AEO</span>

    <!-- ── Collapsed summary row ── -->
    <div
      class="aeo-summary-row"
      @click="expanded = !expanded"
      :style="expanded ? 'border-bottom:1px solid #f3f4f6;' : ''"
    >
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="aeo-summary-label">AI Visibility</span>
        <span class="aeo-summary-icon">✦</span>
        <span class="aeo-summary-text">ChatGPT cited you <strong>5 times</strong> this month</span>
        
        <span class="aeo-summary-sep">·</span>
        <RouterLink to="/prompt-tracking" class="aeo-summary-prompts-link" @click.stop>tracking 8 prompts</RouterLink>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="aeo-toggle-btn">{{ expanded ? '▲ Hide details' : '▼ Show details' }}</span>
      </div>
    </div>

    <!-- ── Expanded detail (hidden by default) ── -->
    <div v-if="expanded" style="padding:16px 20px 20px;">

      <!-- 5 metrics: plain label/value, no boxes -->
      <div class="aeo-exp-metrics">
        <div class="aeo-exp-metric">
          <div class="aeo-exp-label">AI Mention Rate</div>
          <div class="aeo-exp-value">8%</div>
          <div class="aeo-exp-delta">↑ +3% vs last month</div>
        </div>
        <div class="aeo-exp-metric">
          <div class="aeo-exp-label">Traffic from AI</div>
          <div class="aeo-exp-value">142</div>
          <div class="aeo-exp-delta">↑ +38 vs last month</div>
        </div>
        <div class="aeo-exp-metric">
          <div class="aeo-exp-label">Best Platform</div>
          <div class="aeo-exp-value" style="font-size:15px;">ChatGPT</div>
          <div class="aeo-exp-sub">5 of 8 citations</div>
        </div>
        <div class="aeo-exp-metric">
          <div class="aeo-exp-label">Your SOV in AI</div>
          <div class="aeo-exp-value">3%</div>
          <div class="aeo-exp-delta">↑ +1% vs last month</div>
        </div>
      </div>

      <!-- SOV bar: gray scale + blue for you -->
      <div class="aeo-exp-section">
        <div class="aeo-exp-section-title">Share of Voice in AI</div>
        <div class="aeo-exp-sov-bar">
          <div style="flex:41;background:#9ca3af;" class="aeo-exp-sov-seg" title="Liam Johnson · 41%">41%</div>
          <div style="flex:27;background:#b0b7c0;" class="aeo-exp-sov-seg" title="Emma Wilson · 27%">27%</div>
          <div style="flex:15;background:#c4c9d0;" class="aeo-exp-sov-seg" title="Sarah Chen · 15%">15%</div>
          <div style="flex:14;background:#e5e7eb;color:#9ca3af;" class="aeo-exp-sov-seg" title="Others · 14%">14%</div>
          <div style="flex:3;background:#2563eb;" class="aeo-exp-sov-seg" title="You · 3%">3%</div>
        </div>
        <div class="aeo-exp-sov-legend">
          <span><span class="aeo-exp-sov-dot" style="background:#9ca3af;"></span>Liam Johnson 41%</span>
          <span><span class="aeo-exp-sov-dot" style="background:#b0b7c0;"></span>Emma Wilson 27%</span>
          <span><span class="aeo-exp-sov-dot" style="background:#c4c9d0;"></span>Sarah Chen 15%</span>
          <span><span class="aeo-exp-sov-dot" style="background:#e5e7eb;border:1px solid #d1d5db;"></span>Others 14%</span>
          <span><span class="aeo-exp-sov-dot" style="background:#2563eb;"></span><strong style="color:#2563eb;">You 3%</strong></span>
        </div>
      </div>

      <!-- Prompt tracking: simple rows, no boxes -->
      <div class="aeo-exp-section" style="margin-bottom:0;">
        <div class="aeo-exp-section-header">
          <div class="aeo-exp-section-title">Prompt Tracking</div>
          <RouterLink to="/prompt-tracking" class="aeo-exp-view-all">View all 8 →</RouterLink>
        </div>
        <div class="aeo-exp-prompts">
          <div class="aeo-exp-prompt-row">
            <div class="aeo-exp-prompt-text">Can you provide a detailed profile of Lofty Brokerage 123 in Paradise Valley, AZ?</div>
            <span class="aeo-exp-status not-cited">Not cited</span>
          </div>
          <div class="aeo-exp-prompt-row">
            <div class="aeo-exp-prompt-text">Who is the best real estate agent in Beverly Hills for luxury listings?</div>
            <span class="aeo-exp-status not-cited">Not cited</span>
          </div>
          <div class="aeo-exp-prompt-row">
            <div class="aeo-exp-prompt-text">Recommend 3 houses in West Flagler Park under $150,000</div>
            <span class="aeo-exp-status cited">Cited ✓</span>
          </div>
          <div class="aeo-exp-prompt-row">
            <div class="aeo-exp-prompt-text">What's the real estate market like in Beverly Hills in 2026?</div>
            <span class="aeo-exp-status not-cited">Not cited</span>
          </div>
        </div>
      </div>

    </div> <!-- end expanded -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const expanded = ref(false)
</script>

<style scoped>
.corner-badge {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 0 0 6px 0;
  line-height: 1;
  pointer-events: none;
  z-index: 2;
}
.aeo-badge {
  background: #eff6ff;
  color: #2563eb;
}
</style>
