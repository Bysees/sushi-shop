import { FC } from 'react'
import styles from './OrderItem.module.scss'

interface IOrderItem {
  price: number
  className: string
}

const OrderItem: FC<IOrderItem> = ({ price, className }) => {
  return (
    <div className={className + ' ' + styles.order}>
      <div className={styles.order__price}>
        <span className={styles.order__cost}>{price}</span>
        <span className={styles.order__rouble}> Р</span>
      </div>
      <div className={styles.order__btn}>
        <button>ЗАКАЗАТЬ</button>
      </div>
    </div>
  )
}

export default OrderItem
