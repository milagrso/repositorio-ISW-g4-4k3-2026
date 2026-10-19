import { ApiError } from './errors.js'

// El backend escucha en este origen. Se puede cambiar con VITE_API_URL.
const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4040').replace(/\/$/, '')

export async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: options.method || 'GET',
      headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    throw new ApiError(0, { message: 'No pudimos conectar con el servidor. Reintentá.' })
  }

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message =
      typeof payload.error === 'string'
        ? payload.error
        : payload.message || 'No se pudo completar la solicitud.'
    throw new ApiError(response.status, { message })
  }
  return payload
}
