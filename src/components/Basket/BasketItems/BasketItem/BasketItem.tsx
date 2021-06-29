import React, { FC } from 'react'
import styles from './BasketItem.module.scss'
import Rouble from '../../../common/Rouble'
//? Плохой тон использовать экшены здесь, возможно их нужно вынести в родительский какой-нибудь компонент, а потом прокидывать по пропсам сюда.
import {
  addItem,
  subtractItem,
  removeItem,
} from '../../../../store/reducers/basket'
import { useTypedDispatch } from '../../../../hooks/useTypedDispatch'

export interface IBasketItem {
  className?: string
  img: string
  title: string
  price: number
  totalPrice: number
  count: number
  id: string
}

const BasketItem: FC<IBasketItem> = React.memo(
  ({ className, img, title, id, price, totalPrice, count }) => {
    const dispatch = useTypedDispatch()

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
                onClick={() => dispatch(addItem({ id: id, price: price }))}
                className={styles.amount__add}>
                +
              </button>
              <button
                onClick={() => dispatch(subtractItem({ id: id, price: price }))}
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
            onClick={() => dispatch(removeItem({ id: id }))}
            className={styles.item__remove}></button>
        </div>
      </div>
    )
  }
)

export default BasketItem
