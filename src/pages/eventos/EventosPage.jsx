import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, MapPin } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useEventsStore from '../../store/useEventsStore'
import useToastStore from '../../store/useToastStore'

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

// ── Reuniones Info ────────────────────────────────────────────────────────────
function WeekendTab() {
  const navigate = useNavigate()
  const reuniones = [
    { day: 'Sábado', times: ['5:00 pm', '7:00 pm'] },
    { day: 'Domingo', times: ['9:00 am', '11:00 am'] },
  ]

  return (
    <div className="px-4 flex flex-col gap-3">
      {/* Times */}
      <div className="rounded-2xl p-4" style={{ background: '#242424' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#FF6B2C' }}>
          Horarios
        </p>
        <div className="flex flex-col gap-3">
          {reuniones.map(({ day, times }) => (
            <div key={day} className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm">{day}</p>
              <div className="flex gap-2">
                {times.map(t => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,107,44,0.12)', color: '#FF6B2C' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-4 pt-3" style={{ color: '#666', borderTop: '1px solid #333' }}>
          ✅ Entrada libre · No requiere inscripción
        </p>
      </div>

      {/* Address */}
      <div className="rounded-2xl p-4" style={{ background: '#242424' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#FF6B2C' }}>
          Ubicación
        </p>
        <p className="text-white font-medium text-sm">Av. El Poblado #31-253</p>
        <p className="text-xs mt-0.5" style={{ color: '#888' }}>Medellín, Antioquia, Colombia</p>
        <p className="text-xs mt-0.5" style={{ color: '#666' }}>Diagonal al Centro Comercial San Diego</p>
        <button
          onClick={() => window.open('https://maps.google.com/?q=Av.+El+Poblado+31-253+Medellin', '_blank')}
          className="flex items-center gap-1.5 mt-3 text-xs font-medium transition-all active:scale-95"
          style={{ color: '#FF6B2C' }}
        >
          <MapPin size={13} /> Abrir en Maps →
        </button>
      </div>

      {/* Ver programa */}
      <button
        onClick={() => navigate('/experiencia/plan/plan-1')}
        className="w-full rounded-2xl py-3 text-sm font-medium transition-all active:scale-95"
        style={{ background: '#242424', color: '#FF6B2C', border: '1px solid rgba(255,107,44,0.3)' }}
      >
        Ver programa del servicio →
      </button>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function EventosPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { events, mySignups, signup } = useEventsStore()
  const { showToast } = useToastStore()

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'fds')

  const tabs = [
    { id: 'fds', label: 'Reuniones' },
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

      {activeTab === 'fds' && <WeekendTab />}

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
                  className="text-white rounded-xl px-4 py-2 text-sm font-medium transition-all active:scale-95"
                  style={
                    mySignups.includes(event.id)
                      ? { background: '#2e2e2e', color: '#555' }
                      : { background: '#FF6B2C' }
                  }
                  disabled={mySignups.includes(event.id)}
                  onClick={() => {
                    if (mySignups.includes(event.id)) return
                    signup(event.id)
                    showToast({ message: `¡Inscrito en ${event.title}!`, type: 'success', xp: 10 })
                  }}
                >
                  {mySignups.includes(event.id) ? '✓ Inscrito' : event.cta}
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
