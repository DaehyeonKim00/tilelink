import { useMemo, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import type { Product } from '../types'
import { brandsOf } from '../data/catalog'
import { logoFor } from '../data/brandLogos'
import { HIDDEN_BRANDS } from '../data/config'

interface Props {
  products: Product[]
  onSelect: (brand: string) => void
}

type Brand = { name: string; count: number }

function BrandTile({ brand, onSelect, hidden }: { brand: Brand; onSelect: (b: string) => void; hidden?: boolean }) {
  const logo = logoFor(brand.name)
  return (
    <li>
      <button type="button" className="brand" tabIndex={hidden ? -1 : undefined} onClick={() => onSelect(brand.name)}>
        <span className="brand__mark">
          {logo ? <img src={logo} alt={brand.name} loading="lazy" /> : <span className="brand__wordmark">{brand.name}</span>}
        </span>
        <span className="brand__count">
          {brand.count} {brand.count === 1 ? 'product' : 'products'}
        </span>
      </button>
    </li>
  )
}

/** One row that drifts from right to left and loops without a gap. The second copy is only there for the loop. */
function MarqueeRow({ brands, onSelect, label, offset }: { brands: Brand[]; onSelect: (b: string) => void; label: string; offset: boolean }) {
  return (
    <div className="marquee" data-offset={offset ? 'true' : undefined}>
      <div className="marquee__track">
        <ul className="marquee__copy" aria-label={label}>
          {brands.map((b) => (
            <BrandTile key={b.name} brand={b} onSelect={onSelect} />
          ))}
        </ul>
        <ul className="marquee__copy" aria-hidden="true" inert>
          {brands.map((b) => (
            <BrandTile key={b.name} brand={b} onSelect={onSelect} hidden />
          ))}
        </ul>
      </div>
    </div>
  )
}

export function BrandGrid({ products, onSelect }: Props) {
  const [paused, setPaused] = useState(false)
  const brands = useMemo(() => brandsOf(products).filter((b) => !HIDDEN_BRANDS.includes(b.name)), [products])

  // Two rows with the brands shared out evenly, biggest brands first in each row.
  const [rowA, rowB] = useMemo(() => {
    const a: Brand[] = []
    const b: Brand[] = []
    brands.forEach((brand, i) => (i % 2 === 0 ? a : b).push(brand))
    return [a, b]
  }, [brands])

  return (
    <section id="brands" className="section container brands-section" data-paused={paused ? 'true' : undefined} aria-labelledby="brands-title">
      <div className="brands-head">
        <h2 id="brands-title" className="section__title">
          Brands we supply
        </h2>
        <button type="button" className="btn btn--outline brands-pause" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
          {paused ? <Play aria-hidden="true" size={20} /> : <Pause aria-hidden="true" size={20} />}
          {paused ? 'Play moving brands' : 'Pause moving brands'}
        </button>
      </div>
      <p className="brands-hint">Choose a brand to see its products.</p>
      <MarqueeRow brands={rowA} onSelect={onSelect} label="Brands, first row" offset={false} />
      <MarqueeRow brands={rowB} onSelect={onSelect} label="Brands, second row" offset />
    </section>
  )
}
