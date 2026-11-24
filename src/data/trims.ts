// The Roberts Design trim range: every trim with its colours, sizes and product codes.
// Copied from the supplier catalogue (Tile Trims and Edging Profiles). The code list per size is the source of truth.
// To add a size or colour, add a [colour, code] pair under that size in `sizes`.

import { BAT_TRIMS } from './batTrims'

export interface TrimSize {
  size: string
  code: string
}

export interface TrimColour {
  name: string
  sizes: TrimSize[]
}

export interface TrimImage {
  /** Path under public/images, e.g. trims/l-shape-photo.jpg */
  file: string
  alt: string
}

export interface Trim {
  /** Used in the address: /#/product/<id> */
  id: string
  name: string
  /** One plain sentence on what it is for. */
  summary: string
  specs: { label: string; value: string }[]
  images: TrimImage[]
  colours: TrimColour[]
}

type BySize = Record<string, [colour: string, code: string][]>

/** Turns the catalogue's per-size code lists into colour > sizes, keeping the catalogue's order. */
function fromSizes(sizes: BySize): TrimColour[] {
  const colours = new Map<string, TrimSize[]>()
  for (const [size, rows] of Object.entries(sizes)) {
    for (const [colour, code] of rows) {
      if (!colours.has(colour)) colours.set(colour, [])
      colours.get(colour)!.push({ size, code })
    }
  }
  return [...colours.entries()].map(([name, list]) => ({ name, sizes: list }))
}

/** One finish in several sizes. */
const oneColour = (name: string, rows: [size: string, code: string][]): TrimColour[] => [
  { name, sizes: rows.map(([size, code]) => ({ size, code })) },
]

function images(slug: string, name: string, kinds: ('photo' | 'closeup' | 'drawing')[]): TrimImage[] {
  const alts = { photo: `${name} fitted to tiles`, closeup: `${name} close-up`, drawing: `${name} profile drawing with measurements` }
  return kinds.map((k) => ({ file: `trims/${slug}-${k}.${k === 'drawing' ? 'png' : 'jpg'}`, alt: alts[k] }))
}

const ALU = 'Aluminium (grade 6063, temper T5)'
const ALL = ['photo', 'closeup', 'drawing'] as const

export const TRIMS: Trim[] = [
  {
    id: 'l-shape',
    name: 'L Shape Trim',
    summary: 'For finishing tile edges, and between tiles and other surfaces of the same height. Some colours have a UV coating option.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '80 lengths' },
    ],
    images: images('l-shape', 'L Shape Trim', [...ALL]),
    colours: fromSizes({
      '4.5mm': [['Mill Finish', 'RDTT699']],
      '6mm': [
        ['Mill Finish', 'RDTT700'], ['White', 'RDTT759W'], ['Bright Silver', 'RDTT759SLV'], ['Matte Silver', 'RDTT759MSLV'],
        ['Black', 'RDTT759B'], ['Matte Black', 'RDTT759MB'], ['Matte Black UV', 'RDTT759MB (UV)'],
      ],
      '8mm': [
        ['Mill Finish', 'RDTT701'], ['White', 'RDTT760W'], ['Matte White', 'RDTT1100MW'], ['Gold', 'RDTT760GO'], ['Matte Gold', 'RDTT760G'],
        ['Matte Gold UV', 'RDTT760G (UV)'], ['Brushed Matte Gold', 'RDTT760MGBRUSH'], ['Brushed Matte Gold UV', 'RDTT760MGBRUSH (UV)'],
        ['Brushed Copper', 'RDTT200'], ['Antique Copper', 'RDTT760ANCOPP'], ['Brushed Titanium', 'RDTT204'], ['Bright Silver', 'RDTT760SLV'],
        ['Brushed Bright Silver', 'RDTT760SBRUSH'], ['Brushed Nickel', 'RDTT760BRUSHNICK'], ['Matte Silver', 'RDTT760MSLV'],
        ['Maxisil Grey', 'RDTT1125'], ['Maxisil Mid Grey', 'RDTT1137'], ['Maxisil Matte Grey', 'RDTT1129'], ['Maxisil Anthracite', 'RDTT1113'],
        ['Maxisil Matte Anthracite', 'RDTT1117'], ['Maxisil Matte Monumento', 'RDTT1121'], ['Maxisil Matte Dark Grey', 'RDTT1133'],
        ['Gunmetal', 'RDTT760GUN'], ['Brushed Gunmetal', 'RDTT760BGUN'], ['Black', 'RDTT760B'], ['Matte Black', 'RDTT760MB'],
        ['Matte Black UV', 'RDTT760MB (UV)'],
      ],
      '9mm': [
        ['Mill Finish', 'RDTT701B'], ['White', 'RDTT764W'], ['Matte White', 'RDTT764MW'], ['Bright Silver', 'RDTT764SLV'],
        ['Brushed Bright Silver', 'RDTT764SBRUSH'], ['Black', 'RDTT764B'], ['Matte Black', 'RDTT764MB'],
      ],
      '10mm': [
        ['Mill Finish', 'RDTT702'], ['White', 'RDTT761W'], ['Matte White', 'RDTT1101MW'], ['Gold', 'RDTT761GO'], ['Matte Gold', 'RDTT761G'],
        ['Matte Gold UV', 'RDTT761G (UV)'], ['Brushed Matte Gold', 'RDTT761MGBRUSH'], ['Brushed Matte Gold UV', 'RDTT761MGBRUSH (UV)'],
        ['Brushed Copper', 'RDTT201'], ['Antique Copper', 'RDTT761ANCOPP'], ['Brushed Titanium', 'RDTT205'], ['Bright Silver', 'RDTT761SLV'],
        ['Brushed Bright Silver', 'RDTT761SBRUSH'], ['Brushed Nickel', 'RDTT761BRUSHNICK'], ['Matte Silver', 'RDTT761MSLV'],
        ['Maxisil Grey', 'RDTT1126'], ['Maxisil Mid Grey', 'RDTT1138'], ['Maxisil Matte Grey', 'RDTT1130'], ['Maxisil Anthracite', 'RDTT1114'],
        ['Maxisil Matte Anthracite', 'RDTT1118'], ['Maxisil Matte Monumento', 'RDTT1122'], ['Gunmetal', 'RDTT761GUN'],
        ['Brushed Gunmetal', 'RDTT761BGUN'], ['Black', 'RDTT761B'], ['Matte Black', 'RDTT761MB'], ['Matte Black UV', 'RDTT761MB (UV)'],
      ],
      '11mm': [
        ['Mill Finish', 'RDTT698'], ['White', 'RDTT765W'], ['Matte White', 'RDTT1102MW'], ['Gold', 'RDTT765GO'], ['Matte Gold', 'RDTT765G'],
        ['Matte Gold UV', 'RDTT765G (UV)'], ['Brushed Matte Gold', 'RDTT765MGBRUSH'], ['Brushed Matte Gold UV', 'RDTT765MGBRUSH (UV)'],
        ['Brushed Copper', 'RDTT202'], ['Antique Copper', 'RDTT765ANCOPP'], ['Brushed Titanium', 'RDTT206'], ['Bright Silver', 'RDTT765SLV'],
        ['Brushed Bright Silver', 'RDTT765SBRUSH'], ['Brushed Nickel', 'RDTT765BRUSHNICK'], ['Matte Silver', 'RDTT765MSLV'],
        ['Maxisil Grey', 'RDTT1127'], ['Maxisil Mid Grey', 'RDTT1139'], ['Maxisil Matte Grey', 'RDTT1131'], ['Maxisil Anthracite', 'RDTT1115'],
        ['Maxisil Matte Anthracite', 'RDTT1119'], ['Maxisil Matte Monumento', 'RDTT1123'], ['Maxisil Matte Dark Grey', 'RDTT1135'],
        ['Gunmetal', 'RDTT765GUN'], ['Brushed Gunmetal', 'RDTT765BGUN'], ['Black', 'RDTT765B'], ['Matte Black', 'RDTT765MB'],
        ['Matte Black UV', 'RDTT765MB (UV)'],
      ],
      '12.5mm': [
        ['Mill Finish', 'RDTT703'], ['White', 'RDTT763W'], ['Matte White', 'RDTT1103MW'], ['Gold', 'RDTT763GO'], ['Matte Gold', 'RDTT763G'],
        ['Matte Gold UV', 'RDTT763G (UV)'], ['Brushed Matte Gold', 'RDTT763MGBRUSH'], ['Brushed Matte Gold UV', 'RDTT763MGBRUSH (UV)'],
        ['Brushed Copper', 'RDTT203'], ['Antique Copper', 'RDTT763ANCOPP'], ['Brushed Titanium', 'RDTT207'], ['Bright Silver', 'RDTT763SLV'],
        ['Brushed Bright Silver', 'RDTT763SBRUSH'], ['Brushed Nickel', 'RDTT763BRUSHNICK'], ['Matte Silver', 'RDTT763MSLV'],
        ['Maxisil Grey', 'RDTT1128'], ['Maxisil Mid Grey', 'RDTT1140'], ['Maxisil Matte Grey', 'RDTT1132'], ['Maxisil Anthracite', 'RDTT1116'],
        ['Maxisil Matte Anthracite', 'RDTT1120'], ['Maxisil Matte Monumento', 'RDTT1124'], ['Maxisil Matte Dark Grey', 'RDTT1136'],
        ['Gunmetal', 'RDTT763GUN'], ['Brushed Gunmetal', 'RDTT763BGUN'], ['Black', 'RDTT763B'], ['Matte Black', 'RDTT763MB'],
        ['Matte Black UV', 'RDTT763MB (UV)'],
      ],
      '15mm': [
        ['Mill Finish', 'RDTT704'], ['White', 'RDTT762W'], ['Matte White', 'RDTT1104MW'], ['Gold', 'RDTT762GO'], ['Matte Gold', 'RDTT762G'],
        ['Matte Gold UV', 'RDTT762G (UV)'], ['Brushed Matte Gold', 'RDTT762MGBRUSH'], ['Brushed Matte Gold UV', 'RDTT762MGBRUSH (UV)'],
        ['Brushed Copper', 'RDTT208'], ['Antique Copper', 'RDTT762ANCOPP'], ['Bright Silver', 'RDTT762SLV'],
        ['Brushed Bright Silver', 'RDTT762SBRUSH'], ['Brushed Nickel', 'RDTT762BRUSHNICK'], ['Matte Silver', 'RDTT762MSLV'],
        ['Gunmetal', 'RDTT762GUN'], ['Brushed Gunmetal', 'RDTT762BGUN'], ['Black', 'RDTT762B'], ['Matte Black', 'RDTT762MB'],
        ['Matte Black UV', 'RDTT762MB (UV)'],
      ],
      '18.5mm': [['Mill Finish', 'RDTT705'], ['White', 'RDTT718'], ['Black', 'RDTT717'], ['Matte Black', 'RDTT717MB']],
      '20mm': [
        ['Mill Finish', 'RDTT1142'], ['White', 'RDTT715'], ['Matte White', 'RDTT1142MW'], ['Brushed Bright Silver', 'RDTT1142SBRUSH'],
        ['Black', 'RDTT713'], ['Matte Black', 'RDTT1142MB'],
      ],
      '22.5mm': [['Mill Finish', 'RDTT706'], ['Black', 'RDTT714']],
      '25mm': [
        ['Mill Finish', 'RDTT758'], ['White', 'RDTT1143W'], ['Matte White', 'RDTT1143MW'], ['Bright Silver', 'RDTT1143BS'],
        ['Matte Silver', 'RDTT1143MS'], ['Black', 'RDTT1143B'], ['Matte Black', 'RDTT1143MB'],
      ],
    }),
  },
  {
    id: 'brass-l-shape',
    name: 'Brass L Shape Trim',
    summary: 'Solid brass trim for finishing tile edges. Brass naturally tarnishes over time.',
    specs: [
      { label: 'Material', value: 'Brass, mill finish' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('brass-l-shape', 'Brass L Shape Trim', [...ALL]),
    colours: oneColour('Brass (Mill)', [
      ['6mm', 'RDTT1112'], ['8mm', 'RDTT1105'], ['10mm', 'RDTT1106'], ['11mm', 'RDTT1107'], ['12.5mm', 'RDTT1108'],
      ['15mm', 'RDTT1109'], ['18mm', 'RDTT1110'], ['20mm', 'RDTT1141'], ['22.5mm', 'RDTT1111'],
    ]),
  },
  {
    id: 'retro-fit',
    name: 'Retro Fit Trim',
    summary: 'Fits on top of existing tiles and other finishes to cover and protect edges and corners.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '100 lengths' },
    ],
    images: images('retro-fit', 'Retro Fit Trim', [...ALL]),
    colours: fromSizes({
      '10mm': [['Black', 'RDTT767B'], ['Bright Silver', 'RDTT767SLV'], ['White', 'RDTT767W']],
      '15mm': [['Black', 'RDTT768B'], ['Matte White', 'RDTT768MW'], ['Bright Silver', 'RDTT768SLV'], ['White', 'RDTT768W'], ['Matte Black', 'RDTT768MB']],
      '20mm': [['Black', 'RDTT769B'], ['Matte White', 'RDTT769MW'], ['Bright Silver', 'RDTT769SLV'], ['White', 'RDTT769W'], ['Matte Black', 'RDTT769MB']],
    }),
  },
  {
    id: 'stainless-l-304',
    name: 'Stainless Steel L Shape Trim 304',
    summary: 'Kitchen grade stainless steel edge trim, good for general and commercial work.',
    specs: [
      { label: 'Material', value: 'Stainless steel, grade 304, mill finish' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '50 lengths' },
    ],
    images: images('stainless-l-304', 'Stainless Steel L Shape Trim 304', [...ALL]),
    colours: oneColour('Stainless Steel (Mill)', [
      ['8mm', 'RDTT902SS304'], ['10mm', 'RDTT904SS304'], ['12mm', 'RDTT906SS304'], ['15mm', 'RDTT908SS304'], ['18mm', 'RDTT911SS304'], ['22mm', 'RDTT913SS304'],
    ]),
  },
  {
    id: 'stainless-l-316',
    name: 'Stainless Steel L Shape Trim 316',
    summary: 'Marine grade stainless steel edge trim with strong resistance to salt and chemicals, for coastal and pool areas.',
    specs: [
      { label: 'Material', value: 'Stainless steel, grade 316, mill finish' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '50 lengths' },
    ],
    images: images('stainless-l-316', 'Stainless Steel L Shape Trim 316', [...ALL]),
    colours: oneColour('Stainless Steel (Mill)', [
      ['8mm', 'RDTT903SS316'], ['10mm', 'RDTT905SS316'], ['12mm', 'RDTT907SS316'], ['15mm', 'RDTT910SS316'], ['18mm', 'RDTT912SS316'], ['22mm', 'RDTT914SS316'],
    ]),
  },
  {
    id: 'notched',
    name: 'Notched Trim',
    summary: 'A notched edge trim that bends, for protecting tile edges on curves.',
    specs: [
      { label: 'Material', value: `${ALU}, mill finish` },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('notched', 'Notched Trim', [...ALL]),
    colours: oneColour('Mill Finish', [['6mm', 'RDTT960'], ['8mm', 'RDTT961'], ['10mm', 'RDTT962'], ['11mm', 'RDTT963'], ['12mm', 'RDTT964'], ['15mm', 'RDTT965']]),
  },
  {
    id: 'diminishing',
    name: 'Diminishing Trim',
    summary: 'A sloped trim that protects the tile edge and makes a smooth step between two floor heights.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '40 lengths' },
    ],
    images: images('diminishing', 'Diminishing Trim', [...ALL]),
    colours: fromSizes({
      '10mm': [['Mill Finish', 'RDTT787'], ['Bright Silver', 'RDTT780']],
      '12mm': [['Mill Finish', 'RDTT788'], ['Bright Silver', 'RDTT781']],
      '15mm': [['Bright Silver', 'RDTT782']],
      '18mm': [['Bright Silver', 'RDTT783']],
    }),
  },
  {
    id: 'waterstop-standard',
    name: 'Waterstop Trim (Standard Shape)',
    summary: 'Waterproofing angle that also protects the tile edge. Fits above or below the tiles. Sizes are A x B x thickness.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('waterstop-standard', 'Waterstop Trim', ['photo', 'drawing']),
    colours: fromSizes({
      '10 x 30 x 1.6mm': [['Mill Finish', 'RDTT300']],
      '12 x 20 x 1.6mm': [
        ['Mill Finish', 'RDTT301'], ['Bright Silver', 'RDTT302'], ['Matte Black', 'RDTT303'], ['Matte Gold', 'RDTT304'],
        ['Brushed Nickel', 'RDTT305'], ['Brushed Gunmetal', 'RDTT306'], ['Brushed Copper', 'RDTT307'],
      ],
      '20 x 25 x 1mm': [['Mill Finish', 'RDTT707']],
      '20 x 25 x 1.6mm': [
        ['Mill Finish', 'RDTT708'], ['Bright Silver', 'RDTT308'], ['Matte Black', 'RDTT735'], ['Matte Gold', 'RDTT309'],
        ['Brushed Nickel', 'RDTT310'], ['Brushed Gunmetal', 'RDTT311'], ['Brushed Copper', 'RDTT312'],
      ],
      '20 x 25 x 3mm': [['Mill Finish', 'RDTT736'], ['Matte Black', 'RDTT737']],
      '20 x 32 x 1.6mm': [
        ['Mill Finish', 'RDTT730'], ['Bright Silver', 'RDTT721'], ['Matte Black', 'RDTT732'], ['Matte Gold', 'RDTT731'],
        ['Brushed Nickel', 'RDTT313'], ['Brushed Gunmetal', 'RDTT314'], ['Brushed Copper', 'RDTT315'],
      ],
      '20 x 32 x 3mm': [['Mill Finish', 'RDTT733'], ['Matte Black', 'RDTT734']],
      '20 x 40 x 1.6mm': [['Mill Finish', 'RDTT722'], ['Matte Black', 'RDTT723']],
      '20 x 40 x 3mm': [['Mill Finish', 'RDTT719'], ['Matte Black', 'RDTT724']],
      '25 x 25 x 1.6mm': [['Mill Finish', 'RDTT712']],
      '40 x 50 x 1.6mm': [
        ['Mill Finish', 'RDTT725'], ['Bright Silver', 'RDTT720'], ['Matte Black', 'RDTT727'], ['Matte Gold', 'RDTT726'],
        ['White PVC', 'RDTT475W'], ['Brushed Nickel', 'RDTT316'], ['Brushed Gunmetal', 'RDTT317'], ['Brushed Copper', 'RDTT318'],
      ],
      '40 x 50 x 3mm': [['Mill Finish', 'RDTT728'], ['Matte Black', 'RDTT729']],
      '50 x 70 x 1.6mm': [['White PVC', 'RDTT476W']],
    }),
  },
  {
    id: 'waterstop-l-shape',
    name: 'Waterstop Trim (L Shape)',
    summary: 'L shaped waterstop for door edges. Sizes are A x B x thickness.',
    specs: [
      { label: 'Material', value: `${ALU}, mill finish` },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '80 lengths' },
    ],
    images: images('waterstop-l-shape', 'Waterstop Trim L Shape', ['photo', 'drawing']),
    colours: oneColour('Mill Finish', [
      ['8 x 21 x 1mm', 'RDTT741'], ['10 x 21 x 1mm', 'RDTT742'], ['11 x 21 x 1mm', 'RDTT743'], ['12 x 21 x 1mm', 'RDTT744'], ['15 x 21 x 1mm', 'RDTT745'],
    ]),
  },
  {
    id: 'expansion-6mm',
    name: 'Expansion Trim (6mm Wide Joint)',
    summary: 'Movement joint for tiled floors, with a 6mm wide silicone infill. Use near stairs, columns, doorways and changes in direction. The colour is the infill colour.',
    specs: [
      { label: 'Material', value: `${ALU}, mill finish, natural stone silicone infill` },
      { label: 'Movement', value: '25%' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('expansion-6mm', 'Expansion Trim', [...ALL]),
    colours: fromSizes({
      '8mm': [['Grey infill', 'RDTT820GR'], ['Black infill', 'RDTT821B']],
      '10mm': [['Grey infill', 'RDTT822GR'], ['Black infill', 'RDTT823B']],
      '11mm': [['Grey infill', 'RDTT897GR'], ['Black infill', 'RDTT898B']],
      '12.5mm': [['Grey infill', 'RDTT824GR'], ['Black infill', 'RDTT825B']],
      '15mm': [['Grey infill', 'RDTT826GR'], ['Black infill', 'RDTT827B']],
      '18mm': [['Grey infill', 'RDTT828GR'], ['Black infill', 'RDTT829B']],
      '22.5mm': [['Grey infill', 'RDTT830GR'], ['Black infill', 'RDTT831B']],
    }),
  },
  {
    id: 'expansion-10mm',
    name: 'Expansion Trim (10mm Wide Joint)',
    summary: 'Movement joint for tiled floors, with a 10mm wide silicone infill. Use near stairs, columns, doorways and changes in direction. The colour is the infill colour.',
    specs: [
      { label: 'Material', value: `${ALU}, mill finish, natural stone silicone infill` },
      { label: 'Movement', value: '25%' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('expansion-10mm', 'Expansion Trim', [...ALL]),
    colours: fromSizes({
      '8mm': [['Grey infill', 'RDTT832GR'], ['Black infill', 'RDTT833B']],
      '10mm': [['Grey infill', 'RDTT834GR'], ['Black infill', 'RDTT835B']],
      '11mm': [['Grey infill', 'RDTT899GR'], ['Black infill', 'RDTT900B']],
      '12.5mm': [['Grey infill', 'RDTT836GR'], ['Black infill', 'RDTT837B']],
      '15mm': [['Grey infill', 'RDTT838GR'], ['Black infill', 'RDTT839B']],
      '18mm': [['Grey infill', 'RDTT840GR'], ['Black infill', 'RDTT841B']],
      '22.5mm': [['Grey infill', 'RDTT842GR'], ['Black infill', 'RDTT843B']],
    }),
  },
  {
    id: 'round-edge',
    name: 'Round Edge Trim',
    summary: 'A classic rounded edge with a subtle curve that protects the tile edge.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('round-edge', 'Round Edge Trim', [...ALL]),
    colours: fromSizes({
      '8mm': [['Bright Silver', 'RDTT602SLV'], ['Matte Silver', 'RDTT621MSLV']],
      '10mm': [['Bright Silver', 'RDTT603SLV'], ['Matte Silver', 'RDTT622MSLV']],
      '12mm': [['Bright Silver', 'RDTT604SLV'], ['Matte Silver', 'RDTT623MSLV']],
    }),
  },
  {
    id: 'pvc',
    name: 'PVC Trim',
    summary: 'An economical white plastic edge that protects and finishes the tile edge.',
    specs: [
      { label: 'Material', value: 'PVC' },
      { label: 'Length', value: '2.5m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('pvc', 'PVC Trim', [...ALL]),
    colours: oneColour('White', [['8mm', 'RDTT415W'], ['10mm', 'RDTT425W'], ['12mm', 'RDTT420W']]),
  },
  {
    id: 'square-edge',
    name: 'Square Edge Trim',
    summary: 'A modern square edge for external corners, or set between tiles as a feature line.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '40 lengths' },
    ],
    images: images('square-edge', 'Square Edge Trim', ['photo', 'drawing']),
    colours: fromSizes({
      '6mm': [['Bright Silver', 'RDTT610SLV'], ['Matte Silver', 'RDTT615MSLV']],
      '8mm': [
        ['Bright Silver', 'RDTT611SLV'], ['Brushed Bright Silver', 'RDTT611SBRUSH'], ['Matte Silver', 'RDTT616MSLV'], ['Black', 'RDTT629B'],
        ['Matte Black', 'RDTT629MB'], ['White', 'RDTT607W'], ['Matte White', 'RDTT632MW'],
      ],
      '10mm': [
        ['Bright Silver', 'RDTT612SLV'], ['Brushed Bright Silver', 'RDTT612SBRUSH'], ['Matte Silver', 'RDTT617MSLV'], ['Black', 'RDTT630B'],
        ['Matte Black', 'RDTT630MB'], ['White', 'RDTT608W'], ['Matte White', 'RDTT633MW'],
      ],
      '12mm': [
        ['Bright Silver', 'RDTT613SLV'], ['Brushed Bright Silver', 'RDTT613SBRUSH'], ['Matte Silver', 'RDTT618MSLV'], ['Black', 'RDTT631B'],
        ['Matte Black', 'RDTT631MB'], ['White', 'RDTT609W'], ['Matte White', 'RDTT634MW'],
      ],
    }),
  },
  {
    id: 'square-edge-corners',
    name: 'Square Edge Corners',
    summary: 'Matching corner pieces for the Square Edge Trim. Sold in packs of 2.',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Pack', value: '2 corners' },
    ],
    images: images('square-edge-corners', 'Square Edge Corners', ['photo']),
    colours: fromSizes({
      '6mm': [['Bright Silver', 'RDTT60A']],
      '8mm': [
        ['Bright Silver', 'RDTT60B'], ['Brushed Bright Silver', 'RDTT65A'], ['Matte Silver', 'RDTT61A'], ['Matte Black', 'RDTT62A'],
        ['Black', 'RDTT63A'], ['Matte White', 'RDTT66A'], ['White', 'RDTT64A'],
      ],
      '10mm': [
        ['Bright Silver', 'RDTT60C'], ['Brushed Bright Silver', 'RDTT65b'], ['Matte Silver', 'RDTT61B'], ['Matte Black', 'RDTT62B'],
        ['Black', 'RDTT63B'], ['Matte White', 'RDTT66B'], ['White', 'RDTT64B'],
      ],
      '12mm': [
        ['Bright Silver', 'RDTT60D'], ['Brushed Bright Silver', 'RDTT65c'], ['Matte Silver', 'RDTT61C'], ['Matte Black', 'RDTT62C'],
        ['Black', 'RDTT63C'], ['Matte White', 'RDTT66C'], ['White', 'RDTT64C'],
      ],
    }),
  },
  {
    id: 'stainless-squedge-304',
    name: 'Stainless Steel Squedge 304',
    summary: 'A solid stainless steel square edge, for protecting tile edges and as a decorative feature.',
    specs: [
      { label: 'Material', value: 'Stainless steel, grade 304, mill finish' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '50 lengths' },
    ],
    images: images('stainless-squedge-304', 'Stainless Steel Squedge', [...ALL]),
    colours: oneColour('Stainless Steel (Mill)', [['8mm', 'RDTT915SS304'], ['10mm', 'RDTT917SS304'], ['12mm', 'RDTT919SS304']]),
  },
  {
    id: 't-shape',
    name: 'T Shape Trim',
    summary: 'A T shaped trim that protects tile edges. Sizes are A x B.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '40 lengths' },
    ],
    images: images('t-shape', 'T Shape Trim', [...ALL]),
    colours: fromSizes({
      '10 x 12mm': [['Mill Finish', 'RDTT796'], ['Matte Silver', 'RDTT797']],
      '10 x 30mm': [['Mill Finish', 'RDTT798'], ['Matte Silver', 'RDTT799']],
      '12 x 15mm': [['Mill Finish', 'RDTT784'], ['Matte Silver', 'RDTT795']],
      '12 x 30mm': [['Mill Finish', 'RDTT882'], ['Matte Silver', 'RDTT883']],
    }),
  },
  {
    id: 'stair-4-inserts',
    name: 'Aluminium Stair Trim (4 Carborundum Inserts)',
    summary: 'Heavy duty stair nosing with 4 deep black carborundum anti-slip inserts, for heavy commercial use indoors and out. Slip rating P5 (AS4586:2013).',
    specs: [
      { label: 'Material', value: 'Aluminium and carborundum, mill finish' },
      { label: 'Width', value: '75mm' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('stair-4-inserts', 'Aluminium Stair Trim with 4 inserts', [...ALL]),
    colours: oneColour('Mill Finish', [['75mm wide', 'RDTT925']]),
  },
  {
    id: 'stair-grooves',
    name: 'Aluminium Stair Trim (Grooved)',
    summary: 'Stair nosing with a grooved top, for homes and light commercial use indoors and out (AS1428.1:2021).',
    specs: [
      { label: 'Material', value: 'Aluminium, anodised' },
      { label: 'Width', value: '50mm' },
      { label: 'Length', value: '2.5m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '50 lengths' },
    ],
    images: images('stair-grooves', 'Grooved Aluminium Stair Trim', [...ALL]),
    colours: oneColour('Anodised', [['50mm wide', 'RDTT926']]),
  },
  {
    id: 'stair-1-insert',
    name: 'Aluminium Stair Trim (1 Carborundum Insert)',
    summary: 'Stair nosing with one large black carborundum anti-slip strip, for homes and light commercial use indoors and out (AS1428.1:2021).',
    specs: [
      { label: 'Material', value: 'Aluminium and carborundum, anodised' },
      { label: 'Width', value: '58.5mm' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('stair-1-insert', 'Aluminium Stair Trim with 1 insert', [...ALL]),
    colours: oneColour('Anodised', [['58.5mm wide', 'RDTT927']]),
  },
  {
    id: 'ramp',
    name: 'Ramp Trim',
    summary: 'Protects the tile edge and makes a smooth ramp between two surfaces.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('ramp', 'Ramp Trim', ['photo', 'drawing']),
    colours: fromSizes({
      '8mm': [['Mill Finish', 'RDTT789'], ['Matte Silver', 'RDTT792MSLV']],
      '10mm': [['Mill Finish', 'RDTT790'], ['Matte Silver', 'RDTT793MSLV']],
      '12mm': [['Mill Finish', 'RDTT791'], ['Matte Silver', 'RDTT794MSLV']],
    }),
  },
  {
    id: 'balcony',
    name: 'Balcony Trim',
    summary: 'Edge trim that turns water away from balcony faces, with weep holes for extra drainage.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('balcony', 'Balcony Trim', [...ALL]),
    colours: fromSizes({
      '8mm': [['Mill Finish', 'RDTT770'], ['Matte Silver', 'RDTT774']],
      '10mm': [['Mill Finish', 'RDTT771'], ['Matte Silver', 'RDTT775']],
      '12mm': [['Mill Finish', 'RDTT772'], ['Matte Silver', 'RDTT776']],
      '15mm': [['Mill Finish', 'RDTT773'], ['Matte Silver', 'RDTT777']],
    }),
  },
  {
    id: 'internal-balcony-corner',
    name: 'Internal Balcony Corner',
    summary: 'Internal corner piece to match the Balcony Trim. Sold one at a time.',
    specs: [{ label: 'Material', value: 'Aluminium' }],
    images: images('internal-balcony-corner', 'Internal Balcony Corner', ['photo']),
    colours: fromSizes({
      '8mm': [['Mill Finish', 'RDTT808'], ['Matte Silver', 'RDTT884']],
      '10mm': [['Mill Finish', 'RDTT809'], ['Matte Silver', 'RDTT886']],
      '12mm': [['Mill Finish', 'RDTT810'], ['Matte Silver', 'RDTT888']],
      '15mm': [['Mill Finish', 'RDTT811'], ['Matte Silver', 'RDTT890']],
    }),
  },
  {
    id: 'external-balcony-corner',
    name: 'External Balcony Corner',
    summary: 'External corner piece to match the Balcony Trim. Sold one at a time.',
    specs: [{ label: 'Material', value: 'Aluminium' }],
    images: images('external-balcony-corner', 'External Balcony Corner', ['photo']),
    colours: fromSizes({
      '8mm': [['Mill Finish', 'RDTT812'], ['Matte Silver', 'RDTT885']],
      '10mm': [['Mill Finish', 'RDTT813'], ['Matte Silver', 'RDTT887']],
      '12mm': [['Mill Finish', 'RDTT814'], ['Matte Silver', 'RDTT889']],
      '15mm': [['Mill Finish', 'RDTT815'], ['Matte Silver', 'RDTT892']],
    }),
  },
  {
    id: 'trim-joiner',
    name: 'Trim Joiner',
    summary: 'Joins two lengths of Balcony Trim. One size fits all trim sizes. Sold in packs of 5.',
    specs: [{ label: 'Pack', value: '5 joiners' }],
    images: [],
    colours: oneColour('Standard', [['30 x 5 x 3mm', 'RDTT816']]),
  },
  {
    id: 'cove',
    name: 'Cove Trim',
    summary: 'Makes a rounded joint (25.4mm radius) between wall and floor tiles, so the corner is easy to clean. Meets Australian hygiene standards for commercial kitchens. Sizes are A x B.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('cove', 'Cove Trim', [...ALL]),
    colours: fromSizes({
      '8 x 10mm': [['Mill Finish', 'RDTT844'], ['Matte Silver', 'RDTT845MSLV'], ['Bright Silver', 'RDTT846BSLV']],
      '10 x 10mm': [['Mill Finish', 'RDTT847'], ['Matte Silver', 'RDTT848MSLV'], ['Bright Silver', 'RDTT849BSLV']],
      '12.5 x 8mm': [['Mill Finish', 'RDTT850'], ['Matte Silver', 'RDTT851MSLV'], ['Bright Silver', 'RDTT852BSLV']],
      '12.5 x 10mm': [['Mill Finish', 'RDTT853'], ['Matte Silver', 'RDTT854MSLV'], ['Bright Silver', 'RDTT855BSLV']],
    }),
  },
  {
    id: 'internal-cove-corner',
    name: 'Internal Cove Corner',
    summary: '90° internal corner piece to match the Cove Trim. Sold one at a time. Sizes are A x B.',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Use', value: 'Interior and exterior' },
    ],
    images: images('internal-cove-corner', 'Internal Cove Corner', ['photo']),
    colours: fromSizes({
      '8 x 10mm': [['Mill Finish', 'RDTT856'], ['Matte Silver', 'RDTT857MSLV'], ['Bright Silver', 'RDTT858BSLV']],
      '10 x 10mm': [['Mill Finish', 'RDTT862'], ['Matte Silver', 'RDTT863MSLV'], ['Bright Silver', 'RDTT864BSLV']],
      '12 x 8mm': [['Mill Finish', 'RDTT868'], ['Matte Silver', 'RDTT869MSLV'], ['Bright Silver', 'RDTT870BSLV']],
      '12 x 10mm': [['Mill Finish', 'RDTT874'], ['Matte Silver', 'RDTT875MSLV'], ['Bright Silver', 'RDTT876BSLV']],
    }),
  },
  {
    id: 'external-cove-corner',
    name: 'External Cove Corner',
    summary: '90° external corner piece to match the Cove Trim. Sold one at a time. Sizes are A x B.',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Use', value: 'Interior and exterior' },
    ],
    images: images('external-cove-corner', 'External Cove Corner', ['photo']),
    colours: fromSizes({
      '8 x 10mm': [['Mill Finish', 'RDTT859'], ['Matte Silver', 'RDTT860MSLV'], ['Bright Silver', 'RDTT861BSLV']],
      '10 x 10mm': [['Mill Finish', 'RDTT865'], ['Matte Silver', 'RDTT866MSLV'], ['Bright Silver', 'RDTT867BSLV']],
      '12 x 8mm': [['Mill Finish', 'RDTT871'], ['Matte Silver', 'RDTT872MSLV'], ['Bright Silver', 'RDTT873BSLV']],
      '12 x 10mm': [['Mill Finish', 'RDTT877'], ['Matte Silver', 'RDTT878MSLV'], ['Bright Silver', 'RDTT879BSLV']],
    }),
  },
  {
    id: 'retro-cove',
    name: 'Retro Cove Trim',
    summary: 'A cove (60mm radius) that fits over existing surfaces. Meets Australian hygiene standards for commercial kitchens.',
    specs: [
      { label: 'Material', value: ALU },
      { label: 'Size', value: '70 x 21 x 50mm (A x B x C)' },
      { label: 'Length', value: '3m' },
      { label: 'Use', value: 'Interior and exterior' },
      { label: 'Carton', value: '20 lengths' },
    ],
    images: images('retro-cove', 'Retro Cove Trim', [...ALL]),
    colours: fromSizes({ 'One size': [['Mill Finish', 'RDTT880'], ['Matte Silver', 'RDTT881']] }),
  },
  {
    id: 'internal-retro-cove-corner',
    name: 'Internal Retro Cove Corner',
    summary: '90° internal corner piece to match the Retro Cove Trim. Sold one at a time.',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Use', value: 'Interior and exterior' },
    ],
    images: images('internal-retro-cove-corner', 'Internal Retro Cove Corner', ['photo']),
    colours: fromSizes({ 'One size': [['Mill Finish', 'RDTT894'], ['Matte Silver', 'RDTT895']] }),
  },
  {
    id: 'external-retro-cove-corner',
    name: 'External Retro Cove Corner',
    summary: '90° external corner piece to match the Retro Cove Trim. Sold one at a time.',
    specs: [
      { label: 'Material', value: 'Aluminium' },
      { label: 'Use', value: 'Interior and exterior' },
    ],
    images: images('external-retro-cove-corner', 'External Retro Cove Corner', ['photo']),
    colours: fromSizes({ 'One size': [['Mill Finish', 'RDTT891'], ['Matte Silver', 'RDTT893']] }),
  },
  {
    id: 'retro-cove-joiner',
    name: 'Retro Cove Joiner',
    summary: 'Joins two lengths of Retro Cove Trim. Sold one at a time.',
    specs: [],
    images: [],
    colours: oneColour('Standard', [['40 x 11 x 7mm', 'RDTT896']]),
  },
]

export const TRIM_CATEGORY = 'Trim'

/** A trim with the brand it is sold under. */
export interface BrandedTrim extends Trim {
  brand: string
}

/** Every trim on the site: the Roberts Design range first, then the BAT range (src/data/batTrims.ts). */
export const ALL_TRIMS: BrandedTrim[] = [
  ...TRIMS.map((t) => ({ ...t, brand: 'Roberts Design' })),
  ...BAT_TRIMS.map((t) => ({ ...t, brand: 'BAT' })),
]

export const trimById = (id: string) => ALL_TRIMS.find((t) => t.id === id)
