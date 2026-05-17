import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useUserStore from '../../store/useUserStore'
import useToastStore from '../../store/useToastStore'
import { seedSeminars } from '../../data/seed'

const stepDefs = [
  {
    id: 'encuentro',
    number: 1,
    title: 'Encuentro',
    description: 'Un retiro de 2 días donde experimentas un encuentro personal con Dios.',
    nextDate: 'Mayo 23–24, 2026',
    xpOnRegister: 20,
    xpOnComplete: 200,
    dependsOn: null,
  },
  {
    id: 'vida',
    number: 2,
    title: 'Vida',
    description: 'Aprende los fundamentos de vivir tu fe en el día a día con otros.',
    nextDate: 'Julio 2026',
    xpOnRegister: 20,
    xpOnComplete: 200,
    dependsOn: 'encuentro',
  },
  {
    id: 'influencia',
    number: 3,
    title: 'Influencia',
    description: 'Descubre cómo impactar tu mundo y liderar desde el amor.',
    nextDate: 'Septiembre 2026',
    xpOnRegister: 20,
    xpOnComplete: 200,
    dependsOn: 'vida',
  },
]

export default function CrecerPage({ hideTopBar = false, initialTab = null }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(initialTab || 'pasos')
  const { crecerSteps, updateCrecerStep, addXP, seminarsCompleted, crecerPlusProgress } = useUserStore()
  const { showToast } = useToastStore()

  const tabs = [
    { id: 'pasos', label: 'Mis Pasos' },
    { id: 'seminarios', label: 'Seminarios' },
    { id: 'plus', label: 'Crecer+' },
  ]

  const isStepLocked = (step) => {
    if (!step.dependsOn) return false
    return crecerSteps[step.dependsOn] !== 'completed'
  }

  const handleRegister = (step) => {
    if (isStepLocked(step)) return
    if (crecerSteps[step.id] !== 'none') return
    updateCrecerStep(step.id, 'registered')
    addXP(step.xpOnRegister)
    showToast({ message: `¡Inscrito en ${step.title}!`, type: 'success', xp: step.xpOnRegister })
  }

  const influenciaCompleted = crecerSteps.influencia === 'completed'

  const courseProgress = [
    { id: 'teologia-fundamental', title: 'Teología Fundamental', emoji: '📜' },
    { id: 'hechos-29', title: 'Hechos 29', emoji: '⚡' },
  ]

  return (
    <div className="pb-4">
      {!hideTopBar && <TopBar title="Crecer" />}

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

      {/* Mis Pasos */}
      {activeTab === 'pasos' && (
        <div className="px-4 flex flex-col gap-3">
          {stepDefs.map((step) => {
            const status = crecerSteps[step.id]
            const locked = isStepLocked(step)

            return (
              <div
                key={step.id}
                className="relative rounded-2xl p-4 overflow-hidden"
                style={{ background: '#242424', opacity: locked ? 0.5 : 1 }}
              >
                {locked && (
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl z-10"
                    style={{ background: 'rgba(26,26,26,0.6)' }}
                  >
                    <Lock size={28} style={{ color: '#555' }} />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium" style={{ color: '#666' }}>Paso {step.number}</span>
                    <p className="text-white font-bold text-base">{step.title}</p>
                  </div>
                  {status === 'none' && !locked && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#2e2e2e', color: '#888' }}>
                      Próximamente
                    </span>
                  )}
                  {status === 'registered' && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                      Inscrito ⏳
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>
                      Completado ✅
                    </span>
                  )}
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: '#888' }}>{step.description}</p>
                <p className="text-xs mb-3" style={{ color: '#666' }}>📅 {step.nextDate}</p>
                {status === 'none' && !locked && (
                  <button
                    className="w-full text-white rounded-xl py-2.5 text-sm font-medium transition-all"
                    style={{ background: '#FF6B2C' }}
                    onClick={() => handleRegister(step)}
                  >
                    Inscribirme
                  </button>
                )}
                {status === 'registered' && (
                  <button
                    disabled
                    className="w-full rounded-xl py-2.5 text-sm font-medium cursor-not-allowed"
                    style={{ background: '#2e2e2e', color: '#555' }}
                  >
                    En progreso…
                  </button>
                )}
                {status === 'completed' && (
                  <div className="text-center text-sm font-medium py-1" style={{ color: '#34d399' }}>
                    ¡Completado! 🎉
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Seminarios */}
      {activeTab === 'seminarios' && (
        <div className="px-4 grid grid-cols-2 gap-3">
          {seedSeminars.map((seminar) => {
            const completed = seminarsCompleted.includes(seminar.id)
            return (
              <div key={seminar.id} className="rounded-2xl p-4 flex flex-col" style={{ background: '#242424' }}>
                <div className="relative mb-2">
                  <span className="text-3xl">{seminar.emoji}</span>
                  {completed && (
                    <span
                      className="absolute top-0 right-0 text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}
                    >
                      ✅
                    </span>
                  )}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{seminar.title}</p>
                <p className="text-xs mb-2 leading-relaxed flex-1" style={{ color: '#888' }}>{seminar.description}</p>
                <p className="text-xs mb-3" style={{ color: '#666' }}>📅 {seminar.nextDate}</p>
                {completed ? (
                  <div className="text-center text-xs font-medium py-1" style={{ color: '#34d399' }}>
                    ¡Ya asististe!
                  </div>
                ) : (
                  <button
                    className="w-full text-white rounded-xl py-2 text-xs font-medium transition-all"
                    style={{ background: '#FF6B2C' }}
                    onClick={() => showToast({ message: `¡Inscrito en ${seminar.title}!`, type: 'success' })}
                  >
                    Inscribirme
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Crecer+ */}
      {activeTab === 'plus' && (
        <div className="px-4">
          {!influenciaCompleted ? (
            <div className="rounded-2xl p-6 flex flex-col items-center gap-3" style={{ background: '#242424' }}>
              <Lock size={36} style={{ color: '#555' }} />
              <p className="text-white font-bold text-center">Desbloquea Crecer+</p>
              <p className="text-xs text-center leading-relaxed" style={{ color: '#888' }}>
                Completa el paso Influencia para acceder a los cursos de formación avanzada.
              </p>
              <div className="w-full h-1.5 rounded-full mt-2" style={{ background: '#333' }}>
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    background: '#FF6B2C',
                    width: `${(Object.values(crecerSteps).filter(s => s === 'completed').length / 3) * 100}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {courseProgress.map((course) => {
                const progress = crecerPlusProgress[course.id] ?? 0
                return (
                  <div key={course.id} className="rounded-2xl p-4" style={{ background: '#242424' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{course.title}</p>
                      </div>
                      {progress === 100 && <span className="text-xs" style={{ color: '#34d399' }}>✅</span>}
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs" style={{ color: '#888' }}>Progreso</p>
                      <p className="text-xs font-medium" style={{ color: '#888' }}>{progress}%</p>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: '#333' }}>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${progress}%`, background: '#FF6B2C' }}
                      />
                    </div>
                    <button
                      onClick={() => navigate(`/crecer-plus/${course.id}`)}
                      className="w-full rounded-xl py-2 text-sm font-medium transition-all"
                      style={
                        progress === 100
                          ? { background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }
                          : progress > 0
                            ? { background: 'rgba(255,107,44,0.12)', color: '#FF6B2C', border: '1px solid rgba(255,107,44,0.4)' }
                            : { background: '#FF6B2C', color: '#fff' }
                      }
                    >
                      {progress === 100 ? 'Ver curso completo' : progress > 0 ? 'Continuar →' : 'Comenzar →'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
