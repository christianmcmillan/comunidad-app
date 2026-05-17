import { Lock, CheckCircle } from 'lucide-react'

export default function JourneyNode({ step, onTap }) {
  const { title, emoji, status, description } = step

  if (status === 'locked') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 opacity-30">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#2a2a2a', border: '2px solid #333' }}
        >
          <Lock size={18} style={{ color: '#555' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#555' }}>{title}</p>
          {description && <p className="text-xs" style={{ color: '#444' }}>{description}</p>}
        </div>
      </div>
    )
  }

  if (status === 'completed') {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(52,211,153,0.12)', border: '2px solid rgba(52,211,153,0.5)' }}
        >
          <CheckCircle size={20} style={{ color: '#34d399' }} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && <p className="text-xs" style={{ color: '#777' }}>{description}</p>}
        </div>
      </div>
    )
  }

  // active
  return (
    <button
      onClick={onTap}
      className="flex items-center gap-3 px-4 py-3 w-full text-left"
    >
      <div className="relative flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full animate-pulse scale-125"
          style={{ background: 'rgba(255,107,44,0.25)' }}
        />
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{ background: '#FF6B2C', border: '2px solid rgba(255,150,100,0.7)' }}
        >
          {emoji}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        {description && <p className="text-xs" style={{ color: '#999' }}>{description}</p>}
      </div>
    </button>
  )
}
