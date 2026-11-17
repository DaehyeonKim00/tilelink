import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ImageOff, Trash2 } from 'lucide-react'
import type { Product } from '../types'

interface Props {
  product: Product
  index?: number
  adminMode?: boolean
  onDelete?: (id: string) => void
}

export function ProductCard({ product, index = 0, adminMode = false, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [broken, setBroken] = useState(false)
  const hasImage = product.image && !broken

  return (
    <article className={product.detailId ? 'card card--linked' : 'card'} style={{ ['--i' as string]: index }}>
      <div className="card__media">
        {hasImage ? (
          <img src={product.image} alt={product.title} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="card__nophoto">
            <ImageOff aria-hidden="true" size={32} />
            <span>Photo coming soon</span>
          </div>
        )}
      </div>
      <div className="card__body">
        <h3 className="card__title">
          {product.detailId ? (
            <Link to={`/product/${product.detailId}`} className="card__link">
              {product.title}
            </Link>
          ) : (
            product.title
          )}
        </h3>
        {product.detailId && (
          <span className="card__more">
            See colours and sizes <ChevronRight aria-hidden="true" size={18} />
          </span>
        )}
        <ul className="card__tags" aria-label="Brand and category">
          <li>{product.brand}</li>
          <li>{product.category}</li>
        </ul>
        {adminMode && onDelete && (
          <div className="card__admin">
            {confirming ? (
              <>
                <span>Delete this product?</span>
                <button type="button" className="btn btn--danger" onClick={() => onDelete(product.id)}>
                  Yes, delete
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => setConfirming(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" className="btn btn--ghost" onClick={() => setConfirming(true)}>
                <Trash2 aria-hidden="true" size={18} /> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
