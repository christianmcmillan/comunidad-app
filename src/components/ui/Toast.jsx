import useToastStore from '../../store/useToastStore'

const typeStyles = {
  success: { borderColor: '#34d399' },
  info:    { borderColor: '#FF6B2C' },
  error:   { borderColor: '#f87171' },
}

export default function Toast() {
  const { toasts } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[390px] z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg"
          style={{
            background: '#242424',
            borderLeft: `3px solid ${typeStyles[toast.type]?.borderColor ?? '#FF6B2C'}`,
          }}
        >
          <p className="text-sm text-white flex-1 leading-snug">{toast.message}</p>
          {toast.xp && (
            <span className="text-sm font-bold flex-shrink-0" style={{ color: '#FF6B2C' }}>
              +{toast.xp} XP
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
