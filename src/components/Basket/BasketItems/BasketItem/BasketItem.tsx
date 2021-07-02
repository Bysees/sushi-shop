import React, { FC } from 'react'
import styles from './BasketItem.module.scss'
import Rouble from '../../../common/Rouble'
import { getOrderedItemData } from '../../../../store/reducers/basket'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { shallowEqual } from 'react-redux'
import {
  addItem,
  removeItem,
  subtractItem,
} from '../../../../store/actions/basket'

export interface IBasketItem {
  className?: string
  id: string
}

const BasketItem: FC<IBasketItem> = React.memo(({ className, id }) => {
  const { img, title, price, totalPrice, count } = useTypedSelector(
    (state) => getOrderedItemData(state, id),
    shallowEqual
  )

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
            <button
              onClick={() => addItem(id, price)}
              className={styles.amount__add}>
              +
            </button>
            <button
              onClick={() => subtractItem(id, price)}
              className={styles.amount__subtract}>
              -
            </button>
          </div>
        </div>
      </div>
      <div className={styles['item__column-right']}>
        <div className={styles.item__totalPrice}>
          {totalPrice} <Rouble />
        </div>
        <button
          onClick={() => removeItem(id)}
          className={styles.item__remove}></button>
      </div>
    </div>
  )
})

export default BasketItem
