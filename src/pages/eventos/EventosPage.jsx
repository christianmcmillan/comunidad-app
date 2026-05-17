import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, CheckCircle2 } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useEventsStore from '../../store/useEventsStore'
import useUserStore from '../../store/useUserStore'
import useToastStore from '../../store/useToastStore'
import { seedWeekendMessage } from '../../data/seed'

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

// ── Weekend Quiz ─────────────────────────────────────────────────────────────
function WeekendTab() {
  const navigate = useNavigate()
  const { addXP } = useUserStore()
  const { showToast } = useToastStore()
  const msg = seedWeekendMessage

  const [selectedReunion, setSelectedReunion] = useState(null)
  const [answers, setAnswers] = useState({})        // { q1: 0, q2: 2, ... }
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const allAnswered = msg.quiz.every(q => answers[q.id] !== undefined)

  const handleSubmit = () => {
    const correct = msg.quiz.filter(q => answers[q.id] === q.correct).length
    setScore(correct)
    setSubmitted(true)
    const xp = 15 + correct * 10   // 15 base + 10 per correct answer
    addXP(xp)
    showToast({
      message: `${correct}/${msg.quiz.length} respuestas correctas 🎉`,
      type: 'success',
      xp,
    })
  }

  if (submitted) {
    return (
      <div className="px-4 flex flex-col gap-3">
        {/* Score card */}
        <div
          className="rounded-2xl p-5 flex flex-col items-center gap-2 text-center"
          style={{ background: '#242424' }}
        >
          <div className="text-4xl mb-1">
            {score === msg.quiz.length ? '🏆' : score >= 2 ? '🌟' : '📖'}
          </div>
          <p className="text-white font-bold text-lg">
            {score === msg.quiz.length
              ? '¡Perfecto!'
              : score >= 2
              ? '¡Muy bien!'
              : '¡Sigue aprendiendo!'}
          </p>
          <p className="text-sm" style={{ color: '#888' }}>
            {score}/{msg.quiz.length} respuestas correctas
          </p>
          {selectedReunion && (
            <p className="text-xs mt-1" style={{ color: '#666' }}>
              ✅ Asistencia registrada · {msg.reuniones.find(r => r.id === selectedReunion)?.label}
            </p>
          )}
        </div>

        {/* Review answers */}
        {msg.quiz.map((q, qi) => (
          <div key={q.id} className="rounded-2xl p-4" style={{ background: '#242424' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#FF6B2C' }}>Pregunta {qi + 1}</p>
            <p className="text-sm text-white font-medium mb-3">{q.question}</p>
            {q.options.map((opt, oi) => {
              const isCorrect = oi === q.correct
              const wasChosen = answers[q.id] === oi
              return (
                <div
                  key={oi}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl mb-1.5 text-sm"
                  style={{
                    background: isCorrect
                      ? 'rgba(52,211,153,0.12)'
                      : wasChosen && !isCorrect
                      ? 'rgba(248,113,113,0.1)'
                      : '#1f1f1f',
                    color: isCorrect ? '#34d399' : wasChosen && !isCorrect ? '#f87171' : '#888',
                  }}
                >
                  <span>{isCorrect ? '✓' : wasChosen ? '✗' : '○'}</span>
                  <span>{opt}</span>
                </div>
              )
            })}
          </div>
        ))}

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

  return (
    <div className="px-4 flex flex-col gap-3">
      {/* Message header */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'linear-gradient(135deg, #242424, #1e1e1e)', border: '1px solid #2e2e2e' }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B2C' }}>
          Mensaje de este fin de semana
        </p>
        <p className="text-white font-bold text-lg leading-tight">"{msg.title}"</p>
        <p className="text-xs mt-1" style={{ color: '#888' }}>{msg.pastor} · {msg.verse}</p>

        <div className="mt-3 pt-3" style={{ borderTop: '1px solid #333' }}>
          <p className="text-xs mb-2" style={{ color: '#666' }}>¿A cuál reunión asististe?</p>
          <div className="flex gap-2 flex-wrap">
            {msg.reuniones.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedReunion(r.id)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  selectedReunion === r.id
                    ? { background: '#FF6B2C', color: '#fff' }
                    : { background: '#2e2e2e', color: '#888' }
                }
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="rounded-2xl p-4" style={{ background: '#242424' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B2C' }}>
          Quiz del mensaje
        </p>
        <p className="text-xs mb-4" style={{ color: '#666' }}>
          Responde y gana hasta +45 XP por asistir
        </p>

        <div className="flex flex-col gap-5">
          {msg.quiz.map((q, qi) => (
            <div key={q.id}>
              <p className="text-sm text-white font-medium mb-2.5">
                <span style={{ color: '#FF6B2C' }}>{qi + 1}. </span>{q.question}
              </p>
              <div className="flex flex-col gap-1.5">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: oi }))}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                    style={
                      answers[q.id] === oi
                        ? { background: 'rgba(255,107,44,0.15)', color: '#fff', border: '1px solid rgba(255,107,44,0.5)' }
                        : { background: '#1f1f1f', color: '#999', border: '1px solid transparent' }
                    }
                  >
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: answers[q.id] === oi ? '#FF6B2C' : '#333',
                        color: answers[q.id] === oi ? '#fff' : '#666',
                      }}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="w-full rounded-2xl py-3.5 text-white text-sm font-bold transition-all active:scale-95"
        style={
          allAnswered
            ? { background: '#FF6B2C' }
            : { background: '#2e2e2e', color: '#555', cursor: 'not-allowed' }
        }
      >
        {allAnswered ? 'Enviar respuestas →' : `Responde todas las preguntas (${Object.keys(answers).length}/${msg.quiz.length})`}
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
