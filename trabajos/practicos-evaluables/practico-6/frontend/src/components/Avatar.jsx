function initials(nombre) {
  const parts = String(nombre || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default function Avatar({ user }) {
  if (!user?.nombre) return null

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="avatar avatar-online avatar-placeholder session-avatar cursor-pointer border-0 bg-transparent p-0"
        aria-haspopup="dialog"
        aria-label={`Sesión de ${user.nombre}`}
      >
        <div className="bg-primary text-primary-content w-8 rounded-full">
          <span className="text-xs font-black">{initials(user.nombre)}</span>
        </div>
      </button>
      <div
        tabIndex={0}
        role="dialog"
        aria-label="Datos de la sesión"
        className="dropdown-content border-base-300 bg-base-100 z-30 mt-3 w-64 rounded-2xl border p-4 text-left shadow-[0_16px_40px_-18px_oklch(18%_0.04_155/0.55)]"
      >
        <p className="text-base-content/60 text-xs font-bold tracking-[0.16em] uppercase">Sesión activa</p>
        <p className="font-display mt-2 text-base leading-tight font-black">{user.nombre}</p>
        <p className="text-base-content/80 mt-1 text-sm break-all">{user.email}</p>
      </div>
    </div>
  )
}
