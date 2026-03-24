<template>
  <Teleport to="body">
    <div v-if="userState.showQuotaModal" class="modal-overlay" @click.self="close">
      <div class="modal">

        <!-- Icon -->
        <div class="modal-icon">📊</div>

        <!-- Title -->
        <div class="modal-title">Blog quota reached</div>
        <div class="modal-sub">
          <strong>{{ userState.blogUsed }}/{{ userState.blogQuota }}</strong> posts used this month.
          Monitoring continues — new opportunities are still being tracked.
        </div>

        <!-- Options -->
        <div class="modal-options">

          <div class="option-card primary" @click="buyPackage">
            <div class="option-icon">⚡</div>
            <div class="option-body">
              <div class="option-title">Get more posts</div>
              <div class="option-desc">Keep the agent writing automatically</div>
            </div>
            <div class="option-arrow">→</div>
          </div>

          <div class="option-card" @click="goManual">
            <div class="option-icon">✏️</div>
            <div class="option-body">
              <div class="option-title">Write myself</div>
              <div class="option-desc">Agent suggests topics, you write</div>
            </div>
            <div class="option-arrow">→</div>
          </div>

        </div>

        <button class="modal-dismiss" @click="close">Maybe later</button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { userState } from '../store/user.js'

function close() {
  userState.showQuotaModal = false
}

function buyPackage() {
  // Renewal logic: reset quota, keep auto mode
  userState.blogUsed = 0
  userState.blogMode = 'auto'
  userState.showQuotaModal = false
  // Show recovery notification briefly
  userState.showQuotaRestoredBanner = true
  setTimeout(() => { userState.showQuotaRestoredBanner = false }, 5000)
}

function goManual() {
  userState.blogMode = 'manual'
  userState.showQuotaModal = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  border-radius: 18px;
  padding: 32px 28px 24px;
  width: 420px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
}

.modal-icon {
  font-size: 32px;
  line-height: 1;
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.modal-sub {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
}

.modal-sub strong {
  color: #111827;
  font-weight: 600;
}

.modal-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}
.option-card:hover {
  border-color: #2563eb;
  background: #f8faff;
}
.option-card.primary {
  border-color: #2563eb;
  background: #eff6ff;
}
.option-card.primary:hover {
  background: #dbeafe;
}

.option-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
}

.option-body {
  flex: 1;
  min-width: 0;
}
.option-title {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}
.option-desc {
  font-size: 11.5px;
  color: #6b7280;
  line-height: 1.5;
}

.option-arrow {
  font-size: 14px;
  color: #9ca3af;
  flex-shrink: 0;
}

.modal-dismiss {
  background: none;
  border: none;
  font-size: 12px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.15s;
}
.modal-dismiss:hover {
  color: #6b7280;
}
</style>
