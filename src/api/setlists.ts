import { getJson } from './client'
import type { Setlist } from './types'

/** GET /setlists */
export function listSetlists(signal?: AbortSignal): Promise<Setlist[]> {
  return getJson<Setlist[]>('/setlists', signal)
}
