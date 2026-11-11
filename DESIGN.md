---
name: Tile Link
description: A calm, readable trade catalogue in the original navy and blue.
colors:
  navy: "#1a365d"
  navy-deep: "#10243f"
  blue: "#3182ce"
  blue-strong: "#2b6cb0"
  blue-dark: "#2c5282"
  ink: "#2d3748"
  muted: "#4a5568"
  line: "#cbd5e0"
  control-line: "#718096"
  paper: "#f7fafc"
  tint: "#edf2f7"
  white: "#ffffff"
  danger: "#c53030"
  danger-deep: "#9b2c2c"
  mist: "#e2e8f0"
  ok: "#276749"
typography:
  display:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw + 1rem, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0em"
  logo:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.06em"
  lead:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.6
  subtitle:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
  headline:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.4vw + 1.2rem, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Absans, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "4px"
  inner: "6px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  section: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.blue-strong}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.25rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1.25rem"
    height: "3rem"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1.1rem"
    height: "3rem"
  chip-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1rem 1.1rem"
  input-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "3rem"
---

# Design System: Tile Link

## Overview

**Creative North Star: "The Trade Counter"**

Tile Link's site works like a well-run trade counter: everything is labelled clearly, the product is in front of you, and a person is always one step away. It is a catalogue, not a shop. There is no cart, no price and no promotion, so nothing competes with finding a product and reaching the business.

The look is the original navy and blue of the earlier site on white, with a faint blue construction grid as the page ground, like tile joints. The grid is only ground: every piece of text sits on a solid white or navy surface. Type is large and highly legible because many visitors are older, and every control is a standard, easy-to-hit shape. It deliberately avoids novelty: no gradients, no decorative illustration, no shop-style badges.

**Key Characteristics:**
- Navy header and contact band, white working surfaces, blue only for actions and state.
- Large type (18px base) set in one legibility-first face.
- Solid surfaces with 1px slate borders; depth is a soft shadow only on hover.
- Contact (call, email, visit) is present in the header, the hero, a fixed button and the footer.

## Colors

A navy and blue family with slate neutrals; there is no second hue.

### Primary
- **Counter Navy** (#1a365d): header, contact band, headings, selected chips and the page's strongest text. Contrast on white is 11:1.
- **Action Blue** (#2b6cb0): buttons, links and the active category marker. White text on it is 5.3:1.
- **Pressed Blue** (#2c5282): hover for Action Blue.

### Secondary
- **Joint Blue** (#3182ce): decorative only: grid lines (at 17% opacity) and the scrollbar. Too light for small text.

### Neutral
- **Slate Ink** (#2d3748): body text.
- **Quiet Slate** (#4a5568): secondary text and placeholders, never lighter (7:1 on white).
- **Hairline** (#cbd5e0): card and panel borders.
- **Control Edge** (#718096): borders of inputs and buttons, so controls are clearly visible.
- **Paper** (#f7fafc) and **Tint** (#edf2f7): product photo boxes, hover fills, tag backgrounds.
- **Deep Navy** (#10243f): footer.
- **Mist** (#e2e8f0): light text and thin lines on navy.

### Named Rules
**The Blue Family Rule.** The brand colour is the original navy and blue. New colours are not introduced; status colours (#c53030 danger with #9b2c2c pressed, #276749 success) appear only on admin messages.

**The Readable Blue Rule.** Joint Blue (#3182ce) never carries small text. Text and button fills use Action Blue or darker.

## Typography

**Display, Body and Label Font:** Absans (self-hosted from public/fonts, SIL Open Font License, with Segoe UI and system-ui fallbacks)

**Character:** Absans is a clean sans-serif from Collletttivo with a single Regular weight; bold text is the browser's synthesised bold. One family keeps the page calm.

### Hierarchy
- **Display** (700, clamp(2rem, 3.4vw + 1rem, 3.4rem), 1.1): the hero headline only.
- **Headline** (700, clamp(1.6rem, 1.4vw + 1.2rem, 2.1rem), 1.2): section titles.
- **Logo** (700, 1.75rem, 0.06em tracking): the TILE LINK wordmark.
- **Lead** (400, 1.35rem, 1.6): the one line under the hero headline.
- **Subtitle** (700, 1.2rem, 1.3): panel titles, contact details, brand names, the Call button.
- **Title** (700, 1.15rem, 1.35): product names.
- **Body** (400, 1rem = 18px, 1.6): all running text; measure stays under 65ch.
- **Label** (400, 0.9rem): tags and counts. Nothing is set smaller than this.

### Named Rules
**The Readability Rule.** Nothing below 0.9rem (16px), no all-caps strings beyond the logo, no light weights. The base size is 18px and the layout must hold when a visitor raises the text size in their own browser.

## Layout

A single column page with a 78rem container and side gutters of 1rem to 2.5rem. Sections are separated by 2 to 3.5rem. The hero is two columns (intro with search, F4 panel) that stack below 62rem. The site has three pages: home, all products (title, breadcrumb, filters, 12 products per page, pagination) and admin. Product grids use auto-fill columns of at least 15rem. The header is sticky on wide screens only, so phones keep their screen for products. A Call button is fixed at bottom right at every width.

The page ground is a two-axis grid of 80px cells drawn in Joint Blue at 17% opacity.

## Elevation & Depth

Flat by default. Surfaces are separated by 1px Hairline borders. Depth appears as a response: hover on a product or brand card adds `0 6px 18px rgba(26, 54, 93, 0.14)` and a blue border; the header and fixed Call button carry a soft shadow so they read above the page.

### Named Rules
**The Solid Surface Rule.** Text never sits directly on the grid ground; it sits on white, navy or a bordered panel. The grid is ground, not content.

## Shapes

Plain rectangles with an 8px radius for cards, panels, inputs and buttons; 4px for small focus shapes and placeholders; 6px for the inside of the attached search button; pills (999px) only for filter chips and the Call button. No decorative clipping, no thick one-sided accent borders.

## Components

### Buttons
- **Shape:** 8px radius, 48px minimum height.
- **Primary:** Action Blue fill, white bold text, padding 0.6rem 1.25rem; hover Pressed Blue.
- **Outline:** white fill, Counter Navy text and 2px border; hover fills navy.
- **On navy:** white fill with navy text (primary) or white outline (secondary).

### Chips
- **Style:** pill, white fill, 2px Control Edge border, navy bold text.
- **State:** selected is solid navy with white text (aria-pressed).

### Cards
- **Corner Style:** 8px.
- **Background:** white with a Paper photo box (square) holding the cut-out product photo.
- **Content:** product name, then brand and category tags below it. No buttons, no prices.

### Inputs / Search
- **Style:** white, 2px Control Edge border, 8px radius, 48px minimum height; the search button is attached on the right.
- **Focus:** navy border plus a 3px navy outline with a white halo (white outline on navy surfaces).

### Navigation
- **Category bar:** horizontally scrollable text tabs, 48px tall, navy bold; the current category has a Paper fill and a 3px Action Blue inset line.
- **Pagination:** Previous / numbered pages / Next at 48px; the current page is solid navy.

### F4 Panel (signature)
One bordered panel in the hero's second column listing the promise items as rows with a line icon, a bold title and one sentence. The same-day fast delivery row comes first on a Paper band. Contact details (address, email, phones, opening hours with an open-now status, Google map) live in the navy contact band at the bottom of every page.

## Do's and Don'ts

### Do:
- **Do** keep the navy (#1a365d) and blue (#2b6cb0) family as the only brand colours.
- **Do** keep body text at 18px or larger and contrast at 4.5:1 or better; check the layout with the browser's text size raised.
- **Do** place every block of text on a white, navy or bordered surface, never directly on the grid.
- **Do** make every tappable control at least 48px tall with a visible border or fill.
- **Do** keep contact details in the footer band and the Call button; show any missing detail as a clear placeholder rather than hiding it.

### Don't:
- **Don't** add a cart, prices, "add to" buttons, login for customers or promotions: this is a catalogue, not a shop. Delivery is stated only as the owner has confirmed (same-day fast delivery); no area, cut-off time or cost is shown until the owner provides it.
- **Don't** use gradients, glass, emoji as icons, or small caps labels above headings.
- **Don't** use Joint Blue (#3182ce) for small text.
- **Don't** invent popularity, reviews or stock claims; "Featured" is the owner's choice only.
