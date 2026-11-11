import { Phone } from 'lucide-react'
import { CONTACT, telHref } from '../data/config'
import { scrollToId } from '../utils'

/** Always-visible call button, bottom right. Scrolls to the contact details until a phone number is set. */
export function CallButton() {
  if (CONTACT.phones.length > 0) {
    return (
      <a className="fab" href={telHref(CONTACT.phones[0])}>
        <Phone aria-hidden="true" size={24} /> Call us
      </a>
    )
  }
  return (
    <button type="button" className="fab" onClick={() => scrollToId('contact')}>
      <Phone aria-hidden="true" size={24} /> Call us
    </button>
  )
}
