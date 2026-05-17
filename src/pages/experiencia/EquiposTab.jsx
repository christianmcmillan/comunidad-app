import { useState } from 'react'
import { Search, Users } from 'lucide-react'
import useTeamsStore from '../../store/experiencia/useTeamsStore'

const CATEGORIES = ['Todos', 'Técnico', 'Música', 'Servicio', 'Comunicaciones']

export default function EquiposTab() {
  const { teams } = useTeamsStore()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('Todos')

  const filtered = teams.filter(t => {
    const matchCat = filterCat === 'Todos' || t.category === filterCat
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="px-4 pb-4">
      {/* Search */}
      <div className="relative mb-3">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar equipo..."
          className="w-full bg-slate-800 text-white text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filterCat === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Team cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">Sin equipos</div>
      ) : (
        filtered.map(team => (
          <div key={team.id} className="bg-slate-800 rounded-2xl mb-3 overflow-hidden flex">
            <div className="w-1 flex-shrink-0 self-stretch" style={{ backgroundColor: team.color || '#6366f1' }} />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-white font-semibold text-sm">{team.name}</p>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users size={11} /> {team.positions?.length || 0} roles
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{team.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {(team.positions || []).slice(0, 4).map(pos => (
                  <span key={pos.id} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                    {pos.name}
                  </span>
                ))}
                {(team.positions || []).length > 4 && (
                  <span className="text-xs text-slate-500">+{team.positions.length - 4} más</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
