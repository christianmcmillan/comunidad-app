import { useNavigate } from 'react-router-dom'
import useUserStore from '../../store/useUserStore'
import JourneyNode from './JourneyNode'

export default function JourneyMap() {
  const navigate = useNavigate()
  const { groupId, crecerSteps, volunteerApproved, seminarsCompleted, crecerPlusProgress, badges } = useUserStore()

  const encuentroOk    = crecerSteps.encuentro === 'completed'
  const vidaOk         = crecerSteps.vida === 'completed'
  const influenciaOk   = crecerSteps.influencia === 'completed'
  const relacionesOk   = seminarsCompleted.includes('relaciones-sanas')
  const ruta128Ok      = seminarsCompleted.includes('ruta-128')
  const crecerPlusDone = Object.values(crecerPlusProgress || {}).some(p => p >= 100)
  const esLider        = badges.includes('lider-grupo')
  const conferenciaOk  = badges.includes('conferencia')

  const getNodeStatus = (nodeId) => {
    switch (nodeId) {
      case 'grupo':
        return groupId ? 'completed' : 'active'
      case 'encuentro':
        if (encuentroOk) return 'completed'
        if (crecerSteps.encuentro === 'registered') return 'active'
        return groupId ? 'active' : 'locked'
      case 'vida':
        if (!encuentroOk) return 'locked'
        if (vidaOk) return 'completed'
        if (crecerSteps.vida === 'registered') return 'active'
        return 'active'
      case 'servir':
        if (!vidaOk) return 'locked'
        if (volunteerApproved) return 'completed'
        return 'active'
      case 'influencia':
        if (!vidaOk) return 'locked'
        if (influenciaOk) return 'completed'
        if (crecerSteps.influencia === 'registered') return 'active'
        return 'active'
      case 'crecer-plus':
        if (!influenciaOk) return 'locked'
        if (crecerPlusDone) return 'completed'
        return 'active'
      case 'seminario-relaciones':
        if (!influenciaOk) return 'locked'
        if (relacionesOk) return 'completed'
        return 'active'
      case 'seminario-ruta128':
        if (!relacionesOk) return 'locked'
        if (ruta128Ok) return 'completed'
        return 'active'
      case 'lider':
        if (!influenciaOk) return 'locked'
        if (esLider) return 'completed'
        return 'active'
      case 'conferencia':
        if (!influenciaOk) return 'locked'
        if (conferenciaOk) return 'completed'
        return 'active'
      default:
        return 'locked'
    }
  }

  const nodes = [
    { id: 'grupo',               title: 'Mi Grupo',               emoji: '🏠', description: 'Conéctate con una familia' },
    { id: 'encuentro',           title: 'Encuentro',              emoji: '🤝', description: 'Paso 1 · Un fin de semana transformador' },
    { id: 'vida',                title: 'Vida',                   emoji: '📖', description: 'Paso 2 · Aprende a vivir la fe' },
    { id: 'servir',              title: 'Servir en Experiencia',  emoji: '🎛️', description: 'Da tu primer paso como voluntario' },
    { id: 'influencia',          title: 'Influencia',             emoji: '🌟', description: 'Paso 3 · Lidera e impacta tu círculo' },
    { id: 'crecer-plus',         title: 'Crecer+',                emoji: '🎓', description: 'Completa un curso de formación en línea' },
    { id: 'seminario-relaciones',title: 'Seminario Relaciones Sanas', emoji: '🌿', description: 'Relaciones saludables con Dios y otros' },
    { id: 'seminario-ruta128',   title: 'Seminario Ruta 128',     emoji: '⚡', description: 'El diseño de Dios para tu masculinidad' },
    { id: 'lider',               title: 'Ser Líder de Grupo',     emoji: '👑', description: 'Multiplica lo que has recibido' },
    { id: 'conferencia',         title: 'Conferencia Comunidad',  emoji: '🏟️', description: 'El encuentro anual de toda la iglesia' },
  ]

  const handleTap = (node) => {
    const status = getNodeStatus(node.id)
    if (status === 'locked') return

    const destinations = {
      grupo:                  () => navigate('/discipulado', { state: { section: 'grupos' } }),
      encuentro:              () => navigate('/discipulado', { state: { section: 'crecer', tab: 'pasos' } }),
      vida:                   () => navigate('/discipulado', { state: { section: 'crecer', tab: 'pasos' } }),
      servir:                 () => navigate('/experiencia'),
      influencia:             () => navigate('/discipulado', { state: { section: 'crecer', tab: 'pasos' } }),
      'crecer-plus':          () => navigate('/discipulado', { state: { section: 'crecer', tab: 'plus' } }),
      'seminario-relaciones': () => navigate('/discipulado', { state: { section: 'crecer', tab: 'seminarios' } }),
      'seminario-ruta128':    () => navigate('/discipulado', { state: { section: 'crecer', tab: 'seminarios' } }),
      lider:                  () => navigate('/discipulado', { state: { section: 'grupos' } }),
      conferencia:            () => navigate('/eventos'),
    }

    destinations[node.id]?.()
  }

  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: '#242424' }}>
      <div className="px-4 pt-4 pb-1">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#FF6B2C' }}>Tu Camino</p>
      </div>
      <div className="relative">
        <div className="absolute left-10 top-6 bottom-6 w-0.5 border-l-2 border-dashed z-0" style={{ borderColor: '#333' }} />
        <div className="relative z-10">
          {nodes.map((node) => (
            <JourneyNode
              key={node.id}
              step={{ ...node, status: getNodeStatus(node.id) }}
              onTap={() => handleTap(node)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
