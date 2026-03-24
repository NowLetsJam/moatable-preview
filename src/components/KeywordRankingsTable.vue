<template>
  <div class="card" style="position: relative;">
    <span class="corner-badge seo-badge">SEO</span>
    <div class="card-header">
      <div class="card-title">Keyword Rankings <span class="info-icon">ⓘ</span></div>
      <div class="card-meta">
        <span>Top keywords driving traffic to your site</span>
        <div class="time-pill">Last 30 days ↓</div>
      </div>
    </div>
    <table class="kw-table">
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Search Vol</th>
          <th>Your Rank</th>
          <th>Change</th>
          <th>Organic Visits</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="kw-name">homes for sale beverly hills</td>
          <td class="kw-vol">8,100</td>
          <td class="kw-rank good">#3</td>
          <td class="kw-delta up">↑ 4</td>
          <td class="kw-vol">142</td>
        </tr>
        <tr>
          <td class="kw-name">luxury real estate los angeles</td>
          <td class="kw-vol">5,400</td>
          <td class="kw-rank mid">#11</td>
          <td class="kw-delta up">↑ 2</td>
          <td class="kw-vol">48</td>
        </tr>
        <tr>
          <td class="kw-name">real estate agent beverly hills</td>
          <td class="kw-vol">3,200</td>
          <td class="kw-rank good">#7</td>
          <td class="kw-delta up">↑ 6</td>
          <td class="kw-vol">61</td>
        </tr>
        <tr>
          <td class="kw-name">malibu beachfront homes 2026</td>
          <td class="kw-vol">1,800</td>
          <td class="kw-rank good">#4</td>
          <td class="kw-delta up">↑ 9</td>
          <td class="kw-vol">34</td>
        </tr>
        <tr>
          <td class="kw-name">bel air property listings</td>
          <td class="kw-vol">1,200</td>
          <td class="kw-rank mid">#14</td>
          <td class="kw-delta flat">— 0</td>
          <td class="kw-vol">18</td>
        </tr>
        <tr>
          <td class="kw-name">west hollywood homes for sale</td>
          <td class="kw-vol">900</td>
          <td class="kw-rank bad">#22</td>
          <td class="kw-delta down">↓ 1</td>
          <td class="kw-vol">9</td>
        </tr>
      </tbody>
    </table>

    <!-- Gap entry points -->
    <div class="kw-footer">
      <RouterLink to="/keyword-gap" class="kw-footer-agent-link">
        <span class="kw-footer-dot running"></span>
        <span class="kw-footer-agent-name"></span>
        <span class="kw-footer-agent-status">34 gaps identified · 3 in progress</span>
        <span class="kw-footer-arrow">→</span>
      </RouterLink>
      <span class="kw-footer-sep">·</span>
      <RouterLink to="/content-gaps" class="kw-footer-agent-link">
        <span class="kw-footer-dot running"></span>
        <span class="kw-footer-agent-name"></span>
        <span class="kw-footer-agent-status">12 opportunities · monitoring</span>
        <span class="kw-footer-arrow">→</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
.seo-badge {
  background: #f0fdf4;
  color: #16a34a;
}
</style>
