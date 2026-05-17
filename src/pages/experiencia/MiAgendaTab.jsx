import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import usePlansStore from '../../store/experiencia/usePlansStore'
import useServiceTypesStore from '../../store/experiencia/useServiceTypesStore'
import useTeamsStore from '../../store/experiencia/useTeamsStore'

const MY_PERSON_ID = 'p-christian'

function formatDates(dates) {
  if (!dates || dates.length === 0) return ''
  if (dates.length === 1) return format(parseISO(dates[0]), "d 'de' MMMM", { locale: es })
  const a = parseISO(dates[0])
  const b = parseISO(dates[dates.length - 1])
  if (a.getMonth() === b.getMonth()) return `${format(a, 'd')}-${format(b, "d 'de' MMMM", { locale: es })}`
  return `${format(a, "d 'de' MMMM", { locale: es })} – ${format(b, "d 'de' MMMM", { locale: es })}`
}

export default function MiAgendaTab() {
  const { plans, updateAssignmentStatus } = usePlansStore()
  const { getServiceType } = useServiceTypesStore()
  const { teams } = useTeamsStore()

  // Find all assignments for MY_PERSON_ID across all plans
  const myEntries = []
  for (const plan of plans) {
    for (const a of (plan.assignments || [])) {
      if (a.personId === MY_PERSON_ID) {
        const team = teams.find(t => t.id === a.teamId)
        const position = team?.positions?.find(p => p.id === a.positionId)
        const time = plan.times?.find(t => t.id === a.timeId)
        const st = getServiceType(plan.serviceTypeId)
        myEntries.push({ plan, assignment: a, team, position, time, st })
      }
    }
  }

  const pending = myEntries.filter(e => e.assignment.status === 'invited')
  const confirmed = myEntries.filter(e => e.assignment.status === 'confirmed')

  const RoleChip = ({ team, position }) => (
    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
      {team?.name}{position ? ` — ${position.name}` : ''}
    </span>
  )

  if (myEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Clock size={40} className="mb-3 text-slate-700" />
        <p className="text-sm">Sin asignaciones</p>
      </div>
    )
  }

  return (
    <div className="px-4 pb-4">
      {pending.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Invitaciones pendientes</p>
          {pending.map(({ plan, assignment, team, position, time, st }) => (
            <div key={assignment.id} className="bg-slate-800 border border-amber-500/30 rounded-2xl p-4 mb-3">
              <div className="flex items-start gap-2 mb-2">
                {st && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: st.color }} />}
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{plan.title}</p>
                  <p className="text-xs text-slate-400">{formatDates(plan.dates)}{time ? ` · ${time.name}` : ''}</p>
                </div>
              </div>
              <div className="mb-3">
                <RoleChip team={team} position={position} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateAssignmentStatus(plan.id, assignment.id, 'confirmed')}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-xl py-2 text-sm font-medium hover:bg-emerald-600/30 transition-colors"
                >
                  <CheckCircle2 size={14} /> Confirmar
                </button>
                <button
                  onClick={() => updateAssignmentStatus(plan.id, assignment.id, 'declined')}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/10 text-red-400 border border-red-600/20 rounded-xl py-2 text-sm font-medium hover:bg-red-600/20 transition-colors"
                >
                  <XCircle size={14} /> Declinar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmed.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirmadas</p>
          {confirmed.map(({ plan, assignment, team, position, time, st }) => (
            <div key={assignment.id} className="bg-slate-800 rounded-2xl p-4 mb-3">
              <div className="flex items-start gap-2 mb-2">
                {st && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: st.color }} />}
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{plan.title}</p>
                  <p className="text-xs text-slate-400">{formatDates(plan.dates)}{time ? ` · ${time.name}` : ''}</p>
                </div>
                <span className="text-xs text-emerald-400 font-medium">✓ Confirmado</span>
              </div>
              <RoleChip team={team} position={position} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
