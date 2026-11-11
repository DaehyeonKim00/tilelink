import { Link } from 'react-router-dom'
import { Mail, Phone, Search, X } from 'lucide-react'
import { CONTACT, SITE, telHref } from '../data/config'
import { scrollToId } from '../utils'

interface Props {
  query: string
  onQuery: (q: string) => void
  onSubmit: () => void
}

export function CallLink({ className }: { className: string }) {
  if (CONTACT.phones.length > 0) {
    return (
      <a className={className} href={telHref(CONTACT.phones[0])}>
        <Phone aria-hidden="true" size={20} /> Call us
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={() => scrollToId('contact')}>
      <Phone aria-hidden="true" size={20} /> Call us
    </button>
  )
}

interface SearchProps {
  query: string
  onQuery: (q: string) => void
  onSubmit: () => void
  id: string
  className?: string
}

export function SearchBox({ query, onQuery, onSubmit, id, className = '' }: SearchProps) {
  return (
    <form
      role="search"
      className={`search ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <label htmlFor={id} className="visually-hidden">
        Search products by name, brand or category
      </label>
      <Search aria-hidden="true" className="search__icon" size={22} />
      <input
        id={id}
        type="search"
        value={query}
        placeholder="Search products"
        onChange={(e) => onQuery(e.target.value)}
        autoComplete="off"
      />
      {query && (
        <button type="button" className="search__clear" aria-label="Clear search" onClick={() => onQuery('')}>
          <X aria-hidden="true" size={20} />
        </button>
      )}
      <button type="submit" className="search__go">
        Search
      </button>
    </form>
  )
}

export function Header({ query, onQuery, onSubmit }: Props) {
  return (
    <header className="header on-navy">
      <div className="container header__inner">
        <Link className="logo" to="/" aria-label={`${SITE.name} home`}>
          <span className="logo__name">TILE LINK</span>
          <span className="logo__sub">{SITE.tradingAs}</span>
        </Link>

        <SearchBox query={query} onQuery={onQuery} onSubmit={onSubmit} id="header-search" className="search--header" />

        <div className="header__actions">
          <CallLink className="btn btn--solid-light" />
          <Link className="btn btn--outline-light" to="/contact">
            <Mail aria-hidden="true" size={20} /> Email us
          </Link>
        </div>
      </div>
    </header>
  )
}
