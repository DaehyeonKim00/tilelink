import { useState, type FormEvent } from 'react'
import { ADMIN_PASSWORD_SHA256 } from '../data/config'
import type { Product } from '../types'
import { sha256 } from '../utils'

interface Props {
  loggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  categoryOptions: string[]
  brands: string[]
  saveError: boolean
  onAddProduct: (p: Omit<Product, 'id' | 'line' | 'custom'>) => void
  onAddCategory: (name: string) => boolean
  onReset: () => void
}

/** Shrinks an uploaded photo so it fits in browser storage. */
function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the photo.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file is not a picture.'))
      img.onload = () => {
        const max = 700
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Could not process the photo.'))
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/png'))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export function Admin(props: Props) {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const [category, setCategory] = useState(props.categoryOptions[0] ?? '')
  const [brand, setBrand] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [newCategory, setNewCategory] = useState('')

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (sha256(password.trim()) === ADMIN_PASSWORD_SHA256) {
      props.onLogin()
      setMessage(null)
    } else {
      setMessage({ kind: 'error', text: 'That password is not correct. Please try again.' })
    }
    setPassword('')
  }

  const addProduct = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const image = file ? await readPhoto(file) : ''
      props.onAddProduct({ category, brand: brand.trim() || 'Other', title: title.trim(), image })
      setTitle('')
      setBrand('')
      setFile(null)
      ;(e.target as HTMLFormElement).reset()
      setMessage({ kind: 'ok', text: 'Product added. It is saved in this browser.' })
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof Error ? err.message : 'Could not add the product.' })
    }
  }

  const addCategory = (e: FormEvent) => {
    e.preventDefault()
    if (props.onAddCategory(newCategory)) {
      setMessage({ kind: 'ok', text: `Category "${newCategory.trim()}" added. It appears on the site once it has a product.` })
      setNewCategory('')
    } else {
      setMessage({ kind: 'error', text: 'That category already exists, or the name is empty.' })
    }
  }

  if (!props.loggedIn) {
    return (
      <section id="admin" className="section container admin" aria-labelledby="admin-title">
        <form className="panel admin__panel" onSubmit={login}>
          <h2 id="admin-title" className="panel__title">
            Admin login
          </h2>
          <label className="field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          </label>
          <button type="submit" className="btn btn--solid">
            Log in
          </button>
          {message && (
            <p className={`notice notice--${message.kind}`} role="alert">
              {message.text}
            </p>
          )}
        </form>
      </section>
    )
  }

  return (
    <section id="admin" className="section container admin" aria-labelledby="admin-title">
      <div className="admin__head">
        <h2 id="admin-title" className="section__title">
          Manage products
        </h2>
        <button type="button" className="btn btn--outline" onClick={props.onLogout}>
          Log out
        </button>
      </div>
      <p className="admin__note">
        Changes made here are saved only in this browser. To make a change permanent for every visitor, ask your web developer to update the product list.
      </p>
      {props.saveError && (
        <p className="notice notice--error" role="alert">
          This browser could not save your changes (storage is full or blocked). Try a smaller photo.
        </p>
      )}
      {message && (
        <p className={`notice notice--${message.kind}`} role="status">
          {message.text}
        </p>
      )}

      <div className="admin__grid">
        <form className="panel admin__panel" onSubmit={addProduct}>
          <h3 className="panel__title">Add a product</h3>
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {props.categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Brand</span>
            <input list="brand-options" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="For example: Mapei" required />
            <datalist id="brand-options">
              {props.brands.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </label>
          <label className="field">
            <span>Product name</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="For example: Mapei Keraflex 20kg" required />
          </label>
          <label className="field">
            <span>Photo (optional)</span>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <button type="submit" className="btn btn--solid">
            Add product
          </button>
        </form>

        <form className="panel admin__panel" onSubmit={addCategory}>
          <h3 className="panel__title">Add a category</h3>
          <label className="field">
            <span>Category name</span>
            <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="For example: Trims" required />
          </label>
          <button type="submit" className="btn btn--solid">
            Add category
          </button>
          <hr className="admin__rule" />
          <h3 className="panel__title">Undo all changes</h3>
          <p className="admin__note">Removes every product and category you added or deleted in this browser.</p>
          {confirmReset ? (
            <div className="admin__confirm">
              <button type="button" className="btn btn--danger" onClick={() => { props.onReset(); setConfirmReset(false) }}>
                Yes, undo everything
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn--outline" onClick={() => setConfirmReset(true)}>
              Undo all changes
            </button>
          )}
        </form>
      </div>
      <p className="admin__note">To delete a product, use the Delete button on its card in the product list.</p>
    </section>
  )
}
