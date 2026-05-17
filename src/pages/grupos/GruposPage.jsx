import { useState } from 'react'
import { Users, Lock, CheckCircle2, Circle } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import useGroupsStore from '../../store/useGroupsStore'
import useUserStore from '../../store/useUserStore'
import useToastStore from '../../store/useToastStore'

const typeColors = {
  Familias: { background: 'rgba(251,191,36,0.1)', color: '#fbbf24' },
  Mujeres:  { background: 'rgba(244,114,182,0.1)', color: '#f472b6' },
  Hombres:  { background: 'rgba(96,165,250,0.1)', color: '#60a5fa' },
  Jóvenes:  { background: 'rgba(52,211,153,0.1)', color: '#34d399' },
}

const typeFilters = ['Todos', 'Familias', 'Mujeres', 'Hombres', 'Jóvenes']

export default function GruposPage({ hideTopBar = false }) {
  const [activeTab, setActiveTab] = useState('encuentra')
  const [activeFilter, setActiveFilter] = useState('Todos')
  const { groups } = useGroupsStore()
  const { groupId, addXP, attendGroup, crecerSteps } = useUserStore()
  const { showToast } = useToastStore()

  // Verifiable requirements for leadership
  const hasGroup        = !!groupId
  const hasInfluencia   = crecerSteps?.influencia === 'completed'
  const canApply        = hasGroup && hasInfluencia

  const myGroup = groups.find((g) => g.id === groupId)

  const filteredGroups =
    activeFilter === 'Todos'
      ? groups
      : groups.filter((g) => g.type === activeFilter)

  const tabs = [
    { id: 'encuentra', label: 'Encuentra un Grupo' },
    { id: 'mi', label: 'Mi Grupo' },
    { id: 'lider', label: 'Ser Líder' },
  ]

  const handleAttend = () => {
    attendGroup()
    addXP(20)
    showToast({ message: '¡Asistencia registrada! 🙌', type: 'success', xp: 20 })
  }

  return (
    <div className="pb-4">
      {!hideTopBar && <TopBar title="Grupos" />}

      {/* Sub-tabs */}
      <div className="flex gap-2 px-4 mb-4">
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

      {/* Encuentra un Grupo */}
      {activeTab === 'encuentra' && (
        <div>
          {/* Filter chips */}
          <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={
                  activeFilter === f
                    ? { background: '#FF6B2C', color: '#fff' }
                    : { background: '#2e2e2e', color: '#888' }
                }
              >
                {f}
              </button>
            ))}
          </div>

          {filteredGroups.map((group) => (
            <div key={group.id} className="rounded-2xl mx-4 mb-3 p-4" style={{ background: '#242424' }}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-white font-semibold">{group.name}</p>
                <span
                  className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={typeColors[group.type] || { background: '#2e2e2e', color: '#888' }}
                >
                  {group.type}
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: '#666' }}>
                {group.day} {group.time} · {group.neighborhood}
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: '#888' }}>{group.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: '#666' }}>👤 {group.leaderName}</p>
                  <p className="text-xs" style={{ color: '#666' }}>{group.members}/{group.maxSize} personas</p>
                </div>
                <button
                  className="text-white rounded-xl px-4 py-2 text-sm font-medium transition-all"
                  style={{ background: '#FF6B2C' }}
                  onClick={() => showToast({ message: `Solicitud enviada a ${group.leaderName}`, type: 'info' })}
                >
                  Quiero unirme
                </button>
              </div>
            </div>
          ))}
          <div className="mx-4">
            <WhatsAppButton label="Grupos" phone="573165295200" message="Hola, quiero info sobre grupos pequeños 👋" />
          </div>
        </div>
      )}

      {/* Ser Líder */}
      {activeTab === 'lider' && (
        <div className="px-4 flex flex-col gap-3">

          {/* Hero status card */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: canApply
                ? 'linear-gradient(135deg, rgba(255,107,44,0.15) 0%, rgba(255,107,44,0.05) 100%)'
                : '#242424',
              border: canApply ? '1px solid rgba(255,107,44,0.3)' : '1px solid #333',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              {canApply ? (
                <span className="text-2xl">🙌</span>
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#333' }}>
                  <Lock size={16} style={{ color: '#666' }} />
                </div>
              )}
              <div>
                <p className="text-white font-bold">
                  {canApply ? '¡Estás listo para dar el paso!' : 'Quiero ser líder'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: canApply ? '#FF6B2C' : '#666' }}>
                  {canApply
                    ? 'Cumples los requisitos verificables'
                    : 'Completa los requisitos para continuar'}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements checklist */}
          <div className="rounded-2xl p-4" style={{ background: '#242424' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#FF6B2C' }}>
              Requisitos
            </p>
            <div className="flex flex-col gap-3">

              {/* 1 — Group attendance */}
              <div className="flex items-start gap-3">
                {hasGroup
                  ? <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} />
                  : <Circle size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#444' }} />
                }
                <div>
                  <p className="text-sm font-medium" style={{ color: hasGroup ? '#e5e5e5' : '#666' }}>
                    Asistir activamente a un grupo de discipulado
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#555' }}>
                    Mínimo 6 meses · verificado por tu líder
                  </p>
                </div>
              </div>

              {/* 2 — Leader endorsement */}
              <div className="flex items-start gap-3">
                <Circle size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#444' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#666' }}>
                    Aval de tu líder
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#555' }}>
                    Tu líder confirma que estás listo
                  </p>
                </div>
              </div>

              {/* 3 — Influencia completed */}
              <div className="flex items-start gap-3">
                {hasInfluencia
                  ? <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} />
                  : <Circle size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#444' }} />
                }
                <div>
                  <p className="text-sm font-medium" style={{ color: hasInfluencia ? '#e5e5e5' : '#666' }}>
                    Haber completado Crecer — Influencia
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#555' }}>
                    Encuentro, Vida e Influencia finalizados
                  </p>
                </div>
              </div>

              {/* 4 — Interview form */}
              <div className="flex items-start gap-3">
                <Circle size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#444' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#666' }}>
                    Llenar el formulario de entrevista
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#555' }}>
                    Se habilita al cumplir los requisitos anteriores
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Generaciones note */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.15)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#a78bfa' }}>
              Grupos de Generaciones
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#888' }}>
              Para liderar un grupo de Generaciones (7–9, 10–13 o 14–17 años) también debes
              estar sirviendo en Experiencia en algún área de generaciones{' '}
              <span style={{ color: '#a78bfa' }}>mínimo 6 meses</span>.
            </p>
          </div>

          {/* CTA */}
          {canApply ? (
            <button
              className="w-full text-white rounded-2xl py-3.5 text-sm font-semibold transition-all active:scale-95"
              style={{ background: '#FF6B2C' }}
              onClick={() => showToast({ message: 'Formulario enviado 🎉 Te contactaremos pronto', type: 'success', xp: 50 })}
            >
              Llenar formulario de entrevista →
            </button>
          ) : (
            <div
              className="w-full rounded-2xl py-3.5 text-sm font-semibold text-center"
              style={{ background: '#1f1f1f', color: '#444', border: '1px solid #2a2a2a' }}
            >
              <Lock size={13} className="inline mr-1.5 mb-0.5" />
              Formulario bloqueado
            </div>
          )}

          <WhatsAppButton label="Grupos" phone="573165295200" message="Hola, quiero info sobre cómo ser líder de grupo 🙋" />
        </div>
      )}

      {/* Mi Grupo */}
      {activeTab === 'mi' && (
        <div className="px-4">
          {myGroup ? (
            <div>
              <div className="rounded-2xl p-4 mb-3" style={{ background: '#242424' }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#FF6B2C' }}>Mi grupo</p>
                <p className="text-white font-bold text-base mb-1">{myGroup.name}</p>
                <p className="text-xs mb-3" style={{ color: '#888' }}>{myGroup.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="rounded-xl p-2.5" style={{ background: '#1f1f1f' }}>
                    <p className="text-xs" style={{ color: '#666' }}>Reunión</p>
                    <p className="text-sm text-white font-medium">{myGroup.day} {myGroup.time}</p>
                  </div>
                  <div className="rounded-xl p-2.5" style={{ background: '#1f1f1f' }}>
                    <p className="text-xs" style={{ color: '#666' }}>Sector</p>
                    <p className="text-sm text-white font-medium">{myGroup.neighborhood}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl mb-3" style={{ background: '#1f1f1f' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,107,44,0.2)' }}
                  >
                    <Users size={16} style={{ color: '#FF6B2C' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#666' }}>Mi Líder</p>
                    <p className="text-sm text-white font-medium">{myGroup.leaderName}</p>
                  </div>
                </div>

                <button
                  className="w-full text-white rounded-xl py-2.5 text-sm font-medium transition-all"
                  style={{ background: '#FF6B2C' }}
                  onClick={handleAttend}
                >
                  ✅ Asistí esta semana
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Users size={48} style={{ color: '#444' }} />
              <p className="text-sm text-center" style={{ color: '#777' }}>
                Aún no perteneces a un grupo.
              </p>
              <button
                className="text-white rounded-xl px-4 py-2 text-sm font-medium"
                style={{ background: '#FF6B2C' }}
                onClick={() => setActiveTab('encuentra')}
              >
                Encontrar mi grupo →
              </button>
            </div>
          )}
          <WhatsAppButton label="Grupos" phone="573165295200" message="Hola, quiero info sobre grupos pequeños 👋" />
        </div>
      )}
    </div>
  )
}
