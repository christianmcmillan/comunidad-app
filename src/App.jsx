import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BottomTabs from './components/layout/BottomTabs'
import Toast from './components/ui/Toast'
import DemoFAB from './components/ui/DemoFAB'
import SplashScreen from './components/ui/SplashScreen'
import HomePage from './pages/home/HomePage'
import EventosPage from './pages/eventos/EventosPage'
import DiscipuladoPage from './pages/discipulado/DiscipuladoPage'
import CrecerPlusCoursePage from './pages/crecer/CrecerPlusCoursePage'
import ExperienciaPage from './pages/experiencia/ExperienciaPage'
import PlanDetailMobile from './pages/experiencia/PlanDetailMobile'
import MasPage from './pages/mas/MasPage'
import DevocionalPage from './pages/devocional/DevocionalPage'

export default function App() {
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('splash-shown')
  )

  function handleSplashDone() {
    sessionStorage.setItem('splash-shown', '1')
    setShowSplash(false)
  }

  return (
    <div
      className="w-full max-w-[430px] min-h-dvh relative flex flex-col mx-auto overflow-hidden"
      style={{ background: '#1a1a1a' }}
    >
      <div className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/discipulado" element={<DiscipuladoPage />} />
          <Route path="/crecer-plus/:courseId" element={<CrecerPlusCoursePage />} />
          <Route path="/experiencia" element={<ExperienciaPage />} />
          <Route path="/experiencia/plan/:id" element={<PlanDetailMobile />} />
          <Route path="/devocional" element={<DevocionalPage />} />
          <Route path="/mas" element={<MasPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <BottomTabs />
      <DemoFAB />
      <Toast />
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
    </div>
  )
}
