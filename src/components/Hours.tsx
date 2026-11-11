import { useEffect, useState } from 'react'
import { HOURS, formatRange, melbourneNow, openStatus } from '../data/hours'

function useNow(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

/** "Open now, closes 6 pm" line. */
export function HoursStatus({ className = '' }: { className?: string }) {
  const status = openStatus(useNow())
  return (
    <p className={`hours-status ${status.open ? 'hours-status--open' : ''} ${className}`}>
      <span className="hours-status__dot" aria-hidden="true" />
      {status.text}
    </p>
  )
}

/** The full week, with today marked. */
export function HoursTable() {
  const today = melbourneNow(useNow()).dayIndex
  return (
    <table className="hours">
      <caption className="visually-hidden">Opening hours</caption>
      <tbody>
        {HOURS.map((d, i) => (
          <tr key={d.day} aria-current={i === today ? 'date' : undefined}>
            <th scope="row">{d.day}</th>
            <td>{formatRange(d)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
