import React, { FC } from 'react'
import Rouble from '../common/Rouble'
import styles from './Basket.module.scss'
import BasketItems from './BasketItems/BasketItems'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getAmount } from '../../store/reducers/basket'

interface IBasket {
  className?: string
}

const Basket: FC<IBasket> = ({ className }) => {
  //! Возможно лучше стоит перенести сюда так-же селектор из BasketItems, а то выходит что я его вызываю на двух уровнях, а это вроде как хреново, получается 2 раза будут дёргаться компоненты. Вообщем разобраться...
  const amount = useTypedSelector(getAmount)

  return (
    <div className={className + ' ' + styles.wrapper}>
      <div className={styles.basket}>
        <h2 className={styles.basket__title}>Вы выбрали</h2>
        {/* //! Пока передаю пустой массив, мб в будущем пригодиться если перенесу логику получения итемов в этот компонент */}
        <BasketItems items={[]} className={styles.basket__items} />
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
