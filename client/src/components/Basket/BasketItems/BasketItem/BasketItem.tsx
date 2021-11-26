import { FC, memo } from 'react'
import styles from './BasketItem.module.scss'
import Rouble from '../../../common/Rouble'
import {
  addItem,
  removeItem,
  subtractItem,
} from '../../../../store/actions/basket'
import { motion } from 'framer-motion'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BasketAmountCount from './BasketAmountCount/BasketAmountCount'

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
  const minWidth1024 = useMediaQuery('(min-width:1025px)')

  return (
    <motion.li
      exit={{ x: [0, 50, -500], opacity: 0 }}
      transition={{ duration: 0.4, times: [0, 0.2, 1] }}
      className={className + ' ' + styles.item}>
      <div className={styles.container}>
        <div className={styles['item__column-left']}>
          <div className={styles.item__img}>
            <img src={img} alt='sushi' />
          </div>
          <div className={styles.item__title}>{title}</div>
        </div>
        <div className={styles['item__column-middle']}>
          {minWidth1024 && (
            <div className={styles.item__price}>
              {price}
              <Rouble />
            </div>
          )}
          <BasketAmountCount
            className={styles.item__amount}
            addItem={addItem}
            subtractItem={subtractItem}
            count={count}
            id={id}
            price={price}
          />
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
    </motion.li>
  )
}

export default memo(BasketItem)
