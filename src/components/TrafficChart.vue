<template>
  <div class="card">
    <div class="card-header">
      <div>
        <div class="card-title">Traffic <span class="info-icon">ⓘ</span></div>
        <div style="margin-top:6px;display:flex;align-items:baseline;gap:10px;">
          <span class="metric-big" style="font-size:32px;" id="trafficTotal">{{ currentPeriod.summary.total }}</span>
          <span style="font-size:11px;color:#9ca3af;">people visited your website · {{ currentPeriod.summary.sublabel }}</span>
        </div>
        <div style="margin-top:4px;">
          <span class="metric-delta" id="trafficDelta">{{ currentPeriod.summary.delta }}</span>
        </div>
      </div>
      <div class="card-meta" style="gap:14px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:#374151;">
            <span style="display:inline-block;width:18px;height:2.5px;background:#2563eb;border-radius:2px;"></span>Organic
          </span>
          <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:#374151;">
            <span style="display:inline-block;width:18px;height:2px;background:#93c5fd;border-radius:2px;"></span>AI Referral
          </span>
          <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:#9ca3af;">
            <span style="display:inline-block;width:18px;height:2px;background:#d1d5db;border-radius:2px;"></span>Others
          </span>
        </div>
        <div class="time-toggle">
          <button class="time-toggle-btn" :class="{ active: activePeriod === '7D' }" @click="switchTrafficPeriod('7D')">7D</button>
          <button class="time-toggle-btn" :class="{ active: activePeriod === '30D' }" @click="switchTrafficPeriod('30D')">30D</button>
          <button class="time-toggle-btn" :class="{ active: activePeriod === '90D' }" @click="switchTrafficPeriod('90D')">90D</button>
        </div>
      </div>
    </div>
    <div class="chart-wrap">
      <canvas ref="trafficChart"></canvas>
    </div>
    <div id="flagTooltip" ref="flagTooltip" style="display:none;position:fixed;background:#1f2937;color:#fff;border-radius:8px;padding:10px 13px;width:240px;font-size:11px;line-height:1.55;z-index:999;box-shadow:0 6px 20px rgba(0,0,0,0.25);pointer-events:none;"></div>
    <div style="margin-top:8px;font-size:11px;color:#9ca3af;display:flex;align-items:center;justify-content:space-between;">
      <span>🚩 Hover over flags to see what we did on that date</span>
      <RouterLink to="/activities" style="color:#2563eb;text-decoration:none;font-weight:500;">View all activities →</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Chart as ChartJS } from 'chart.js'
import { TRAFFIC_PERIODS, ACTIVITY_FLAGS } from '../data/traffic.js'

const trafficChart = ref(null)
const flagTooltip = ref(null)
const activePeriod = ref('30D')

let chart = null

const currentPeriod = computed(() => TRAFFIC_PERIODS[activePeriod.value])

const flagPlugin = {
  id: 'flagPlugin',
  afterDraw(chart) {
    const { ctx, chartArea, scales } = chart
    if (!chartArea) return

    ACTIVITY_FLAGS.forEach(flag => {
      const idx = chart.data.labels.indexOf(flag.label)
      if (idx < 0) return

      const x   = scales.x.getPixelForValue(idx)
      const bot = chartArea.bottom
      const top = bot - 18

      ctx.save()

      // Pole
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth   = 1.5
      ctx.lineCap     = 'round'
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      ctx.moveTo(x, bot)
      ctx.lineTo(x, top)
      ctx.stroke()

      // Triangular banner pointing right
      ctx.fillStyle   = '#ef4444'
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.moveTo(x,      top)
      ctx.lineTo(x + 12, top + 5)
      ctx.lineTo(x,      top + 10)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    })
  }
}

const initFlagTooltip = (canvas) => {
  const tip = flagTooltip.value

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const { chartArea, scales, data } = chart
    if (!chartArea) return

    // Only show when mouse is inside the chart plot area
    if (mx < chartArea.left || mx > chartArea.right ||
        my < chartArea.top  || my > chartArea.bottom) {
      tip.style.display = 'none'
      canvas.style.cursor = ''
      return
    }

    // Find the nearest label index to the mouse x
    let nearestIdx = 0
    let minDist = Infinity
    data.labels.forEach((_, i) => {
      const dist = Math.abs(mx - scales.x.getPixelForValue(i))
      if (dist < minDist) { minDist = dist; nearestIdx = i; }
    })

    const label   = data.labels[nearestIdx]
    const organic = data.datasets[0].data[nearestIdx]
    const ai      = data.datasets[1].data[nearestIdx]
    const others  = data.datasets[2].data[nearestIdx]
    const event   = ACTIVITY_FLAGS.find(f => f.label === label)

    // ── Traffic block (always shown) ──
    const hasSep = event ? 'margin-bottom:10px;padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,0.12);' : ''
    let html =
      `<div style="font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);margin-bottom:9px;">${label}</div>` +
      `<div style="display:flex;gap:16px;${hasSep}">` +
        `<div style="display:flex;flex-direction:column;gap:2px;">` +
          `<span style="font-size:9px;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.4px;">Organic</span>` +
          `<span style="font-size:17px;font-weight:700;color:#93c5fd;">${organic}</span>` +
        `</div>` +
        `<div style="display:flex;flex-direction:column;gap:2px;">` +
          `<span style="font-size:9px;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.4px;">AI Referral</span>` +
          `<span style="font-size:17px;font-weight:700;color:#c4b5fd;">${ai}</span>` +
        `</div>` +
        `<div style="display:flex;flex-direction:column;gap:2px;">` +
          `<span style="font-size:9px;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.4px;">Others</span>` +
          `<span style="font-size:17px;font-weight:700;color:#9ca3af;">${others}</span>` +
        `</div>` +
      `</div>`

    // ── Event block (only when flag exists) ──
    if (event) {
      html +=
        `<div style="border-top:1px solid rgba(255,255,255,0.12);margin:8px 0;"></div>` +
        `<div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.38);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">${event.title}</div>` +
        event.actions.map((a, i) =>
          `<div style="font-size:11px;font-weight:600;color:#fff;line-height:1.55;margin-bottom:4px;white-space:normal;word-break:break-word;">${i + 1}. ${a}</div>`
        ).join('') +
        `<div style="margin-top:6px;">` +
        event.results.map(r =>
          `<div style="font-size:10px;color:#34d399;line-height:1.55;white-space:normal;word-break:break-word;">✓ ${r}</div>`
        ).join('') +
        `</div>`
    }

    tip.innerHTML = html
    tip.style.display = 'block'
    tip.style.left = Math.min(e.clientX - 120, window.innerWidth - 260) + 'px'
    tip.style.top  = (e.clientY - tip.offsetHeight - 16) + 'px'
    canvas.style.cursor = event ? 'pointer' : 'default'
  })

  canvas.addEventListener('mouseleave', () => {
    tip.style.display = 'none'
    canvas.style.cursor = ''
  })
}

const switchTrafficPeriod = (key) => {
  activePeriod.value = key
  const p = TRAFFIC_PERIODS[key]

  chart.data.labels = p.labels
  chart.data.datasets[0].data = p.organic
  chart.data.datasets[1].data = p.ai
  chart.data.datasets[2].data = p.others
  chart.options.scales.x.ticks.maxTicksLimit = p.maxTicks
  chart.update()
}

onMounted(() => {
  if (trafficChart.value) {
    const ctx = trafficChart.value.getContext('2d')
    const p = TRAFFIC_PERIODS['30D']

    chart = new ChartJS(ctx, {
      type: 'line',
      plugins: [flagPlugin],
      data: {
        labels: p.labels,
        datasets: [
          {
            label: 'Organic Search',
            data: p.organic,
            borderColor: '#2563eb',
            backgroundColor: 'transparent',
            fill: false, tension: 0.4,
            pointRadius: 0, pointHoverRadius: 0,
            borderWidth: 2,
          },
          {
            label: 'AI Referral',
            data: p.ai,
            borderColor: '#93c5fd',
            backgroundColor: 'transparent',
            fill: false, tension: 0.4,
            pointRadius: 0, pointHoverRadius: 0,
            borderWidth: 1.5,
          },
          {
            label: 'Others',
            data: p.others,
            borderColor: '#d1d5db',
            backgroundColor: 'transparent',
            fill: false, tension: 0.4,
            pointRadius: 0, pointHoverRadius: 0,
            borderWidth: 1.5,
            borderDash: [4, 3],
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 6, bottom: 2 } },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              font: { size: 11 }, color: '#9ca3af',
              maxTicksLimit: p.maxTicks, autoSkip: true
            }
          },
          y: {
            grid: { color: '#f3f4f6' },
            border: { display: false },
            ticks: { font: { size: 11 }, color: '#9ca3af', maxTicksLimit: 5 }
          }
        }
      }
    })

    initFlagTooltip(trafficChart.value)
  }
})
</script>

<style scoped>
</style>
