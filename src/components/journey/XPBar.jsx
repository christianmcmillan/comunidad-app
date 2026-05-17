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
    <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#242424' }}>
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
          style={{ background: '#FF6B2C' }}
        >
          {levelLabels[level] || level}
        </span>
        <span className="text-xs" style={{ color: '#777' }}>{xp} XP total</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: '#333' }}>
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%`, background: '#FF6B2C' }}
        />
      </div>
      {nextThreshold ? (
        <p className="text-xs mt-1.5" style={{ color: '#666' }}>
          {nextThreshold - xp} XP al siguiente nivel ({levelLabels[getLevel(nextThreshold)]})
        </p>
      ) : (
        <p className="text-xs mt-1.5" style={{ color: '#666' }}>¡Nivel máximo alcanzado!</p>
      )}
    </div>
  )
}
