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
    setDemoMode,
  } = useUserStore()

  const isLeaderMode = xp >= 2500 && volunteerApproved

  const level = getLevel(xp)
  const levelLabel = levelLabels[level] || level

  return (
    <div className="pb-4">
      <TopBar title="Más" />

      {/* Perfil */}
      <div className="mx-4 mb-4 bg-slate-800 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Perfil</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-600/30 flex items-center justify-center text-xl font-bold text-indigo-300">
            {name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold truncate">{name}</p>
            <p className="text-xs text-slate-400 truncate">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {levelLabel}
          </span>
          <span className="text-xs text-slate-400">{xp} XP total</span>
        </div>

        {/* Badges */}
        <p className="text-xs text-slate-500 mb-2">Insignias obtenidas</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {badgeDefs.map((b) => (
            <span
              key={b.id}
              className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                badges.includes(b.id)
                  ? 'bg-indigo-600/20 text-indigo-300'
                  : 'bg-slate-700 text-slate-600'
              }`}
            >
              {b.emoji} {b.label}
            </span>
          ))}
        </div>

        <button
          className="w-full border border-slate-600 text-slate-400 rounded-xl py-2 text-sm font-medium"
          onClick={() => alert('Funcionalidad disponible próximamente.')}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Dar */}
      <div className="mx-4 mb-4 bg-slate-800 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Dar</p>
        <div className="bg-slate-700/40 rounded-xl p-4 flex items-center justify-center mb-3 h-28">
          <p className="text-slate-500 text-sm text-center">QR Nequi / Bancolombia</p>
        </div>
        <div className="text-xs text-slate-400 mb-3 space-y-1">
          <p><span className="text-slate-500">Banco:</span> Bancolombia</p>
          <p><span className="text-slate-500">Cuenta ahorros:</span> 123-456789-00</p>
          <p><span className="text-slate-500">NIT:</span> 900.123.456-7</p>
          <p><span className="text-slate-500">Nequi:</span> 310 000 0000</p>
        </div>
        <button
          disabled
          className="w-full bg-slate-700 text-slate-500 rounded-xl py-2.5 text-sm font-medium cursor-not-allowed"
        >
          Dar en línea → (Próximamente)
        </button>
      </div>

      {/* Demo mode toggle */}
      <div className="mx-4 mb-4">
        <button
          onClick={() => setDemoMode(isLeaderMode ? 'newbie' : 'leader')}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium border transition-colors ${
            isLeaderMode
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
              : 'border-slate-600 bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          <FlaskConical size={14} />
          {isLeaderMode ? 'Cambiar a: Miembro nuevo' : 'Cambiar a: Líder y voluntario'}
        </button>
      </div>
    </div>
  )
}
