import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Users, BookOpen } from 'lucide-react'
import TopBar from '../../components/layout/TopBar'
import GruposPage from '../grupos/GruposPage'
import CrecerPage from '../crecer/CrecerPage'

export default function DiscipuladoPage() {
  const location = useLocation()
  const initialSection = location.state?.section || 'crecer'
  const initialTab = location.state?.tab || null

  const [active, setActive] = useState(initialSection)

  return (
    <div>
      <TopBar title="Discipulado" />
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
      {active === 'crecer'
        ? <CrecerPage hideTopBar initialTab={initialTab} />
        : <GruposPage hideTopBar />
      }
    </div>
  )
}
