function slot(time, capacity, status = 'open') {
  return { time, capacity, status }
}

// Un turno por hora de 09:00 a 17:00 (a las 18:00 no hay turno), todos los días que abre
// el parque: de martes a domingo. El cupo es el mismo en cada turno.
export const PARK_TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const OPEN_WEEKDAYS = [0, 2, 3, 4, 5, 6]

export function toSlug(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}

function everyOpenDay(capacity) {
  const slots = PARK_TIMES.map((time) => slot(time, capacity))
  return Object.fromEntries(OPEN_WEEKDAYS.map((day) => [day, slots]))
}

export const parkRecord = {
  name: 'EcoHarmony Park',
  closedWeekdays: [1],
  slides: [
    {
      src: '/images/carrousel/pexels-basiciggy-16005382.webp',
      alt: 'Paisaje del parque',
    },
    {
      src: '/images/carrousel/pexels-jari-van-de-vel-405355698-18189595.webp',
      alt: 'Naturaleza en EcoHarmony Park',
    },
    {
      src: '/images/carrousel/pexels-li-lus-471583191-15745429.webp',
      alt: 'Aire libre en el parque',
    },
    {
      src: '/images/carrousel/pexels-vladyslav-huivyk-94105841-32438954.webp',
      alt: 'Entorno natural del parque',
    },
  ],
}

export const activityRecords = [
  {
    id: 'tirolesa',
    name: 'Tirolesa',
    image: '/images/Tirolesa.webp',
    summary: 'Recorrido entre las copas, con arnés y guía.',
    requiresSize: true,
    terms:
      'Declaro que puedo realizar la tirolesa, que voy a usar el arnés y el casco, y que voy a seguir las indicaciones del guía. EcoHarmony Park puede suspender la actividad por clima o seguridad.',
    minAge: 8,
    schedules: everyOpenDay(10),
  },
  {
    id: 'safari',
    name: 'Safari',
    image: '/images/safari.webp',
    summary: 'Recorrido en vehículo para ver la fauna del parque.',
    requiresSize: false,
    terms:
      'Me comprometo a permanecer en el vehículo, a no alimentar a los animales y a respetar las indicaciones del guía durante todo el safari.',
    minAge: 0,
    schedules: everyOpenDay(8),
  },
  {
    id: 'palestra',
    name: 'Palestra',
    image: '/images/palestra.webp',
    summary: 'Escalada en el muro del parque, con instructor.',
    requiresSize: true,
    terms:
      'Acepto usar arnés y la vestimenta indicada, informar si es mi primera vez y escalar solo las vías que habilite el instructor.',
    minAge: 12,
    schedules: everyOpenDay(12),
  },
  {
    id: 'jardineria',
    name: 'Jardinería',
    image: '/images/jardineria.webp',
    summary: 'Taller para conocer y cuidar las especies del parque.',
    requiresSize: false,
    terms:
      'Acepto usar las herramientas solo con supervisión, cuidar las especies y seguir las indicaciones de quien guía el taller.',
    minAge: 0,
    schedules: everyOpenDay(12),
  },
]

export function findActivity(idOrName) {
  if (idOrName == null) return null
  const slug = toSlug(idOrName)
  return activityRecords.find((activity) => activity.id === slug || toSlug(activity.name) === slug) ?? null
}

export function mapBackendActivity(backendActivity) {
  const slug = toSlug(backendActivity.name)
  const catalogActivity = findActivity(slug)
  return {
    id: catalogActivity?.id ?? slug,
    backendId: backendActivity.id,
    name: backendActivity.name,
    image: catalogActivity?.image ?? '',
    summary: catalogActivity?.summary ?? '',
    requiresSize: backendActivity.cloth !== undefined ? Boolean(backendActivity.cloth) : Boolean(catalogActivity?.requiresSize),
    minAge: backendActivity.minAge ?? catalogActivity?.minAge ?? 0,
    maxCapacityActivity: backendActivity.maxCapacityActivity,
    terms: backendActivity.termsAndConditions || catalogActivity?.terms || '',
    times: PARK_TIMES,
  }
}

function offeredTimes(activity) {
  const times = []
  for (const daySlots of Object.values(activity.schedules)) {
    for (const item of daySlots) {
      if (item.status === 'open' && !times.includes(item.time)) times.push(item.time)
    }
  }
  return times.sort((left, right) => left.localeCompare(right))
}

export function toActivity(activity) {
  return {
    id: activity.id,
    name: activity.name,
    image: activity.image,
    summary: activity.summary,
    requiresSize: activity.requiresSize,
    minAge: activity.minAge,
    terms: activity.terms,
    times: offeredTimes(activity),
  }
}

export function slotsForDate(activity, dateStr) {
  if (!activity || !dateStr) return []
  const [year, month, day] = dateStr.split('-').map(Number)
  const weekday = new Date(year, month - 1, day).getDay()
  return (activity.schedules[weekday] ?? []).map((item) => ({ ...item }))
}
