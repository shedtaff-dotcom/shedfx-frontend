/**
 * Response shapes, mirroring the backend's Pydantic *Read schemas
 * (shedfx-backend/app/schemas/*.py). Every read schema carries a string
 * UUID `id`; optional columns come back as `null`, never omitted.
 */

export interface Setlist {
  id: string
  name: string
  gig_date: string | null
  venue: string | null
  notes: string | null
}

export interface Song {
  id: string
  title: string
  artist: string | null
  key: string | null
  bpm: number | null
  lyrics_url: string | null
  tab_url: string | null
  notes: string | null
}

export interface EffectsFlow {
  id: string
  name: string
  description: string | null
  input_gain: number | null
  output_gain: number | null
}
