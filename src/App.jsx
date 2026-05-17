import { Routes, Route, Navigate } from 'react-router-dom'
import BottomTabs from './components/layout/BottomTabs'
import HomePage from './pages/home/HomePage'
import EventosPage from './pages/eventos/EventosPage'
import DiscipuladoPage from './pages/discipulado/DiscipuladoPage'
import CrecerPlusCoursePage from './pages/crecer/CrecerPlusCoursePage'
import ExperienciaPage from './pages/experiencia/ExperienciaPage'
import PlanDetailMobile from './pages/experiencia/PlanDetailMobile'
import MasPage from './pages/mas/MasPage'

export default function App() {
  return (
    <div className="w-full max-w-[430px] min-h-dvh bg-slate-900 relative flex flex-col mx-auto overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/discipulado" element={<DiscipuladoPage />} />
          <Route path="/crecer-plus/:courseId" element={<CrecerPlusCoursePage />} />
          <Route path="/experiencia" element={<ExperienciaPage />} />
          <Route path="/experiencia/plan/:id" element={<PlanDetailMobile />} />
          <Route path="/mas" element={<MasPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <BottomTabs />
    </div>
  )
}
