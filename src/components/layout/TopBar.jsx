export default function TopBar({ title, subtitle, rightSlot }) {
  return (
    <div className="px-4 pt-10 pb-3 flex items-start justify-between">
      <div>
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </div>
  )
}
