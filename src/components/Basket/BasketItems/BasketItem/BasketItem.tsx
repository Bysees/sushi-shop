import React, { FC } from 'react'
import styles from './BasketItem.module.scss'
import Rouble from '../../../common/Rouble'

interface IBasketItem {
  className?: string
  img: string
  title: string
  price: number
  id: number
}

const BasketItem: FC<IBasketItem> = ({ className, img, title, id, price }) => {
  const totalPrice = 270
  const count = 1

  return (
    <div className={className + ' ' + styles.item}>
      <div className={styles['item__column-left']}>
        <div className={styles.item__img}>
          <img src={img} alt='sushi' />
        </div>
        <div className={styles.item__title}>{title}</div>
      </div>
      <div className={styles['item__column-middle']}>
        <div className={styles.item__price}>
          {price}
          <Rouble />
        </div>
        <div className={styles.item__amount + ' ' + styles.amount}>
          <div className={styles.amount__count}>{count}</div>
          <div className={styles.amount__countBtns}>
            <button className={styles.amount__add}>+</button>
            <button className={styles.amount__subtract}>-</button>
          </div>
        </div>
      </div>
      <div className={styles['item__column-right']}>
        <div className={styles.item__totalPrice}>
          {totalPrice} <Rouble />
        </div>
        <button className={styles.item__remove}></button>
      </div>
    </div>
  )
}

export default BasketItem
