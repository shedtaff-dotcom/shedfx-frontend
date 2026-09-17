import { PAGES, type PageId } from '../pages'

interface NavProps {
  current: PageId
}

export function Nav({ current }: NavProps) {
  return (
    <nav aria-label="Main">
      {PAGES.map((page) => (
        <a key={page.id} href={`#/${page.id}`} aria-current={page.id === current ? 'page' : undefined}>
          {page.id === current ? <strong>{page.label}</strong> : page.label}
        </a>
      ))}
    </nav>
  )
}
