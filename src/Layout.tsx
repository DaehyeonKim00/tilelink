import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp, type SearchState } from './context'
import { CallButton } from './components/CallButton'
import { CategoryBar } from './components/CategoryBar'
import { ContactSection, Footer } from './components/Footer'
import { Header } from './components/Header'

export function Layout() {
  const { catalog } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [homeQuery, setHomeQuery] = useState('')

  const onProducts = location.pathname === '/products'

  // Each page starts at the top, unless the link asked to scroll to a section.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) {
      window.setTimeout(() => document.getElementById(target)?.scrollIntoView(), 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.state])

  useEffect(() => {
    if (location.pathname.startsWith('/product/')) return // the product page sets its own title
    const titles: Record<string, string> = { '/products': 'All products - Tile Link', '/contact': 'Contact us - Tile Link', '/admin': 'Admin - Tile Link' }
    document.title = titles[location.pathname] ?? 'Tile Link - JSC Import'
  }, [location.pathname])

  // On the products page the search lives in the address (?q=), elsewhere it is local until submitted.
  const query = onProducts ? params.get('q') ?? '' : homeQuery
  const setQuery = (q: string) => {
    if (onProducts) {
      const next = new URLSearchParams(params)
      if (q) {
        next.set('q', q)
        next.delete('category')
        next.delete('brand')
      } else {
        next.delete('q')
      }
      next.delete('page')
      setParams(next, { replace: true })
    } else {
      setHomeQuery(q)
    }
  }
  const submitSearch = () => {
    if (onProducts) {
      document.getElementById('results')?.scrollIntoView()
    } else {
      const q = homeQuery.trim()
      setHomeQuery('')
      navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    }
  }

  const search: SearchState = { query, setQuery, submitSearch }

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          // A plain #main link would be read as a page address by the hash router.
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>
      <Header query={query} onQuery={setQuery} onSubmit={submitSearch} />
      <CategoryBar categories={catalog.categories} activeCategory={params.get('category') ?? ''} onProductsPage={onProducts} />
      <main id="main" tabIndex={-1}>
        <Outlet context={search} />
      </main>
      <ContactSection />
      <Footer />
      <CallButton />
    </>
  )
}
