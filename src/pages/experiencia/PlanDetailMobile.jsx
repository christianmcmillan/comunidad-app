import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowLeft, Music2, MessageSquare, AlignLeft, Film, Clock } from 'lucide-react'
import usePlansStore from '../../store/experiencia/usePlansStore'
import useServiceTypesStore from '../../store/experiencia/useServiceTypesStore'
import useTeamsStore from '../../store/experiencia/useTeamsStore'
import usePeopleStore from '../../store/experiencia/usePeopleStore'
import useSongsStore from '../../store/experiencia/useSongsStore'
import { fmtDuration, fmtClockTime, buildStartTimes, buildSectionTotals } from '../../utils/orderBuilder'

const isSec = t => t === 'header' || t === 'section'

const TYPE_CFG = {
  song:    { Icon: Music2,        color: 'text-indigo-400'  },
  spoken:  { Icon: MessageSquare, color: 'text-emerald-500' },
  media:   { Icon: Film,          color: 'text-orange-400'  },
  header:  { Icon: AlignLeft,     color: 'text-slate-500'   },
  section: { Icon: AlignLeft,     color: 'text-slate-500'   },
}

function formatDates(dates) {
  if (!dates || !dates.length) return ''
  if (dates.length === 1) return format(parseISO(dates[0]), "d 'de' MMMM yyyy", { locale: es })
  return `${format(parseISO(dates[0]), 'd')} & ${format(parseISO(dates[dates.length-1]), "d 'de' MMMM yyyy", { locale: es })}`
}

export default function PlanDetailMobile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPlan } = usePlansStore()
  const { getServiceType } = useServiceTypesStore()
  const { teams } = useTeamsStore()
  const { getPerson } = usePeopleStore()
  const { getSong } = useSongsStore()
  const [activeTab, setActiveTab] = useState('orden')
  const [selTime, setSelTime] = useState(null)

  const plan = getPlan(id)
  if (!plan) return (
    <div className="p-4 text-slate-400 text-sm">Plan no encontrado.{' '}
      <button onClick={() => navigate('/experiencia')} className="text-indigo-400 underline">Volver</button>
    </div>
  )

  const st = getServiceType(plan.serviceTypeId)
  const order = [...(plan.order || [])].sort((a, b) => a.position - b.position)
  const allTimes = (plan.times || []).filter(t => !t.isRehearsal)
  const currentTime = allTimes.find(t => t.id === selTime) || allTimes[0] || null
  const startTimes = buildStartTimes(order)
  const sectTotals = buildSectionTotals(order)
  const total = order.filter(i => !isSec(i.type)).reduce((s, i) => s + (i.duration || 0), 0)

  let baseMinutes = null
  if (currentTime?.datetime) {
    const d = new Date(currentTime.datetime)
    baseMinutes = d.getHours() * 60 + d.getMinutes()
  }

  const TABS = ['orden', 'equipo', 'notas']
  const TAB_LABELS = { orden: 'Orden', equipo: 'Equipo', notas: 'Notas' }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate('/experiencia')} className="text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          {st && <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.color }} />}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">{plan.title}</p>
            <p className="text-xs text-slate-400">{formatDates(plan.dates)}</p>
          </div>
        </div>

        {/* Time selector */}
        {allTimes.length > 1 && (
          <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto">
            {allTimes.map(t => (
              <button
                key={t.id}
                onClick={() => setSelTime(t.id === selTime ? null : t.id)}
                className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  (selTime === t.id || (!selTime && t.id === allTimes[0]?.id))
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 font-medium'
                    : 'border-slate-700 text-slate-500'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}

        {/* Sub-tabs */}
        <div className="flex border-b border-slate-700 px-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500'
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* ORDEN TAB */}
      {activeTab === 'orden' && (
        <div className="pb-6">
          {order.map(item => {
            if (isSec(item.type)) {
              return (
                <div key={item.id} className="flex items-center bg-slate-800/50 border-y border-slate-700/50 px-4 py-2 mt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex-1">
                    {item.title || 'SECCIÓN'}
                  </span>
                  {sectTotals[item.id] > 0 && (
                    <span className="text-xs text-slate-500 tabular-nums">{fmtDuration(sectTotals[item.id])}</span>
                  )}
                </div>
              )
            }
            const cfg = TYPE_CFG[item.type] || TYPE_CFG.spoken
            const song = item.songId ? getSong(item.songId) : null
            const clock = fmtClockTime(baseMinutes, startTimes[item.id] ?? 0)
            return (
              <div key={item.id} className="flex items-start border-b border-slate-800 px-4 py-3 gap-3">
                <div className="w-12 flex-shrink-0 text-right">
                  {clock && <span className="text-xs text-slate-500 tabular-nums">{clock}</span>}
                </div>
                <div className="w-10 flex-shrink-0 text-right">
                  <span className="text-xs text-slate-500 tabular-nums">{item.duration > 0 ? fmtDuration(item.duration) : '—'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <cfg.Icon size={12} className={cfg.color} />
                    <span className="text-sm font-medium text-white">{item.title}</span>
                    {item.type === 'song' && item.key && (
                      <span className="text-xs bg-indigo-900/50 text-indigo-400 px-1.5 py-0.5 rounded font-semibold">{item.key}</span>
                    )}
                  </div>
                  {item.type === 'song' && song?.artist && (
                    <p className="text-xs text-slate-500 mt-0.5 ml-[18px]">{song.artist}</p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-slate-400 mt-0.5 ml-[18px] leading-relaxed">{item.notes}</p>
                  )}
                </div>
              </div>
            )
          })}
          <div className="flex items-center border-t-2 border-slate-700 mt-2 px-4 py-3 gap-3">
            <div className="w-12" />
            <div className="w-10 text-right">
              <span className="text-sm font-bold text-white tabular-nums">{fmtDuration(total)}</span>
            </div>
            <span className="text-xs text-slate-500">duración total</span>
          </div>
        </div>
      )}

      {/* EQUIPO TAB */}
      {activeTab === 'equipo' && (
        <div className="px-4 pt-4 pb-6">
          {(plan.assignments || []).length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">Sin asignaciones de equipo</div>
          ) : (
            (() => {
              // Group by time
              const byTime = {}
              for (const a of plan.assignments) {
                if (!byTime[a.timeId]) byTime[a.timeId] = []
                byTime[a.timeId].push(a)
              }
              return Object.entries(byTime).map(([timeId, assignments]) => {
                const time = plan.times?.find(t => t.id === timeId)
                return (
                  <div key={timeId} className="mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Clock size={10} /> {time?.name || 'Tiempo'}
                    </p>
                    {assignments.map(a => {
                      const team = teams.find(t => t.id === a.teamId)
                      const position = team?.positions?.find(p => p.id === a.positionId)
                      const person = getPerson(a.personId)
                      return (
                        <div key={a.id} className="bg-slate-800 rounded-xl px-4 py-3 mb-2 flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">
                              {person ? `${person.firstName} ${person.lastName}` : '—'}
                            </p>
                            <p className="text-xs text-slate-400">{team?.name}{position ? ` · ${position.name}` : ''}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            a.status === 'confirmed' ? 'bg-emerald-600/20 text-emerald-400' :
                            a.status === 'invited' ? 'bg-amber-600/20 text-amber-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                            {a.status === 'confirmed' ? '✓ Confirmado' : a.status === 'invited' ? 'Pendiente' : 'Declinado'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })
            })()
          )}
        </div>
      )}

      {/* NOTAS TAB */}
      {activeTab === 'notas' && (
        <div className="px-4 pt-4 pb-6">
          {(plan.notes || []).length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">Sin notas</div>
          ) : (
            plan.notes.map(note => (
              <div key={note.id} className="bg-slate-800 rounded-2xl p-4 mb-3">
                <p className="text-white font-semibold text-sm mb-1">{note.title}</p>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{note.body}</p>
                <p className="text-xs text-slate-500 mt-2">{format(new Date(note.createdAt), "d 'de' MMMM", { locale: es })}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
