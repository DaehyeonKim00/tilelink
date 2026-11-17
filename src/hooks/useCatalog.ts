import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Product } from '../types'
import { BASE_PRODUCTS, categoriesOf } from '../data/catalog'
import { PLANNED_CATEGORIES } from '../data/config'
import { PRODUCT_LIST } from '../data/catalogData'
import { TRIM_CATEGORY } from '../data/trims'

const KEY = 'tilelink.admin.v1'

interface Stored {
  added: Product[]
  deleted: string[]
  categories: string[]
}

const EMPTY: Stored = { added: [], deleted: [], categories: [] }

function load(): Stored {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Stored>
    return {
      added: Array.isArray(parsed.added) ? parsed.added : [],
      deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [],
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
    }
  } catch {
    return EMPTY
  }
}

/** The catalogue: the built-in product list plus whatever the owner added or removed in admin mode (kept in this browser). */
export function useCatalog() {
  const [stored, setStored] = useState<Stored>(load)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(stored))
      setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }, [stored])

  const products = useMemo(() => {
    const deleted = new Set(stored.deleted)
    return [...stored.added, ...BASE_PRODUCTS.filter((p) => !deleted.has(p.id))]
  }, [stored])

  const categories = useMemo(() => categoriesOf(products, stored.categories), [products, stored.categories])

  /** Every category the admin form may use, including empty ones. */
  const categoryOptions = useMemo(
    () => [...new Set([TRIM_CATEGORY, ...Object.keys(PRODUCT_LIST), ...PLANNED_CATEGORIES, ...stored.categories])],
    [stored.categories],
  )

  const addProduct = useCallback((p: Omit<Product, 'id' | 'line' | 'custom'>) => {
    const id = `custom-${Date.now()}`
    setStored((s) => ({ ...s, added: [{ ...p, id, line: p.title, custom: true }, ...s.added] }))
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setStored((s) =>
      id.startsWith('custom-')
        ? { ...s, added: s.added.filter((p) => p.id !== id) }
        : { ...s, deleted: [...s.deleted, id] },
    )
  }, [])

  const addCategory = useCallback(
    (name: string): boolean => {
      const clean = name.trim()
      if (!clean) return false
      if (categoryOptions.some((c) => c.toLowerCase() === clean.toLowerCase())) return false
      setStored((s) => ({ ...s, categories: [...s.categories, clean] }))
      return true
    },
    [categoryOptions],
  )

  const resetChanges = useCallback(() => setStored(EMPTY), [])

  return { products, categories, categoryOptions, addProduct, deleteProduct, addCategory, resetChanges, saveError }
}
