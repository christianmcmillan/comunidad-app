import { NavLink } from 'react-router-dom'
import { Home, Calendar, Sprout, Sliders, Grid3x3 } from 'lucide-react'

const TABS = [
  { to: '/home',        Icon: Home,     label: 'Home'        },
  { to: '/eventos',     Icon: Calendar, label: 'Eventos'     },
  { to: '/discipulado', Icon: Sprout,   label: 'Discipulado' },
  { to: '/experiencia', Icon: Sliders,  label: 'Experiencia' },
  { to: '/mas',         Icon: Grid3x3,  label: 'Más'         },
]

export default function BottomTabs() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
         style={{ background: '#1f1f1f', borderTop: '1px solid #2e2e2e' }}>
      <div className="flex">
        {TABS.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                isActive ? '' : 'text-[#666] hover:text-[#999]'
              }`
            }
            style={({ isActive }) => isActive ? { color: '#FF6B2C' } : {}}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
