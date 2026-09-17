import { listSetlists, useApiList } from '../api'
import { ListView } from '../components/ListView'

export function SetlistsPage() {
  const state = useApiList(listSetlists)
  return (
    <ListView
      title="Setlists"
      state={state}
      columns={[
        { header: 'Name', render: (s) => s.name },
        { header: 'Gig date', render: (s) => s.gig_date ?? '—' },
        { header: 'Venue', render: (s) => s.venue ?? '—' },
        { header: 'Notes', render: (s) => s.notes ?? '—' },
      ]}
    />
  )
}
