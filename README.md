# Tile Link website

A product catalogue for Tile Link (JSC Import). Vite + React + TypeScript, front end only: no server or database.

## Run it

Needs Node.js 20 or newer (open a new terminal after installing it).

```
npm install
npm run dev        # development server with live reload
npm run build      # production files in dist/ (upload this folder to any web host)
npm run preview    # try the built site locally
```

## Things you will edit

| What | Where |
| --- | --- |
| Phone numbers, map, email, address | `src/data/config.ts` (`CONTACT`) |
| The promise panel shown beside the headline (the same-day delivery line is confirmed; add the delivery area and cut-off time when known) | `src/data/config.ts` (`F4`) |
| The RD trim range: each trim, its colours, sizes and product codes, and its images (in `public/images/trims/`) | `src/data/trims.ts` |
| The BAT trim range, generated from products.md (`#battrim range`), with images in `public/images/trims-bat/` | `src/data/batTrims.ts` |
| Colour swatch buttons for both trim ranges (`public/images/swatches/`) | `src/data/swatches.ts` |
| Opening hours | `src/data/hours.ts` |
| Which products appear under "Featured products" | `src/data/config.ts` (`FEATURED_LINES`, must match a line in the product list exactly) |
| Products per page | `src/data/config.ts` (`PAGE_SIZE`) |
| Add, rename or remove products | `src/data/catalogData.ts` (`PRODUCT_LIST`) |
| Which photo a product uses | `src/data/catalogData.ts` (`PRODUCT_IMAGES`), photos live in `public/images/` |
| Brand logos | `src/data/brandLogos.ts`, files in `public/brands/` |
| Colours and base text size (18px) | `src/styles.css` (top of the file) |

## Pages

- `/` home: headline, promise panel, featured products, brands.
- `/products` all products: category and brand filters, search, 12 products per page. Filters are kept in the address, for example `/#/products?category=Grout&page=2`, so a link can be shared and the Back button works.
- `/contact` contact us: a message form (name, email, phone, message) and the phone numbers, hours and address.
- `/admin` admin mode.

Addresses use `#` so they work on any plain web host without server settings.

A category with no products stays hidden. Tile, Tools and Angles appear automatically once they have a product.

## Contact form

The form works in two ways:

1. **Not connected (the default).** When the visitor presses "Send message", their own email app opens with the message already written to `sales@tilelink.com.au`. They press Send there.
2. **Connected to a form service.** The message goes straight to `sales@tilelink.com.au` without opening any email app. A web site cannot send email by itself, so this needs a free form service such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com): create a form there with the delivery address `sales@tilelink.com.au`, then paste its address into `CONTACT_FORM` in `src/data/config.ts` and build again.

```ts
// Formspree
export const CONTACT_FORM = { endpoint: 'https://formspree.io/f/YOUR_FORM_ID', extraFields: {} }

// Web3Forms
export const CONTACT_FORM = { endpoint: 'https://api.web3forms.com/submit', extraFields: { access_key: 'YOUR_KEY' } }
```

Free plans have a monthly limit on messages; check the service's current terms. Visitors' names, emails and messages pass through the service you choose.

## Admin mode

Click "Admin" in the footer and log in. Products and categories added or deleted there are saved **only in that browser**; other visitors do not see them. To make a change permanent for everyone, edit `src/data/catalogData.ts` and publish again. The password is checked in the browser, so it keeps casual visitors out but is not real security.

## Notes

- `legacy/index.old.html` is the previous single-file version, kept for reference.
- Design rules are in `DESIGN.md`; product and brand facts are in `PRODUCT.md`.
