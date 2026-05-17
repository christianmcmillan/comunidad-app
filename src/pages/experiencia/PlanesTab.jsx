import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { Search, Clock } from 'lucide-react'
import usePlansStore from '../../store/experiencia/usePlansStore'
import useServiceTypesStore from '../../store/experiencia/useServiceTypesStore'

function formatDates(dates) {
  if (!dates || dates.length === 0) return ''
  if (dates.length === 1) return format(parseISO(dates[0]), "d 'de' MMMM", { locale: es })
  const a = parseISO(dates[0])
  const b = parseISO(dates[dates.length - 1])
  if (a.getMonth() === b.getMonth()) return `${format(a, 'd')}-${format(b, "d 'de' MMMM yyyy", { locale: es })}`
  return `${format(a, "d MMM", { locale: es })} – ${format(b, "d MMM yyyy", { locale: es })}`
}

export default function PlanesTab() {
  const { plans } = usePlansStore()
  const { serviceTypes, getServiceType } = useServiceTypesStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filtered = plans.filter(p => {
    const matchType = filterType === 'all' || p.serviceTypeId === filterType
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="px-4 pb-4">
      {/* Search */}
      <div className="relative mb-3">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar plan..."
          className="w-full bg-slate-800 text-white text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Service type filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filterType === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >
          Todos
        </button>
        {serviceTypes.map(st => (
          <button
            key={st.id}
            onClick={() => setFilterType(st.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filterType === st.id ? 'text-white' : 'bg-slate-800 text-slate-400'}`}
            style={filterType === st.id ? { backgroundColor: st.color } : {}}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.color }} />
            {st.shortName || st.name}
          </button>
        ))}
      </div>

      {/* Plan list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">Sin planes</div>
      ) : (
        filtered.map(plan => {
          const st = getServiceType(plan.serviceTypeId)
          const serviceTimes = (plan.times || []).filter(t => !t.isRehearsal)
          return (
            <button
              key={plan.id}
              onClick={() => navigate(`/experiencia/plan/${plan.id}`)}
              className="w-full bg-slate-800 rounded-2xl mb-3 overflow-hidden flex text-left hover:bg-slate-700 transition-colors"
            >
              {/* Color strip */}
              <div className="w-1 flex-shrink-0 self-stretch" style={{ backgroundColor: st?.color || '#6366f1' }} />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white font-semibold text-sm leading-snug">{plan.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${plan.status === 'published' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                    {plan.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{formatDates(plan.dates)}</p>
                {serviceTimes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {serviceTimes.map(t => (
                      <span key={t.id} className="flex items-center gap-1 text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> {t.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}
