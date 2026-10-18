import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale/es'
import 'react-day-picker/style.css'
import { addDays } from '../lib/clock.js'
import { closedHolidaysInMonth } from '../lib/holidays.js'
import { formatDayMonth, parseISODate, todayISO, toISODate } from '../lib/inscription.js'

export default function ParkCalendar({
  value,
  onChange,
  month,
  onMonthChange,
  now,
  status,
  onRetry,
  reservable,
  invalid,
}) {
  const ready = status === 'ready' && now != null
  const today = ready ? parseISODate(todayISO(now)) : undefined
  const tomorrow = ready ? parseISODate(addDays(todayISO(now), 1)) : undefined
  const selected = value ? parseISODate(value) : undefined
  const monthHolidays = ready
    ? closedHolidaysInMonth(month.getFullYear(), month.getMonth()).filter((item) => item.fecha >= todayISO(now))
    : []

  return (
    <div className="grid gap-3">
      {ready ? (
        <DayPicker
          mode="single"
          locale={es}
          weekStartsOn={1}
          className={`park-calendar ${invalid ? 'park-calendar-invalid' : ''}`}
          month={month}
          onMonthChange={onMonthChange}
          startMonth={today}
          endMonth={tomorrow}
          today={today}
          selected={selected}
          onSelect={(date) => {
            if (!date) return
            onChange(toISODate(date))
          }}
          disabled={(date) => !reservable.has(toISODate(date))}
        />
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

      {monthHolidays.length > 0 ? (
        <ul className="grid gap-1 text-sm">
          {monthHolidays.map((item) => (
            <li key={item.fecha} className="text-base-content/80">
              <span className="capitalize">{formatDayMonth(item.fecha)}</span>
              {` · ${item.nombre}`}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
