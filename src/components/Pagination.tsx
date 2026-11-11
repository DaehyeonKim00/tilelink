import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page: number
  pageCount: number
  onPage: (page: number) => void
}

function pagesToShow(page: number, count: number): (number | 'gap')[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const set = new Set([1, count, page - 1, page, page + 1])
  const sorted = [...set].filter((n) => n >= 1 && n <= count).sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push('gap')
    out.push(n)
  })
  return out
}

export function Pagination({ page, pageCount, onPage }: Props) {
  if (pageCount <= 1) return null
  return (
    <nav className="pagination" aria-label="Product pages">
      <button type="button" className="pagination__btn" disabled={page === 1} onClick={() => onPage(page - 1)}>
        <ChevronLeft aria-hidden="true" size={22} /> Previous
      </button>
      <ul className="pagination__pages">
        {pagesToShow(page, pageCount).map((n, i) =>
          n === 'gap' ? (
            <li key={`gap-${i}`} className="pagination__gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={n}>
              <button
                type="button"
                className="pagination__num"
                aria-label={`Page ${n}`}
                aria-current={n === page ? 'page' : undefined}
                onClick={() => onPage(n)}
              >
                {n}
              </button>
            </li>
          ),
        )}
      </ul>
      <button type="button" className="pagination__btn" disabled={page === pageCount} onClick={() => onPage(page + 1)}>
        Next <ChevronRight aria-hidden="true" size={22} />
      </button>
    </nav>
  )
}
