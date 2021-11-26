import { FC } from 'react'
import styles from './AdvertLinks.module.scss'

const listNames = [
  { name: 'зоны доставки', link: '/#' },
  { name: 'это интересно', link: '/#' },
  { name: 'оставить отзыв', link: '/#' },
  { name: 'бронирование', link: '/#' },
  { name: 'банкеты', link: '/#' },
  { name: 'программа лояльности', link: '/#' },
  { name: 'социальная жизнь', link: '/#' },
  { name: 'сотрудничество', link: '/#' },
  { name: 'франшиза', link: '/#' },
]

interface IAdvertLinks {
  className?: string
}

const AdvertLinks: FC<IAdvertLinks> = ({ className }) => {
  return (
    <ul className={className}>
      {listNames.map((item) => {
        return (
          <li key={item.name} className={styles.item}>
            <div className={styles.item__link}>
              <a href={item.link}>{item.name}</a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default AdvertLinks
