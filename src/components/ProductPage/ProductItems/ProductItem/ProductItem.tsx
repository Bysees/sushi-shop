import React, { FC, MouseEvent } from 'react'
import OrderItem from './OrderItem/OrderItem'
import styles from './ProductItem.module.scss'
import cn from 'classnames'
import ImgItem from '../../../common/ImgItem/ImgItem'
import { IDataItemWithKey } from '../../../../store/types/productItems'
import { useOrderCount } from '../../../../hooks/useOrderCount'

export interface IProductItem extends IDataItemWithKey {
  className?: string
  getInfoItemId: (id: string) => void
  isViewingInfo: string | null
}

const ProductItem: FC<IProductItem> = ({
  img,
  className,
  title,
  price,
  labels,
  id,
  getInfoItemId,
  isViewingInfo,
}) => {
  const [orderedItemCount, setOrderItemCount] = useOrderCount(id, price)

  const addOrderItemCount = (e: MouseEvent) => {
    e.stopPropagation()
    setOrderItemCount()
  }

  const showInfo = () => getInfoItemId(id)

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
      <ImgItem
        className={styles.item__img}
        img={img}
        orderedItemCount={orderedItemCount}
      />
      <div className={styles.item__title}>
        {itemLabels}
        {title}
      </div>
      <OrderItem
        orderClickHandler={addOrderItemCount}
        className={styles.item__order}
        price={price}
      />
    </li>
  )
}

export default ProductItem
