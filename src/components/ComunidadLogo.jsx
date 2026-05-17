export default function ComunidadLogo({ size = 36, className = '' }) {
  return (
    <img
      src="/logo.png"
      width={size}
      height={size}
      className={className}
      alt="Comunidad"
      style={{ objectFit: 'contain' }}
    />
  )
}
