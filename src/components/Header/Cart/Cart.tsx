import styles from './Cart.module.scss'
import { FC } from 'react'
import cn from 'classnames'
import AnimatedCounter from '../../common/AnimatedCounter'
import { NavLink } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Rouble from '../../common/Rouble'

interface ICart {
  className?: string
}

const Cart: FC<ICart> = ({ className }) => {
  const { amount, totalCount } = useTypedSelector(({ basket }) => {
    return {
      amount: basket.amount,
      totalCount: basket.totalCount,
    }
  })

  const count = totalCount < 100 ? totalCount : '99+'

  return (
    <div className={className + ' ' + styles.basket}>
      <div
        className={cn(
          styles.basket__label,
          amount && styles.basket__label_active
        )}>
        {!!count && <div className={styles.basket__count}>{count}</div>}
      </div>
      <NavLink to='/basket'>
        <div className={styles.basket__description}>
          <div
            className={cn(
              [styles.basket__title],
              amount && [styles.basket__title_up]
            )}>
            КОРЗИНА
          </div>
          <div
            className={cn(
              [styles.basket__price],
              amount && [styles.basket__price_up]
            )}>
            <AnimatedCounter count={amount} /> <Rouble />
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Cart
