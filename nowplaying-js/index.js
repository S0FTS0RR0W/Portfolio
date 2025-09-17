import fs from 'fs'
import { getSupersonicTrack } from './adapters/supersonic.js'
import { normalizeTrack } from './utils/normalize.js'

const OUTPUT_PATH = '../public/nowplaying.json'
const POLL_INTERVAL = 2000 // 2 seconds
let currentTrack = null
let lastTrack = null
let position = 0

function updateUI(track) {
  try {
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(track, null, 2))
  } catch (err) {
    console.error('[MintWaveBridge] Error writing nowplaying.json:', err)
  }
}

async function getCurrentTrack() {
  const raw = await getSupersonicTrack()
  return raw ? normalizeTrack(raw) : null
}

async function main() {
  console.log('[MintWaveBridge] Starting nowplaying-js...')

  // Poll Navidrome every 2 seconds
  while (true) {
    const track = await getCurrentTrack()

    if (track) {
      // If it's a new track, reset position
      const isNew = JSON.stringify(track) !== JSON.stringify(lastTrack)
      if (isNew) {
        console.log('[MintWaveBridge] New track detected:', track.title)
        currentTrack = track
        position = track.position ?? 0
        lastTrack = track
        updateUI({ ...track, position, updatedAt: new Date().toISOString() })
      }
    }

    // If playback stopped
    if (!track && lastTrack !== null) {
      console.log('[MintWaveBridge] Playback paused or stopped. Clearing nowplaying.json...')
      currentTrack = null
      lastTrack = null
      position = 0
      updateUI({})
    }

    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL))
  }
}

// increment position every second
setInterval(() => {
  if (!currentTrack || position >= currentTrack.duration) return

  position += 1

  const enrichedTrack = {
    ...currentTrack,
    position,
    updatedAt: new Date().toISOString()
  }

  updateUI(enrichedTrack)
}, 1000)

main()