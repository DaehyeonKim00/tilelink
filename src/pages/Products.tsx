import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { brandsOf, matchesQuery } from '../data/catalog'
import { PAGE_SIZE } from '../data/config'
import { useApp } from '../context'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'

export function Products() {
  const { catalog, adminIn } = useApp()
  const [params, setParams] = useSearchParams()

  const category = params.get('category') ?? 'all'
  const brand = params.get('brand') ?? 'all'
  const query = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) {
      if (v === null || v === 'all' || v === '') next.delete(k)
      else next.set(k, v)
    }
    setParams(next)
  }

  const inCategory = useMemo(
    () => (category === 'all' ? catalog.products : catalog.products.filter((p) => p.category === category)),
    [catalog.products, category],
  )
  const brands = useMemo(() => brandsOf(inCategory), [inCategory])
  const results = useMemo(
    () => inCategory.filter((p) => (brand === 'all' || p.brand === brand) && matchesQuery(p, query)),
    [inCategory, brand, query],
  )

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * PAGE_SIZE
  const shown = results.slice(start, start + PAGE_SIZE)

  const filtered = category !== 'all' || brand !== 'all' || query.trim() !== ''
  const heading = category !== 'all' ? category : 'All products'

  const goToPage = (p: number) => {
    update({ page: p === 1 ? null : String(p) })
    window.setTimeout(() => document.getElementById('results')?.scrollIntoView(), 30)
  }

  return (
    <>
      <div className="page-head container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{heading}</span>
        </nav>
        <h1 className="page-title">{heading}</h1>
        <p className="page-lead">Browse everything we supply. Choose a category or brand, or use the search box at the top.</p>
      </div>

      <section id="browse" className="section container" aria-label="Products">
        <div className="filters">
          <div className="chips" role="group" aria-label="Filter by category">
            <button type="button" className="chip" aria-pressed={category === 'all'} onClick={() => update({ category: null, brand: null, page: null })}>
              All
            </button>
            {catalog.categories.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => update({ category: c, brand: null, page: null })}>
                {c}
              </button>
            ))}
          </div>

          <div className="filters__row">
            <label className="select">
              <span className="select__label">Brand</span>
              <select value={brand} onChange={(e) => update({ brand: e.target.value, page: null })}>
                <option value="all">All brands</option>
                {brands.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count})
                  </option>
                ))}
              </select>
            </label>
            {filtered && (
              <button type="button" className="btn btn--ghost" onClick={() => setParams(new URLSearchParams())}>
                Clear all filters
              </button>
            )}
          </div>
        </div>

        <p id="results" className="results-count" role="status" aria-live="polite">
          {results.length === 0 ? 'No products found.' : `Showing ${start + 1} to ${start + shown.length} of ${results.length} products`}
          {query.trim() && results.length > 0 ? ` for "${query.trim()}"` : ''}
        </p>

        {results.length === 0 ? (
          <div className="empty">
            <p>We could not find a product matching your search. Try a shorter word, or call or email us and we will help you find it.</p>
            <button type="button" className="btn btn--outline" onClick={() => setParams(new URLSearchParams())}>
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid" key={`${category}-${brand}-${query}-${current}`}>
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} adminMode={adminIn} onDelete={catalog.deleteProduct} />
            ))}
          </div>
        )}

        <Pagination page={current} pageCount={pageCount} onPage={goToPage} />
      </section>
    </>
  )
}
