const PLAYLIST_ID = 'PLOqudnlRsLhkUn6kj7oMQtMJAEFuyRx6i'

export default async function handler(req, res) {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
    const rssRes = await fetch(rssUrl)
    if (!rssRes.ok) throw new Error(`RSS fetch failed: ${rssRes.status}`)
    const xml = await rssRes.text()

    // Parse first entry from YouTube Atom feed
    const videoId   = xml.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1]
    const allTitles = [...xml.matchAll(/<title>(.*?)<\/title>/gs)]
    const title     = allTitles[1]?.[1]?.trim() // index 0 = feed title, index 1 = first video
    const published = xml.match(/<published>(.*?)<\/published>/)?.[1]

    if (!videoId) {
      return res.status(404).json({ error: 'No video found in playlist' })
    }

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json({
      videoId,
      title:       title ?? 'Último Mensaje',
      thumbnail:   `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: published ?? null,
    })
  } catch (err) {
    console.error('latest-sermon error:', err)
    res.status(500).json({ error: 'Failed to fetch latest sermon' })
  }
}
