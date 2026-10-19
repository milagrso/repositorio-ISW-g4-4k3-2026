import { addDays } from '../lib/clock.js'
import { closedHolidays } from '../lib/holidays.js'
import { isClosedWeekday, parseISODate, todayISO } from '../lib/inscription.js'

function dayParts(dateStr) {
  const date = parseISODate(dateStr)
  return {
    weekday: date.toLocaleDateString('es-AR', { weekday: 'long' }),
    day: date.getDate(),
    month: date.toLocaleDateString('es-AR', { month: 'long' }),
  }
}

function closedNote(date, closedWeekdays) {
  if (isClosedWeekday(date, closedWeekdays)) return 'Cerrado'
  const holiday = closedHolidays.find((item) => date.endsWith(`-${item.monthDay}`))
  return holiday ? holiday.nombre : null
}

export default function ParkCalendar({
  value,
  onChange,
  now,
  status,
  onRetry,
  reservable,
  closedWeekdays = [1],
  invalid,
}) {
  const ready = status === 'ready' && now != null
  const today = ready ? todayISO(now) : null
  const days = ready
    ? [
        { date: today, label: 'Hoy' },
        { date: addDays(today, 1), label: 'Mañana' },
      ]
    : []

  return (
    <div className="grid gap-3">
      {ready ? (
        <div
          className={`grid grid-cols-2 gap-2 ${invalid ? 'park-calendar-invalid' : ''}`}
          role="radiogroup"
          aria-label="Día de la visita"
        >
          {days.map((item) => {
            const parts = dayParts(item.date)
            const closed = closedNote(item.date, closedWeekdays)
            const open = reservable.has(item.date)
            const selected = value === item.date
            const note = closed ?? (open ? null : item.date === today ? 'Sin turnos abiertos' : 'Todavía no abre')

            return (
              <button
                key={item.date}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={!open}
                className={`btn h-auto min-h-32 flex-col gap-0.5 py-3 ${
                  open ? 'cursor-pointer' : 'cursor-not-allowed'
                } ${selected ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onChange(item.date)}
              >
                <span className="text-xs font-bold tracking-[0.14em] uppercase">{item.label}</span>
                <span className="font-display text-3xl leading-none font-black">{parts.day}</span>
                <span className="text-sm capitalize">{parts.weekday}</span>
                <span className="text-xs capitalize opacity-80">{parts.month}</span>
                {note ? <span className="mt-1 text-xs font-semibold">{note}</span> : null}
              </button>
            )
          })}
        </div>
      ) : null}

      {status === 'loading' ? <p className="text-base-content/70 text-sm">Consultando la hora del parque…</p> : null}

      {status === 'error' ? (
        <div className="alert alert-warning items-start text-sm">
          <span>No pudimos consultar la hora del parque.</span>
          <button type="button" className="btn btn-sm btn-outline" onClick={onRetry}>
            Reintentar
          </button>
        </div>
      ) : null}

      {ready ? (
        <p className="text-base-content/70 text-sm">
          Podés inscribirte desde 24 horas antes del turno hasta 15 minutos antes de que empiece. Los lunes, el 25 de
          diciembre y el 1 de enero el parque está cerrado.
        </p>
      ) : null}
    </div>
  )
}
