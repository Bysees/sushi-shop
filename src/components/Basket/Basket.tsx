import React, { FC } from 'react'
import Rouble from '../common/Rouble'
import styles from './Basket.module.scss'
import BasketItems from './BasketItems/BasketItems'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface IBasket {
  className?: string
}

const Basket: FC<IBasket> = ({ className }) => {
  return (
    <div className={className + ' ' + styles.wrapper}>
      <div className={styles.basket}>
        <h2 className={styles.basket__title}>Вы выбрали</h2>
        <BasketItems className={styles.basket__items} />
        <div className={styles.basket__amount + ' ' + styles.amount}>
          <span className={styles.amount__title}>Итого: </span>
          <BasketAmount />
        </div>
      </div>
    </div>
  )
}

//! Наверное потом вынести в отдельную папку, хотя...
const BasketAmount = () => {
  const amount = useTypedSelector(({ basket }) => basket.amount)
  return (
    <span className={styles.amount__sum}>
      {amount} <Rouble />
    </span>
  )
}

export default Basket
