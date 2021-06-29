import React, { FC } from 'react'
import styles from './BasketItems.module.scss'
import BasketItem from './BasketItem/BasketItem'
import List from '../../common/List'
import { IDataItemWithKey } from '../../../store/types/productItems'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { getOrderedItems } from '../../../store/reducers/basket'

interface IBasketItems {
  className?: string
  items: IDataItemWithKey[]
}

const BasketItems: FC<IBasketItems> = ({ items, className }) => {
  const orderedItems = useTypedSelector(getOrderedItems)

  return (
    <div className={className + ' ' + styles.items}>
      <List
        items={orderedItems}
        renderItem={(item) => {
          return (
            <BasketItem
              className={styles.items__item}
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.title}
              count={item.count}
              price={item.price}
              totalPrice={item.totalPrice}
            />
          )
        }}
      />
    </div>
  )
}

export default BasketItems
