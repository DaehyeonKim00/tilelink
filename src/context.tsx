import { createContext, useContext, useState, type ReactNode } from 'react'
import { useCatalog } from './hooks/useCatalog'

type Catalog = ReturnType<typeof useCatalog>

interface AppState {
  catalog: Catalog
  /** True while the owner is logged in to admin mode (lasts until the page is closed). */
  adminIn: boolean
  setAdminIn: (v: boolean) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const catalog = useCatalog()
  const [adminIn, setAdminIn] = useState(false)
  return <Ctx.Provider value={{ catalog, adminIn, setAdminIn }}>{children}</Ctx.Provider>
}

export function useApp(): AppState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp must be used inside AppProvider')
  return v
}

/** What the layout shares with each page: the shared search box. */
export interface SearchState {
  query: string
  setQuery: (q: string) => void
  submitSearch: () => void
}
