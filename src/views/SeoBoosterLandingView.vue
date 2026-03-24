<template>
  <div class="landing-wrap">
    <div class="landing-inner">

      <!-- ── Hero ── -->
      <div class="landing-hero">
        <div class="landing-badge">SEO Booster Package</div>
        <h1 class="landing-h1">
          Help more buyers find you on
          <span class="h1-platform-wrap">
            <transition name="platform-slide" mode="out-in">
              <span
                :key="currentPlatform.name"
                class="h1-platform"
                :style="{ color: currentPlatform.color }"
              >{{ currentPlatform.name }}</span>
            </transition>
          </span>
          <br><span class="h1-accent">Fully automated.</span>
        </h1>
        <p class="landing-sub">Your AI agent handles SEO while you focus on clients. No expertise needed.</p>
        <button class="btn-primary landing-cta" @click="$emit('upgrade')">Contact sales</button>
      </div>

      <!-- ── Two-column preview (Performance + Activities) ── -->
      <div class="preview-tabs-wrap">
        <div class="preview-tab-labels">
          <span class="preview-tab-label active">Performance</span>
          <span class="preview-tab-label">Activities</span>
        </div>
        <div class="landing-preview-wrap">
          <div class="landing-preview-blur">
            <!-- Performance skeleton -->
            <div class="preview-row">
              <div class="preview-card large">
                <div class="preview-donut"></div>
                <div class="preview-lines">
                  <div class="preview-line w80"></div>
                  <div class="preview-line w50"></div>
                  <div class="preview-line w65"></div>
                  <div class="preview-line w40"></div>
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
            <!-- Activities skeleton -->
            <div class="preview-row preview-row-activities">
              <div class="preview-summary">
                <div class="preview-summary-num"></div>
                <div class="preview-summary-label"></div>
                <div class="preview-summary-grid">
                  <div class="preview-stat" v-for="i in 4" :key="i">
                    <div class="preview-stat-num"></div>
                    <div class="preview-stat-label"></div>
                  </div>
                </div>
              </div>
              <div class="preview-timeline">
                <div class="preview-tl-item" v-for="i in 4" :key="i">
                  <div class="preview-tl-dot"></div>
                  <div class="preview-tl-content">
                    <div class="preview-line" :style="{ width: tlWidths[i-1] }"></div>
                    <div class="preview-line" :style="{ width: tlWidths2[i-1] }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="landing-lock-overlay">
            <div class="lock-icon">🔒</div>
            <div class="lock-text">Unlock complete dashboard after contacting sales</div>
          </div>
        </div>
      </div>

      <!-- ── What's included ── -->
      <div class="landing-includes">
        <div class="includes-title">What's included in SEO Booster Package</div>
        <div class="includes-grid">
          <div class="include-item" v-for="f in features" :key="f.title">
            <div class="include-icon">{{ f.icon }}</div>
            <div>
              <div class="include-item-title">{{ f.title }}</div>
              <div class="include-item-desc">{{ f.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Sample execution records ── -->
      <div class="example-section">
        <div class="example-title">What agent does for you each week</div>
        <p class="example-sub">Below are real execution record samples you can see each one in the Activities panel</p>
        <div class="example-card" v-for="ex in examples" :key="ex.action">
          <div class="ex-meta">
            <span class="ex-date">{{ ex.date }}</span>
            <span class="ex-tag" :class="ex.type">{{ ex.typeLabel }}</span>
          </div>
          <div class="ex-action">{{ ex.action }}</div>
          <div class="ex-result">{{ ex.result }}</div>
        </div>
      </div>

      <!-- ── Competitor comparison ── -->
      <div class="landing-compare">
        <div class="compare-title">Why choose Lofty?</div>
        <table class="compare-table">
          <thead>
            <tr>
              <th class="th-feature"></th>
              <th>Placester</th>
              <th>Luxury Presence</th>
              <th>SEMrush</th>
              <th class="col-lofty">Lofty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label">
              <td class="compare-label">{{ row.label }}</td>
              <td><span :class="row.p  ? 'check' : 'cross'">{{ row.p  ? '✓' : '✗' }}</span></td>
              <td><span :class="row.lp ? 'check' : 'cross'">{{ row.lp ? '✓' : '✗' }}</span></td>
              <td>
                <span v-if="row.sem" class="semi">{{ row.sem }}</span>
                <span v-else class="cross">✗</span>
              </td>
              <td class="col-lofty"><span class="check">✓</span><span v-if="row.loftyNote" class="lofty-note">{{ row.loftyNote }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ── Social proof ── -->
      <div class="landing-social">
        <span class="social-num">1,200+</span>
        <span class="social-text">real estate agents using SEO Booster Package to outpace competitors</span>
      </div>

      <!-- ── Bottom CTA ── -->
      <div class="landing-bottom-cta">
        <button class="btn-primary landing-cta" @click="$emit('upgrade')">Contact sales</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
defineEmits(['upgrade'])

// ── Platform name carousel ──
const platforms = [
  { name: 'Google',  color: '#4285F4' },
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Gemini',  color: '#8B5CF6' },
  { name: 'Claude',  color: '#D97706' },
  { name: 'Bing',    color: '#0078D4' },
]
const platformIdx = ref(0)
const currentPlatform = computed(() => platforms[platformIdx.value])
let platformTimer = null
onMounted(() => {
  platformTimer = setInterval(() => {
    platformIdx.value = (platformIdx.value + 1) % platforms.length
  }, 2200)
})
onUnmounted(() => clearInterval(platformTimer))

const tlWidths  = ['75%', '60%', '85%', '50%']
const tlWidths2 = ['55%', '80%', '40%', '70%']

const features = [
  { icon: '📊', title: 'Area ranking',        desc: 'See where you stand vs. competitors in your market' },
  { icon: '📈', title: 'Traffic breakdown',   desc: 'Organic, AI referral, and other sources tracked separately' },
  { icon: '🤖', title: 'AI search presence',  desc: 'Track if you\'re cited when buyers ask ChatGPT or Perplexity' },
  { icon: '⚡', title: 'Fully automated',     desc: 'Agent writes, optimizes, and refreshes content weekly' },
  { icon: '📋', title: 'Full activity log',   desc: 'Every action logged with the reason and result' },
  { icon: '🎯', title: 'Gap analysis',        desc: 'Find keywords and topics your competitors rank for — you don\'t' },
]

const examples = [
  {
    date: 'Mar 18', type: 'content', typeLabel: 'Content',
    action: 'Published blog: "Beverly Hills School District Homes Guide"',
    result: '✓ 328 new visits in 5 days · "Beverly Hills school district homes" position 21 → 9',
  },
  {
    date: 'Mar 14', type: 'content', typeLabel: 'Content Update',
    action: 'Refreshed "Bel Air Luxury Homes Guide" — replaced 2024 pricing data with 2026 figures',
    result: '✓ Page re-crawled within 48 hrs · avg. position 11 → 6 · est. +300 impressions/mo',
  },
  {
    date: 'Mar 10', type: 'competitive', typeLabel: 'Competitive',
    action: 'Identified 8 Pasadena keywords competitor Liam Johnson ranks for — you had zero coverage',
    result: '✓ 3 new landing pages queued · est. +800 impressions/mo once indexed',
  },
]

const compareRows = [
  { label: 'Keyword gap analysis',    p: false, lp: false, sem: '$140/mo', loftyNote: '' },
  { label: 'SEO auto-execution',      p: false, lp: false, sem: null,      loftyNote: '' },
  { label: 'AI citation tracking',       p: false, lp: false, sem: '25/$99',loftyNote: '50/mo' },
  { label: 'Competitor real-time comparison',      p: false, lp: false, sem: '✓',       loftyNote: '5/mo' },
  { label: 'SEO auto blog writing',  p: true,  lp: false, sem: null,      loftyNote: '' },
  { label: 'Content gap analysis',      p: false, lp: false, sem: null,      loftyNote: '' },
]
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
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 52px;
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
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  line-height: 1.45;
  margin-bottom: 14px;
}
.h1-accent { color: #2563eb; }

/* ── Platform name carousel ── */
.h1-platform-wrap {
  display: inline-block;
  position: relative;
  width: 140px;
  text-align: center;
}
.h1-platform {
  display: inline-block;
  font-weight: 900;
}
.platform-slide-enter-active { transition: opacity 0.28s ease, transform 0.28s ease; }
.platform-slide-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; position: absolute; left: 50%; transform: translateX(-50%); }
.platform-slide-enter-from   { opacity: 0; transform: translateY(12px); }
.platform-slide-leave-to     { opacity: 0; transform: translateX(-50%) translateY(-10px); }
.landing-sub {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.65;
  max-width: 540px;
  margin: 0 auto 28px;
}
.landing-cta {
  font-size: 15px;
  padding: 13px 36px;
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

/* ── Two-column preview ── */
.preview-tabs-wrap { }
.preview-tab-labels {
  display: flex;
  gap: 0;
  margin-bottom: -1px;
}
.preview-tab-label {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  padding: 7px 16px;
  background: #e5e7eb;
  border-radius: 8px 8px 0 0;
  margin-right: 4px;
}
.preview-tab-label.active {
  background: #fff;
  color: #2563eb;
  border: 1px solid #e5e7eb;
  border-bottom-color: #fff;
  position: relative;
  z-index: 1;
}
.landing-preview-wrap {
  position: relative;
  border-radius: 0 12px 12px 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.09);
  border: 1px solid #e5e7eb;
}
.landing-preview-blur {
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  filter: blur(3px);
  user-select: none;
}
.preview-row { display: flex; gap: 14px; }
.preview-row-activities { padding-top: 4px; border-top: 1px solid #f3f4f6; }
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
.preview-donut {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: conic-gradient(#2563eb 0 11%, #ef4444 11% 48%, #f97316 48% 69%, #eab308 69% 84%, #d1d5db 84% 100%);
  flex-shrink: 0;
}
.preview-lines { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.preview-line { height: 10px; background: #e5e7eb; border-radius: 4px; }
.w40 { width: 40%; } .w50 { width: 50%; } .w55 { width: 55%; }
.w65 { width: 65%; } .w70 { width: 70%; } .w80 { width: 80%; } .w90 { width: 90%; }
.preview-summary {
  width: 180px; flex-shrink: 0;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  border-radius: 10px; padding: 16px;
}
.preview-summary-num { width: 50px; height: 26px; background: rgba(255,255,255,0.3); border-radius: 5px; margin-bottom: 6px; }
.preview-summary-label { width: 90px; height: 10px; background: rgba(255,255,255,0.2); border-radius: 4px; margin-bottom: 16px; }
.preview-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.preview-stat { display: flex; flex-direction: column; gap: 4px; }
.preview-stat-num { height: 16px; background: rgba(255,255,255,0.25); border-radius: 4px; }
.preview-stat-label { height: 8px; background: rgba(255,255,255,0.15); border-radius: 4px; }
.preview-timeline { flex: 1; display: flex; flex-direction: column; gap: 14px; }
.preview-tl-item { display: flex; gap: 10px; align-items: flex-start; }
.preview-tl-dot { width: 9px; height: 9px; border-radius: 50%; background: #d1d5db; margin-top: 4px; flex-shrink: 0; }
.preview-tl-content { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.landing-lock-overlay {
  position: absolute; inset: 0;
  background: rgba(249, 250, 251, 0.55);
  backdrop-filter: blur(2px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px;
}
.lock-icon { font-size: 28px; }
.lock-text { font-size: 14px; font-weight: 600; color: #374151; }

/* ── What's included ── */
.includes-title {
  font-size: 17px; font-weight: 800; color: #111827;
  text-align: center; margin-bottom: 20px;
}
.includes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.include-item {
  display: flex; gap: 14px; align-items: flex-start;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}
.include-icon {
  font-size: 20px;
  width: 40px; height: 40px;
  background: #eff6ff; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.include-item-title { font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.include-item-desc  { font-size: 12px; color: #6b7280; line-height: 1.5; }

/* ── Sample execution records ── */
.example-title {
  font-size: 17px; font-weight: 800; color: #111827;
  text-align: center; margin-bottom: 6px;
}
.example-sub {
  font-size: 13px; color: #9ca3af;
  text-align: center; margin-bottom: 18px;
}
.example-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 10px;
}
.ex-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.ex-date { font-size: 11px; color: #9ca3af; font-weight: 500; }
.ex-tag {
  font-size: 10px; font-weight: 700;
  padding: 2px 8px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.ex-tag.content   { background: #eff6ff; color: #2563eb; }
.ex-tag.technical { background: #f0fdf4; color: #16a34a; }
.ex-tag.ai        { background: #faf5ff; color: #7c3aed; }
.ex-action { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 5px; }
.ex-result { font-size: 12px; color: #16a34a; line-height: 1.5; }

/* ── Competitor comparison ── */
.compare-title {
  font-size: 17px; font-weight: 800; color: #111827;
  text-align: center; margin-bottom: 16px;
}
.compare-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.compare-table th, .compare-table td {
  padding: 10px 12px; text-align: center;
  border-bottom: 1px solid #f3f4f6;
}
.compare-table th {
  font-size: 12px; font-weight: 600; color: #6b7280;
  background: #f9fafb;
}
.th-feature { width: 36%; }
.compare-label { text-align: left; color: #374151; font-weight: 500; }
.col-lofty { background: #eff6ff; }
.compare-table th.col-lofty { color: #2563eb; font-weight: 700; }
.check { color: #16a34a; font-weight: 700; }
.cross { color: #d1d5db; }
.semi  { font-size: 11px; color: #6b7280; }
.lofty-note { display: block; font-size: 10px; color: #2563eb; margin-top: 2px; font-weight: 500; }

/* ── Social proof ── */
.landing-social {
  text-align: center; padding: 20px;
  background: #eff6ff; border-radius: 12px;
}
.social-num  { font-size: 22px; font-weight: 800; color: #2563eb; margin-right: 8px; }
.social-text { font-size: 14px; color: #374151; }

/* ── Bottom CTA ── */
.landing-bottom-cta { text-align: center; }
</style>
