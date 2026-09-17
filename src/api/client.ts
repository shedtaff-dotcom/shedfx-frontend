/**
 * Thin fetch wrapper around the shedfx-backend HTTP API.
 *
 * Base URL comes from VITE_API_BASE_URL. When it is unset or empty the
 * client falls back to the relative `/api` prefix, which the Vite dev
 * server proxies to the backend (see vite.config.ts). That fallback exists
 * because the backend does not currently send CORS headers, so a browser on
 * the Vite origin cannot call http://localhost:8000 directly.
 */

const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim()

export const API_BASE_URL = (configured && configured.length > 0 ? configured : '/api').replace(
  /\/+$/,
  '',
)

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!response.ok) {
    throw new ApiError(response.status, `GET ${path} failed: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as T
}
