// Things the owner will want to edit later. Everything else reads from here.

export const SITE = {
  name: 'Tile Link',
  company: 'JSC Import Pty Ltd',
  tradingAs: 'JSC Import',
  tagline: 'Reliable quality, fast & friendly service.',
}

export const CONTACT = {
  email: 'sales@tilelink.com.au',
  address: ['Unit 139-141, 45 Gilby Road', 'Mount Waverley VIC'],
  /** Shown in this order. The first number is used for the Call buttons. */
  phones: ['0451 468 123', '0415 782 234'],
  /** Opening hours live in src/data/hours.ts. */
  /** Map shown in the contact section (Google Maps embed, no key needed). */
  mapEmbedUrl: 'https://maps.google.com/maps?q=-37.8984599,145.1328375&z=17&hl=en&output=embed',
  /** The business listing on Google Maps, where Google keeps the live opening hours. */
  mapsUrl: 'https://www.google.com/maps/place/TILE+LINK/@-37.8984599,145.1302626,864m/data=!3m3!1e3!4b1!5s0x6ad66ab21ab941cf:0x5629890e846fe133!4m6!3m5!1s0x6ad66b711b7f172d:0x655ee5e376347145!8m2!3d-37.8984599!4d145.1328375!16s%2Fg%2F11h5sl9_k1',
}

export const telHref = (number: string) => `tel:${number.replace(/\s+/g, '')}`

/** Products shown first, by their original product-list line. Replace with the owner's choices later. */
export const FEATURED_LINES: string[] = [
  'ATA aus flex Multi Orange 20kg',
  'ATA aus flex COMMERCIAL 20kg',
  'ATA aus crete MPA WHITE 20kg',
  'ATA aus crete MPA GREY 20kg',
  'ATA aus crete Premium GREY 20kg',
  'ATA aus crete Premium WHITE 20kg',
  'ATA aus Mastic D1',
  'ATA aus Bond Ultra Prime ( 20L ) ORANGE lid',
]
export const FEATURED_INITIAL = 4

export const PAGE_SIZE = 12

/** Categories that exist but have no products yet. They appear automatically once they have one. */
export const PLANNED_CATEGORIES = ['Tile', 'Tools', 'Angles']

// Brands left out of the "Brands we supply" rows. Their products still show on the site.
export const HIDDEN_BRANDS = ['Eureka']

/** SHA-256 of the admin password (the password itself is not stored in the code). */
export const ADMIN_PASSWORD_SHA256 = '236d39299f701000d9eb66d51e96b92ae83de6a0d2cb18c281c145783bfdb747'

/**
 * The promise panel shown beside the hero headline.
 * Only the same-day delivery line is confirmed by the owner so far; its details (area, order cut-off time) are still to be added.
 * Edit, add or remove items here. Icons: 'delivery' | 'quality' | 'service'.
 */
export const F4 = {
  title: 'Promise',
  items: [
    {
      icon: 'delivery',
      title: 'Same-day fast delivery',
      text: 'Need it today? We deliver fast, on the same day. Call us to check delivery times.',
    },
    {
      icon: 'quality',
      title: 'Reliable quality',
      text: 'Trusted brands such as Mapei, Sika and Ardex, all in one place.',
    },
    {
      icon: 'service',
      title: 'Friendly service',
      text: 'Call, email or visit and we will help you find the right product.',
    },
  ] as { icon: 'delivery' | 'quality' | 'service'; title: string; text: string }[],
}

/**
 * The "Contact us" form.
 * With no endpoint, the form opens the visitor's own email app with the message filled in.
 * To send straight to sales@tilelink.com.au without that, sign up to a form service (for example Formspree or Web3Forms)
 * and paste its address here. Formspree: endpoint 'https://formspree.io/f/YOUR_FORM_ID'.
 * Web3Forms: endpoint 'https://api.web3forms.com/submit' and extraFields { access_key: 'YOUR_KEY' }.
 */
export const CONTACT_FORM = {
  endpoint: '',
  extraFields: {} as Record<string, string>,
}
