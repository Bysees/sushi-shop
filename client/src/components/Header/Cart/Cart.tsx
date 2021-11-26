import styles from './Cart.module.scss'
import { FC } from 'react'
import cn from 'classnames'
import AnimatedCounter from '../../common/AnimatedCounter'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Rouble from '../../common/Rouble'
import { NavLink } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
  const minWidth480 = useMediaQuery('(min-width:481px)')

  return (
    <NavLink to='/basket' className={cn(!count && styles.wrapper)}>
      <div className={className + ' ' + styles.cart}>
        <div
          className={cn(
            styles.cart__label,
            amount && styles.cart__label_active
          )}>
          {!!count && <div className={styles.cart__count}>{count}</div>}
        </div>
        <div className={styles.cart__description}>
          {minWidth480 && (
            <>
              <div
                className={cn(
                  styles.cart__title,
                  amount && styles.cart__title_up
                )}>
                КОРЗИНА
              </div>
              <div
                className={cn(
                  styles.cart__price,
                  amount && styles.cart__price_up
                )}>
                <AnimatedCounter count={amount} /> <Rouble />
              </div>
            </>
          )}
        </div>
      </div>
    </NavLink>
  )
}

export default Cart
