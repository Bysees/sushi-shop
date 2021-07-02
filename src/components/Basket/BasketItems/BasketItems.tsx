import React, { FC } from 'react'
import styles from './BasketItems.module.scss'
import BasketItem from './BasketItem/BasketItem'
import List from '../../common/List'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { getOrderedItemsId } from '../../../store/reducers/basket'
import { shallowEqual } from 'react-redux'

interface IBasketItems {
  className?: string
}

const BasketItems: FC<IBasketItems> = ({ className }) => {
  const orderedItems = useTypedSelector(getOrderedItemsId, shallowEqual)
  //? Почему я просто не дёргаю все значения и после не передаю их в BasketItem по пропсам?
  //? Потому что каждый раз, когда я нажимаю увеличить кол-во купленных итемов в BasketItem, у меня перерисовывается весь BasketItems, а не только та компонента, в которой изменилось кол-во order count, поэтому я вынес всю хуйню в BasketItem. И теперь render происходит только на конкретной компоненте.

  return (
    <div className={className + ' ' + styles.items}>
      <List
        items={orderedItems}
        renderItem={(id) => {
          return <BasketItem className={styles.items__item} key={id} id={id} />
        }}
      />
    </div>
  )
}

export default BasketItems
