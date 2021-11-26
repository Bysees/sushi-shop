import React, { FC, useEffect } from 'react'
import Rouble from '../common/Rouble'
import styles from './Basket.module.scss'
import BasketItems from './BasketItems/BasketItems'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getOrderedItems } from '../../store/reducers/basket'
import BasketBlank from './BasketBlank/BasketBlank'

interface IBasket {
  className?: string
}

const Basket: FC<IBasket> = ({ className }) => {
  const orderedItems = useTypedSelector(getOrderedItems)
  const amount = useTypedSelector(({ basket }) => basket.amount)
  //? При переходе по вкладкам, открывает страницу сверху.
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className={className + ' ' + styles.wrapper}>
      {orderedItems.length ? (
        <div className={styles.basket}>
          <h2 className={styles.basket__title}>Вы выбрали</h2>
          <BasketItems items={orderedItems} className={styles.basket__items} />
          <div className={styles.basket__amount + ' ' + styles.amount}>
            <span className={styles.amount__title}>Итого: </span>
            <span className={styles.amount__sum}>
              {amount} <Rouble />
            </span>
          </div>
        </div>
      ) : (
        <BasketBlank />
      )}
    </div>
  )
}

export default Basket
