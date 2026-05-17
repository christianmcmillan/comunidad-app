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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-slate-800/95 backdrop-blur border-t border-slate-700 z-50">
      <div className="flex">
        {TABS.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
              }`
            }
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
