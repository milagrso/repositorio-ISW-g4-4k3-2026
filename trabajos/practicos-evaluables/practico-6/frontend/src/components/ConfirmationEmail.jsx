import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Link } from 'wouter'
import { motion, useReducedMotion } from 'motion/react'
import { Mail, Paperclip } from 'lucide-react'
import { formatParkDateTime } from '../lib/clock.js'

function fileName(nombre) {
  const slug = nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
  return `entrada-${slug}.png`
}

function qrText(registration, visitor) {
  return [
    registration.parkName,
    registration.code ? `Inscripción: ${registration.code}` : null,
    `Actividad: ${registration.activityName}`,
    `Fecha: ${registration.dateLabel}`,
    `Horario: ${registration.time}`,
    `Visitante: ${visitor.nombre}`,
    `DNI: ${visitor.dni}`,
  ]
    .filter(Boolean)
    .join('\n')
}

// Un QR de acceso por visitante: el que mandó el backend o, si no vino, uno armado acá.
function useVisitorQrs(registration) {
  const [qrs, setQrs] = useState({})
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    setQrs({})
    setFailed(false)

    Promise.all(
      registration.visitors.map(async (visitor) => [
        visitor.dni,
        visitor.qr ?? (await QRCode.toDataURL(qrText(registration, visitor), { margin: 1, width: 220 })),
      ]),
    )
      .then((entries) => {
        if (active) setQrs(Object.fromEntries(entries))
      })
      .catch(() => {
        if (active) setFailed(true)
      })

    return () => {
      active = false
    }
  }, [registration])

  return { qrs, failed }
}

export default function ConfirmationEmail({ registration, onReset }) {
  const reduce = useReducedMotion()
  const { qrs, failed } = useVisitorQrs(registration)
  const sentAt = registration.sentAt != null ? formatParkDateTime(registration.sentAt) : null

  return (
    <motion.section
      className="space-y-4"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {registration.image ? (
        <div className="relative h-48 overflow-hidden rounded-3xl shadow-md">
          <img src={registration.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
          <p className="absolute right-4 bottom-4 left-4 text-2xl font-semibold text-white">
            {registration.activityName}
          </p>
        </div>
      ) : null}
      {registration.emailFailed ? (
        <div className="alert alert-warning items-start text-sm">
          <Mail className="size-5 shrink-0" />
          <span>{registration.message || 'La inscripción quedó registrada, pero no se pudo enviar el correo.'}</span>
        </div>
      ) : (
        <div className="alert alert-success items-start text-sm">
          <Mail className="size-5 shrink-0" />
          <span>
            {registration.message || `Inscripción confirmada. El correo de confirmación es para ${registration.email}.`}
          </span>
        </div>
      )}

      <article className="card bg-base-100 shadow-sm">
        <div className="card-body gap-4 p-4">
          <header className="flex items-start gap-3">
            <img src="/logo/insignia.svg" alt="" className="size-12 shrink-0" />
            <div className="min-w-0 space-y-1 text-sm">
              <p>
                <span className="font-semibold">De:</span> {registration.parkName}
              </p>
              <p className="break-all">
                <span className="font-semibold">Para:</span> {registration.email}
              </p>
              <p>
                <span className="font-semibold">Asunto:</span> Confirmación de inscripción — {registration.activityName}
              </p>
              {sentAt ? (
                <p>
                  <span className="font-semibold">Fecha:</span> {sentAt}
                </p>
              ) : null}
            </div>
          </header>

          <div className="divider my-0" />

          <div className="space-y-3">
            <h1 className="font-display text-3xl font-black">Tu lugar está reservado</h1>
            <p>
              {registration.parkName} confirmó la inscripción a <strong>{registration.activityName}</strong> el{' '}
              {registration.dateLabel} a las {registration.time}.
            </p>
            {registration.code ? (
              <p className="rounded-box bg-base-200 px-3 py-2 break-all">
                Número de inscripción: <span className="font-mono font-semibold">{registration.code}</span>
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">
              {registration.visitors.length === 1 ? 'Visitante' : `Visitantes (${registration.visitors.length})`}
            </h2>
            <p className="text-base-content/70 text-sm">Cada visitante entra a la actividad con su código QR.</p>
            <ul className="space-y-3">
              {registration.visitors.map((visitor) => (
                <li key={visitor.dni} className="rounded-box bg-base-200 flex items-center gap-3 p-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{visitor.nombre}</p>
                    <p>DNI {visitor.dni}</p>
                    <p>Edad {visitor.edad}</p>
                    {registration.requiresSize ? <p>Talle {visitor.talle}</p> : null}
                  </div>
                  {qrs[visitor.dni] ? (
                    <motion.img
                      src={qrs[visitor.dni]}
                      alt={`Código QR de acceso de ${visitor.nombre}`}
                      className="rounded-box size-28 shrink-0 bg-white p-1"
                      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  ) : null}
                </li>
              ))}
            </ul>
            {failed ? <p className="text-sm">No se pudieron generar los códigos QR.</p> : null}
          </div>

          {Object.keys(qrs).length > 0 ? (
            <div className="space-y-2">
              <h2 className="flex items-center gap-1 font-semibold">
                <Paperclip className="size-4" aria-hidden="true" />
                Adjuntos
              </h2>
              <ul className="flex flex-wrap gap-2">
                {registration.visitors.map((visitor) =>
                  qrs[visitor.dni] ? (
                    <li key={visitor.dni}>
                      <a
                        href={qrs[visitor.dni]}
                        download={fileName(visitor.nombre)}
                        className="btn btn-sm btn-outline normal-case"
                      >
                        {fileName(visitor.nombre)}
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      <div className="grid gap-2">
        <button type="button" className="btn btn-primary btn-block" onClick={onReset}>
          Nueva inscripción
        </button>
        <Link href="/" className="btn btn-outline btn-block">
          Volver al inicio
        </Link>
      </div>
    </motion.section>
  )
}
