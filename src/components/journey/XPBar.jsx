import { getLevel, getNextThreshold } from '../../store/useUserStore'

const levelLabels = {
  visitante: 'Visitante',
  aprendiz: 'Aprendiz',
  discipulo: 'Discípulo',
  lider: 'Líder',
  servidor: 'Servidor',
}

const levelThresholds = {
  visitante: 0,
  aprendiz: 100,
  discipulo: 500,
  lider: 1200,
  servidor: 2500,
}

export default function XPBar({ xp, level }) {
  const nextThreshold = getNextThreshold(xp)
  const currentThreshold = levelThresholds[level] ?? 0
  const progress = nextThreshold
    ? ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    : 100

  return (
    <div className="mx-4 mb-4 bg-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {levelLabels[level] || level}
        </span>
        <span className="text-xs text-slate-400">{xp} XP total</span>
      </div>
      <div className="bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {nextThreshold ? (
        <p className="text-xs text-slate-500 mt-1.5">
          {nextThreshold - xp} XP al siguiente nivel ({levelLabels[getLevel(nextThreshold)]})
        </p>
      ) : (
        <p className="text-xs text-slate-500 mt-1.5">¡Nivel máximo alcanzado!</p>
      )}
    </div>
  )
}
