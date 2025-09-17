let currentTrack = null
let positon = 0

export function normalizeTrack(raw) {
  const duration = Number(raw.duration ?? 0)
  const position = Number(raw.position ?? 0)

  return {
    service: raw.service || 'Unknown',
    artist: raw.artist || 'Unknown Artist',
    title: raw.title || 'Untitled',
    album: raw.album || '',
    coverArt: raw.coverArt || '',
    timestamp: raw.timestamp || new Date().toISOString(),
    duration: isNaN(duration) ? 0 : duration,
    position: isNaN(position) ? 0 : position,
    mood: raw.mood || 'neutral',
    progress: duration > 0 ? Math.min((position / duration) * 100, 100) : 0,
    isFresh: raw.timestamp
      ? Date.now() - new Date(raw.timestamp).getTime() < 5 * 60 * 1000
      : false
  }
}