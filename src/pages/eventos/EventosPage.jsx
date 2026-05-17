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
  Crecer:      { background: 'rgba(255,107,44,0.12)', color: '#FF6B2C' },
  Conferencia: { background: 'rgba(167,139,250,0.12)', color: '#a78bfa' },
  Seminario:   { background: 'rgba(52,211,153,0.12)', color: '#34d399' },
  Especial:    { background: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
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
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={
              activeTab === tab.id
                ? { background: '#FF6B2C', color: '#fff' }
                : { background: '#2e2e2e', color: '#888' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fin de Semana */}
      {activeTab === 'fds' && (
        <div>
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl mx-4 mb-3 p-4" style={{ background: '#242424' }}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,107,44,0.15)', color: '#FF6B2C' }}
                >
                  {s.day} {s.time}
                </span>
              </div>
              <p className="text-white font-semibold mb-3">Servicio Comunidad</p>
              <div className="flex gap-2">
                <button className="text-xs font-medium" style={{ color: '#FF6B2C' }}>
                  Ver programa →
                </button>
                <button
                  className="ml-auto text-white rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
                  style={{ background: '#FF6B2C' }}
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
            <div key={event.id} className="rounded-2xl mx-4 mb-3 p-4" style={{ background: '#242424' }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white font-semibold leading-snug">{event.title}</p>
                <span
                  className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={categoryColors[event.category] || { background: '#2e2e2e', color: '#888' }}
                >
                  {event.category}
                </span>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: '#888' }}>{event.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: '#666' }}>{formatDate(event.date)}</p>
                  <p className="text-sm font-bold" style={{ color: '#34d399' }}>{formatPrice(event.price)}</p>
                </div>
                <button
                  className="text-white rounded-xl px-4 py-2 text-sm font-medium transition-all"
                  style={{ background: '#FF6B2C' }}
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
              <Calendar size={48} style={{ color: '#444' }} />
              <p className="text-sm" style={{ color: '#777' }}>Aún no tienes inscripciones</p>
              <button
                className="text-xs font-medium"
                style={{ color: '#FF6B2C' }}
                onClick={() => setActiveTab('proximos')}
              >
                Ver próximos eventos →
              </button>
            </div>
          ) : (
            <div>
              {signedUpEvents.map((event) => (
                <div key={event.id} className="rounded-2xl mx-4 mb-3 p-4" style={{ background: '#242424' }}>
                  <p className="text-white font-semibold">{event.title}</p>
                  <p className="text-xs mt-1" style={{ color: '#888' }}>{formatDate(event.date)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold" style={{ color: '#34d399' }}>{formatPrice(event.price)}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}
                    >
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
