function slot(time, capacity, status = 'open') {
  return { time, capacity, status }
}

function onDays(days, slots) {
  return Object.fromEntries(days.map((day) => [day, slots]))
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
    schedules: {
      ...onDays([2, 3, 4], [slot('10:00', 12), slot('14:00', 8), slot('16:00', 6)]),
      5: [slot('10:00', 12), slot('12:00', 4), slot('14:00', 8), slot('16:00', 6), slot('19:00', 10)],
      6: [slot('10:00', 12), slot('12:00', 0), slot('14:00', 8), slot('16:00', 6), slot('19:00', 10, 'closed')],
      0: [slot('10:00', 8), slot('14:00', 4), slot('16:00', 6)],
    },
  },
  {
    id: 'safari',
    name: 'Safari',
    image: '/images/safari.webp',
    summary: 'Recorrido en vehículo para ver la fauna del parque.',
    requiresSize: false,
    terms:
      'Me comprometo a permanecer en el vehículo, a no alimentar a los animales y a respetar las indicaciones del guía durante todo el safari.',
    schedules: {
      ...onDays([2, 3, 4, 5], [slot('09:00', 20), slot('11:00', 15), slot('15:00', 10)]),
      6: [slot('09:00', 20), slot('11:00', 15), slot('15:00', 0), slot('18:30', 10, 'unavailable')],
      0: [slot('09:00', 12), slot('11:00', 10)],
    },
  },
  {
    id: 'palestra',
    name: 'Palestra',
    image: '/images/palestra.webp',
    summary: 'Escalada en el muro del parque, con instructor.',
    requiresSize: true,
    terms:
      'Acepto usar arnés y el calzado indicado, informar si es mi primera vez y escalar solo las vías que habilite el instructor.',
    schedules: {
      ...onDays([2, 3, 4, 5], [slot('10:00', 8), slot('17:00', 6)]),
      6: [slot('10:00', 8), slot('13:00', 0), slot('17:00', 6), slot('19:30', 4, 'closed')],
      0: [slot('10:00', 4), slot('17:00', 6)],
    },
  },
  {
    id: 'jardineria',
    name: 'Jardinería',
    image: '/images/jardineria.webp',
    summary: 'Taller para conocer y cuidar las especies del parque.',
    requiresSize: false,
    terms:
      'Acepto usar las herramientas solo con supervisión, cuidar las especies y seguir las indicaciones de quien guía el taller.',
    schedules: {
      ...onDays([2, 3, 4, 5], [slot('09:00', 16), slot('11:30', 10)]),
      6: [slot('09:00', 16), slot('11:30', 10), slot('16:00', 8, 'unavailable')],
      0: [slot('09:00', 8), slot('11:30', 6)],
    },
  },
]

export function findActivity(id) {
  return activityRecords.find((activity) => activity.id === id) ?? null
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
