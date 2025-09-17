<template>
  <AsciiBlock src="/assets/ascii/hero-splash.txt" />
  <section class="welcome">
    <div class="terminal">
      <pre><code>{{ displayed }}</code></pre>
    </div>
    <h1>&lt;Welcome to <span class="highlight">Charlie's Portfolio</span>/&gt;</h1>
    <p>// Web Dev, Programmer and Tinkerer</p>
    <p>// Currently Playing</p>
    <div class="now-playing">
  <template v-if="nowPlaying && nowPlaying.title">
    <img :src="nowPlaying.coverArt" alt="Album Art" class="album-art" />
    <div class="track-info">
      <h2>{{ nowPlaying.title }}</h2>
      <p>{{ nowPlaying.artist }} — {{ nowPlaying.album }}</p>
      <span class="service">{{ nowPlaying.service }}</span>
    </div>
    <div class="progress-container">
  <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
  <div class="timestamp">
    {{  formatTime(currentPosition) }} / {{ formatTime(nowPlaying.duration) }}
  </div>
</div>
  </template>
  <template v-else>
    <p class="nothing">nothing.</p>
  </template>
</div>
    <nav>
      <NuxtLink to="/projects">&gt; View Projects</NuxtLink>
      <NuxtLink to="/about">&gt; About Me</NuxtLink>
      <NuxtLink to="/contact">&gt; Contact</NuxtLink>
      <NuxtLink to="/codestats">&gt; Code::Stats</NuxtLink>
      <!-- <NuxtLink to="/deskcam">&gt; Live Print Cam</NuxtLink> -->
    </nav>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { computed } from 'vue'

const lines = [
  '$ ./start-portfolio.sh',
  '✔ Loading projects...',
  '✔ Fetching latest updates...'
]

const displayed = ref('')
let currentLine = 0
let currentChar = 0
let typingInterval
let isDeleting = false

function typeLine() {
  if (!isDeleting) {
    if (currentChar < lines[currentLine].length) {
      displayed.value += lines[currentLine][currentChar]
      currentChar++
      typingInterval = setTimeout(typeLine, 50)
    } else {
      displayed.value += '\n'
      currentLine++
      currentChar = 0
      if (currentLine < lines.length) {
        typingInterval = setTimeout(typeLine, 400)
      } else {
        setTimeout(() => {
          isDeleting = true
          currentLine = 0
          currentChar = 0
          typeLine()
        }, 1200)
      }
    }
  } else {
    if (displayed.value.length > 0) {
      displayed.value = displayed.value.slice(0, -1)
      typingInterval = setTimeout(typeLine, 20)
    } else {
      isDeleting = false
      currentLine = 0
      currentChar = 0
      typeLine()
    }
  }
}

onMounted(() => {
  typeLine()
})

// 🎵 Now Playing logic
const nowPlaying = ref(null)
const lastFetchedAt = ref(Date.now())
const currentPosition = computed(() => {
  if (!nowPlaying.value || !nowPlaying.value.position || !nowPlaying.value.duration) return 0
  const elapsed = (Date.now() - lastFetchedAt.value) / 1000
  return Math.min(nowPlaying.value.position + elapsed, nowPlaying.value.duration)
})

async function fetchNowPlaying() {
  try {
    const res = await fetch('/nowplaying.json')
    const data = await res.json()
    nowPlaying.value = data
    lastFetchedAt.value = Date.now()
  } catch (err) {
    nowPlaying.value = null
  }
}

onMounted(() => {
  fetchNowPlaying()
  setInterval(fetchNowPlaying, 5000)
})

// const progressPercent = computed(() => {
//   if (!nowPlaying.value || !nowPlaying.value.duration || !nowPlaying.value.position) return 0

//   const elapsed = (Date.now() - lastFetchedAt.value) / 1000 // seconds since last fetch
//   const currentPosition = nowPlaying.value.position + elapsed

//   return Math.min((currentPosition / nowPlaying.value.duration) * 100, 100)
// })

// timestamp formatting
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
</script>

<style scoped>
.now-playing {
  margin-top: 1rem;
  background: #161b22;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(20, 20, 20, 0.2);
}

.album-art {
  width: 64px;
  height: 64px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.3);
}

.track-info h2 {
  margin: 0;
  font-size: 1.1rem;
  color: #58a6ff;
}

.track-info p {
  margin: 0.25rem 0;
  color: #c9d1d9;
}

.service {
  font-size: 0.8rem;
  color: #8b949e;
}
.welcome {
  font-family: 'Fira Code', monospace;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .welcome {
    padding: 1rem;
    min-height: 100vh;
    font-size: 1rem;
    text-align: center;
  }
  h1 {
    font-size: 1.2rem;
  }
  nav {
    flex-direction: column;
    gap: 0.5rem;
  }
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.highlight {
  color: #58a6ff;
}

nav {
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
}

nav a {
  background: #161b22;
  color: #58a6ff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(20, 20, 20, 0.1);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  border: 1px solid #21262c;
}

nav a:hover {
  background: #238636;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}

p {
  margin-bottom: 2rem;
  color: #8b949e;
}

.terminal {
  background: #161b22;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #c9d1d9;
  width: 340px;
  min-height: 4.5em;
  max-width: 100%;
  box-sizing: border-box;
  white-space: pre-wrap;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

NuxtLink {
  color: #58a6ff;
  text-decoration: none;
  transition: color 0.2s ease;
}

NuxtLink:hover {
  color: #79c0ff;
}

.nothing {
  font-size: 1rem;
  color: #8b949e;
  font-style: italic;
  margin-top: 1rem;
}

.progress-container {
  width: 100%;
  height: 6px;
  background: #222;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #00f0ff, #00ffcc);
  transition: width 0.5s ease;
}

.timestamp {
  font-size: 0.85rem;
  color: #8b949e;
  margin-top: 0.5rem;
  font-family: 'Fira Code', monospace; 
}
</style>