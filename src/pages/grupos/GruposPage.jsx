import { useState } from 'react'
import { Users } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useGroupsStore from '../../store/useGroupsStore'
import useUserStore from '../../store/useUserStore'

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
  const { groupId, addXP, attendGroup } = useUserStore()

  const myGroup = groups.find((g) => g.id === groupId)

  const filteredGroups =
    activeFilter === 'Todos'
      ? groups
      : groups.filter((g) => g.type === activeFilter)

  const tabs = [
    { id: 'encuentra', label: 'Encuentra un Grupo' },
    { id: 'mi', label: 'Mi Grupo' },
  ]

  const handleAttend = () => {
    attendGroup()
    addXP(20)
    alert('¡+20 XP! Asistencia registrada 🙌')
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
                  onClick={() => alert(`¡Tu solicitud fue enviada a ${group.leaderName}!`)}
                >
                  Quiero unirme
                </button>
              </div>
            </div>
          ))}
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
        </div>
      )}
    </div>
  )
}
