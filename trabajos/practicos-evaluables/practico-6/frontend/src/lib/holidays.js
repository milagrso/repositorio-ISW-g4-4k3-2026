// Además de los lunes, el parque cierra solo el 25 de diciembre y el 1 de enero.
// No se toman otros feriados.
export const closedHolidays = [
  { monthDay: '12-25', nombre: 'Navidad' },
  { monthDay: '01-01', nombre: 'Año Nuevo' },
]

export function isClosedHoliday(dateStr) {
  if (!dateStr) return false
  return closedHolidays.some((item) => dateStr.endsWith(`-${item.monthDay}`))
}

// Los días de cierre que caen en un mes, para listarlos debajo del calendario.
export function closedHolidaysInMonth(year, monthIndex) {
  const month = String(monthIndex + 1).padStart(2, '0')
  return closedHolidays
    .filter((item) => item.monthDay.startsWith(`${month}-`))
    .map((item) => ({ fecha: `${year}-${item.monthDay}`, nombre: item.nombre }))
}
