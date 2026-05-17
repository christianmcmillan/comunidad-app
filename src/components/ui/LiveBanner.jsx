export default function LiveBanner({ videoId }) {
  if (!videoId) return null

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`

  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.4)' }}>
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: 'rgba(239,68,68,0.12)' }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444', animation: 'pulse 1.5s ease-in-out infinite' }}
        />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ef4444' }}>
          En Vivo
        </span>
        <span className="text-xs text-white ml-1">· Reunión transmitiendo ahora</span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs font-medium"
          style={{ color: '#ef4444' }}
        >
          Abrir →
        </a>
      </div>

      {/* 16:9 YouTube embed */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={embedUrl}
          title="Reunión en vivo"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  )
}
