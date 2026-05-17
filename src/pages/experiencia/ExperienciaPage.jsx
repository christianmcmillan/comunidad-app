import { useState } from 'react'
import { Lock, Calendar, List, Users } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import useUserStore from '../../store/useUserStore'
import MiAgendaTab from './MiAgendaTab'
import PlanesTab from './PlanesTab'
import EquiposTab from './EquiposTab'

const checklist = [
  { label: 'Completa Encuentro', key: 'encuentro' },
  { label: 'Completa Vida', key: 'vida' },
  { label: 'Completa Influencia', key: 'influencia' },
  { label: 'Aprobación de tu líder', key: 'lider' },
]

export default function ExperienciaPage() {
  const { xp, volunteerApproved, crecerSteps } = useUserStore()
  const [activeTab, setActiveTab] = useState('agenda')

  const unlocked = xp >= 2500 && volunteerApproved

  const checks = {
    encuentro: crecerSteps.encuentro === 'completed',
    vida: crecerSteps.vida === 'completed',
    influencia: crecerSteps.influencia === 'completed',
    lider: volunteerApproved,
  }
  const doneCount = Object.values(checks).filter(Boolean).length

  if (!unlocked) {
    return (
      <div>
        <TopBar title="Experiencia" />
        <div className="px-4 pt-2">
          {/* Hero locked card */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-4 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-slate-400" />
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Área de Voluntarios</h2>
            <p className="text-slate-400 text-sm">Completa tu camino de discipulado para acceder a la plataforma de Experiencia.</p>
          </div>

          {/* Checklist */}
          <div className="bg-slate-800 rounded-2xl p-4 mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Requisitos</p>
            <div className="flex flex-col gap-3">
              {checklist.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className={`text-lg ${checks[item.key] ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {checks[item.key] ? '✅' : '⬜'}
                  </span>
                  <span className={`text-sm font-medium ${checks[item.key] ? 'text-slate-200' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${(doneCount / 4) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">{doneCount}/4 requisitos completados</p>
          </div>
        </div>
      </div>
    )
  }

  // Unlocked — show Planning Center
  const tabs = [
    { id: 'agenda', label: 'Mi Agenda', Icon: Calendar },
    { id: 'planes', label: 'Planes', Icon: List },
    { id: 'equipos', label: 'Equipos', Icon: Users },
  ]

  return (
    <div>
      <TopBar title="Experiencia" />
      {/* Sub-tab bar */}
      <div className="flex border-b border-slate-700 px-4 mb-0">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === id
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>
      <div className="pt-2">
        {activeTab === 'agenda' && <MiAgendaTab />}
        {activeTab === 'planes' && <PlanesTab />}
        {activeTab === 'equipos' && <EquiposTab />}
      </div>
    </div>
  )
}
