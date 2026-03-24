<template>
  <div class="ob-page">

    <!-- ── Progress bar（完成页 step 4 时隐藏） -->
    <div class="ob-progress-bar-wrap" v-if="step > 0 && step < 4">
      <div class="ob-progress-track">
        <div class="ob-progress-fill" :style="{ width: progressPct + '%' }"></div>
      </div>
      <div class="ob-progress-steps">
        <span v-for="(label, i) in stepLabels" :key="i"
          class="ob-step-dot"
          :class="{ done: step > 1 && i < step - 1, current: i === step - 1 }"
        >
          <span class="ob-step-num">{{ step > 1 && i < step - 1 ? '✓' : (i + 1) }}</span>
          <span class="ob-step-label">{{ label }}</span>
        </span>
      </div>
    </div>

    <!-- ════════════ STEP 0: Welcome ════════════ -->
    <transition name="fade" mode="out-in">
    <div v-if="step === 0" class="ob-step ob-welcome" key="s0">
      <div class="ob-welcome-icon">🚀</div>
      <div class="ob-badge">SEO Autopilot</div>
      <h1 class="ob-h1">Let's configure your SEO Agent</h1>
      <p class="ob-sub">Takes 3 minutes. Your AI agent handles the rest.</p>

      <div class="ob-value-props">
        <div class="ob-vp" v-for="vp in valuePropItems" :key="vp.icon">
          <div class="ob-vp-icon">{{ vp.icon }}</div>
          <div>
            <div class="ob-vp-title">{{ vp.title }}</div>
            <div class="ob-vp-desc">{{ vp.desc }}</div>
          </div>
        </div>
      </div>

      <button class="btn-primary ob-cta" @click="startSetup">Get started →</button>
      <p class="ob-hint">Takes about 3 minutes</p>
    </div>
    </transition>

    <!-- ════════════ STEP 1: Your Competition（选竞品 + 分析 + 市场份额） ════════════ -->
    <transition name="fade" mode="out-in">
    <div v-if="step === 1" class="ob-step" key="s1">
      <!-- 1a 选择竞品 -->
      <template v-if="!confirmedCompetitors">
        <h2 class="ob-h2">Choose your competitors</h2>
        <p class="ob-sub-sm">Top agents near <span class="area-inline"><transition name="area-slide" mode="out-in"><span :key="currentArea" class="area-name">{{ currentArea }}</span></transition></span>. Pick <strong>3–5</strong> to track and see your market share.</p>

        <div class="comp-grid-scroll">
        <div class="comp-grid">
          <div
            v-for="c in competitors"
            :key="c.id"
            class="comp-card"
            :class="{ selected: selectedIds.has(c.id), disabled: !selectedIds.has(c.id) && selectedIds.size >= 5 }"
            @click="toggleCompetitor(c)"
          >
            <div class="comp-check">{{ selectedIds.has(c.id) ? '✓' : '' }}</div>
            <div class="comp-info">
              <div class="comp-name">{{ c.name }}</div>
              <div class="comp-url">{{ c.url }}</div>
            </div>
            <div class="comp-right">
              <div class="comp-traffic">{{ formatTraffic(c.traffic) }}/mo</div>
              <div class="comp-badge" :class="c.badge">
                {{ c.badge === 'top-local' ? 'Area Top' : 'Shared keywords' }}
              </div>
            </div>
          </div>
        </div>
        </div>

        <div class="comp-custom">
          <div class="comp-custom-label">Can't find your competitor? Add your own:</div>
          <div class="comp-custom-row">
            <input
              v-model="customUrl"
              class="comp-custom-input"
              placeholder="Enter competitor URL, e.g., example.com"
              @keydown.enter="addCustom"
            />
            <button class="btn-outline" @click="addCustom" :disabled="selectedIds.size >= 5">+ Add</button>
          </div>
          <div v-if="customError" class="comp-custom-error">{{ customError }}</div>
        </div>

        <div class="comp-count-row">
          <div class="comp-count-chips">
            <span
              v-for="id in Array.from(selectedIds)"
              :key="id"
              class="comp-chip"
            >{{ getCompName(id) }} <span class="chip-remove" @click.stop="selectedIds.delete(id)">×</span></span>
          </div>
          <div class="comp-count-num" :class="{ warn: selectedIds.size < 3 }">
            Selected {{ selectedIds.size }}/5
          </div>
        </div>

        <div class="ob-step-footer">
          <div v-if="selectedIds.size < 3" class="ob-validation-hint">Select at least 3 competitors for meaningful market comparison</div>
          <button class="btn-primary ob-cta-inline" @click="startMarketShareAnalysis" :disabled="selectedIds.size < 3">
            Analyze →
          </button>
        </div>
      </template>

      <!-- 1b 分析中 -->
      <div v-else-if="!msReady" class="ms-loading">
        <div class="ms-spinner"></div>
        <h2 class="ob-h2" style="margin-top:24px;">Analyzing
          <transition name="area-slide" mode="out-in"><span :key="currentArea" class="area-name">{{ currentArea }}</span></transition>
          market...</h2>
        <div class="ms-steps">
          <div v-for="(s, i) in msLoadSteps" :key="i" class="ms-step" :class="{ visible: msStepVisible > i }">
            <span class="ms-step-check">✓</span> {{ s }}
          </div>
        </div>
      </div>

      <!-- 1c 市场份额结果 -->
      <div v-else class="ms-result">
        <h2 class="ob-h2">Your market share</h2>
        <p class="ob-sub-sm" style="margin-top:4px;">vs. selected agents</p>

        <div class="ms-main-row" style="margin-top: 40px;padding: 80px 50px;">
          <MarketShareDonutChart :segments="msDonutChartSegments" compact>
            <template #center>

            </template>
          </MarketShareDonutChart>

          <div class="ms-info">
            <div class="ms-you-stat">
              <div class="ms-you-label">Your current share</div>
              <div class="ms-you-num">3%</div>
              <div class="ms-you-context"><span class="ms-perf-badge poor">Poor performance</span></div>
            </div>
            <div class="ms-legend">
              <div v-for="(seg, i) in marketShareData" :key="i" class="ms-legend-row">
                <span class="ms-legend-dot" :style="{ background: seg.color }"></span>
                <span class="ms-legend-name">{{ seg.name }}</span>
                <span class="ms-legend-pct">{{ seg.share }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ob-step-footer">
          <button class="btn-primary ob-cta-inline" @click="goToAgentPlan">
            How can I improve? →
          </button>
        </div>
      </div>
    </div>
    </transition>

    <!-- ════════════ STEP 2: Agent Running → Weekly Plan ════════════ -->
    <transition name="fade" mode="out-in">
    <div v-if="step === 2" class="ob-step" key="s2">

      <!-- Running phase -->
      <div v-if="!planReady" class="plan-running">
        <div class="plan-agent-icon">🤖</div>
        <h2 class="ob-h2">SEO Agent is analyzing your market...</h2>
        <div class="plan-anim-steps">
          <div v-for="(s, i) in agentSteps" :key="i" class="plan-anim-step" :class="{ visible: agentStepVisible > i, current: agentStepVisible === i }">
            <span class="plan-step-icon">{{ agentStepVisible > i ? '✓' : (agentStepVisible === i ? '⟳' : '○') }}</span>
            {{ s }}
          </div>
        </div>
      </div>

      <!-- Plan phase -->
      <div v-else class="plan-result">
        <h2 class="ob-h2">Your first action plan is ready ✨</h2>
        <p class="ob-sub-sm">Found across your 5 competitors</p>

        <!-- Keyword opportunity statistics -->
        <div class="plan-opp-stats">
          <!-- Left: Missing keywords -->
          <div class="plan-opp-stat">
            <div class="plan-opp-num">34</div>
            <div class="plan-opp-label">Missing keywords</div>
            <div class="plan-opp-sub">They rank, you don't</div>
          </div>
          <!-- operator + -->
          <div class="plan-opp-op">+</div>
          <!-- Middle: Weak keywords -->
          <div class="plan-opp-stat">
            <div class="plan-opp-num">13</div>
            <div class="plan-opp-label">Weak keywords</div>
            <div class="plan-opp-sub">You rank 11–30</div>
          </div>
          <!-- operator ≈ -->
          <div class="plan-opp-op plan-opp-op-approx">≈</div>
          <!-- Right: Potential traffic -->
          <div class="plan-opp-stat accent">
            <div class="plan-opp-num">+2,400</div>
            <div class="plan-opp-label">Potential visits/month</div>
            <div class="plan-opp-sub">Est. this week</div>
          </div>
        </div>

        <!-- Weekly Timeline -->
        <div class="plan-timeline">
          <div class="plan-tl-header">This week's execution plan</div>
          <div class="plan-tl-list">
            <div v-for="(item, i) in weeklyPlan" :key="i" class="plan-tl-item">
              <div class="plan-tl-left">
                <div class="plan-tl-day">{{ item.day }}</div>
                <div class="plan-tl-line" v-if="i < weeklyPlan.length - 1"></div>
              </div>
              <div class="plan-tl-dot"></div>
              <div class="plan-tl-body">
                <div class="plan-tl-title">{{ item.title }}</div>
                <div class="plan-tl-meta">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ob-step-footer">
          <button class="btn-primary ob-cta-inline" @click="step = 3">
            Looks good, continue →
          </button>
        </div>
      </div>

    </div>
    </transition>

    <!-- ════════════ STEP 3: AEO + Prompt Tracking ════════════ -->
    <transition name="fade" mode="out-in">
    <div v-if="step === 3" class="ob-step" key="s3">
      <div class="aeo-header">
        <div class="aeo-badge">New frontier</div>
        <h2 class="ob-h2">Get found in AI search too</h2>
        <p class="ob-sub-sm">Buyers ask ChatGPT and Perplexity for agent recommendations. We make sure you show up.</p>
      </div>

      <div class="aeo-how">
        <div class="aeo-how-item" v-for="h in aeoHowItems" :key="h.step">
          <div class="aeo-how-num">{{ h.step }}</div>
          <div class="aeo-how-text">{{ h.text }}</div>
        </div>
      </div>

      <div class="prompt-section">
        <div class="prompt-section-title">
          Choose search questions to track
          <span class="prompt-count">Selected {{ selectedPromptIds.size }}/50</span>
        </div>
        <p class="prompt-section-sub">We recommend 10 high-frequency questions, pre-selected. You can remove unwanted ones or add your own.</p>

        <div class="prompt-chips">
          <div
            v-for="p in allPrompts"
            :key="p.id"
            class="prompt-chip"
            :class="{ selected: selectedPromptIds.has(p.id), custom: p.custom }"
            @click="togglePrompt(p.id)"
          >
            <span>{{ p.text }}</span>
            <span class="prompt-chip-x">{{ selectedPromptIds.has(p.id) ? '✓' : '+' }}</span>
          </div>
        </div>

        <!-- Custom prompt -->
        <div class="prompt-custom-row">
          <input
            v-model="customPrompt"
            class="comp-custom-input"
            placeholder="Enter your own search question, press Enter to add"
            @keydown.enter="addCustomPrompt"
            :disabled="selectedPromptIds.size >= 50"
          />
          <button class="btn-outline" @click="addCustomPrompt" :disabled="selectedPromptIds.size >= 50">+ Add</button>
        </div>
        <div v-if="promptError" class="comp-custom-error">{{ promptError }}</div>
      </div>

      <div class="ob-step-footer">
        <button class="btn-primary ob-cta-inline" @click="finish">
          Complete →
        </button>
      </div>
    </div>
    </transition>

    <!-- ════════════ STEP 4: Celebration modal ════════════ -->
    <transition name="modal-fade">
    <div v-if="step === 4" class="allset-overlay" key="s4">
      <div class="allset-modal">
        <div class="allset-confetti">🎉</div>
        <h2 class="allset-title">All set!</h2>
        <p class="allset-sub">SEO Agent is now working for you</p>
        <button class="btn-primary allset-cta" @click="enterDashboard">Enter dashboard →</button>
      </div>
    </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { userState } from '../store/user.js'
import { recommendedCompetitors, defaultSelectedIds, marketShareData } from '../data/competitors.js'
import MarketShareDonutChart from '../components/MarketShareDonutChart.vue'
import { recommendedPrompts } from '../data/prompts.js'

// ── Service area carousel ──
const areas = ['Beverly Hills', 'Bel Air', 'Santa Monica', 'Malibu', 'West Hollywood']
const areaIdx = ref(0)
const currentArea = computed(() => areas[areaIdx.value])
let areaTimer = null
onMounted(() => {
  areaTimer = setInterval(() => {
    areaIdx.value = (areaIdx.value + 1) % areas.length
  }, 2600)
})

// ── Steps ──
const step = ref(0)
const stepLabels = ['Your Competition', 'Agent‘s Plan', 'AI tracking']
const progressPct = computed(() => ((step.value - 1) / (stepLabels.length - 1)) * 100)

// ── Step 0: Value propositions ──
const valuePropItems = [
  { icon: '🔍', title: 'Auto-optimized weekly',  desc: 'Content, technical fixes, competitor gaps — done automatically' },
  { icon: '📊', title: 'Track your rankings',    desc: 'See your market share and who\'s ahead' },
  { icon: '🤖', title: 'Visible on AI search',   desc: 'Get cited in ChatGPT, Perplexity, and Gemini' },
]

// ── Step 1: Competitor selection ──
const competitors = ref([...recommendedCompetitors])
const selectedIds = ref(new Set(defaultSelectedIds))
const customUrl = ref('')
const customError = ref('')
let customIdCounter = 100

function toggleCompetitor(c) {
  if (selectedIds.value.has(c.id)) {
    selectedIds.value.delete(c.id)
  } else if (selectedIds.value.size < 5) {
    selectedIds.value.add(c.id)
  }
}

function addCustom() {
  customError.value = ''
  const url = customUrl.value.trim()
  if (!url) return
  if (selectedIds.value.size >= 5) {
    customError.value = 'Max 5 competitors'
    return
  }
  const id = ++customIdCounter
  competitors.value.push({ id, name: url, url, traffic: 0, badge: 'custom' })
  selectedIds.value.add(id)
  customUrl.value = ''
}

function getCompName(id) {
  const c = competitors.value.find(x => x.id === id)
  return c ? (c.name.length > 16 ? c.name.slice(0, 15) + '…' : c.name) : id
}

function formatTraffic(n) {
  if (!n) return '—'
  return n >= 1000 ? (n / 1000).toFixed(0) + 'k' : n
}

// ── Step 1: Your Competition（选竞品 → 分析 → 结果，均为 step 1）
const confirmedCompetitors = ref(false)
const msReady = ref(false)
const msStepVisible = ref(0)
const msLoadSteps = [
  'Fetching competitor keyword data...',
  'Calculating ranking visibility...',
  'Generating market share analysis...',
]
let msTimers = []

function startMarketShareAnalysis() {
  confirmedCompetitors.value = true
  msReady.value = false
  msStepVisible.value = 0
  msTimers.forEach((t) => clearTimeout(t))
  msTimers = []
  msTimers.push(setTimeout(() => { msStepVisible.value = 1 }, 600))
  msTimers.push(setTimeout(() => { msStepVisible.value = 2 }, 1400))
  msTimers.push(setTimeout(() => { msStepVisible.value = 3 }, 2200))
  msTimers.push(setTimeout(() => { msReady.value = true }, 3000))
}

function startSetup() {
  step.value = 1
  confirmedCompetitors.value = false
  msReady.value = false
  msStepVisible.value = 0
  msTimers.forEach((t) => clearTimeout(t))
  msTimers = []
}

// 甜甜圈与 AgentLeaderboard 共用 MarketShareDonutChart（Chart.js + 最后一项 offset）
const msDonutChartSegments = computed(() =>
  marketShareData.map((d) => ({
    label: d.name,
    value: d.share,
    color: d.color,
  })),
)

// ── Step 2: Agent Running ──
const planReady = ref(false)
const agentStepVisible = ref(0)
const agentSteps = [
  'Scanning top keywords from 5 competitors...',
  'Analyzing competitors\' highest-traffic pages...',
  'Finding keywords and content gaps you haven\'t covered...',
  'Planning this week\'s blog and competitor tracking tasks...',
]
let planTimers = []

const weeklyPlan = [
  {
    day: 'Mon',
    title: 'Scan 5 competitors — 34 keyword gaps found',
    keywords: { missing: 18, weak: 16 },
    traffic: '6 high-priority keywords queued',
    type: 'competitive', typeLabel: 'Competitor',
  },
  {
    day: 'Tue',
    title: 'Content plan generated — 5 blogs queued',
    keywords: { missing: 12, weak: 0 },
    traffic: 'Sorted by traffic potential',
    type: 'content', typeLabel: 'Content',
  },
  {
    day: 'Wed',
    title: 'Publish: "Beverly Hills School District Homes Guide"',
    keywords: { missing: 18, weak: 0 },
    traffic: 'Est. +280–350 visits/month',
    type: 'content', typeLabel: 'Content',
  },
  {
    day: 'Thu',
    title: 'Publish: "Beverly Hills Luxury Market Trends 2025"',
    keywords: { missing: 8, weak: 0 },
    traffic: 'Est. +180 visits/month',
    type: 'content', typeLabel: 'Content',
  },
  {
    day: 'Thu',
    title: 'Publish: "Best Neighborhoods to Buy in Beverly Hills Right Now"',
    keywords: { missing: 11, weak: 0 },
    traffic: 'Est. +220 visits/month',
    type: 'content', typeLabel: 'Content',
  },
  {
    day: 'Fri',
    title: 'Publish: "How to Buy a Home in West Hollywood: A 2025 Guide"',
    keywords: { missing: 9, weak: 0 },
    traffic: 'Est. +160 visits/month',
    type: 'content', typeLabel: 'Content',
  },
  {
    day: 'Fri',
    title: 'Publish: "Is Now a Good Time to Buy in Los Angeles?"',
    keywords: { missing: 14, weak: 0 },
    traffic: 'Est. +310 visits/month',
    type: 'content', typeLabel: 'Content',
  },
]

function goToAgentPlan() {
  step.value = 2
  planReady.value = false
  agentStepVisible.value = 0
  planTimers.forEach(t => clearTimeout(t))
  planTimers = []
  planTimers.push(setTimeout(() => { agentStepVisible.value = 1 }, 700))
  planTimers.push(setTimeout(() => { agentStepVisible.value = 2 }, 1600))
  planTimers.push(setTimeout(() => { agentStepVisible.value = 3 }, 2500))
  planTimers.push(setTimeout(() => { agentStepVisible.value = 4 }, 3400))
  planTimers.push(setTimeout(() => { planReady.value = true }, 4400))
}

// ── Step 3: AEO how-items ──
const aeoHowItems = [
  { step: '1', text: 'Daily: ask ChatGPT, Perplexity, and Gemini your tracked queries' },
  { step: '2', text: 'Track whether you\'re mentioned, how often, and the sentiment' },
  { step: '3', text: 'Optimize your content so AI recommends you more' },
]

// ── Step 3: Prompts ──
const allPrompts = ref(recommendedPrompts.map(p => ({ ...p })))
const selectedPromptIds = ref(new Set(recommendedPrompts.map(p => p.id)))
const customPrompt = ref('')
const promptError = ref('')
let promptIdCounter = 200

function togglePrompt(id) {
  if (selectedPromptIds.value.has(id)) {
    selectedPromptIds.value.delete(id)
  } else if (selectedPromptIds.value.size < 50) {
    selectedPromptIds.value.add(id)
  }
}

function addCustomPrompt() {
  promptError.value = ''
  const text = customPrompt.value.trim()
  if (!text) return
  if (selectedPromptIds.value.size >= 50) {
    promptError.value = 'Max 50 prompts to track'
    return
  }
  const id = ++promptIdCounter
  allPrompts.value.push({ id, text, custom: true })
  selectedPromptIds.value.add(id)
  customPrompt.value = ''
}

// ── Complete & enter dashboard ──
function finish() {
  userState.competitors = competitors.value.filter(c => selectedIds.value.has(c.id))
  userState.prompts = allPrompts.value.filter(p => selectedPromptIds.value.has(p.id))
  step.value = 4  // Show celebration modal
}

const nextSteps = [
  { icon: '📊', title: 'Performance dashboard ready', desc: 'View your market share, traffic trends, and keyword rankings' },
  { icon: '📋', title: 'Agent\'s week plan ready', desc: '5 tasks will execute throughout the week, appear in Activities when done' },
  { icon: '🤖', title: 'AI citation tracking launched', desc: `Currently tracking your selected ${selectedPromptIds.value.size} search questions` },
]

function enterDashboard() {
  userState.hasCompetitors = true
}

// Clean up timers
onUnmounted(() => {
  clearInterval(areaTimer)
  msTimers.forEach(t => clearTimeout(t))
  planTimers.forEach(t => clearTimeout(t))
})
</script>

<style scoped>
/* ── Page container ── */
.ob-page {
  min-height: calc(100vh - 100px);
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Progress bar ── */
.ob-progress-bar-wrap {
  width: 100%;
  max-width: 640px;
  padding: 28px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.ob-progress-track {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}
.ob-progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
  transition: width 0.4s ease;
}
.ob-progress-steps {
  display: flex;
  gap: 0;
  width: 100%;
  justify-content: space-between;
}
.ob-step-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #9ca3af;
}
.ob-step-num {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.ob-step-dot.done .ob-step-num  { background: #2563eb; color: #fff; }
.ob-step-dot.current .ob-step-num { background: #2563eb; color: #fff; box-shadow: 0 0 0 3px #dbeafe; }
.ob-step-dot.current { color: #2563eb; font-weight: 600; }
.ob-step-label { font-size: 11px; }

/* ── Generic step container ── */
.ob-step {
  width: 100%;
  max-width: 640px;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* ── Generic text ── */
.ob-badge {
  display: inline-block;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
}
.ob-h1 {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  text-align: center;
  line-height: 1.3;
  margin-bottom: 12px;
}
.ob-h2 {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
}
.ob-sub {
  font-size: 15px;
  color: #6b7280;
  text-align: center;
  line-height: 1.65;
  margin-bottom: 32px;
}
.ob-sub-sm {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 24px;
  width: 100%;
}

/* ── Buttons ── */
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
.btn-primary:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.btn-outline {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s, color 0.15s;
}
.btn-outline:hover:not(:disabled) { border-color: #9ca3af; color: #111827; }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }
.ob-cta {
  font-size: 15px;
  padding: 13px 36px;
  border-radius: 10px;
  margin-bottom: 8px;
}
.ob-cta-inline {
  font-size: 14px;
  padding: 12px 28px;
  border-radius: 9px;
}
.ob-hint { font-size: 12px; color: #9ca3af; }

/* ── Step 0: Welcome ── */
.ob-welcome { padding-top: 56px; }
.ob-welcome-icon { font-size: 48px; margin-bottom: 14px; }
.ob-value-props {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;
}
.ob-vp {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 18px;
}
.ob-vp-icon {
  font-size: 20px;
  width: 40px; height: 40px;
  background: #eff6ff;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ob-vp-title { font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.ob-vp-desc  { font-size: 13px; color: #6b7280; line-height: 1.5; }

/* ── Step 1: Competitor selection ── */
.comp-grid-scroll {
  width: 100%;
  height: 320px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.comp-grid-scroll::-webkit-scrollbar { width: 4px; }
.comp-grid-scroll::-webkit-scrollbar-track { background: transparent; }
.comp-grid-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
.comp-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.comp-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.comp-card:hover:not(.disabled) { border-color: #93c5fd; }
.comp-card.selected { border-color: #2563eb; background: #eff6ff; }
.comp-card.disabled { opacity: 0.45; cursor: not-allowed; }
.comp-check {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
  background: #fff;
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
}
.comp-card.selected .comp-check { border-color: #2563eb; background: #2563eb; color: #fff; }
.comp-info { flex: 1; min-width: 0; }
.comp-name { font-size: 13px; font-weight: 600; color: #111827; }
.comp-url  { font-size: 11px; color: #9ca3af; margin-top: 2px; }
.comp-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.comp-traffic { font-size: 12px; font-weight: 600; color: #374151; }
.comp-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.comp-badge.top-local  { background: #fef9c3; color: #854d0e; }
.comp-badge.shared-kw  { background: #f0fdf4; color: #15803d; }
.comp-badge.custom     { background: #f3f4f6; color: #6b7280; }

/* Custom add */
.comp-custom { width: 100%; margin-bottom: 20px; }
.comp-custom-label { font-size: 12px; color: #6b7280; margin-bottom: 8px; }
.comp-custom-row { display: flex; gap: 8px; }
.comp-custom-input {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}
.comp-custom-input:focus { border-color: #2563eb; }
.comp-custom-error { font-size: 12px; color: #ef4444; margin-top: 6px; }

/* Selected count */
.comp-count-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.comp-count-chips { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; }
.comp-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #dbeafe;
  color: #1e40af;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}
.chip-remove { cursor: pointer; font-size: 13px; opacity: 0.7; }
.chip-remove:hover { opacity: 1; }
.comp-count-num {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  white-space: nowrap;
}
.comp-count-num.warn { color: #ef4444; }

/* Step footer */
.ob-step-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.ob-validation-hint { font-size: 12px; color: #9ca3af; }

/* ── Step 2: Market Share Loading ── */
.ms-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  width: 100%;
}
.ms-spinner {
  width: 40px; height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ms-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
  width: 100%;
  max-width: 320px;
}
.ms-step {
  font-size: 13px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s, transform 0.4s;
}
.ms-step.visible { opacity: 1; transform: none; color: #374151; }
.ms-step-check { color: #16a34a; font-weight: 700; }

/* Market Share Result */
.ms-result { width: 100%; }
.ms-main-row {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 16px;
}
.ms-donut-pct { font-size: 24px; font-weight: 800; color: #1d4ed8; }
.ms-donut-label { font-size: 11px; color: #9ca3af; margin-top: 2px; }

.ms-info { flex: 1; }
.ms-you-stat { margin-bottom: 20px; }
.ms-you-label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.ms-you-num { font-size: 36px; font-weight: 900; color: #1d4ed8; line-height: 1; margin-bottom: 6px; }
.ms-you-context { font-size: 13px; color: #6b7280; }
.ms-legend { display: flex; flex-direction: column; gap: 6px; }
.ms-legend-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #374151; }
.ms-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.ms-legend-name { flex: 1; }
.ms-legend-pct { font-weight: 700; }

.ms-gap-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  color: #374151;
  line-height: 1.55;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 24px;
}
.ms-gap-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

/* ── Step 3: Agent Running ── */
.plan-running {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  width: 100%;
}
.plan-agent-icon { font-size: 48px; margin-bottom: 10px; }
.plan-anim-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  width: 100%;
  max-width: 380px;
}
.plan-anim-step {
  font-size: 13px;
  color: #d1d5db;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.3;
  transition: opacity 0.4s, color 0.4s;
}
.plan-anim-step.visible { opacity: 1; color: #374151; }
.plan-anim-step.current { color: #2563eb; font-weight: 600; }
.plan-step-icon { font-size: 14px; width: 18px; text-align: center; }

/* Plan result */
.plan-result { width: 100%; }

/* ── Keyword opportunity stats (equation layout) ── */
.plan-opp-stats {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px 16px;
  margin-bottom: 20px;
  width: 100%;
  gap: 0;
}
.plan-opp-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-align: center;
}
.plan-opp-stat.accent {
  background: #f9fafb;
  border-radius: 10px;
  padding: 10px 8px;
}
.plan-opp-op {
  flex-shrink: 0;
  font-size: 20px;
  font-weight: 700;
  color: #d1d5db;
  padding: 0 10px;
  line-height: 1;
}
.plan-opp-op-approx {
  font-size: 22px;
  color: #93c5fd;
}
.plan-opp-num {
  font-size: 26px;
  font-weight: 900;
  color: #111827;
  line-height: 1;
}
.plan-opp-stat.accent .plan-opp-num { color: #111827; }
.plan-opp-label { font-size: 12px; font-weight: 700; color: #374151; }
.plan-opp-sub   { font-size: 11px; color: #9ca3af; }

/* ── Weekly Timeline ── */
.plan-timeline { width: 100%; margin-bottom: 24px; }
.plan-tl-header {
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 12px;
}
.plan-tl-list { display: flex; flex-direction: column; }
.plan-tl-item {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
}
.plan-tl-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44px;
  flex-shrink: 0;
}
.plan-tl-day {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  margin-top: 3px;
  width: 44px;
  text-align: center;
}
.plan-tl-line {
  width: 2px;
  background: #e5e7eb;
  flex: 1;
  min-height: 20px;
  margin: 4px 0;
}
.plan-tl-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  margin-top: 5px;
  flex-shrink: 0;
  margin-right: 12px;
}
.plan-tl-body {
  flex: 1;
  padding-bottom: 20px;
}
.plan-tl-title { font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 6px; }
.plan-tl-meta  { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.plan-kw-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
}
.plan-kw-tag.missing { background: #f3f4f6; color: #374151; }
.plan-kw-tag.weak    { background: #f3f4f6; color: #374151; }
.plan-traffic { font-size: 11px; color: #6b7280; }

.plan-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 3px;
  margin-left: 8px;
}
.plan-tag.content     { background: #f3f4f6; color: #6b7280; }
.plan-tag.competitive { background: #f3f4f6; color: #6b7280; }

/* ── Poor performance badge ── */
.ms-perf-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.ms-perf-badge.poor { background: #fef2f2; color: #b91c1c; }

/* ── Step 4: AEO ── */
.aeo-header { width: 100%; text-align: center; }
.aeo-badge {
  display: inline-block;
  background: #faf5ff;
  color: #7c3aed;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.aeo-how {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-bottom: 28px;
}
.aeo-how-item {
  flex: 1;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.aeo-how-num {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: #faf5ff;
  color: #7c3aed;
  font-size: 13px;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.aeo-how-text { font-size: 12px; color: #374151; line-height: 1.5; }

.prompt-section { width: 100%; margin-bottom: 24px; }
.prompt-section-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.prompt-count {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 9px;
  border-radius: 20px;
}
.prompt-section-sub { font-size: 12px; color: #9ca3af; margin-bottom: 14px; }
.prompt-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.prompt-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s;
}
.prompt-chip:hover { background: #dbeafe; }
.prompt-chip:not(.selected) {
  background: #f9fafb;
  border-color: #e5e7eb;
  color: #6b7280;
}
.prompt-chip.custom { border-style: dashed; }
.prompt-chip-x { font-size: 13px; font-weight: 700; }
.prompt-custom-row { display: flex; gap: 8px; }

/* ── Step 5: Celebration modal ── */
.allset-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}
.allset-modal {
  background: #fff;
  border-radius: 20px;
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  text-align: center;
  max-width: 360px;
  width: 100%;
}
.allset-confetti { font-size: 52px; line-height: 1; margin-bottom: 4px; }
.allset-title    { font-size: 22px; font-weight: 800; color: #111827; }
.allset-sub      { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
.allset-cta      { font-size: 15px; padding: 12px 32px; border-radius: 10px; margin-top: 4px; }

/* ── Area name carousel ── */
.area-inline {
  display: inline-flex;
  align-items: baseline;
  position: relative;
  overflow: hidden;
  vertical-align: baseline;
}
.area-name {
  display: inline-block;
  color: #2563eb;
  font-weight: 700;
}
.area-slide-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.area-slide-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; position: absolute; }
.area-slide-enter-from   { opacity: 0; transform: translateY(8px); }
.area-slide-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ── Transitions ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from { opacity: 0; transform: translateY(12px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
