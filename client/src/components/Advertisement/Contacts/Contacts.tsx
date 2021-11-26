import { FC } from 'react'
import styles from './Contacts.module.scss'
import cn from 'classnames'

interface IContacts {
  className?: string
}

const Contacts: FC<IContacts> = ({ className }) => {
  return (
    <ul className={className + ' ' + styles.wrapper}>
      <li className={styles.item}>
        <div className={styles.item__title}>Служба доставки</div>
        <a href='/#' className={styles.item__link}>
          <span className={styles.item__label}></span>
          <span className={styles.item__number}>777-777</span>
        </a>
      </li>
      <li className={styles.item}>
        <div className={styles.item__title}>Адреса</div>
        <a
          href='/#'
          className={cn(styles.item__link, styles.item__link_address)}>
          <span
            className={cn(
              styles.item__label,
              styles.item__label_address
            )}></span>
          <span className={styles.item__description}>Рестораны на карте</span>
        </a>
      </li>
      <li className={styles.item}>
        <div className={styles.item__title}>Социальные сети</div>
        <a href='/#' className={styles.item__link}>
          <span
            className={cn(styles.item__label, styles.item__label_vk)}></span>
        </a>
        <a href='/#' className={styles.item__link}>
          <span
            className={cn(
              styles.item__label,
              styles.item__label_facebook
            )}></span>
        </a>
        <a href='/#' className={styles.item__link}>
          <span
            className={cn(
              styles.item__label,
              styles.item__label_instagram
            )}></span>
        </a>
        <a href='/#' className={styles.item__link}>
          <span
            className={cn(
              styles.item__label,
              styles.item__label_telegram
            )}></span>
        </a>
      </li>
    </ul>
  )
}

export default Contacts
