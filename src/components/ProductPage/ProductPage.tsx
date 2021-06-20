import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC, useState } from 'react'
import ProductItems from './ProductItems/ProductItems'
import { Idata } from '../../data/data'

interface IProductPage {
  className: string
  items: Idata[]
  title: string
}

const ProductPage: FC<IProductPage> = ({ title, items, className }) => {
  const [currentItems, setCurrentItems] = useState(items)
  const getFiltredItems = (label: string) => {
    if (label === 'ВСЕ') {
      setCurrentItems(items)
      return
    }

    if (label === 'ОСТРОЕ') label = 'hot'
    if (label === 'НОВИНКА') label = 'new'
    if (label === 'ХИТ') label = 'hit'
    if (label === 'ВЕГЕТАРИАНСКОЕ') label = 'vegan'

    const filtredItems = items.filter((item) => item.labels.includes(label))
    setCurrentItems(filtredItems)
  }

  return (
    <main className={className + ' ' + styles.product}>
      <h1 className={styles.product__title}>{title}</h1>
      <Filters
        getFiltredItems={getFiltredItems}
        className={styles.product__filters}
      />
      <ProductItems items={currentItems} className={styles.product__items} />
    </main>
  )
}

export default ProductPage
