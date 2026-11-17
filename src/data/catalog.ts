import type { Product } from '../types'
import { slug, tidyName } from '../utils'
import { PLANNED_CATEGORIES } from './config'
import { PRODUCT_IMAGES, PRODUCT_LIST } from './catalogData'
import { ALL_TRIMS, TRIM_CATEGORY } from './trims'

const BASE = import.meta.env.BASE_URL

// Brands written with two words.
const MULTI_WORD_BRANDS = ['SURE LEVEL']

// Spelling fixes for the brand (first word of each line).
const BRAND_ALIASES: Record<string, string> = {
  SIKA: 'Sika', BOSTIK: 'Bostik', MAPEI: 'Mapei', MapeI: 'Mapei', ATECH: 'Atech', DUROTECH: 'Durotech',
  Laticret: 'Laticrete', DAVCO: 'Davco', ARDEX: 'Ardex', BONDED: 'Bonded', Builders: 'Australian Builders',
  SSANGKOM: 'Ssangkom', 'SURE LEVEL': 'Sure Level', ATA: 'ATA', SAS: 'SAS', RLA: 'RLA',
}

// First word is part of the product name, not the brand: the brand is set here and the whole line stays as the name.
const PRODUCT_WORD_BRANDS: Record<string, string> = {
  SikaTile: 'Sika', 'SikaTile-305': 'Sika', 'Sikafloor-14': 'Sika',
  KERAFLEX: 'Mapei', PRIMER: 'Mapei', Eco: 'Mapei', Topcem: 'Mapei', TOPCEM: 'Mapei', Duroproof: 'Durotech', GP: 'Eureka',
}

function parseLine(line: string, category: string): Product {
  let brandRaw: string
  let rest: string
  const multi = MULTI_WORD_BRANDS.find((b) => line.toUpperCase().startsWith(b + ' '))
  if (multi) {
    brandRaw = multi
    rest = line.slice(multi.length).trim()
  } else {
    const idx = line.indexOf(' ')
    brandRaw = idx === -1 ? line : line.slice(0, idx)
    rest = idx === -1 ? '' : line.slice(idx + 1).trim()
  }

  let brand: string
  let title: string
  if (PRODUCT_WORD_BRANDS[brandRaw]) {
    brand = PRODUCT_WORD_BRANDS[brandRaw]
    title = tidyName(line)
  } else {
    brand = BRAND_ALIASES[brandRaw] ?? tidyName(brandRaw)
    title = tidyName(`${brand} ${rest}`.trim())
  }

  const photo = PRODUCT_IMAGES.find((m) => line.toLowerCase().startsWith(m.match.toLowerCase()))
  return {
    id: slug(`${category}-${line}`),
    line,
    category,
    brand,
    title,
    image: photo ? `${BASE}images/${photo.file}` : '',
  }
}

/** The trim range: one card per trim, each with its own page for colours, sizes and codes. */
const TRIM_PRODUCTS: Product[] = ALL_TRIMS.map((t) => ({
  id: `trim-${t.id}`,
  line: `${t.brand} ${t.name}`,
  category: TRIM_CATEGORY,
  brand: t.brand,
  title: `${t.brand} ${t.name}`,
  image: t.images[0] ? `${BASE}images/${t.images[0].file}` : '',
  detailId: t.id,
}))

export const BASE_PRODUCTS: Product[] = [
  ...Object.entries(PRODUCT_LIST).flatMap(([category, lines]) => lines.map((line) => parseLine(line, category))),
  ...TRIM_PRODUCTS,
]

/** Categories in the order they appear on the site: the ones with products first, planned ones after. */
export function categoriesOf(products: Product[], extra: string[] = []): string[] {
  const order = [TRIM_CATEGORY, ...Object.keys(PRODUCT_LIST), ...PLANNED_CATEGORIES, ...extra]
  const seen = new Set<string>()
  const result: string[] = []
  for (const c of order) {
    if (seen.has(c)) continue
    seen.add(c)
    if (products.some((p) => p.category === c)) result.push(c)
  }
  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.add(p.category)
      result.push(p.category)
    }
  }
  return result
}

export function brandsOf(products: Product[]): { name: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1)
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function matchesQuery(p: Product, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const hay = `${p.title} ${p.brand} ${p.category}`.toLowerCase()
  return q.split(/\s+/).every((t) => hay.includes(t))
}
