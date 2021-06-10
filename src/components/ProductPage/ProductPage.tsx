import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC } from 'react'
import { IProductItem } from './ProductItems/ProductItem/ProductItem'
import ProductItems from './ProductItems/ProductItems'

interface IProductPage {
  className: string
  items: IProductItem[]
  title: string
}

const ProductPage: FC<IProductPage> = ({ title, items, className }) => {
  return (
    <main className={className + ' ' + styles.product}>
      <h1 className={styles.product__title}>{title}</h1>
      <Filters className={styles.product__filters} />
      <ProductItems items={items} className={styles.product__items} />
    </main>
  )
}

export default ProductPage
