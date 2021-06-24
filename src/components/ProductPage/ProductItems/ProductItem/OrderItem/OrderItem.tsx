import { FC, MouseEvent } from 'react'
import styles from './OrderItem.module.scss'
import Rouble from '../../../../common/Rouble'
import ButtonOrder from '../../../../common/ButtonOrder'

interface IOrderItem {
  price: number
  className?: string
  orderClickHandler: (e: MouseEvent) => void
}

const OrderItem: FC<IOrderItem> = ({ orderClickHandler, price, className }) => {
  return (
    <div className={className + ' ' + styles.order}>
      <div className={styles.order__price}>
        <span className={styles.order__cost}>{price}</span>
        <span className={styles.order__rouble}>
          <Rouble />
        </span>
      </div>
      <div onClick={orderClickHandler} className={styles.order__btn}>
        <ButtonOrder children='Заказать' />
      </div>
    </div>
  )
}

export default OrderItem
