<template>

  <div class="card lb-card">

    <!-- Header -->
    <div class="card-header" style="margin-bottom:12px;">
      <div>
        <div class="card-title" style="color:#111827;">
          Market Share
        </div>

        <div style="font-size:11px;color:#9ca3af;margin-top:2px;">vs. 5 selected agents</div>
      </div>
      <span style="font-size:11px;color:#9ca3af;">Last 30 days</span>
    </div>

    <!-- Donut + callout + right panel -->
    <div class="lb-main-row">

      <!-- Donut：与 MarketShareDonutChart 复用同一套 Chart.js 样式 -->
      <MarketShareDonutChart :segments="marketPieSegments">
        <template #center>
          <div class="lb-donut-sub"></div>
        </template>
        <template #overlay>
          <div class="lb-callout-line"></div>
        </template>
      </MarketShareDonutChart>

      <!-- Right: 与 Onboarding 市场份额结果同结构/样式 -->
      <div class="lb-right">
        <div class="ms-you-stat">
          <div class="ms-you-label">Your current share</div>
          <div class="ms-you-num">3%</div>
          <div class="ms-you-context"><span class="ms-perf-badge poor">Poor performance</span></div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="lb-footer">
      <span class="lb-detail-link" @click="showModal = true">
        View competitor breakdown →
      </span>
    </div>

    <!-- Modal overlay -->
    <Teleport to="body">
      <div v-if="showModal" class="lb-modal-overlay" @click.self="showModal = false">
        <div class="lb-modal">
          <!-- Modal header -->
          <div class="lb-modal-header">
            <div>
              <div class="lb-modal-title">Competitor Breakdown</div>
              <div class="lb-modal-sub">Beverly Hills · organic search · Last 30 days</div>
            </div>
            <button class="lb-modal-close" @click="showModal = false">✕</button>
          </div>

          <!-- Table -->
          <div class="lb-modal-body">
            <div class="lb-col-header">
              <span>#</span>
              <span>Agent</span>
              <span>Traffic</span>
              <span>Keywords</span>
              <span>New Pages</span>
            </div>
            <div class="lb-row">
              <div class="lb-rank-num">1</div>
              <div><div class="lb-agent-name">Liam Johnson</div><div class="lb-agent-domain">liamjohnson.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill" style="width:100%;background:#fca5a5;"></div></div><div class="lb-num">333K</div></div>
              <div class="lb-num">33.3K</div>
              <div class="lb-num">33</div>
            </div>
            <div class="lb-row">
              <div class="lb-rank-num sm">2</div>
              <div><div class="lb-agent-name">Emma Wilson</div><div class="lb-agent-domain">emmawilson.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill" style="width:66%;background:#fca5a5;"></div></div><div class="lb-num">222K</div></div>
              <div class="lb-num">22.3K</div>
              <div class="lb-num">28</div>
            </div>
            <div class="lb-row">
              <div class="lb-rank-num sm">3</div>
              <div><div class="lb-agent-name">Sarah Chen</div><div class="lb-agent-domain">sarahchen.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill" style="width:38%;background:#fca5a5;"></div></div><div class="lb-num">127K</div></div>
              <div class="lb-num">14.2K</div>
              <div class="lb-num">21</div>
            </div>
            <div class="lb-row">
              <div class="lb-rank-num sm">4</div>
              <div><div class="lb-agent-name">Tracy Tutor</div><div class="lb-agent-domain">tracytutor.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill" style="width:26%;background:#fca5a5;"></div></div><div class="lb-num">87K</div></div>
              <div class="lb-num">10.8K</div>
              <div class="lb-num">14</div>
            </div>
            <div class="lb-row">
              <div class="lb-rank-num sm">5</div>
              <div><div class="lb-agent-name">The Altman Brothers</div><div class="lb-agent-domain">thealtmanbrothers.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill" style="width:17%;background:#fca5a5;"></div></div><div class="lb-num">57K</div></div>
              <div class="lb-num">7.1K</div>
              <div class="lb-num">9</div>
            </div>
            <div class="lb-row you-row">
              <div class="lb-rank-num sm">6</div>
              <div><div class="lb-agent-name">YOU</div><div class="lb-agent-domain">yourdomain.com</div></div>
              <div class="lb-traffic-cell"><div class="lb-bar-track"><div class="lb-bar-fill you-fill" style="width:3%;"></div></div><div class="lb-num">&lt;10K</div></div>
              <div class="lb-num">1.2K</div>
              <div class="lb-num">4</div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarketShareDonutChart from './MarketShareDonutChart.vue'

const showModal = ref(false)

const marketPieSegments = [
  { label: 'Liam Johnson', value: 41, color: '#b91c1c' },
  { label: 'Emma Wilson', value: 27, color: '#dc2626' },
  { label: 'Sarah Chen', value: 15, color: '#f87171' },
  { label: 'Others', value: 14, color: '#fecaca' },
  { label: 'YOU', value: 3, color: '#1d4ed8' },
]
</script>

<style scoped>
.lb-card { padding: 20px; max-width: 600px; width: 100%; }

/* ── Info tooltip ── */
.info-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}
.info-icon {
  color: #9ca3af;
  cursor: default;
  font-size: 13px;
  line-height: 1;
}
.info-tooltip {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  width: 360px;
  background: #1f2937;
  color: #e5e7eb;
  border-radius: 10px;
  padding: 13px 15px;
  font-size: 11.5px;
  line-height: 1.6;
  box-shadow: 0 8px 24px rgba(0,0,0,0.22);
  z-index: 100;
  pointer-events: none;
}
.info-tooltip p {
  margin: 0 0 8px;
  color: #d1d5db;
}
.info-tooltip-title {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.info-tooltip-section-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 10px 0 4px;
}
.info-tooltip-section-label:first-of-type { margin-top: 0; }
.info-tooltip-formula {
  background: #374151;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #93c5fd;
  margin: 4px 0 8px;
  text-align: center;
}
/* Arrow */
.info-tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 12px;
  border: 6px solid transparent;
  border-bottom-color: #1f2937;
}
.info-wrap:hover .info-tooltip {
  display: block;
}

/* Donut + right panel */
.lb-main-row {
  display: flex;
  gap: 0;
  align-items: center;
  justify-content: center;
  position: relative;
}

.lb-donut-sub {
  font-size: 10px;
  color: #d1d5db;
  white-space: nowrap;
}

.lb-callout-line {
  position: absolute;
  right: -28px;
  top: 50%;
  width: 28px;
  height: 2px;
  background: #1d4ed8;
  transform: translateY(-50%);
}
.lb-callout-line::after {
  content: '';
  position: absolute;
  right: -1px;
  top: -4px;
  width: 0; height: 0;
  border-left: 8px solid #1d4ed8;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.lb-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 36px;
}

/* 与 OnboardingView 市场份额 ms-you-* 一致 */
.ms-you-stat { margin-bottom: 20px; }
.ms-you-label {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.ms-you-num {
  font-size: 36px;
  font-weight: 900;
  color: #1d4ed8;
  line-height: 1;
  margin-bottom: 6px;
}
.ms-you-context { font-size: 13px; color: #6b7280; }
.ms-perf-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.ms-perf-badge.poor { background: #fef2f2; color: #b91c1c; }

/* Footer */
.lb-footer {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}
.lb-detail-link {
  font-size: 11px;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.15s;
  user-select: none;
}
.lb-detail-link:hover { color: #2563eb; }

/* ── Modal ── */
.lb-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lb-modal {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  width: 640px;
  max-width: 92vw;
  overflow: hidden;
}
.lb-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f3f4f6;
}
.lb-modal-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
}
.lb-modal-sub {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 3px;
}
.lb-modal-close {
  background: none;
  border: none;
  font-size: 14px;
  color: #9ca3af;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
  line-height: 1;
}
.lb-modal-close:hover { color: #111827; background: #f3f4f6; }

.lb-modal-body { padding: 4px 0 8px; }

/* Table inside modal */
.lb-col-header {
  display: grid;
  grid-template-columns: 28px 1fr 160px 80px 80px;
  gap: 8px;
  padding: 8px 24px;
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-bottom: 1px solid #f3f4f6;
}
.lb-row {
  display: grid;
  grid-template-columns: 28px 1fr 160px 80px 80px;
  gap: 8px;
  padding: 10px 24px;
  border-bottom: 1px solid #f9fafb;
  align-items: center;
  transition: background 0.1s;
}
.lb-row:last-child { border-bottom: none; }
.lb-row:hover { background: #fafafa; }
.lb-row.you-row { background: #f8faff; }
.lb-row.you-row:hover { background: #eff6ff; }
.lb-row.you-row .lb-agent-name { color: #2563eb; font-weight: 700; }

.lb-rank-num { font-size: 13px; font-weight: 700; color: #111827; }
.lb-rank-num.sm { font-size: 11px; color: #9ca3af; font-weight: 500; }
.lb-agent-name { font-size: 12px; font-weight: 600; color: #111827; }
.lb-agent-domain { font-size: 10px; color: #9ca3af; margin-top: 1px; }

.lb-traffic-cell { display: flex; align-items: center; gap: 8px; }
.lb-bar-track {
  flex: 1;
  height: 4px;
  background: #f3f4f6;
  border-radius: 2px;
  overflow: hidden;
}
.lb-bar-fill { height: 100%; border-radius: 2px; background: #d1d5db; }
.you-fill { background: #93c5fd !important; }
.lb-num { font-size: 11px; color: #374151; font-weight: 500; }
</style>
