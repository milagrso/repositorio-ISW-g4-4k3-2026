import { useMemo } from 'react'
import { request } from './client.js'
import { ApiError } from './errors.js'
import { activityRecords, findActivity, parkRecord, slotsForDate, toActivity } from '../data/catalog.js'

export { ApiError }

export function usePark() {
  return { park: parkRecord, status: 'ready' }
}

export function useActivities() {
  const activities = useMemo(() => activityRecords.map(toActivity), [])
  return {
    activities,
    status: 'ready',
    retry() {},
  }
}

export function useSlots(activityId, date) {
  const slots = useMemo(() => {
    if (!activityId || !date) return []
    return slotsForDate(findActivity(activityId), date)
  }, [activityId, date])

  return {
    slots,
    status: activityId && date ? 'ready' : 'idle',
    retry() {},
  }
}

export function createInscription(input) {
  const activity = findActivity(input.activityId)
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
      cantidad: input.people,
      aceptaTerminos: Boolean(input.acceptedTerms),
      emailContacto: input.email,
      participantes,
    },
  })
}
