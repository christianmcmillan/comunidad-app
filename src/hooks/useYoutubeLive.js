import { useState, useEffect } from 'react'

const API_KEY    = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCdkUqe6hJBjHlkWnfC4DxNg' // comunidadmde

// Checks once on mount — 1 API call per home screen visit, no background polling.
export default function useYoutubeLive() {
  const [state, setState] = useState({ isLive: false, videoId: null })

  useEffect(() => {
    if (!API_KEY || !CHANNEL_ID) return
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const item = data?.items?.[0]
        if (item) setState({ isLive: true, videoId: item.id.videoId })
      })
      .catch(() => {
        // Silently ignore network errors — just don't show the banner
      })
  }, [])

  return state
}
