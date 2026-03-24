<template>
  <div class="landing-wrap">
    <div class="landing-inner">

      <!-- Hero -->
      <div class="landing-hero">
        <div class="landing-badge">SEO Autopilot</div>
        <h1 class="landing-h1">See every result<br>you pay for</h1>
        <p class="landing-sub">SEO Agent works quietly in the background of your site each week. Activities is its "work log"—what it did, why it did it, and what results it brought. Clear documentation. Numbers speak.</p>
        <button class="btn-primary landing-cta" @click="$emit('upgrade')">
          Contact sales
        </button>
      </div>

      <!-- Preview skeleton (blurred overlay) -->
      <div class="landing-preview-wrap">
        <div class="landing-preview-blur">
          <div class="preview-row">
            <!-- Summary card -->
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
            <!-- Timeline -->
            <div class="preview-timeline">
              <div class="preview-tl-item" v-for="i in 5" :key="i">
                <div class="preview-tl-dot"></div>
                <div class="preview-tl-content">
                  <div class="preview-line w60"></div>
                  <div class="preview-line w85"></div>
                  <div class="preview-line w45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="landing-lock-overlay">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">View complete execution records after subscribing</div>
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

      <!-- Sample entries (showing what Activities looks like) -->
      <div class="example-section">
        <div class="example-title">Here's what you'll see</div>
        <div class="example-card" v-for="ex in examples" :key="ex.action">
          <div class="ex-meta">
            <span class="ex-date">{{ ex.date }}</span>
            <span class="ex-tag" :class="ex.type">{{ ex.typeLabel }}</span>
          </div>
          <div class="ex-action">{{ ex.action }}</div>
          <div class="ex-result">{{ ex.result }}</div>
        </div>
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
  { icon: '📋', title: 'Every action is logged', desc: 'What blogs were written, which pages optimized, what technical issues fixed. All documented on timeline.' },
  { icon: '📊', title: 'Results quantified, numbers tell the story', desc: 'Not "did SEO optimization" but "this keyword rose from position 18 to 6, bringing +412 visits"' },
  { icon: '📧', title: 'Auto-generated monthly reports', desc: 'Monthly summary you can share directly with clients. Builds your professional image.' },
]

const examples = [
  {
    date: 'Mar 18',
    type: 'content',
    typeLabel: 'Content',
    action: 'Published blog: "Beverly Hills School District Homes Guide"',
    result: '✓ 328 new visits within 5 days. "Beverly Hills school district homes" keyword rose from position 21 to 9',
  },
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
.landing-cta { font-size: 15px; padding: 13px 32px; border-radius: 10px; }
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
.landing-hint { margin-top: 10px; font-size: 12px; color: #9ca3af; }

/* ── Preview ── */
.landing-preview-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}
.landing-preview-blur {
  background: #fff;
  padding: 20px;
  filter: blur(3px);
  user-select: none;
}
.preview-row { display: flex; gap: 16px; }
.preview-summary {
  width: 200px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  border-radius: 12px;
  padding: 20px;
}
.preview-summary-num {
  width: 60px; height: 32px;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  margin-bottom: 8px;
}
.preview-summary-label {
  width: 100px; height: 12px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  margin-bottom: 20px;
}
.preview-summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.preview-stat { display: flex; flex-direction: column; gap: 4px; }
.preview-stat-num {
  height: 18px;
  background: rgba(255,255,255,0.25);
  border-radius: 4px;
}
.preview-stat-label {
  height: 10px;
  background: rgba(255,255,255,0.15);
  border-radius: 4px;
}
.preview-timeline { flex: 1; display: flex; flex-direction: column; gap: 16px; }
.preview-tl-item { display: flex; gap: 12px; align-items: flex-start; }
.preview-tl-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #d1d5db;
  margin-top: 4px;
  flex-shrink: 0;
}
.preview-tl-content { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.preview-line { height: 10px; background: #e5e7eb; border-radius: 4px; }
.w45 { width: 45%; } .w60 { width: 60%; } .w85 { width: 85%; }
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
.landing-features { display: flex; flex-direction: column; gap: 20px; }
.feature-item { display: flex; gap: 16px; align-items: flex-start; }
.feature-icon {
  font-size: 22px;
  width: 44px; height: 44px;
  background: #eff6ff;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.feature-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.feature-desc  { font-size: 13px; color: #6b7280; line-height: 1.5; }

/* ── Example entries ── */
.example-section { }
.example-title {
  font-size: 16px; font-weight: 700; color: #111827;
  margin-bottom: 16px; text-align: center;
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
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ex-tag.content   { background: #eff6ff; color: #2563eb; }
.ex-tag.technical { background: #f0fdf4; color: #16a34a; }
.ex-tag.ai        { background: #faf5ff; color: #7c3aed; }
.ex-action { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 6px; }
.ex-result { font-size: 12px; color: #16a34a; line-height: 1.5; }

/* ── Bottom CTA ── */
.landing-bottom-cta { text-align: center; }
</style>
