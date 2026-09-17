import { listSongs, useApiList } from '../api'
import { ListView } from '../components/ListView'

export function SongsPage() {
  const state = useApiList(listSongs)
  return (
    <ListView
      title="Songs"
      state={state}
      columns={[
        { header: 'Title', render: (s) => s.title },
        { header: 'Artist', render: (s) => s.artist ?? '—' },
        { header: 'Key', render: (s) => s.key ?? '—' },
        { header: 'BPM', render: (s) => s.bpm ?? '—' },
        {
          header: 'Links',
          render: (s) => (
            <>
              {s.lyrics_url && (
                <a href={s.lyrics_url} target="_blank" rel="noreferrer">
                  lyrics
                </a>
              )}{' '}
              {s.tab_url && (
                <a href={s.tab_url} target="_blank" rel="noreferrer">
                  tab
                </a>
              )}
            </>
          ),
        },
        { header: 'Notes', render: (s) => s.notes ?? '—' },
      ]}
    />
  )
}
