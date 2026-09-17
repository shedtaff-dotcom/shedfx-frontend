import { getJson } from './client'
import type { EffectsFlow } from './types'

/** GET /effects-flows */
export function listEffectsFlows(signal?: AbortSignal): Promise<EffectsFlow[]> {
  return getJson<EffectsFlow[]>('/effects-flows', signal)
}
