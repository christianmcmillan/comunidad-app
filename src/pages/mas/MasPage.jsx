import { FlaskConical } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useUserStore, { getLevel } from '../../store/useUserStore'

const levelLabels = {
  visitante: 'Visitante',
  aprendiz: 'Aprendiz',
  discipulo: 'Discípulo',
  lider: 'Líder',
  servidor: 'Servidor',
}

const badgeDefs = [
  { id: 'conectado', emoji: '🏠', label: 'Conectado' },
  { id: 'encontrado', emoji: '🤝', label: 'Encontrado' },
  { id: 'vivo', emoji: '📖', label: 'Vivo' },
  { id: 'influyente', emoji: '🌟', label: 'Influyente' },
  { id: 'racha7', emoji: '🔥', label: 'Racha 7' },
  { id: 'escuela-heroes', emoji: '🦸', label: 'Escuela Héroes' },
  { id: 'para-siempre', emoji: '💍', label: 'Para Siempre' },
  { id: 'relaciones-sanas', emoji: '🌿', label: 'Rel. Sanas' },
]

export default function MasPage() {
  const {
    name,
    email,
    xp,
    badges,
    volunteerApproved,
    groupId,
    crecerSteps,
    setDemoMode,
  } = useUserStore()

  const isLeaderMode = !!groupId && volunteerApproved &&
    crecerSteps.encuentro === 'completed' && crecerSteps.vida === 'completed'
  const level = getLevel(xp)
  const levelLabel = levelLabels[level] || level

  return (
    <div className="pb-4">
      <TopBar title="Más" />

      {/* Perfil */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#242424' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#666' }}>Perfil</p>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ background: 'rgba(255,107,44,0.25)' }}
          >
            {name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold truncate">{name}</p>
            <p className="text-xs truncate" style={{ color: '#777' }}>{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: '#FF6B2C' }}
          >
            {levelLabel}
          </span>
          <span className="text-xs" style={{ color: '#777' }}>{xp} XP total</span>
        </div>

        {/* Badges */}
        <p className="text-xs mb-2" style={{ color: '#666' }}>Insignias obtenidas</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {badgeDefs.map((b) => (
            <span
              key={b.id}
              className="text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1"
              style={
                badges.includes(b.id)
                  ? { background: 'rgba(255,107,44,0.15)', color: '#FF6B2C' }
                  : { background: '#2e2e2e', color: '#555' }
              }
            >
              {b.emoji} {b.label}
            </span>
          ))}
        </div>

        <button
          className="w-full rounded-xl py-2 text-sm font-medium"
          style={{ border: '1px solid #333', color: '#666' }}
          onClick={() => alert('Funcionalidad disponible próximamente.')}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Dar */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#242424' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#666' }}>Dar</p>
        <div className="rounded-xl flex items-center justify-center mb-3 h-28" style={{ background: '#1f1f1f' }}>
          <p className="text-sm text-center" style={{ color: '#555' }}>QR Nequi / Bancolombia</p>
        </div>
        <div className="text-xs mb-3 space-y-1" style={{ color: '#777' }}>
          <p><span style={{ color: '#555' }}>Banco:</span> Bancolombia</p>
          <p><span style={{ color: '#555' }}>Cuenta ahorros:</span> 123-456789-00</p>
          <p><span style={{ color: '#555' }}>NIT:</span> 900.123.456-7</p>
          <p><span style={{ color: '#555' }}>Nequi:</span> 310 000 0000</p>
        </div>
        <button
          disabled
          className="w-full rounded-xl py-2.5 text-sm font-medium cursor-not-allowed"
          style={{ background: '#2e2e2e', color: '#555' }}
        >
          Dar en línea → (Próximamente)
        </button>
      </div>

      {/* Demo mode toggle */}
      <div className="mx-4 mb-4">
        <button
          onClick={() => setDemoMode(isLeaderMode ? 'newbie' : 'leader')}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all"
          style={
            isLeaderMode
              ? { border: '1px solid rgba(251,191,36,0.4)', background: 'rgba(251,191,36,0.08)', color: '#fbbf24' }
              : { border: '1px solid #333', background: '#242424', color: '#888' }
          }
        >
          <FlaskConical size={14} />
          {isLeaderMode ? 'Cambiar a: Miembro nuevo' : 'Cambiar a: Líder y voluntario'}
        </button>
      </div>
    </div>
  )
}
