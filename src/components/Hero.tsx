import { SITE } from '../data/config'
import { F4Panel } from './F4Panel'
import { SearchBox } from './Header'

interface Props {
  query: string
  onQuery: (q: string) => void
  onSubmit: () => void
}

export function Hero({ query, onQuery, onSubmit }: Props) {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__intro">
        <h1 id="hero-title">Professional Tile &amp; Building Materials</h1>
        <p className="hero__lead">{SITE.tagline}</p>
        <SearchBox query={query} onQuery={onQuery} onSubmit={onSubmit} id="hero-search" className="search--hero" />
        <p className="hero__hint">Search by product, brand or size, or choose a category above.</p>
      </div>
      <F4Panel />
    </section>
  )
}
