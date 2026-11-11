// Brand logos found on the web and saved in public/brands, shown only to identify the brands we supply.
// Each logo belongs to its brand owner. A brand without a logo is shown as its name.
const BASE = import.meta.env.BASE_URL

const FILES: Record<string, string> = {
  Mapei: 'mapei.svg',
  Ardex: 'ardex.svg',
  Sika: 'sika.svg',
  Bostik: 'bostik.svg',
  Laticrete: 'laticrete.svg',
  'Sure Level': 'sure-level.png',
  ATA: 'ata.png',
  Maxisil: 'maxisil.png',
  Davco: 'davco.png',
  Ssangkom: 'ssangkom.png',
  Durotech: 'durotech.png',
  Pasco: 'pasco.png',
  RLA: 'rla.png',
  Gripset: 'gripset.png',
  Bonded: 'bonded.svg',
  SAS: 'sas.png',
  Atech: 'atech.png',
  'Australian Builders': 'australian-builders.png',
}

export function logoFor(brand: string): string | undefined {
  const file = FILES[brand]
  return file ? `${BASE}brands/${file}` : undefined
}
