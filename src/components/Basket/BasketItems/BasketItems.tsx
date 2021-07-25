import React, { FC } from 'react'
import styles from './BasketItems.module.scss'
import BasketItem, { IBasketItem } from './BasketItem/BasketItem'
import List from '../../common/List'

interface IBasketItems {
  className?: string
  items: IBasketItem[]
}

const BasketItems: FC<IBasketItems> = React.memo(({ className, items }) => {
  return (
    <List
      className={className + ' ' + styles.items}
      animate
      items={items}
      renderItem={(item) => (
        <BasketItem
          className={styles.items__item}
          key={item.id}
          id={item.id}
          img={item.img}
          title={item.title}
          price={item.price}
          totalPrice={item.totalPrice}
          count={item.count}
        />
      )}
    />
  )
})

export default BasketItems
