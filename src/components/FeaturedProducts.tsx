import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Product } from '../types'
import { FEATURED_INITIAL, FEATURED_LINES } from '../data/config'
import { ProductCard } from './ProductCard'

export function FeaturedProducts({ products }: { products: Product[] }) {
  const [showAll, setShowAll] = useState(false)
  const featured = FEATURED_LINES.map((line) => products.find((p) => p.line === line)).filter((p): p is Product => Boolean(p))
  if (featured.length === 0) return null
  const visible = showAll ? featured : featured.slice(0, FEATURED_INITIAL)

  return (
    <section className="section container" aria-labelledby="featured-title">
      <h2 id="featured-title" className="section__title">
        Featured products
      </h2>
      <div className="grid">
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="section__more">
        {featured.length > FEATURED_INITIAL && (
          <button type="button" className="btn btn--outline" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show fewer' : 'Show more'}
          </button>
        )}
        <Link className="btn btn--solid" to="/products">
          View all products <ArrowRight aria-hidden="true" size={20} />
        </Link>
      </div>
    </section>
  )
}
