import { useEffect, useRef } from 'react'
import { canBook } from '../lib/clock.js'
import { slotLabel } from '../lib/inscription.js'

const SIZE = 220
const CENTER = SIZE / 2
const NUMBER_RADIUS = 78
const HOURS_ON_FACE = 9

function offered(slot) {
  return slot && slot.status !== 'closed' && slot.status !== 'unavailable'
}

function hourAngle(time) {
  const hour = Number(time.slice(0, 2))
  return -Math.PI / 2 + ((hour - 9) / HOURS_ON_FACE) * Math.PI * 2
}

function pointFor(time, radius) {
  const angle = hourAngle(time)
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  }
}

function nearestIndex(event, element, slots) {
  const rect = element.getBoundingClientRect()
  const x = event.clientX - (rect.left + rect.width / 2)
  const y = event.clientY - (rect.top + rect.height / 2)
  const pointer = Math.atan2(y, x)
  let best = 0
  let bestDistance = Infinity
  slots.forEach((slot, index) => {
    const angle = hourAngle(slot.time)
    const distance = Math.abs(Math.atan2(Math.sin(pointer - angle), Math.cos(pointer - angle)))
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  })
  return best
}

export default function HourClock({ slots, value, date, now, invalid, onChange }) {
  const faceRef = useRef(null)
  const visible = slots.filter((slot) => offered(slot) && canBook(date, slot.time, now))
  const selected = visible.find((slot) => slot.time === value) ?? null
  const open = selected ? selected.capacity > 0 : false
  const tip = selected ? pointFor(selected.time, 56) : null

  useEffect(() => {
    if (value && !visible.some((slot) => slot.time === value)) onChange('')
  }, [onChange, value, visible])

  function choose(index) {
    const slot = visible[index]
    if (!slot || slot.time === value) return
    onChange(slot.time)
  }

  function pick(event) {
    if (!faceRef.current || visible.length === 0) return
    choose(nearestIndex(event, faceRef.current, visible))
  }

  if (visible.length === 0) {
    return (
      <p className="bg-base-200 text-base-content/70 rounded-2xl px-4 py-3 text-sm">
        En este día no hay horarios dentro de las 24 horas. Se pueden inscribir hasta 15 minutos antes de que empiecen.
      </p>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${invalid ? 'park-calendar-invalid' : ''}`}>
      <div
        ref={faceRef}
        className="relative size-52 shrink-0 touch-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          pick(event)
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) pick(event)
        }}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full" aria-hidden="true">
          <circle cx={CENTER} cy={CENTER} r="102" className="fill-base-200" />
          <circle cx={CENTER} cy={CENTER} r="102" className="stroke-primary/25 fill-none" strokeWidth="3" />
          {tip ? (
            <>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={tip.x}
                y2={tip.y}
                className="stroke-primary"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx={tip.x} cy={tip.y} r="5" className="fill-accent" />
            </>
          ) : null}
          <circle cx={CENTER} cy={CENTER} r="7" className="fill-primary" />
        </svg>
        {visible.map((slot, index) => {
          const { x, y } = pointFor(slot.time, NUMBER_RADIUS)
          const active = slot.time === value
          return (
            <button
              key={slot.time}
              type="button"
              aria-pressed={active}
              aria-label={`${slot.time}, ${slotLabel(slot, date, now)}`}
              className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-sm font-black ${
                active ? 'bg-primary text-primary-content' : 'text-base-content'
              }`}
              style={{ left: `${(x / SIZE) * 100}%`, top: `${(y / SIZE) * 100}%` }}
              onClick={() => choose(index)}
            >
              {Number(slot.time.slice(0, 2))}
            </button>
          )
        })}
      </div>

      <div className="bg-secondary/20 flex min-h-36 w-28 flex-col items-center justify-center rounded-[1.75rem] px-3 py-4 text-center">
        {selected ? (
          <>
            <p className="font-display text-2xl leading-none font-black">{selected.time}</p>
            {open ? (
              <>
                <p className="font-display text-accent-content mt-2 text-4xl leading-none font-black">{selected.capacity}</p>
                <p className="text-sm font-semibold">cupos</p>
              </>
            ) : (
              <p className="mt-2 text-sm leading-snug font-semibold">{slotLabel(selected, date, now)}</p>
            )}
          </>
        ) : (
          <p className="text-base-content/70 text-sm leading-snug font-semibold">Mové la aguja para elegir la hora</p>
        )}
      </div>
    </div>
  )
}
