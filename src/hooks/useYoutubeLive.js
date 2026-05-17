import { useState, useEffect, useRef } from 'react'

const API_KEY     = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_ID  = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCdkUqe6hJBjHlkWnfC4DxNg' // comunidadmde
const POLL_MS     = 5 * 60_000  // 5 min → ~288 consultas/día por usuario

export default function useYoutubeLive() {
  const [state, setState] = useState({ isLive: false, videoId: null })
  const timerRef = useRef(null)

  async function check() {
    if (!API_KEY || !CHANNEL_ID) return
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
      const res  = await fetch(url)
      if (!res.ok) return
      const data = await res.json()
      const item = data.items?.[0]
      if (item) {
        setState({ isLive: true, videoId: item.id.videoId })
      } else {
        setState({ isLive: false, videoId: null })
      }
    } catch {
      // Silently ignore network errors — just don't show the banner
    }
  }

  useEffect(() => {
    check()
    timerRef.current = setInterval(check, POLL_MS)
    return () => clearInterval(timerRef.current)
  }, [])

  return state
}
