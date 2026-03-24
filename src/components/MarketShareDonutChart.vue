<template>
  <div class="lb-donut-wrap" :class="{ 'lb-donut-wrap--compact': compact }">
    <canvas ref="canvasRef" />
    <div class="lb-donut-center">
      <slot name="center" />
    </div>
    <slot name="overlay" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chart as ChartJS } from 'chart.js'

const props = defineProps({
  /** { label, value, color } — value 为占比数字 */
  segments: { type: Array, required: true },
  /** 较小尺寸（与 onboarding 原 160px 甜甜圈一致） */
  compact: { type: Boolean, default: false },
})

const canvasRef = ref(null)
let chartInstance = null

function buildChart() {
  if (!canvasRef.value || !props.segments?.length) return
  chartInstance?.destroy()

  const n = props.segments.length
  const ctx = canvasRef.value.getContext('2d')
  const labels = props.segments.map((s) => s.label)
  const data = props.segments.map((s) => s.value)
  const backgroundColor = props.segments.map((s) => s.color)
  const offset = props.segments.map((_, i) => (i === n - 1 ? 14 : 0))
  const borderWidth = props.segments.map((_, i) => (i === n - 1 ? 0 : 2))

  chartInstance = new ChartJS(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth,
          borderColor: '#fff',
          offset,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '68%',
      rotation: -354.6,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
          },
        },
      },
    },
  })
}

onMounted(() => {
  buildChart()
})

onBeforeUnmount(() => {
  chartInstance?.destroy()
  chartInstance = null
})

watch(
  () => props.segments,
  () => {
    buildChart()
  },
  { deep: true },
)
</script>

<style scoped>
.lb-donut-wrap {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 250px;
  height: 250px;
}

.lb-donut-wrap--compact {
  width: 160px;
  height: 160px;
}

.lb-donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
</style>
