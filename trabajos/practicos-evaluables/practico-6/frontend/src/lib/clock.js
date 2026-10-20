import { useEffect, useState } from 'react'
import { request } from '../api/client.js'

// Todo se calcula en la hora del parque: Argentina, UTC−3 y sin horario de verano.
export const PARK_TIME_ZONE = 'America/Argentina/Buenos_Aires'
const PARK_UTC_OFFSET = '-03:00'

const BOOKING_OPENS_MS = 24 * 60 * 60 * 1000
const BOOKING_CLOSES_MS = 15 * 60 * 1000
const RESYNC_MS = 5 * 60 * 1000
const TICK_MS = 30 * 1000

// "Ahora" sale del servidor, no del reloj del dispositivo. Se guarda la hora del
// servidor junto con performance.now(), que no cambia aunque se toque la hora del
// teléfono, y a partir de ahí el tiempo avanza solo con performance.now().
let base = null

async function serverTime() {
  try {
    const { now } = await request('/api/catalog/time')
    const time = Date.parse(now)
    if (Number.isFinite(time)) return time
  } catch {
    // Sin respuesta válida del backend se usa el header Date del propio sitio.
  }
  const response = await fetch(`${window.location.origin}/`, { method: 'HEAD', cache: 'no-store' })
  const time = Date.parse(response.headers.get('Date'))
  if (!Number.isFinite(time)) throw new Error('No se pudo obtener la hora del servidor.')
  return time
}

export async function syncClock() {
  const sent = performance.now()
  const time = await serverTime()
  const received = performance.now()
  // La respuesta tarda; se toma la mitad del viaje como el momento en que el servidor respondió.
  base = time + (received - sent) / 2 - received
}

export function clockNow() {
  return base === null ? null : base + performance.now()
}

const partsFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: PARK_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// Fecha (YYYY-MM-DD) y hora (HH:MM) del parque para un instante.
export function parkDateTime(instant) {
  const part = Object.fromEntries(partsFormat.formatToParts(instant).map((item) => [item.type, item.value]))
  return { date: `${part.year}-${part.month}-${part.day}`, time: `${part.hour}:${part.minute}` }
}

const sentFormat = new Intl.DateTimeFormat('es-AR', {
  timeZone: PARK_TIME_ZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// Fecha y hora del parque para mostrar, por ejemplo «sábado, 17 de octubre, 22:58».
export function formatParkDateTime(instant) {
  return sentFormat.format(instant)
}

export function addDays(dateStr, days) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10)
}

export function slotStart(dateStr, time) {
  return new Date(`${dateStr}T${time}:00${PARK_UTC_OFFSET}`).getTime()
}

// 'early' si el turno empieza en más de 24 h, 'late' si faltan menos de 15 min.
// Faltando exactamente 24 h o exactamente 15 min, se puede reservar.
export function bookingState(dateStr, time, now) {
  const left = slotStart(dateStr, time) - now
  if (left > BOOKING_OPENS_MS) return 'early'
  if (left < BOOKING_CLOSES_MS) return 'late'
  return null
}

// Se puede reservar con exactamente 24 h de anticipación y hasta exactamente 15 min antes.
export function canBook(dateStr, time, now) {
  if (now == null || !dateStr || !time) return false
  return bookingState(dateStr, time, now) == null
}

export const bookingMessages = {
  early: 'Solo se permiten inscripciones dentro de las 24 horas previas al inicio del turno.',
  late: 'Las inscripciones cierran 15 minutos antes del inicio del turno.',
}

export function useParkClock() {
  const [now, setNow] = useState(clockNow)
  const [status, setStatus] = useState(() => (base === null ? 'loading' : 'ready'))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    function sync() {
      syncClock()
        .then(() => {
          if (cancelled) return
          setNow(clockNow())
          setStatus('ready')
        })
        .catch(() => {
          if (cancelled) return
          if (base === null) setStatus('error')
        })
    }

    function onVisible() {
      if (document.visibilityState === 'visible') sync()
    }

    sync()
    const tick = setInterval(() => {
      if (base !== null) setNow(clockNow())
    }, TICK_MS)
    const resync = setInterval(sync, RESYNC_MS)
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      clearInterval(tick)
      clearInterval(resync)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [attempt])

  return {
    now,
    status,
    retry() {
      setStatus('loading')
      setAttempt((current) => current + 1)
    },
  }
}
