import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale/es'
import 'react-day-picker/style.css'
import { closedHolidaysInMonth, isClosedHoliday } from '../lib/holidays.js'
import { formatDayMonth, parseISODate, todayDate, todayISO, toISODate } from '../lib/inscription.js'

export default function ParkCalendar({
  value,
  onChange,
  month,
  onMonthChange,
  invalid,
  closedWeekdays = [1],
}) {
  const today = todayDate()
  const selected = value ? parseISODate(value) : undefined
  const startMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const endMonth = new Date(today.getFullYear() + 1, 11, 1)
  const monthHolidays = closedHolidaysInMonth(month.getFullYear(), month.getMonth()).filter(
    (item) => item.fecha >= todayISO(),
  )

  return (
    <div className="grid gap-3">
      <DayPicker
        mode="single"
        locale={es}
        weekStartsOn={1}
        className={`park-calendar ${invalid ? 'park-calendar-invalid' : ''}`}
        month={month}
        onMonthChange={onMonthChange}
        startMonth={startMonth}
        endMonth={endMonth}
        selected={selected}
        onSelect={(date) => {
          if (!date) return
          onChange(toISODate(date))
        }}
        disabled={[
          { before: today },
          { dayOfWeek: closedWeekdays },
          (date) => isClosedHoliday(toISODate(date)),
        ]}
      />

      <p className="text-base-content/70 text-sm">
        No se pueden elegir fechas pasadas, los lunes, el 25 de diciembre ni el 1 de enero.
      </p>

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
