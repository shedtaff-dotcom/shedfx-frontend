import { getJson } from './client'
import type { Song } from './types'

/** GET /songs */
export function listSongs(signal?: AbortSignal): Promise<Song[]> {
  return getJson<Song[]>('/songs', signal)
}
