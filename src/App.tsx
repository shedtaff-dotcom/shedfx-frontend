import { useEffect, useState } from 'react'
import { API_BASE_URL } from './api'
import { Nav } from './components/Nav'
import { DEFAULT_PAGE, PAGES, isPageId, type PageId } from './pages'

/** Hash routing: `#/setlists`, `#/songs`, `#/effects-flows`. No router lib. */
function pageFromHash(): PageId {
  const id = window.location.hash.replace(/^#\/?/, '')
  return isPageId(id) ? id : DEFAULT_PAGE
}

function App() {
  const [page, setPage] = useState<PageId>(pageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const Page = PAGES.find((p) => p.id === page)?.component ?? PAGES[0].component

  return (
    <>
      <header>
        <h1>ShedFX</h1>
        <Nav current={page} />
      </header>
      <main>
        <Page />
      </main>
      <footer>
        <small>API: {API_BASE_URL}</small>
      </footer>
    </>
  )
}

export default App
