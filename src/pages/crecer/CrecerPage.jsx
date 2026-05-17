import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useUserStore from '../../store/useUserStore'
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

export default function CrecerPage({ hideTopBar = false }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pasos')
  const { crecerSteps, updateCrecerStep, addXP, seminarsCompleted, crecerPlusProgress } = useUserStore()

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
    alert(`¡Te inscribiste en ${step.title}! +${step.xpOnRegister} XP 🎉`)
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

      {/* Mis Pasos */}
      {activeTab === 'pasos' && (
        <div className="px-4 flex flex-col gap-3">
          {stepDefs.map((step) => {
            const status = crecerSteps[step.id]
            const locked = isStepLocked(step)

            return (
              <div
                key={step.id}
                className={`relative bg-slate-800 rounded-2xl p-4 overflow-hidden ${locked ? 'opacity-50' : ''}`}
              >
                {locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800/60 rounded-2xl z-10">
                    <Lock size={28} className="text-slate-500" />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Paso {step.number}</span>
                    <p className="text-white font-bold text-base">{step.title}</p>
                  </div>
                  {status === 'none' && !locked && (
                    <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
                      Próximamente
                    </span>
                  )}
                  {status === 'registered' && (
                    <span className="text-xs text-amber-400 bg-amber-600/20 px-2 py-0.5 rounded-full">
                      Inscrito ⏳
                    </span>
                  )}
                  {status === 'completed' && (
                    <span className="text-xs text-emerald-400 bg-emerald-600/20 px-2 py-0.5 rounded-full">
                      Completado ✅
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{step.description}</p>
                <p className="text-xs text-slate-500 mb-3">📅 {step.nextDate}</p>
                {status === 'none' && !locked && (
                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
                    onClick={() => handleRegister(step)}
                  >
                    Inscribirme
                  </button>
                )}
                {status === 'registered' && (
                  <button
                    disabled
                    className="w-full bg-slate-700 text-slate-500 rounded-xl py-2.5 text-sm font-medium cursor-not-allowed"
                  >
                    En progreso…
                  </button>
                )}
                {status === 'completed' && (
                  <div className="text-center text-sm text-emerald-400 font-medium py-1">
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
              <div key={seminar.id} className="bg-slate-800 rounded-2xl p-4 flex flex-col">
                <div className="relative mb-2">
                  <span className="text-3xl">{seminar.emoji}</span>
                  {completed && (
                    <span className="absolute top-0 right-0 text-xs bg-emerald-600/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                      ✅
                    </span>
                  )}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{seminar.title}</p>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed flex-1">{seminar.description}</p>
                <p className="text-xs text-slate-500 mb-3">📅 {seminar.nextDate}</p>
                {completed ? (
                  <div className="text-center text-xs text-emerald-400 font-medium py-1">
                    ¡Ya asististe!
                  </div>
                ) : (
                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 text-xs font-medium transition-colors"
                    onClick={() => alert(`¡Inscripción en ${seminar.title} registrada! 🎉`)}
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
            <div className="bg-slate-800 rounded-2xl p-6 flex flex-col items-center gap-3">
              <Lock size={36} className="text-slate-500" />
              <p className="text-white font-bold text-center">Desbloquea Crecer+</p>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Completa el paso Influencia para acceder a los cursos de formación avanzada.
              </p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{ width: `${(Object.values(crecerSteps).filter(s => s === 'completed').length / 3) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {courseProgress.map((course) => {
                const progress = crecerPlusProgress[course.id] ?? 0
                return (
                  <div key={course.id} className="bg-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{course.title}</p>
                      </div>
                      {progress === 100 && <span className="text-xs text-emerald-400 font-medium">✅</span>}
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-slate-400">Progreso</p>
                      <p className="text-xs text-slate-400 font-medium">{progress}%</p>
                    </div>
                    <div className="bg-slate-700 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate(`/crecer-plus/${course.id}`)}
                      className={`w-full rounded-xl py-2 text-sm font-medium transition-colors ${
                        progress === 100
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                          : progress > 0
                            ? 'bg-indigo-600/30 border border-indigo-500 text-indigo-300 hover:bg-indigo-600/50'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
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
