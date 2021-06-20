import styles from './Cart.module.scss'
import { FC } from 'react'
import cn from 'classnames'
import AnimatedCounter from '../../common/AnimatedCounter'
import { NavLink } from 'react-router-dom'

interface ICart {
  className: string
}

const Cart: FC<ICart> = ({ className }) => {
  return (
    <div className={className + ' ' + styles.basket}>
      <NavLink to='/basket'>
        <div className={styles.basket__description}>
          <div
            className={cn(
              [styles.basket__title],
              !!true && [styles.basket__title_up]
            )}>
            КОРЗИНА
          </div>
          <div
            className={cn(
              [styles.basket__price],
              !!true && [styles.basket__price_up]
            )}>
            <AnimatedCounter count={100} /> р
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Cart
