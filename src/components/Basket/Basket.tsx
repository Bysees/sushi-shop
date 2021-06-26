import React, { FC } from 'react'
import { IDataItem } from '../../types/dataItem'
import Rouble from '../common/Rouble'
import styles from './Basket.module.scss'
import BasketItems from './BasketItems/BasketItems'

interface IBasket {
  className?: string
  items: IDataItem[]
}

const Basket: FC<IBasket> = ({ className, items }) => {
  const amount = 810

  return (
    <div className={className + ' ' + styles.wrapper}>
      <div className={styles.basket}>
        <h2 className={styles.basket__title}>Вы выбрали</h2>
        <BasketItems items={items} className={styles.basket__items} />
        <div className={styles.basket__amount + ' ' + styles.amount}>
          <span className={styles.amount__title}>Итого: </span>
          <span className={styles.amount__sum}>
            {amount} <Rouble />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Basket
