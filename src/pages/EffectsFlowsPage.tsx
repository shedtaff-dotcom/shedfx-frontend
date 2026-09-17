import { listEffectsFlows, useApiList } from '../api'
import { ListView } from '../components/ListView'

export function EffectsFlowsPage() {
  const state = useApiList(listEffectsFlows)
  return (
    <ListView
      title="Effects flows"
      state={state}
      columns={[
        { header: 'Name', render: (f) => f.name },
        { header: 'Description', render: (f) => f.description ?? '—' },
        { header: 'Input gain', render: (f) => f.input_gain ?? '—' },
        { header: 'Output gain', render: (f) => f.output_gain ?? '—' },
      ]}
    />
  )
}
