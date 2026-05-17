import ComunidadLogo from '../ComunidadLogo'

export default function TopBar({ title, subtitle, rightSlot, showLogo = false }) {
  return (
    <div className="px-4 pt-10 pb-3 flex items-start justify-between">
      {showLogo ? (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FF6B2C' }}>
            <ComunidadLogo size={26} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
            {subtitle && <p className="text-xs mt-0.5" style={{ color: '#999' }}>{subtitle}</p>}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold text-white">{title}</h1>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: '#999' }}>{subtitle}</p>}
        </div>
      )}
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </div>
  )
}
