<template>
  <NuxtLink to="/" class="back-button">← Back</NuxtLink>
  <div class="desk-cam">
    <header class="cam-header">
      <span :class="{ pulse: isLive }">🟢</span> Charlie’s Printer Cam
    </header>

    <p class="cam-status">
      Status:
      <span :class="{ live: isLive, offline: !isLive }">
        {{ isLive ? 'Live · Ambient mode enabled' : 'Offline · Awaiting signal' }}
      </span>
    </p>

    <div class="cam-frame">
      <img v-if="isLive" :src="streamUrl" alt="Live Desk Cam" />
      <div v-else class="offline-placeholder">
        <p>Stream unavailable</p>
        <small>Charlie’s Printer is resting right now. Come back soon.</small>
      </div>
    </div>

    <footer class="cam-footer">
      Comfort-first · Presence-aware · Flask-powered
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const streamUrl = ref('')
const isLive = ref(false)

const checkStream = async () => {
  try {
    const response = await fetch(streamUrl.value = 'https://s0fts0rr0w.com/deskcam', {
      method: 'GET',
      headers: { 'Accept': 'image/jpeg' },
    })
    if (response.ok) {
      isLive.value = true
      streamUrl.value = streamUrl.value = 'https://s0fts0rr0w.com/deskcam'
    } else {
      isLive.value = false
      streamUrl.value = ''
    }
  } catch {
    isLive.value = false
    streamUrl.value = ''
  }
}

onMounted(() => {
  checkStream()
  //setInterval(checkStream, 30000) // every 30s
})
</script>

<style scoped>
.desk-cam {
  background-color: #0f1117;
  color: #c0cbdc;
  font-family: 'Fira Code', monospace;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cam-header {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #2a2e38;
  padding-bottom: 0.5rem;
  width: 100%;
  text-align: center;
}

.cam-header .pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.cam-status {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.cam-status .live {
  color: #6ee7b7;
}

.cam-status .offline {
  color: #f87171;
}

.cam-frame {
  border: 1px solid #2a2e38;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px #1f2937;
  max-width: 720px;
  width: 100%;
  background-color: #1a1c23;
}

.cam-frame img {
  width: 100%;
  height: auto;
  display: block;
}

.offline-placeholder {
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
}

.cam-footer {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #64748b;
}
</style>