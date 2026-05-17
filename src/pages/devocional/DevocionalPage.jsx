import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import useUserStore from '../../store/useUserStore'
import useToastStore from '../../store/useToastStore'
import { seedDevotional } from '../../data/seed'

const today = new Date().toISOString().split('T')[0]
const todayLabel = format(new Date(), "EEEE d 'de' MMMM", { locale: es })

export default function DevocionalPage() {
  const navigate = useNavigate()
  const { lastDevotionalRead, markDevotionalRead, addXP } = useUserStore()
  const { showToast } = useToastStore()

  const alreadyRead = lastDevotionalRead === today
  const dev = seedDevotional

  const handleRead = () => {
    if (alreadyRead) return
    markDevotionalRead()
    addXP(50)
    showToast({ message: '¡Devocional completado!', type: 'success', xp: 50 })
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: '#1a1a1a' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="transition-colors"
          style={{ color: '#888' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: '#FF6B2C' }}>
            {todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
          </p>
          <h1 className="text-lg font-bold text-white leading-tight">Devocional</h1>
        </div>
        <BookOpen size={20} style={{ color: '#FF6B2C' }} />
      </div>

      {/* Verse hero card */}
      <div
        className="mx-4 mb-4 rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, #242424 0%, #1e1e1e 100%)', border: '1px solid #2e2e2e' }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: '#FF6B2C' }}
        >
          {dev.verseRef}
        </p>
        <p className="text-white text-lg italic leading-relaxed font-medium">
          "{dev.verse}"
        </p>
      </div>

      {/* Title */}
      <div className="mx-4 mb-3">
        <h2 className="text-white font-bold text-xl">{dev.title}</h2>
      </div>

      {/* Reflexión */}
      <div className="mx-4 mb-3 rounded-2xl p-4" style={{ background: '#242424' }}>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: '#FF6B2C' }}
        >
          Reflexión
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#ccc' }}>
          {dev.body}
        </p>
      </div>

      {/* Oración */}
      <div className="mx-4 mb-6 rounded-2xl p-4" style={{ background: '#242424' }}>
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: '#FF6B2C' }}
        >
          Oración
        </p>
        <p className="text-sm italic leading-relaxed" style={{ color: '#ccc' }}>
          {dev.prayer}
        </p>
      </div>

      {/* CTA */}
      <div className="mx-4">
        {alreadyRead ? (
          <div
            className="w-full rounded-2xl py-4 text-center text-sm font-bold"
            style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
          >
            Ya leíste hoy ✓
          </div>
        ) : (
          <button
            onClick={handleRead}
            className="w-full rounded-2xl py-4 text-white text-sm font-bold transition-all active:scale-95"
            style={{ background: '#FF6B2C' }}
          >
            Lo leí ✓
          </button>
        )}
      </div>
    </div>
  )
}
