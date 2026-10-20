import { motion, useReducedMotion } from 'motion/react'
import { Mail } from 'lucide-react'

export default function ConfirmationEmail({ registration }) {
  const reduce = useReducedMotion()

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
        <div className="alert alert-success items-start">
          <Mail className="size-5 shrink-0" />
          <span>
            Revisá tu correo <strong className="break-all">{registration.email}</strong>. Ahí te llegó la entrada.
          </span>
        </div>
      )}

      <article className="card bg-base-100 shadow-sm">
        <div className="card-body gap-4 p-4">
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-black">Tu lugar está reservado</h1>
            <p>
              {registration.parkName} confirmó la inscripción a <strong>{registration.activityName}</strong> el{' '}
              {registration.dateLabel} a las {registration.time}.
            </p>
            {registration.message ? (
              <p className="text-base-content/70 text-sm">{registration.message}</p>
            ) : null}
            {registration.code ? (
              <p className="rounded-box bg-base-200 px-3 py-2 break-all">
                Número de inscripción: <span className="font-mono font-semibold">{registration.code}</span>
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </motion.section>
  )
}
