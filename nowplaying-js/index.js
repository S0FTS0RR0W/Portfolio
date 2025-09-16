import fs from 'fs'
import { getSupersonicTrack } from './adapters/supersonic.js'
import { normalizeTrack } from './utils/normalize.js'

const OUTPUT_PATH = '../public/nowplaying.json'
const POLL_INTERVAL = 2000 // 2 seconds in milliseconds

let lastTrack = null

async function getCurrentTrack() {
  const raw = await getSupersonicTrack()
  return raw ? normalizeTrack(raw) : null
}

function updateUI(track) {
  try {
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(track, null, 2))
  } catch (err) {
    console.error('[MintWaveBridge] Error writing nowplaying.json:', err)
  }
}

async function main() {
  console.log('[MintWaveBridge] Starting nowplaying-js...')

  while (true) {
    const track = await getCurrentTrack()

    if (track && JSON.stringify(track) !== JSON.stringify(lastTrack)) {
      console.log('[MintWaveBridge] New track detected:', track)
      updateUI(track)
      lastTrack = track
    }

    if (!track && lastTrack !== null) {
      console.log('[MintWaveBridge] Playback paused or stopped. Clearing nowplaying.json...')
      updateUI({})
      lastTrack = null
    }

    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL))
  }
}

main()