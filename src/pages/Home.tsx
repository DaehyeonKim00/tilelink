import { useNavigate, useOutletContext } from 'react-router-dom'
import type { SearchState } from '../context'
import { useApp } from '../context'
import { BrandGrid } from '../components/BrandGrid'
import { FeaturedProducts } from '../components/FeaturedProducts'
import { Hero } from '../components/Hero'

export function Home() {
  const { catalog } = useApp()
  const { query, setQuery, submitSearch } = useOutletContext<SearchState>()
  const navigate = useNavigate()
  return (
    <>
      <Hero query={query} onQuery={setQuery} onSubmit={submitSearch} />
      <FeaturedProducts products={catalog.products} />
      <BrandGrid products={catalog.products} onSelect={(b) => navigate(`/products?brand=${encodeURIComponent(b)}`)} />
    </>
  )
}
