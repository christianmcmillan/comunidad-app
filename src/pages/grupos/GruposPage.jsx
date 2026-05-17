import { useState } from 'react'
import { Users } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useGroupsStore from '../../store/useGroupsStore'
import useUserStore from '../../store/useUserStore'

const typeColors = {
  Familias: 'bg-amber-600/20 text-amber-300',
  Mujeres: 'bg-pink-600/20 text-pink-300',
  Hombres: 'bg-blue-600/20 text-blue-300',
  Jóvenes: 'bg-emerald-600/20 text-emerald-300',
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

      {/* Encuentra un Grupo */}
      {activeTab === 'encuentra' && (
        <div>
          {/* Filter chips */}
          <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-slate-800 rounded-2xl mx-4 mb-3 p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-white font-semibold">{group.name}</p>
                <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[group.type] || 'bg-slate-600/20 text-slate-300'}`}>
                  {group.type}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">
                {group.day} {group.time} · {group.neighborhood}
              </p>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{group.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    👤 {group.leaderName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {group.members}/{group.maxSize} personas
                  </p>
                </div>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
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
              <div className="bg-slate-800 rounded-2xl p-4 mb-3">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Mi grupo</p>
                <p className="text-white font-bold text-base mb-1">{myGroup.name}</p>
                <p className="text-xs text-slate-400 mb-3">{myGroup.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-700/50 rounded-xl p-2.5">
                    <p className="text-xs text-slate-500">Reunión</p>
                    <p className="text-sm text-white font-medium">{myGroup.day} {myGroup.time}</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-2.5">
                    <p className="text-xs text-slate-500">Sector</p>
                    <p className="text-sm text-white font-medium">{myGroup.neighborhood}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-slate-700/30 rounded-xl mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center">
                    <Users size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Mi Líder</p>
                    <p className="text-sm text-white font-medium">{myGroup.leaderName}</p>
                  </div>
                </div>

                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
                  onClick={handleAttend}
                >
                  ✅ Asistí esta semana
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Users size={48} className="text-slate-600" />
              <p className="text-sm text-slate-500 text-center">
                Aún no perteneces a un grupo.
              </p>
              <button
                className="bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
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
