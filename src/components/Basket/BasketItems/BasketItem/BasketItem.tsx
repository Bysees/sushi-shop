import { FC, memo } from 'react'
import styles from './BasketItem.module.scss'
import Rouble from '../../../common/Rouble'
import {
  addItem,
  removeItem,
  subtractItem,
} from '../../../../store/actions/basket'
import { motion } from 'framer-motion'

export interface IBasketItem {
  className?: string
  id: string
  img: string
  title: string
  price: number
  count: number
  totalPrice: number
}

const BasketItem: FC<IBasketItem> = ({
  className,
  id,
  img,
  title,
  price,
  totalPrice,
  count,
}) => {
  return (
    <motion.li
      exit={{ x: [0, 50, -500], opacity: 0 }}
      transition={{ duration: 0.4, times: [0, 0.2, 1] }}
      className={className + ' ' + styles.item}>
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
    </motion.li>
  )
}

export default memo(BasketItem)
