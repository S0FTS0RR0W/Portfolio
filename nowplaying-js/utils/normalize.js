export function normalizeTrack(raw) {
    return {
        service: raw.service || 'Unknown',
    artist: raw.artist || 'Unknown Artist',
    title: raw.title || 'Untitled',
    album: raw.album || '',
    coverArt: raw.coverArt || '',
    timestamp: raw.timestamp || '',
    mood: raw.mood || 'neutral'
    }
}