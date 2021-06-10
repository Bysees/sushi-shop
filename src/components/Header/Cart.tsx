import styles from './Cart.module.scss'
import { FC, useState } from 'react'
import cn from 'classnames'
import AnimatedCounter from '../../components/AnimatedCounter'

interface ICart {
  className: string
}

const Cart: FC<ICart> = ({ className }) => {
  const [sum, setSum] = useState(0)

  return (
    <div
      onClick={() => setSum((sum) => sum + 250)}
      className={className + ' ' + styles.basket}>
      <div className={styles.basket__description}>
        <div
          className={cn(
            [styles.basket__title],
            !!sum && [styles.basket__title_up]
          )}>
          КОРЗИНА
        </div>
        <div
          className={cn(
            [styles.basket__price],
            !!sum && [styles.basket__price_up]
          )}>
          <AnimatedCounter count={sum} /> р
        </div>
      </div>
    </div>
  )
}

export default Cart
