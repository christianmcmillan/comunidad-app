import { useState } from 'react'
import { Users, BookOpen } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import GruposPage from '../grupos/GruposPage'
import CrecerPage from '../crecer/CrecerPage'

export default function DiscipuladoPage() {
  const [active, setActive] = useState('crecer')
  return (
    <div>
      <TopBar title="Discipulado" />
      {/* Section switcher — two large pill tabs */}
      <div className="flex gap-2 px-4 mb-2">
        {[
          { id: 'crecer', label: 'Crecer', Icon: BookOpen },
          { id: 'grupos', label: 'Grupos', Icon: Users },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={
              active === id
                ? { background: '#FF6B2C', color: '#fff' }
                : { background: '#242424', color: '#777' }
            }
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
      {active === 'crecer' ? <CrecerPage hideTopBar /> : <GruposPage hideTopBar />}
    </div>
  )
}
