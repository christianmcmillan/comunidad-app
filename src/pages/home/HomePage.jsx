import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ComunidadLogo from '../../components/ComunidadLogo'
import XPBar from '../../components/journey/XPBar'
import JourneyMap from '../../components/journey/JourneyMap'
import useUserStore, { getLevel } from '../../store/useUserStore'
import { seedDevotional, seedAnnouncements } from '../../data/seed'

const todayLabel = format(new Date(), "EEEE d 'de' MMMM", { locale: es })

export default function HomePage() {
  const { name, xp, streak } = useUserStore()
  const firstName = name.split(' ')[0]
  const level = getLevel(xp)

  const announcement = seedAnnouncements[0]
  const truncatedTitle =
    announcement.title.length > 30
      ? announcement.title.slice(0, 30) + '…'
      : announcement.title

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
        {/* Streak pill */}
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

      {/* Journey map */}
      <JourneyMap />

      {/* XP Bar */}
      <XPBar xp={xp} level={level} />

      {/* Quick actions */}
      <div className="px-4">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: '#666' }}
        >
          Acceso rápido
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { emoji: '📅', title: 'Próximo servicio', sub: 'Sábado 5pm' },
            { emoji: '📖', title: 'Devocional', sub: seedDevotional.title },
            { emoji: '📢', title: 'Anuncio', sub: truncatedTitle },
          ].map(({ emoji, title, sub }) => (
            <div
              key={title}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5"
              style={{ background: '#242424' }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs text-white text-center font-medium leading-tight">{title}</span>
              <span className="text-xs text-center leading-tight" style={{ color: '#666' }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
