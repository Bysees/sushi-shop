import React, { FC } from 'react'
import styles from './BasketItems.module.scss'
import BasketItem from './BasketItem/BasketItem'
import List from '../../common/List'
import { IDataItem } from '../../../types/dataItem'

interface IBasketItems {
  className?: string
  items: IDataItem[]
}

const BasketItems: FC<IBasketItems> = ({ items, className }) => {
  // const orderedItems = useTypedSelector(({ basket: { items } }) => items)

  // useEffect(() => {
  //   //? Сделать так что-бы я проверял id из orderedItems с id в items, и из items вернуть аналогичные итемы.
  // }, [orderedItems])

  // console.log(orderedItems)

  return (
    <div className={className + ' ' + styles.items}>
      <List
        items={items}
        renderItem={(item) => {
          return (
            <BasketItem
              key={item.id}
              id={item.id}
              img={item.img}
              price={item.price}
              title={item.title}
              className={styles.items__item}
            />
          )
        }}
      />
    </div>
  )
}

export default BasketItems
