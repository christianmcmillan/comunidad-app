import { FlaskConical } from 'lucide-react'
import useUserStore from '../../store/useUserStore'
import useToastStore from '../../store/useToastStore'

export default function DemoFAB() {
  const { volunteerApproved, crecerSteps, groupId, setDemoMode } = useUserStore()
  const { showToast } = useToastStore()

  const isLeaderMode =
    !!groupId &&
    volunteerApproved &&
    crecerSteps.encuentro === 'completed' &&
    crecerSteps.vida === 'completed'

  const handleToggle = () => {
    if (isLeaderMode) {
      setDemoMode('newbie')
      showToast({ message: 'Modo: Miembro nuevo', type: 'info' })
    } else {
      setDemoMode('leader')
      showToast({ message: 'Modo: Líder y voluntario', type: 'info' })
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed z-50 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-90"
      style={{
        bottom: '5.5rem',
        right: '1rem',
        width: 38,
        height: 38,
        background: isLeaderMode ? 'rgba(251,191,36,0.15)' : '#242424',
        border: isLeaderMode ? '1px solid rgba(251,191,36,0.5)' : '1px solid #333',
      }}
      title={isLeaderMode ? 'Cambiar a miembro nuevo' : 'Cambiar a líder y voluntario'}
    >
      <FlaskConical size={16} style={{ color: isLeaderMode ? '#fbbf24' : '#666' }} />
    </button>
  )
}
