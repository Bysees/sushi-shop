import React, { FC } from 'react'
import styles from './BasketItem.module.scss'
import image from '../../../../img/sushi/sushi_ebi.jpg'
import Rouble from '../../../common/Rouble'

interface IBasketItem {
  className?: string
}

const BasketItem: FC<IBasketItem> = ({ className }) => {
  const title = 'СУШИ, ЗАПЕЧЕННЫЕ ПОД СОУСОМ СПАЙСИ КРЕВЕТКА (3 ШТ.)'
  const price = 270
  const totalPrice = 270
  const count = 1

  return (
    <div className={className + ' ' + styles.item}>
      <div className={styles['item__column-left']}>
        <div className={styles.item__img}>
          <img src={image} alt='sushi' />
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
