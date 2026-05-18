import { useState, useEffect } from 'react'

export default function useLatestSermon() {
  const [sermon, setSermon]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/latest-sermon')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.videoId) setSermon(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { sermon, loading }
}
