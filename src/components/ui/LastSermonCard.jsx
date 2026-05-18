import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

function formatDate(iso) {
  try {
    return format(parseISO(iso), "d 'de' MMMM yyyy", { locale: es })
  } catch {
    return null
  }
}

export default function LastSermonCard({ sermon, loading }) {
  if (!loading && !sermon) return null

  return (
    <div className="mx-4 mb-4">
      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#666' }}>
        Último Mensaje
      </p>

      {loading ? (
        /* Skeleton */
        <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#242424' }}>
          <div className="w-full aspect-video" style={{ background: '#2e2e2e' }} />
          <div className="p-3">
            <div className="h-4 rounded mb-2" style={{ background: '#333', width: '75%' }} />
            <div className="h-3 rounded" style={{ background: '#2e2e2e', width: '40%' }} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#242424' }}>
          {/* Thumbnail + play overlay */}
          <button
            className="relative w-full block transition-all active:opacity-80"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.videoId}`, '_blank')}
          >
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="w-full aspect-video object-cover"
            />
            {/* Play button */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
              >
                {/* Triangle */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '14px solid #1a1a1a',
                    marginLeft: 3,
                  }}
                />
              </div>
            </div>
          </button>

          {/* Info row */}
          <div className="px-3 py-3 flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
                {sermon.title}
              </p>
              {sermon.publishedAt && (
                <p className="text-xs mt-0.5" style={{ color: '#666' }}>
                  {formatDate(sermon.publishedAt)}
                </p>
              )}
            </div>
            <button
              onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.videoId}`, '_blank')}
              className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all active:scale-95"
              style={{ background: '#FF6B2C', color: '#fff' }}
            >
              Ver →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
