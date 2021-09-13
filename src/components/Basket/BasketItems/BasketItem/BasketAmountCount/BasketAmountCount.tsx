import { FC } from 'react'
import styles from './BasketAmountCount.module.scss'
import useMediaQuery from '@material-ui/core/useMediaQuery'

interface IBasketAmountCount {
  className: string
  count: number
  price: number
  id: string
  addItem: (id: string, price: number) => void
  subtractItem: (id: string, price: number) => void
}

const BasketAmountCount: FC<IBasketAmountCount> = ({
  count,
  id,
  price,
  className,
  addItem,
  subtractItem,
}) => {
  const minWidth1024px = useMediaQuery('(min-width:1025px)')

  const amountCount = (
    <div className={className + ' ' + styles.amount}>
      <div className={styles.amount__count}>{count}</div>
      <div className={styles.amount__countBtns}>
        <button
          onClick={() => addItem(id, price)}
          className={styles.amount__add}>
          +
        </button>
        <button
          onClick={() => subtractItem(id, price)}
          className={styles.amount__subtract}>
          -
        </button>
      </div>
    </div>
  )

  const amountCountGadgetSize = (
    <div className={className + ' ' + styles.amountGadgetSize}>
      <button
        onClick={() => subtractItem(id, price)}
        className={styles.amountGadgetSize__subtract}>
        -
      </button>
      <div className={styles.amountGadgetSize__count}>{count}</div>
      <button
        onClick={() => addItem(id, price)}
        className={styles.amountGadgetSize__add}>
        +
      </button>
    </div>
  )

  return minWidth1024px ? amountCount : amountCountGadgetSize
}

export default BasketAmountCount
