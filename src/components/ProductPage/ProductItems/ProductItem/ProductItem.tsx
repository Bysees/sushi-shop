import React, { FC, useState } from 'react'
import OrderItem from './OrderItem/OrderItem'
import styles from './ProductItem.module.scss'
import cn from 'classnames'
import ImgItem from './ImgItem/ImgItem'
import { Idata } from '../../../../data/data'

export interface IProductItem extends Idata {
  className?: string
  getInfoItemId: (id: number) => void
  isViewingInfo: number | null
}

const ProductItem: FC<IProductItem> = React.memo(
  ({
    img,
    className,
    title,
    price,
    labels,
    id,
    getInfoItemId,
    isViewingInfo,
  }) => {
    const [isAdded, setIsAdded] = useState(false)

    const showInfo = () => {
      getInfoItemId(id)
    }

    const itemLabels = labels.map((label) => (
      <span
        key={label}
        className={cn(
          styles.item__label,
          label === 'vegan' && styles.item__label_vegan,
          label === 'hot' && styles.item__label_hot,
          label === 'hit' && styles.item__label_hit,
          label === 'new' && styles.item__label_new
        )}></span>
    ))

    return (
      <li
        onClick={showInfo}
        className={cn(
          className,
          styles.item,
          isViewingInfo === id && styles.item_viewed
        )}>
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
)

export default ProductItem
