import { Lock, CheckCircle } from 'lucide-react'

export default function JourneyNode({ step, onTap }) {
  const { title, emoji, status, description } = step

  if (status === 'locked') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 opacity-40">
        <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center flex-shrink-0">
          <Lock size={18} className="text-slate-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-600">{title}</p>
          {description && <p className="text-xs text-slate-700">{description}</p>}
        </div>
      </div>
    )
  }

  if (status === 'completed') {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-12 h-12 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={20} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && <p className="text-xs text-slate-400">{description}</p>}
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
        <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-pulse scale-125" />
        <div className="relative w-12 h-12 rounded-full bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center text-xl">
          {emoji}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        {description && <p className="text-xs text-slate-400">{description}</p>}
      </div>
    </button>
  )
}
