import type { ReactNode } from 'react'
import type { ListState } from '../api'

interface Column<T> {
  header: string
  render: (item: T) => ReactNode
}

interface ListViewProps<T extends { id: string }> {
  title: string
  state: ListState<T>
  columns: Column<T>[]
}

/** Renders loading / error / empty / table states for a fetched list. */
export function ListView<T extends { id: string }>({ title, state, columns }: ListViewProps<T>) {
  return (
    <section>
      <h2>{title}</h2>
      {state.status === 'loading' && <p>Loading…</p>}
      {state.status === 'error' && (
        <p role="alert">
          Could not load {title.toLowerCase()}: {state.message}
        </p>
      )}
      {state.status === 'ready' && state.items.length === 0 && <p>No {title.toLowerCase()} yet.</p>}
      {state.status === 'ready' && state.items.length > 0 && (
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.header}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.header}>{col.render(item)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
