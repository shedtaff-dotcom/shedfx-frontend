import { useEffect, useState } from 'react'

export type ListState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; items: T[] }

/**
 * Fetch a list once on mount. `fetcher` must be referentially stable (a
 * module-level function from src/api), otherwise this refetches every render.
 */
export function useApiList<T>(fetcher: (signal: AbortSignal) => Promise<T[]>): ListState<T> {
  const [state, setState] = useState<ListState<T>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    fetcher(controller.signal)
      .then((items) => setState({ status: 'ready', items }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) })
      })
    return () => controller.abort()
  }, [fetcher])

  return state
}
