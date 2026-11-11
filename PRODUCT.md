# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Three confirmed audiences, all browsing a product range to decide what to ask about:
- **Tilers and installers** who need to find a specific adhesive, waterproofing membrane, primer, grout or sealant by brand and product name and then order it.
- **Builders, construction firms and interior companies** who want several products quoted together and may buy in volume.
- **General consumers / DIY** who are renovating and need to understand what a product is before contacting the business.

Not confirmed as audiences: resellers/retailers (offered as an option, not selected).

## Product Purpose
Tile Link (trading entity JSC Import Pty Ltd) is a tile and building-materials supplier in Mount Waverley, Victoria, Australia. The website is a **product catalogue, not an online shop**: it exists so visitors can browse what is stocked and then contact the business. There is no cart, checkout, online payment or published pricing, and none is planned.

Success means a visitor finds the product they need and then acts offline: emails for a quote, phones to enquire or order, or visits the store/warehouse.

## Positioning
Two confirmed strengths:
- **Many brands in one place.** Mapei, Sika, Ardex, Bostik, ATA, Durotech, Davco, Gripset, Pasco and others, across adhesives, premixed mastic glue, waterproofing, screeding, levellers, cement, grout, primers, silicone and other products.
- **Fast and friendly service**, the "F4 Philosophy" already stated on the site: "Reliable Quality, Fast & Friendly Service". The owner confirmed (2026-11-11) that the F4 promise must include **same-day fast delivery**. Only that headline is confirmed: the delivery area, order cut-off time and cost are not on hand and must not be invented. The other F4 items are not yet defined by the owner; the site currently shows Reliable quality and Friendly service as working wording.

Not confirmed as differentiators: direct-import pricing, multilingual (Korean) service.

## Operating Context
Customers are mostly tradespeople and businesses who already know what they are looking for by brand and product name, and who convert by email, phone or in-person visit rather than on the site. Products are packaged goods (bags, tubs, tubes) with sizes in the name (e.g. 20kg, 15L).

## Capabilities and Constraints
- Built with Vite, React and TypeScript, front end only (no backend or database). Pages: home (`/`), all products (`/products`, 12 per page, filters kept in the address), contact us (`/contact`, a message form) and admin (`/admin`), using hash addresses such as `/#/products` so any static host works.
- The product list lives in a JavaScript data structure (`PRODUCT_LIST`) and is rendered into a filterable grid: main category buttons (All, Tile, Adhesive, Premixed Mastic Glue, Waterproofing, Screeding, Leveller, Cement, Grout, Primer, Silicon, Others, Tools, Angles) plus a brand sub-filter.
- An admin mode (password login) lets the owner add and delete categories and products in the browser. It must keep working.
- Product photos are cut-out transparent PNGs in `images/`, mapped by name through `PRODUCT_IMAGES`; the shot convention is diagonal (three-quarter) view for bags, front view for tubs. Products without a photo show an "Image coming soon" placeholder. The Tile, Tools and Angles categories still hold placeholder/demo products.
- Pagination is wanted but not yet built (the catalogue is long); it can be done client-side in the same file.
- Known contact facts (confirmed by the owner 2026-11-11): address Unit 139-141, 45 Gilby Road, Mount Waverley VIC; email sales@tilelink.com.au (the old info@ address does not exist and must not be used); phones 0451 468 123 and 0415 782 234; opening hours Mon-Fri 6 am to 6 pm, Sat 6 am to 12 pm, Sunday closed (Melbourne time); Google Maps listing for TILE LINK. Copyright line "JSC Import Pty Ltd (Tile Link)".
- **Undecided / not provided:** social links, logo file, ABN or licensing details, language(s) of the site.

## Brand Commitments
Name is "TILE LINK" with "(JSC Import)" shown beside it in the header. The tagline wording "Reliable Quality, Fast & Friendly Service (F4 Philosophy)" is existing copy. No logo file or voice rules were stated as binding.

**Visual direction (user, 2026-11-11):** the category standard, executed with full craft: a conventional trade-supplier catalogue in the layout of TradieCart (header with search, category menu bar, hero with search, featured products, brands, category tabs, contact footer), with colours and fonts that are Tile Link's own. No decorative "world" or novelty look. The bar for craft is TradieCart (the reference the user named); Reece was suggested as a second benchmark and not yet confirmed.

**Binding colour (user, 2026-11-11):** the site's base colour stays the blue of the original page: navy `#1a365d` (header, contact band) with the brighter blue `#3182ce` for buttons and accents (hover `#2b6cb0`). Any redesign must be built on this blue family; fonts and layout may change.

## Evidence on Hand
- The full product list with brands and sizes: `products.md` and `PRODUCT_LIST` in `index.html`.
- Cut-out product photos in `images/` for every listed adhesive, cement, leveller, mastic, screed, waterproofing, grout, primer and silicone product.
- Not on hand, so future work must not invent them: prices, customer testimonials, case studies, years in business, stock levels, delivery area, cut-off time or cost, certifications.

## Product Principles
1. **A catalogue that leads to a conversation.** Every product view should make the next step (email, call, visit) obvious; never imply that buying happens on the site.
2. **Findability over display.** Visitors know brand and product names; search, brand filters and clear titles matter more than decoration.
3. **Show the real product.** Use the actual product photos and exact product names; never fabricate specs, prices or claims.
4. **Fast and friendly, in the interface too.** The service promise should be felt in how quickly a visitor reaches a person.
5. **Owner can keep the catalogue current.** Adding, removing and re-categorising products must stay simple for a non-developer.

## Accessibility & Inclusion
No product-specific requirement was established. Tradespeople often browse on phones on site, so the site should work well on small screens.
