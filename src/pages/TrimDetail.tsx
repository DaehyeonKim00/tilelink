import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'
import { CONTACT, telHref } from '../data/config'
import { TRIM_CATEGORY, trimById, type BrandedTrim } from '../data/trims'
import { swatchFor } from '../data/swatches'

const BASE = import.meta.env.BASE_URL

function Gallery({ trim }: { trim: BrandedTrim }) {
  const [index, setIndex] = useState(0)
  const count = trim.images.length
  if (count === 0) {
    return (
      <div className="gallery">
        <div className="gallery__stage gallery__stage--empty">
          <span>Photo coming soon</span>
        </div>
      </div>
    )
  }
  const go = (step: number) => setIndex((i) => (i + step + count) % count)
  const current = trim.images[index]

  return (
    <div
      className="gallery"
      role="group"
      aria-roledescription="image slider"
      aria-label={`${trim.name} images`}
      onKeyDown={(e) => {
        if (count < 2) return
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      <div className="gallery__stage">
        <img key={current.file} src={`${BASE}images/${current.file}`} alt={current.alt} />
        {count > 1 && (
          <>
            <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
              <ChevronLeft aria-hidden="true" size={30} />
            </button>
            <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next image">
              <ChevronRight aria-hidden="true" size={30} />
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <>
          <p className="gallery__count" aria-live="polite">
            Image {index + 1} / {count}
          </p>
          <ul className="gallery__thumbs">
            {trim.images.map((img, i) => (
              <li key={img.file}>
                <button type="button" className="gallery__thumb" aria-pressed={i === index} aria-label={`Show image ${i + 1}: ${img.alt}`} onClick={() => setIndex(i)}>
                  <img src={`${BASE}images/${img.file}`} alt="" loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function Picker({ trim }: { trim: BrandedTrim }) {
  const single = trim.colours.length === 1
  const [colourName, setColourName] = useState<string | null>(single ? trim.colours[0].name : null)
  const colour = trim.colours.find((c) => c.name === colourName) ?? null
  const [sizeName, setSizeName] = useState<string | null>(single && trim.colours[0].sizes.length === 1 ? trim.colours[0].sizes[0].size : null)
  const size = colour?.sizes.find((s) => s.size === sizeName) ?? null

  const chooseColour = (name: string) => {
    setColourName(name)
    const c = trim.colours.find((x) => x.name === name)
    // Keep the size if the new colour has it too; pick it for the visitor if there is only one.
    if (c && c.sizes.length === 1) setSizeName(c.sizes[0].size)
    else if (!c?.sizes.some((s) => s.size === sizeName)) setSizeName(null)
  }

  return (
    <div className="picker">
      <fieldset className="picker__group">
        <legend className="picker__legend">
          <span className="picker__step" aria-hidden="true">1</span> Colour
          <span className="picker__chosen">{colour ? `: ${colour.name}` : ''}</span>
        </legend>
        <div className="picker__options">
          {trim.colours.map((c) => (
            <button key={c.name} type="button" className="option option--colour" aria-pressed={c.name === colourName} onClick={() => chooseColour(c.name)}>
              {swatchFor(trim.brand, c.name) ? (
                <img className="option__swatch" src={swatchFor(trim.brand, c.name)} alt="" width="40" height="40" loading="lazy" />
              ) : (
                <span className="option__swatch option__swatch--none" aria-hidden="true" />
              )}
              {c.name}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="picker__group" disabled={!colour}>
        <legend className="picker__legend">
          <span className="picker__step" aria-hidden="true">2</span> Size
          <span className="picker__chosen">{size ? `: ${size.size}` : ''}</span>
        </legend>
        {colour ? (
          <div className="picker__options">
            {colour.sizes.map((s) => (
              <button key={s.size} type="button" className="option" aria-pressed={s.size === sizeName} onClick={() => setSizeName(s.size)}>
                {s.size}
              </button>
            ))}
          </div>
        ) : (
          <p className="picker__hint">Choose a colour to see sizes.</p>
        )}
      </fieldset>

      <div className="picker__code" aria-live="polite">
        {size && colour ? (
          <>
            <span className="picker__code-label">Product code</span>
            <span className="picker__code-value">{size.code}</span>
            <span className="picker__code-detail">
              {colour.name}, {size.size}
            </span>
          </>
        ) : (
          <span className="picker__code-empty">{colour ? 'Choose a size to see the product code.' : 'Choose a colour, then a size, to see the product code.'}</span>
        )}
      </div>

      <div className="picker__actions">
        <a className="btn btn--solid" href={telHref(CONTACT.phones[0])}>
          <Phone aria-hidden="true" size={20} /> Call us {CONTACT.phones[0]}
        </a>
        <Link
          className="btn btn--outline"
          to={`/contact?about=${encodeURIComponent(`${trim.brand} ${trim.name}${colour ? `, ${colour.name}` : ''}${size ? `, ${size.size}` : ''}${size ? ` (code ${size.code})` : ''}`)}`}
        >
          <Mail aria-hidden="true" size={20} /> Email us about this product
        </Link>
      </div>
    </div>
  )
}

export function TrimDetail() {
  const { id = '' } = useParams()
  const trim = trimById(id)

  useEffect(() => {
    if (trim) document.title = `${trim.brand} ${trim.name} - Tile Link`
  }, [trim])

  if (!trim) return <Navigate to={`/products?category=${TRIM_CATEGORY}`} replace />
  const trimList = `/products?category=${TRIM_CATEGORY}`

  return (
    <>
      <div className="page-head container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to={trimList}>{TRIM_CATEGORY}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{trim.name}</span>
        </nav>
      </div>

      <section className="section container detail" aria-labelledby="detail-title">
        {/* The key resets the gallery and the choices when moving to another product. */}
        <Gallery key={`g-${trim.id}`} trim={trim} />

        <div className="detail__info">
          <p className="detail__brand">{trim.brand}</p>
          <h1 id="detail-title" className="page-title">
            {trim.name}
          </h1>
          <p className="detail__summary">{trim.summary}</p>
          {trim.specs.length > 0 && (
            <dl className="specs">
              {trim.specs.map((s) => (
                <div key={s.label} className="specs__row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <Picker key={`p-${trim.id}`} trim={trim} />
          <Link className="detail__back" to={trimList}>
            <ChevronLeft aria-hidden="true" size={20} /> Back to all trims
          </Link>
        </div>
      </section>
    </>
  )
}
