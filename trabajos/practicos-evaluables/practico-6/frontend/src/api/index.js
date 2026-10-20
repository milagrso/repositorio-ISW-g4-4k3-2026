import { useEffect, useState } from 'react'
import { request } from './client.js'
import { ApiError } from './errors.js'
import { findActivity, mapBackendActivity, parkRecord, toSlug } from '../data/catalog.js'

export { ApiError }

let cachedActivities = null

async function fetchMappedActivities() {
  const data = await request('/api/catalog/activities')
  const list = Array.isArray(data) ? data : []
  const mapped = list
    .filter((item) => item.enabled !== false)
    .map(mapBackendActivity)
  cachedActivities = mapped
  return mapped
}

function findCachedActivity(activityId) {
  if (!activityId || !cachedActivities) return null
  const slug = toSlug(activityId)
  return (
    cachedActivities.find(
      (item) =>
        item.id === slug ||
        String(item.backendId) === String(activityId) ||
        toSlug(item.name) === slug,
    ) ?? null
  )
}

export function usePark() {
  const [park, setPark] = useState(parkRecord)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    request('/api/catalog/parks')
      .then((parks) => {
        if (cancelled) return
        const backendPark = Array.isArray(parks) && parks.length > 0 ? parks[0] : null
        if (backendPark) {
          setPark({
            ...parkRecord,
            id: backendPark.id,
            name: backendPark.name || parkRecord.name,
            status: backendPark.status,
            openTime: backendPark.openTime,
            closeTime: backendPark.closeTime,
          })
        }
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { park, status }
}

export function useActivities() {
  const [activities, setActivities] = useState(() => cachedActivities ?? [])
  const [status, setStatus] = useState(() => (cachedActivities ? 'ready' : 'loading'))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchMappedActivities()
      .then((mapped) => {
        if (cancelled) return
        setActivities(mapped)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [attempt])

  return {
    activities,
    status,
    retry() {
      setStatus('loading')
      setAttempt((current) => current + 1)
    },
  }
}

export function useSlots(activityId, date) {
  const [slots, setSlots] = useState([])
  const [status, setStatus] = useState(() => (activityId && date ? 'loading' : 'idle'))
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!activityId || !date) {
      setSlots([])
      setStatus('idle')
      return undefined
    }

    let cancelled = false
    setStatus('loading')

    async function loadSlots() {
      let target = findCachedActivity(activityId)
      if (!target) {
        await fetchMappedActivities()
        target = findCachedActivity(activityId)
      }
      const backendId = target?.backendId ?? activityId
      const data = await request(
        `/api/catalog/time-slots?activityId=${encodeURIComponent(backendId)}&date=${encodeURIComponent(date)}`,
      )
      const list = Array.isArray(data) ? data : []
      return list
        .map((item) => ({
          id: item.id,
          time: item.startTime,
          capacity: Math.max(0, Number(item.maxCapacity) - Number(item.occupiedSlots)),
          maxCapacity: Number(item.maxCapacity),
          occupiedSlots: Number(item.occupiedSlots),
          status: 'open',
        }))
        .sort((left, right) => left.time.localeCompare(right.time))
    }

    loadSlots()
      .then((mappedSlots) => {
        if (cancelled) return
        setSlots(mappedSlots)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [activityId, date, attempt])

  return {
    slots,
    status: activityId && date ? status : 'idle',
    retry() {
      if (!activityId || !date) return
      setStatus('loading')
      setAttempt((current) => current + 1)
    },
  }
}

export function useSession() {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    request('/api/catalog/session')
      .then((data) => {
        if (cancelled) return
        setUser(data)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { user, status }
}

export function createInscription(input) {
  const activity = findCachedActivity(input.activityId) ?? findActivity(input.activityId)
  if (!activity) {
    return Promise.reject(new ApiError(400, { message: 'Debe seleccionar una actividad' }))
  }

  const participantes = (input.visitors ?? []).map((visitor) => {
    const participant = {
      nombre: visitor.nombre,
      dni: Number(visitor.dni),
      edad: Number(visitor.edad),
    }
    if (activity.requiresSize) participant.talleVestimenta = visitor.talle
    return participant
  })

  return request('/api/inscriptions', {
    method: 'POST',
    body: {
      actividad: activity.name,
      horario: input.time,
      fecha: input.date,
      cantidad: input.people,
      aceptaTerminos: Boolean(input.acceptedTerms),
      emailContacto: input.email,
      participantes,
    },
  })
}
