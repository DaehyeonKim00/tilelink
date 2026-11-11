import { Link } from 'react-router-dom'
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT, SITE, telHref } from '../data/config'
import { HoursStatus, HoursTable } from './Hours'

export function ContactSection() {
  return (
    <section id="contact" className="contact on-navy" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div>
          <h2 id="contact-title" className="contact__title">
            Location &amp; contact
          </h2>
          <p className="contact__lead">Enquiries and quote requests are always welcome. Tell us the products you need and we will get back to you.</p>
          <ul className="contact__list">
            <li>
              <MapPin aria-hidden="true" size={24} />
              <span>
                {CONTACT.address[0]}, {CONTACT.address[1]}
              </span>
            </li>
            <li>
              <Mail aria-hidden="true" size={24} />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <Phone aria-hidden="true" size={24} />
              <span className="contact__phones">
                {CONTACT.phones.length > 0 ? (
                  CONTACT.phones.map((n) => (
                    <a key={n} href={telHref(n)}>
                      {n}
                    </a>
                  ))
                ) : (
                  <span className="placeholder placeholder--on-navy">Phone number coming soon</span>
                )}
              </span>
            </li>
            <li>
              <Clock aria-hidden="true" size={24} />
              <div className="contact__hours">
                <HoursStatus />
                <HoursTable />
              </div>
            </li>
          </ul>
          <div className="contact__buttons">
            <Link className="btn btn--solid-light" to="/contact">
              <Mail aria-hidden="true" size={20} /> Send us a message
            </Link>
            <a className="btn btn--outline-light" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden="true" size={20} /> Open in Google Maps
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="map">
          {CONTACT.mapEmbedUrl ? (
            <iframe title="Map showing the Tile Link store" src={CONTACT.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="map__placeholder">
              <MapPin aria-hidden="true" size={36} />
              <p>Map coming soon</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer on-navy">
      <div className="container footer__inner">
        <p>
          &copy; 2026 {SITE.company} ({SITE.name}). All rights reserved.
        </p>
        <Link className="footer__admin" to="/admin">
          Admin
        </Link>
      </div>
    </footer>
  )
}
