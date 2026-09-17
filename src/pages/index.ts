import type { ComponentType } from 'react'
import { EffectsFlowsPage } from './EffectsFlowsPage'
import { SetlistsPage } from './SetlistsPage'
import { SongsPage } from './SongsPage'

export type PageId = 'setlists' | 'songs' | 'effects-flows'

export interface PageDef {
  id: PageId
  label: string
  component: ComponentType
}

export const PAGES: PageDef[] = [
  { id: 'setlists', label: 'Setlists', component: SetlistsPage },
  { id: 'songs', label: 'Songs', component: SongsPage },
  { id: 'effects-flows', label: 'Effects flows', component: EffectsFlowsPage },
]

export const DEFAULT_PAGE: PageId = 'setlists'

export function isPageId(value: string): value is PageId {
  return PAGES.some((p) => p.id === value)
}
