// Colour swatches for the trim colour buttons. Each brand uses its own catalogue's finishes:
// - BAT: the circles from the BAT Trims Colour Range page, public/images/swatches/<CODE>.png
// - RD: a close-up of each finish from the RD Trim Finishes pages, public/images/swatches/rd/<name>.png
// A colour with no swatch in its own catalogue (infill colours, brass, stainless, PVC) shows a plain striped circle.
const BASE = import.meta.env.BASE_URL

const BAT: Record<string, string> = {
  Alabaster: 'ALA',
  'Antique Brass': 'AB',
  'Bright Gold': 'BG',
  'Bronze Ash': 'BA',
  Black: 'BK',
  'Bright Silver': 'BS',
  'Chrome Plated': 'CP',
  'Gunmetal Grey': 'GM',
  'Linished Black': 'LB',
  'Linished Copper': 'LC',
  'Linished Gold': 'LG',
  'Linished Iron': 'LI',
  'Linished Matt Gold': 'LM',
  'Linished Silver': 'LS',
  'Matt Black': 'MBK',
  'Matt Silver': 'MS',
  'Matt White': 'MW',
  'Mill Finish': 'MF',
  'Monument Matt': 'MM',
  'Pearl White': 'WH',
}

const RD = new Set([
  'Antique Copper', 'Black', 'Bright Silver', 'Brushed Bright Silver', 'Brushed Copper', 'Brushed Gunmetal', 'Brushed Matte Gold',
  'Brushed Nickel', 'Brushed Titanium', 'Gold', 'Gunmetal', 'Matte Black', 'Matte Gold', 'Matte Silver', 'Matte White',
  'Maxisil Anthracite', 'Maxisil Grey', 'Maxisil Matte Anthracite', 'Maxisil Matte Dark Grey', 'Maxisil Matte Grey',
  'Maxisil Matte Monumento', 'Maxisil Mid Grey', 'Mill Finish', 'White',
])

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Swatch image for a brand's colour, or undefined. UV-coated options use the swatch of their base colour. */
export function swatchFor(brand: string, colour: string): string | undefined {
  const name = colour.replace(/ UV$/, '')
  if (brand === 'BAT') return BAT[name] ? `${BASE}images/swatches/${BAT[name]}.png` : undefined
  if (brand === 'RD') return RD.has(name) ? `${BASE}images/swatches/rd/${slug(name)}.png` : undefined
  return undefined
}
