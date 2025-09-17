import { ref, onMounted } from 'vue'

export function useNowPlaying(fetchTrack) {
    const nowPlaying = ref(null)

    const fetchNowPlaying = async () => {
        try {
            const res = await fetch('nowplaying-js/nowplaying.json')
            const data = await res.json()
            nowPlaying.value = data
        } catch (error) {
            nowPlaying.value = null
        }
    }

    onMounted(() => {
        fetchNowPlaying()
        setInterval(fetchNowPlaying, 5000) // I think it polls every 5 seconds?
    })

    return { nowPlaying }
}