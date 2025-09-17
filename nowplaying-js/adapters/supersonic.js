import fetch from 'node-fetch'

export async function getSupersonicTrack() {
  const baseURL = 'http://10.20.0.24:4533/rest'
  const credentials = {
    u: 'S0FTS0RR0W',
    p: 'Gamerguy43',
    v: '1.16.1',
    c: 'MintWaveBridge',
    f: 'json'
  }

  console.log('[Supersonic Adapter] Fetching current track...')

  const nowPlayingURL = `${baseURL}/getNowPlaying.view?${new URLSearchParams(credentials)}`

  try {
    const response = await fetch(nowPlayingURL)
    const data = await response.json()

    const subsonic = data?.['subsonic-response']
    const entry = subsonic?.nowPlaying?.entry?.[0]

    if (!entry) {
      console.log('[Supersonic Adapter] No track currently playing.')
      return null
    }

    const minutesAgo = entry.minutesAgo ?? 999

    // If the track started more than 5 mins ago, consider playback paused

    if (minutesAgo > 5) {
      console.log(`[Supersonic Adapter] Track is stale (${minutesAgo} minutes ago). Treating as paused.`)
      return null
    }

    console.log('[Supersonic Adapter] Parsed entry:', {
      artist: entry.artist,
      title: entry.title,
      minutesAgo
    })

    const coverArtURL = `${baseURL}/getCoverArt.view?${new URLSearchParams({
      ...credentials,
      id: entry.id
    })}`

    return {
      service: 'Supersonic',
      artist: entry.artist || 'Unknown Artist',
      title: entry.title || 'Untitled',
      album: entry.album || '',
      coverArt: coverArtURL,
      timestamp: entry.created || '',
      duration: entry.duration ?? 0,
      position: entry.position ?? 0,
      mood: 'ambient'
    }
  } catch (err) {
    console.error('[Supersonic Adapter] Error fetching track:', err)
    return null
  }
}