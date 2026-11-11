import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from '../utils'

interface Props {
  categories: string[]
  /** The category currently shown on the products page, if any. */
  activeCategory: string
  onProductsPage: boolean
}

export function CategoryBar({ categories, activeCategory, onProductsPage }: Props) {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const onHome = pathname === '/'
  const onContactPage = pathname === '/contact'

  const goBrands = () => {
    if (onHome) scrollToId('brands')
    else navigate('/', { state: { scrollTo: 'brands' } })
  }

  return (
    <nav className="catbar" aria-label="Product categories">
      <ul className="container catbar__list">
        <li>
          <Link className="catbar__item" to="/products" aria-current={onProductsPage && !activeCategory ? 'page' : undefined}>
            All products
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <Link
              className="catbar__item"
              to={`/products?category=${encodeURIComponent(c)}`}
              aria-current={onProductsPage && activeCategory === c ? 'page' : undefined}
            >
              {c}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" className="catbar__item" onClick={goBrands}>
            Brands
          </button>
        </li>
        <li>
          <Link className="catbar__item" to="/contact" aria-current={onContactPage ? 'page' : undefined}>
            Contact us
          </Link>
        </li>
      </ul>
    </nav>
  )
}
