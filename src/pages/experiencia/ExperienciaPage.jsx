import { useState } from 'react'
import { Lock, Calendar, List, Users } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import WhatsAppButton from '../../components/ui/WhatsAppButton'
import useUserStore from '../../store/useUserStore'
import MiAgendaTab from './MiAgendaTab'
import PlanesTab from './PlanesTab'
import EquiposTab from './EquiposTab'

const checklist = [
  { label: 'Asistir al grupo fielmente 6 meses', key: 'grupo' },
  { label: 'Completa Encuentro', key: 'encuentro' },
  { label: 'Completa Vida', key: 'vida' },
  { label: 'Aprobación de tu líder', key: 'lider' },
]

export default function ExperienciaPage() {
  const { volunteerApproved, crecerSteps, groupId } = useUserStore()
  const [activeTab, setActiveTab] = useState('agenda')

  const checks = {
    grupo: !!groupId,
    encuentro: crecerSteps.encuentro === 'completed',
    vida: crecerSteps.vida === 'completed',
    lider: volunteerApproved,
  }
  const doneCount = Object.values(checks).filter(Boolean).length
  const unlocked = Object.values(checks).every(Boolean)

  if (!unlocked) {
    return (
      <div>
        <TopBar title="Experiencia" />
        <div className="px-4 pt-2">
          {/* Hero locked card */}
          <div className="rounded-2xl p-6 mb-4 text-center" style={{ background: '#242424' }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#2e2e2e' }}
            >
              <Lock size={28} style={{ color: '#666' }} />
            </div>
            <h2 className="text-white font-bold text-lg mb-1">Área de Voluntarios</h2>
            <p className="text-sm" style={{ color: '#888' }}>
              Completa tu camino de discipulado para acceder a la plataforma de Experiencia.
            </p>
          </div>

          {/* Checklist */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: '#242424' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#666' }}>Requisitos</p>
            <div className="flex flex-col gap-3">
              {checklist.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="text-lg">{checks[item.key] ? '✅' : '⬜'}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: checks[item.key] ? '#e5e5e5' : '#666' }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: '#333' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${(doneCount / 4) * 100}%`, background: '#FF6B2C' }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: '#666' }}>{doneCount}/4 requisitos completados</p>
          </div>
          <WhatsAppButton label="Experiencia" phone="573004015172" message="Hola, quiero saber cómo ser voluntario en Experiencia 🙌" />
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
      <div className="flex px-4 mb-0" style={{ borderBottom: '1px solid #2e2e2e' }}>
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px"
            style={
              activeTab === id
                ? { borderBottomColor: '#FF6B2C', color: '#FF6B2C' }
                : { borderBottomColor: 'transparent', color: '#777' }
            }
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
