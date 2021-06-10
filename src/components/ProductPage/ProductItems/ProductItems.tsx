import styles from './ProductItems.module.scss'
import List from '../../List'
import { FC } from 'react'
import ProductItem, { IProductItem } from './ProductItem/ProductItem'

interface IProductItems {
  className: string
  items: IProductItem[]
}

const ProductItems: FC<IProductItems> = ({ items, className }) => {
  return (
    <div className={className}>
      <List
        className={styles.list}
        items={items}
        renderItem={(item) => {
          return (
            <ProductItem
              labels={item.labels}
              className={styles.list__item}
              key={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
            />
          )
        }}
      />
    </div>
  )
}

export default ProductItems
