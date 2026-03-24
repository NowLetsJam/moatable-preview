import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/global.css'

// Chart.js — register everything once, globally
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

// Views
import PerformanceView from './views/PerformanceView.vue'
import ActivitiesView from './views/ActivitiesView.vue'
import KeywordGapView from './views/KeywordGapView.vue'
import ContentGapsView from './views/ContentGapsView.vue'
import PromptTrackingView from './views/PromptTrackingView.vue'
import SetupView from './views/SetupView.vue'

const routes = [
  { path: '/', redirect: '/performance' },
  { path: '/setup', component: SetupView },
  { path: '/performance', component: PerformanceView },
  { path: '/activities', component: ActivitiesView },
  { path: '/keyword-gap', component: KeywordGapView },
  { path: '/content-gaps', component: ContentGapsView },
  { path: '/prompt-tracking', component: PromptTrackingView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
