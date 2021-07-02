import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC, useEffect, useState } from 'react'
import ProductItems from './ProductItems/ProductItems'
import { IDataItemWithKey } from '../../store/types/productItems'

interface IProductPage {
  items: IDataItemWithKey[]
  title: string
  className?: string
}

const ProductPage: FC<IProductPage> = ({ title, items, className }) => {
  const [currentItems, setCurrentItems] = useState<IDataItemWithKey[]>([])

  useEffect(() => {
    setCurrentItems(items)
  }, [items])

  //? Нужно для того, чтобы переключать класс в profileItem, для наложение стилей.
  const [isViewingInfo, setIsViewingInfo] = useState<string | null>(null)

  //? Нужно, чтобы в случае размонтирования profileInfoItem посредством фильтрации массива (переключения на другую вкладку),
  //? позиция страницы сместилась в 0 (то есть вверх страницы).
  const [isFiltred, setIsFiltred] = useState<boolean>(false)

  const getFiltredItems = (label: string) => {
    setIsViewingInfo(null)
    setIsFiltred(true)
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
      <ProductItems
        setIsFiltred={setIsFiltred}
        isFiltred={isFiltred}
        isViewingInfo={isViewingInfo}
        setIsViewingInfo={setIsViewingInfo}
        items={currentItems}
        className={styles.product__items}
      />
    </main>
  )
}

export default ProductPage
