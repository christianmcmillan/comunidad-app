import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import TopBar from '../../components/layout/TopBar'
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
      <TopBar
        title={`¡Hola, ${firstName}! 👋`}
        subtitle={todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
      />

      {/* Streak card */}
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-4 mx-4 mb-4">
        <p className="text-white font-bold text-base">
          🔥 {streak} {streak === 1 ? 'día seguido' : 'días seguidos'}
        </p>
        <p className="text-xs text-orange-300/80 mt-0.5">
          ¡Sigue así! Vuelve mañana para mantener tu racha.
        </p>
      </div>

      {/* Journey map */}
      <JourneyMap />

      {/* XP Bar */}
      <XPBar xp={xp} level={level} />

      {/* Quick actions */}
      <div className="px-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Acceso rápido</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-slate-800 p-3 flex flex-col items-center gap-1.5">
            <span className="text-2xl">📅</span>
            <span className="text-xs text-slate-300 text-center font-medium leading-tight">Próximo servicio</span>
            <span className="text-xs text-slate-500">Sábado 5pm</span>
          </div>
          <div className="rounded-xl bg-slate-800 p-3 flex flex-col items-center gap-1.5">
            <span className="text-2xl">📖</span>
            <span className="text-xs text-slate-300 text-center font-medium leading-tight">Devocional</span>
            <span className="text-xs text-slate-500 text-center leading-tight">{seedDevotional.title}</span>
          </div>
          <div className="rounded-xl bg-slate-800 p-3 flex flex-col items-center gap-1.5">
            <span className="text-2xl">📢</span>
            <span className="text-xs text-slate-300 text-center font-medium leading-tight">Anuncio</span>
            <span className="text-xs text-slate-500 text-center leading-tight">{truncatedTitle}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
