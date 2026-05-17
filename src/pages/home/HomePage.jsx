import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ComunidadLogo from '../../components/ComunidadLogo'
import XPBar from '../../components/journey/XPBar'
import JourneyMap from '../../components/journey/JourneyMap'
import LiveBanner from '../../components/ui/LiveBanner'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import useUserStore, { getLevel } from '../../store/useUserStore'
import useYoutubeLive from '../../hooks/useYoutubeLive'
import { seedAnnouncements } from '../../data/seed'

const todayLabel = format(new Date(), "EEEE d 'de' MMMM", { locale: es })

export default function HomePage() {
  const navigate = useNavigate()
  const { name, xp, streak, nextAssignment } = useUserStore()
  const { isLive, videoId } = useYoutubeLive()
  const firstName = name.split(' ')[0]
  const level = getLevel(xp)

  const quickActions = [
    {
      emoji: '🎪',
      title: 'App Experiencia',
      sub: 'Voluntarios & Equipos',
      onTap: () => navigate('/experiencia'),
    },
    {
      emoji: '🌱',
      title: 'Tu próximo paso',
      sub: 'Crecer en comunidad',
      onTap: () => navigate('/discipulado'),
    },
    {
      emoji: '🎵',
      title: 'Nuevo Álbum',
      sub: 'Comunidad Music',
      onTap: () => window.open(seedAnnouncements[0]?.ctaUrl || 'https://open.spotify.com', '_blank'),
    },
  ]

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#FF6B2C' }}
          >
            <ComunidadLogo size={26} />
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: '#FF6B2C' }}>
              {todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
            </p>
            <h1 className="text-lg font-bold text-white leading-tight">
              ¡Hola, {firstName}!
            </h1>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
          style={{ background: 'rgba(255,107,44,0.15)', color: '#FF6B2C', border: '1px solid rgba(255,107,44,0.3)' }}
        >
          <span>🔥</span>
          <span>{streak}</span>
        </div>
      </div>

      {/* Hero streak card */}
      <div
        className="mx-4 mb-4 rounded-2xl p-4"
        style={{ background: 'linear-gradient(135deg, #FF6B2C 0%, #e85a1a 100%)' }}
      >
        <p className="text-white font-bold text-base leading-snug">
          {streak === 1
            ? '¡Llevas 1 día seguido con Dios! 🙌'
            : streak < 7
            ? `${streak} días seguidos con Dios 💪`
            : streak < 30
            ? `¡${streak} días de racha! Sigue brillando 🔥`
            : `${streak} días de racha 🏆 ¡Extraordinario!`}
        </p>
        <p className="text-white/80 text-xs mt-1">
          Vuelve mañana para mantener tu racha.
        </p>
      </div>

      {/* Próximo servicio en Experiencia */}
      {nextAssignment && (
        <button
          onClick={() => navigate('/experiencia')}
          className="mx-4 mb-4 rounded-2xl p-4 text-left w-[calc(100%-2rem)] transition-all active:scale-95"
          style={{ background: '#1a1f2e', border: '1px solid rgba(99,102,241,0.35)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#818cf8' }}>
              📋 Próximo Servicio
            </span>
            <span className="text-xs" style={{ color: '#4f46e5' }}>Ver detalles →</span>
          </div>
          <p className="text-white font-semibold text-sm leading-snug">{nextAssignment.planTitle}</p>
          <p className="text-xs mt-0.5 mb-2" style={{ color: '#666' }}>{nextAssignment.dates}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {nextAssignment.times.map(t => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}
              >
                {t}
              </span>
            ))}
            <span className="text-xs" style={{ color: '#555' }}>·</span>
            <span className="text-xs" style={{ color: '#666' }}>{nextAssignment.team} · {nextAssignment.position}</span>
          </div>
        </button>
      )}

      {/* YouTube Live banner (only when streaming) */}
      {isLive && <LiveBanner videoId={videoId} />}

      {/* Journey map */}
      <JourneyMap />

      {/* XP Bar */}
      <XPBar xp={xp} level={level} />

      {/* Quick actions */}
      <div className="px-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#666' }}>
          Acceso rápido
        </p>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map(({ emoji, title, sub, onTap }) => (
            <button
              key={title}
              onClick={onTap}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-left transition-all active:scale-95"
              style={{ background: '#242424' }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs text-white text-center font-medium leading-tight">{title}</span>
              <span className="text-xs text-center leading-tight" style={{ color: '#666' }}>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hola — general contact */}
      <div className="px-4 mt-1 mb-2">
        <WhatsAppButton label="Comunidad" phone="573012881329" message="Hola, quiero conectarme con Comunidad 👋" />
      </div>
    </div>
  )
}
