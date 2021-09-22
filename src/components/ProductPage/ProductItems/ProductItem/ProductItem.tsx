import React, { FC, MouseEvent } from 'react'
import OrderItem from './OrderItem/OrderItem'
import styles from './ProductItem.module.scss'
import cn from 'classnames'
import ImgItem from '../../../common/ImgItem/ImgItem'
import { IDataItemWithKey } from '../../../../store/types/productItems'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { getOrderedItemsCount } from '../../../../store/reducers/basket'
import { addItem } from '../../../../store/actions/basket'
import { useMediaQuery } from '@material-ui/core'
import IngredientsItemsInfo from '../../../common/ItemInfo/IngredientsItemsInfo/IngredientsItemsInfo'
import { useRouteMatch, useHistory } from 'react-router-dom'

export interface IProductItem extends IDataItemWithKey {
  className?: string
  toggleInfoItem: (id: string) => void
  infoItemId: string | null
}

const ProductItem: FC<IProductItem> = ({
  img,
  className,
  title,
  price,
  labels,
  id,
  toggleInfoItem,
  infoItemId,
  structure,
}) => {
  const orderedItemCount = useTypedSelector((state) =>
    getOrderedItemsCount(state, id)
  )
  const width1024 = useMediaQuery('(max-width: 1024px)')
  const { path } = useRouteMatch()
  const { push } = useHistory()

  function getCurrentPath(imgName: string) {
    const index = img.lastIndexOf('/') + 1
    return img.slice(index, -4).replace(/[0-9]/g, '')
  }

  //! Возможно потом надо будет сделать addEventListener на родителе, потому что
  //! Во первых так мы передаём в каждый компонент отдельную функцию.
  //! Во вторых stopPropagation может мешать, если мы будем собирать статистику.
  const addOrderItemCount = (e: MouseEvent) => {
    e.stopPropagation()
    addItem(id, price)
  }

  const showInfoInNewPage = () => {
    push(`${path}/${getCurrentPath(img)}`)
  }

  const showInfo = () => {
    toggleInfoItem(id)
    if (width1024) {
      showInfoInNewPage()
    }
  }

  const itemLabels = labels.map((label) => (
    <span
      key={label}
      className={cn(styles.item__label, styles[`item__label_${label}`])}></span>
  ))

  return (
    <li
      onClick={showInfo}
      className={cn(
        className,
        styles.item,
        infoItemId === id && styles.item_viewed
      )}>
      <ImgItem
        className={styles.item__img}
        img={img}
        orderedItemCount={orderedItemCount}
      />
      <div className={styles.item__description}>
        <div className={styles.item__title}>
          {itemLabels}
          {title}
        </div>
        {width1024 && (
          <IngredientsItemsInfo
            className={styles.item__ingredients}
            ingredients={structure.ingredients}
          />
        )}
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
