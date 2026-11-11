import { HeartHandshake, ShieldCheck, Truck } from 'lucide-react'
import { F4 } from '../data/config'

const ICONS = { delivery: Truck, quality: ShieldCheck, service: HeartHandshake }

export function F4Panel() {
  return (
    <section className="panel f4" aria-labelledby="f4-title">
      <h2 id="f4-title" className="panel__title">
        {F4.title}
      </h2>
      <ul className="f4__list">
        {F4.items.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <li key={item.title} className={item.icon === 'delivery' ? 'f4__item f4__item--lead' : 'f4__item'}>
              <Icon aria-hidden="true" size={28} />
              <div>
                <h3 className="f4__title">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
