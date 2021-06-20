import React, { FC } from 'react'
import styles from './BasketItems.module.scss'
import BasketItem from './BasketItem/BasketItem'

interface IBasketItems {
  className: string
}

const BasketItems: FC<IBasketItems> = ({ className }) => {
  return (
    <div className={className + ' ' + styles.items}>
      <BasketItem className={styles.items__item} />
      <BasketItem className={styles.items__item} />
      <BasketItem className={styles.items__item} />
    </div>
  )
}

export default BasketItems
