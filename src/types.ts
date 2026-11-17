export interface Product {
  id: string
  /** Original line from the product list (used to match featured products). */
  line: string
  category: string
  brand: string
  /** Display name, already tidied for reading. */
  title: string
  /** Image URL, or empty when no photo exists yet. */
  image: string
  /** True for products added in admin mode (stored in this browser). */
  custom?: boolean
  /** Set for products with their own page (colours, sizes and codes): the page is /#/product/<detailId>. */
  detailId?: string
}
