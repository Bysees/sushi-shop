import { FC, useState } from 'react'
import OrderItem from './OrderItem/OrderItem'
import styles from './ProductItem.module.scss'
import cn from 'classnames'
import ImgItem from './ImgItem/ImgItem'

export interface IProductItem {
  id?: number
  title: string
  price: number
  className?: string
  img: string
  labels: string[]
}

const ProductItem: FC<IProductItem> = ({
  img,
  className,
  title,
  price,
  labels,
}) => {
  const [isAdded, setIsAdded] = useState(false)
  const itemLabels = labels.map((label) => (
    <span
      key={label}
      className={cn(
        [styles.item__label],
        label === 'vegan' && [styles.item__label_vegan],
        label === 'hot' && [styles.item__label_hot],
        label === 'hit' && [styles.item__label_hit],
        label === 'new' && [styles.item__label_new]
      )}></span>
  ))

  return (
    <li className={className + ' ' + styles.item}>
      <ImgItem className={styles.item__img} img={img} isAdded={isAdded} />
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setIsAdded(!isAdded)}
        className={styles.item__title}>
        {itemLabels}
        {title}
      </div>
      <OrderItem className={styles.item__order} price={price} />
    </li>
  )
}

export default ProductItem
