import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useEventsStore from '../../store/useEventsStore'

const services = [
  { id: 's1', day: 'Sáb', time: '5:00pm' },
  { id: 's2', day: 'Sáb', time: '7:00pm' },
  { id: 's3', day: 'Dom', time: '9:00am' },
  { id: 's4', day: 'Dom', time: '11:00am' },
]

function formatPrice(price) {
  if (price === 0) return 'Gratis'
  return `$${price.toLocaleString('es-CO')}`
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return format(date, "d MMM yyyy", { locale: es })
}

const categoryColors = {
  Crecer: 'bg-indigo-600/30 text-indigo-300',
  Conferencia: 'bg-purple-600/30 text-purple-300',
  Seminario: 'bg-emerald-600/30 text-emerald-300',
  Especial: 'bg-amber-600/30 text-amber-300',
}

export default function EventosPage() {
  const [activeTab, setActiveTab] = useState('fds')
  const { events, mySignups, signup } = useEventsStore()

  const tabs = [
    { id: 'fds', label: 'Fin de Semana' },
    { id: 'proximos', label: 'Próximos' },
    { id: 'mis', label: 'Mis Inscripciones' },
  ]

  const signedUpEvents = events.filter((e) => mySignups.includes(e.id))

  return (
    <div className="pb-4">
      <TopBar title="Eventos" />

      {/* Sub-tabs */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fin de Semana */}
      {activeTab === 'fds' && (
        <div>
          {services.map((s) => (
            <div key={s.id} className="bg-slate-800 rounded-2xl mx-4 mb-3 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-600/20 px-2 py-0.5 rounded-full">
                  {s.day} {s.time}
                </span>
              </div>
              <p className="text-white font-semibold mb-3">Servicio Comunidad</p>
              <div className="flex gap-2">
                <button className="text-xs text-indigo-400 font-medium">
                  Ver programa →
                </button>
                <button
                  className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-3 py-1.5 text-xs font-medium transition-colors"
                  onClick={() => alert('¡Check-in realizado! 🎉')}
                >
                  Check-in Generaciones
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Próximos */}
      {activeTab === 'proximos' && (
        <div>
          {events.map((event) => (
            <div key={event.id} className="bg-slate-800 rounded-2xl mx-4 mb-3 p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white font-semibold leading-snug">{event.title}</p>
                <span
                  className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                    categoryColors[event.category] || 'bg-slate-600/30 text-slate-300'
                  }`}
                >
                  {event.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{event.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">{formatDate(event.date)}</p>
                  <p className="text-sm font-bold text-emerald-400">{formatPrice(event.price)}</p>
                </div>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
                  onClick={() => {
                    signup(event.id)
                    alert(`¡Te inscribiste para ${event.title}!`)
                  }}
                >
                  {event.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mis Inscripciones */}
      {activeTab === 'mis' && (
        <div>
          {signedUpEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Calendar size={48} className="text-slate-600" />
              <p className="text-sm text-slate-500">Aún no tienes inscripciones</p>
              <button
                className="text-xs text-indigo-400 font-medium"
                onClick={() => setActiveTab('proximos')}
              >
                Ver próximos eventos →
              </button>
            </div>
          ) : (
            <div>
              {signedUpEvents.map((event) => (
                <div key={event.id} className="bg-slate-800 rounded-2xl mx-4 mb-3 p-4">
                  <p className="text-white font-semibold">{event.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(event.date)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-emerald-400">{formatPrice(event.price)}</span>
                    <span className="text-xs text-emerald-400 bg-emerald-600/20 px-2 py-0.5 rounded-full font-medium">
                      ✅ Inscrito
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
