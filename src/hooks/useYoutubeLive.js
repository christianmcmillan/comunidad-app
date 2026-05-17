import { useState, useEffect } from 'react'

// Reads the live state set by the admin app (comunidad-mde-app).
// Both apps use Zustand persist with key 'comunidad-live', so when running
// in the same browser the state is shared automatically — no API calls needed.
//
// Returns { isLive: boolean, videoId: string | null }
export default function useYoutubeLive() {
  const [state, setState] = useState({ isLive: false, videoId: null })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('comunidad-live')
      if (!raw) return
      // Zustand persist wraps the state under a "state" key
      const { state: stored } = JSON.parse(raw)
      if (stored?.isLive && stored?.videoId) {
        setState({ isLive: true, videoId: stored.videoId })
      }
    } catch {
      // Silent fail — just don't show the banner
    }
  }, [])

  return state
}
