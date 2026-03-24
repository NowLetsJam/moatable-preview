<template>
  <div class="landing-wrap">
    <div class="landing-inner">

      <!-- Hero -->
      <div class="landing-hero">
        <div class="landing-badge">SEO Autopilot</div>
        <h1 class="landing-h1">Help more buyers find you<br>on Google</h1>
        <p class="landing-sub">Your competitors are seizing search rankings. Performance panel lets you see your position in your area in real-time—which keywords are rising, which competitors are closing in, whether you're mentioned in AI search.</p>
        <button class="btn-primary landing-cta" @click="$emit('upgrade')">
          Contact sales
        </button>
      </div>

      <!-- Preview screenshot (blurred overlay) -->
      <div class="landing-preview-wrap">
        <div class="landing-preview-blur">
          <!-- Simulated card skeleton -->
          <div class="preview-row">
            <div class="preview-card large">
              <div class="preview-donut"></div>
              <div class="preview-lines">
                <div class="preview-line w80"></div>
                <div class="preview-line w50"></div>
                <div class="preview-line w65"></div>
              </div>
            </div>
            <div class="preview-card small">
              <div class="preview-line w70"></div>
              <div class="preview-line w90"></div>
              <div class="preview-line w55"></div>
              <div class="preview-line w80"></div>
              <div class="preview-line w40"></div>
            </div>
          </div>
          <div class="preview-card full">
            <div class="preview-chart-bar" v-for="i in 12" :key="i" :style="{ height: barH(i) + 'px' }"></div>
          </div>
        </div>
        <div class="landing-lock-overlay">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">Unlock complete dashboard after subscribing</div>
        </div>
      </div>

      <!-- Feature highlights -->
      <div class="landing-features">
        <div class="feature-item" v-for="f in features" :key="f.icon">
          <div class="feature-icon">{{ f.icon }}</div>
          <div>
            <div class="feature-title">{{ f.title }}</div>
            <div class="feature-desc">{{ f.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Social proof -->
      <div class="landing-social">
        <span class="social-num">1,200+</span>
        <span class="social-text">real estate agents using SEO Autopilot to track competitors</span>
      </div>

      <!-- Competitor comparison table -->
      <div class="landing-compare">
        <div class="compare-title">Why choose Lofty SEO?</div>
        <table class="compare-table">
          <thead>
            <tr>
              <th></th>
              <th>Placester</th>
              <th>Luxury Presence</th>
              <th class="col-lofty">Lofty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label">
              <td class="compare-label">{{ row.label }}</td>
              <td><span :class="row.p ? 'check' : 'cross'">{{ row.p ? '✓' : '✗' }}</span></td>
              <td><span :class="row.lp ? 'check' : 'cross'">{{ row.lp ? '✓' : '✗' }}</span></td>
              <td class="col-lofty"><span class="check">✓</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bottom CTA -->
      <div class="landing-bottom-cta">
        <button class="btn-primary" @click="$emit('upgrade')">Start 14-day free trial</button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineEmits(['upgrade'])

const features = [
  { icon: '📊', title: 'Market share at a glance', desc: 'See in real-time your ranking position in your area, who\'s ahead, and by how much' },
  { icon: '📈', title: 'Traffic growth visualization',   desc: 'Organic search, AI citations, and other sources tracked separately. See the impact of each optimization' },
  { icon: '🤖', title: 'Complete AI era coverage',   desc: 'Buyers use more than Google. We track your visibility in ChatGPT, Perplexity and others' },
]

const compareRows = [
  { label: 'Keyword gap analysis', p: false, lp: false },
  { label: 'SEO auto-execution',   p: false, lp: false },
  { label: 'AI citation tracking',    p: false, lp: false },
  { label: 'Competitor real-time comparison',   p: false, lp: false },
  { label: 'SEO blog writing',   p: true,  lp: false },
]

function barH(i) {
  const heights = [28, 35, 42, 38, 55, 50, 62, 58, 70, 65, 75, 80]
  return heights[i - 1] || 40
}
</script>

<style scoped>
.landing-wrap {
  min-height: calc(100vh - 100px);
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  padding: 48px 24px 80px;
}
.landing-inner {
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ── Hero ── */
.landing-hero { text-align: center; }
.landing-badge {
  display: inline-block;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.landing-h1 {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 14px;
}
.landing-sub {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto 28px;
}
.landing-cta {
  font-size: 15px;
  padding: 13px 32px;
  border-radius: 10px;
}
.btn-primary {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.landing-hint { margin-top: 10px; font-size: 12px; color: #9ca3af; }

/* ── Preview overlay ── */
.landing-preview-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}
.landing-preview-blur {
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  filter: blur(3px);
  user-select: none;
}
.preview-row { display: flex; gap: 14px; }
.preview-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 14px;
  align-items: center;
}
.preview-card.large { flex: 2; }
.preview-card.small { flex: 1; flex-direction: column; align-items: flex-start; gap: 8px; }
.preview-card.full  { flex: 1; display: flex; align-items: flex-end; gap: 6px; height: 100px; }
.preview-donut {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: conic-gradient(#2563eb 0 11%, #ef4444 11% 48%, #f97316 48% 69%, #eab308 69% 84%, #d1d5db 84% 100%);
  flex-shrink: 0;
}
.preview-lines { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.preview-line {
  height: 10px;
  background: #e5e7eb;
  border-radius: 4px;
}
.w40 { width: 40%; } .w50 { width: 50%; } .w55 { width: 55%; }
.w65 { width: 65%; } .w70 { width: 70%; } .w80 { width: 80%; }
.w90 { width: 90%; }
.preview-chart-bar {
  flex: 1;
  background: linear-gradient(to top, #2563eb, #93c5fd);
  border-radius: 3px 3px 0 0;
  opacity: 0.7;
}
.landing-lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(249, 250, 251, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.lock-icon { font-size: 28px; }
.lock-text { font-size: 14px; font-weight: 600; color: #374151; }

/* ── Feature highlights ── */
.landing-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.feature-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.feature-icon {
  font-size: 22px;
  width: 44px;
  height: 44px;
  background: #eff6ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.feature-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.feature-desc  { font-size: 13px; color: #6b7280; line-height: 1.5; }

/* ── Social proof ── */
.landing-social {
  text-align: center;
  padding: 20px;
  background: #eff6ff;
  border-radius: 12px;
}
.social-num  { font-size: 22px; font-weight: 800; color: #2563eb; margin-right: 8px; }
.social-text { font-size: 14px; color: #374151; }

/* ── Competitor comparison table ── */
.landing-compare { }
.compare-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  text-align: center;
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.compare-table th, .compare-table td {
  padding: 10px 14px;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
}
.compare-table th {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  background: #f9fafb;
}
.compare-label { text-align: left; color: #374151; font-weight: 500; }
.col-lofty { background: #eff6ff; }
.compare-table th.col-lofty { color: #2563eb; font-weight: 700; }
.check { color: #16a34a; font-weight: 700; }
.cross { color: #d1d5db; }

/* ── Bottom CTA ── */
.landing-bottom-cta { text-align: center; }
</style>
