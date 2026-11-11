import { useState, type FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { CONTACT, CONTACT_FORM } from '../data/config'

type Status = 'idle' | 'sending' | 'sent' | 'sent-mailto' | 'error'

interface Fields {
  name: string
  email: string
  phone: string
  message: string
}

const EMPTY: Fields = { name: '', email: '', phone: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (!f.name.trim()) errors.name = 'Please enter your name.'
  if (!f.email.trim()) errors.email = 'Please enter your email address, so we can reply.'
  else if (!EMAIL_PATTERN.test(f.email.trim())) errors.email = 'This email address does not look right. It should look like name@example.com.'
  if (f.message.trim().length < 5) errors.message = 'Please tell us what you need.'
  return errors
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('') // hidden field: only automatic spam programs fill it in

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = (['name', 'email', 'message'] as const).find((k) => found[k])
      if (first) document.getElementById(`cf-${first}`)?.focus()
      return
    }
    if (trap) {
      setStatus('sent')
      return
    }

    const subject = `Website enquiry from ${fields.name.trim()}`
    if (!CONTACT_FORM.endpoint) {
      const body = `${fields.message.trim()}\n\n${fields.name.trim()}\n${fields.email.trim()}${fields.phone.trim() ? `\n${fields.phone.trim()}` : ''}`
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('sent-mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(CONTACT_FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...CONTACT_FORM.extraFields,
          subject,
          _subject: subject,
          name: fields.name.trim(),
          email: fields.email.trim(),
          _replyto: fields.email.trim(),
          phone: fields.phone.trim(),
          message: fields.message.trim(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'sent-mailto') {
    return (
      <section className="panel form-done" role="status" aria-live="polite">
        <CheckCircle2 aria-hidden="true" size={40} />
        {status === 'sent' ? (
          <>
            <h2 className="panel__title">Thank you, your message has been sent</h2>
            <p>We will reply to you by email as soon as we can. If it is urgent, please call us.</p>
          </>
        ) : (
          <>
            <h2 className="panel__title">Your email app should now be open</h2>
            <p>
              Your message is ready in a new email to {CONTACT.email}. Please press Send in your email app. If nothing opened, write to us at{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call us.
            </p>
          </>
        )}
        <button type="button" className="btn btn--outline" onClick={() => { setStatus('idle'); setFields(EMPTY) }}>
          Write another message
        </button>
      </section>
    )
  }

  return (
    <form className="panel form" onSubmit={submit} noValidate aria-labelledby="form-title">
      <h2 id="form-title" className="panel__title">
        Send us a message
      </h2>

      <label className="field">
        <span>Your name</span>
        <input id="cf-name" value={fields.name} onChange={set('name')} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        {errors.name && <span id="cf-name-err" className="field__error">{errors.name}</span>}
      </label>

      <label className="field">
        <span>Your email address</span>
        <input id="cf-email" type="email" value={fields.email} onChange={set('email')} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        {errors.email && <span id="cf-email-err" className="field__error">{errors.email}</span>}
      </label>

      <label className="field">
        <span>Phone number (optional)</span>
        <input id="cf-phone" type="tel" value={fields.phone} onChange={set('phone')} autoComplete="tel" />
      </label>

      <label className="field">
        <span>What do you need?</span>
        <textarea id="cf-message" rows={6} value={fields.message} onChange={set('message')} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'cf-message-err' : 'cf-message-hint'} />
        {errors.message ? (
          <span id="cf-message-err" className="field__error">{errors.message}</span>
        ) : (
          <span id="cf-message-hint" className="field__hint">For example: the products and sizes you want, and when you need them.</span>
        )}
      </label>

      {/* Hidden from people; only spam programs fill it in. */}
      <div className="form__trap" aria-hidden="true">
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {status === 'error' && (
        <p className="notice notice--error" role="alert">
          Sorry, we could not send your message. Please try again, or email us at {CONTACT.email}
          {CONTACT.phones.length > 0 ? ` or call ${CONTACT.phones[0]}` : ''}.
        </p>
      )}

      <button type="submit" className="btn btn--solid form__send" disabled={status === 'sending'}>
        <Send aria-hidden="true" size={20} /> {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
