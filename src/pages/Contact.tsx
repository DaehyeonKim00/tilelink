import { Link, useSearchParams } from 'react-router-dom'
import { Clock, MapPin, Phone } from 'lucide-react'
import { CONTACT, telHref } from '../data/config'
import { ContactForm } from '../components/ContactForm'
import { HoursStatus } from '../components/Hours'

export function Contact() {
  const [params] = useSearchParams()
  return (
    <>
      <div className="page-head container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact us</span>
        </nav>
        <h1 className="page-title">Contact us</h1>
        <p className="page-lead">Tell us what you need and we will reply by email. For a quick answer, you can also call us.</p>
      </div>

      <section className="section container contact-page" aria-label="Contact us">
        <ContactForm about={params.get('about') ?? ''} />

        <aside className="panel quick" aria-labelledby="quick-title">
          <h2 id="quick-title" className="panel__title">
            Prefer to talk?
          </h2>
          <ul className="contact-list">
            <li>
              <Phone aria-hidden="true" size={26} />
              <div>
                <p className="contact-list__label">Call us</p>
                {CONTACT.phones.map((n) => (
                  <a key={n} className="contact-list__value contact-list__value--block" href={telHref(n)}>
                    {n}
                  </a>
                ))}
              </div>
            </li>
            <li>
              <Clock aria-hidden="true" size={26} />
              <div>
                <p className="contact-list__label">Opening hours</p>
                <HoursStatus className="contact-list__value" />
              </div>
            </li>
            <li>
              <MapPin aria-hidden="true" size={26} />
              <div>
                <p className="contact-list__label">Visit the store</p>
                <p className="contact-list__value">
                  {CONTACT.address[0]}
                  <br />
                  {CONTACT.address[1]}
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </>
  )
}
