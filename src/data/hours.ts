// Opening hours in Melbourne time. Edit here when they change.
export const TIME_ZONE = 'Australia/Melbourne'

export interface DayHours {
  day: string
  /** 24-hour "HH:MM", or null when closed all day. */
  open: string | null
  close: string | null
}

export const HOURS: DayHours[] = [
  { day: 'Monday', open: '06:00', close: '18:00' },
  { day: 'Tuesday', open: '06:00', close: '18:00' },
  { day: 'Wednesday', open: '06:00', close: '18:00' },
  { day: 'Thursday', open: '06:00', close: '18:00' },
  { day: 'Friday', open: '06:00', close: '18:00' },
  { day: 'Saturday', open: '06:00', close: '12:00' },
  { day: 'Sunday', open: null, close: null },
]

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))

/** "06:00" -> "6 am", "12:00" -> "12 pm", "18:30" -> "6:30 pm" */
export function formatTime(t: string): string {
  const h = Number(t.slice(0, 2))
  const m = t.slice(3, 5)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m === '00' ? `${h12} ${suffix}` : `${h12}:${m} ${suffix}`
}

export function formatRange(d: DayHours): string {
  return d.open && d.close ? `${formatTime(d.open)} to ${formatTime(d.close)}` : 'Closed'
}

/** Day index (0 = Monday) and minutes since midnight, in Melbourne. */
export function melbourneNow(date: Date = new Date()): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: TIME_ZONE, weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const dayIndex = Math.max(0, HOURS.findIndex((h) => h.day === get('weekday')))
  return { dayIndex, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export function openStatus(date: Date = new Date()): { open: boolean; text: string } {
  const { dayIndex, minutes } = melbourneNow(date)
  const today = HOURS[dayIndex]
  if (today.open && today.close) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { open: true, text: `Open now, closes ${formatTime(today.close)}` }
    }
    if (minutes < toMinutes(today.open)) {
      return { open: false, text: `Closed now, opens today at ${formatTime(today.open)}` }
    }
  }
  for (let i = 1; i <= 7; i++) {
    const next = HOURS[(dayIndex + i) % 7]
    if (next.open) {
      return { open: false, text: `Closed now, opens ${i === 1 ? 'tomorrow' : next.day} at ${formatTime(next.open)}` }
    }
  }
  return { open: false, text: 'Closed now' }
}
