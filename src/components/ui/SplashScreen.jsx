import { useState, useEffect } from 'react'
import ComunidadLogo from '../ComunidadLogo'

export default function SplashScreen({ onDone }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // 0.8s zoom-in + 0.5s hold = 1.3s before exit starts
    const holdTimer = setTimeout(() => setExiting(true), 1300)
    // 0.35s exit animation, then unmount
    const doneTimer = setTimeout(onDone, 1650)
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer) }
  }, [])

  return (
    <div
      className={exiting ? 'splash-exit' : ''}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        zIndex: 100,
        background: '#FF6B2C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        pointerEvents: 'none',
      }}
    >
      <div className="splash-logo">
        <ComunidadLogo size={110} />
      </div>
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: 11,
        letterSpacing: '0.18em',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}>
        Comunidad
      </p>
    </div>
  )
}
