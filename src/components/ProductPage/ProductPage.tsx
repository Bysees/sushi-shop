import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC, useCallback, useMemo, useState } from 'react'
import ProductItems from './ProductItems/ProductItems'
import { IDataItemWithKey } from '../../store/types/productItems'

interface IProductPage {
  items: IDataItemWithKey[]
  title: string
  className?: string
}

const ProductPage: FC<IProductPage> = ({ title, items, className }) => {
  const [currentItems, setCurrentItems] = useState<IDataItemWithKey[]>(items)

  //? Нужно для того, чтобы переключать класс в profileItem, для наложение стилей.
  const [isViewingInfo, setIsViewingInfo] = useState<string | null>(null)

  //? Если переключаю фильтр (перехожу на другую позицию например 'ХИТ') и в этот момент у меня открыт ProfileItemInfo, то тогда если isFiltred true, смещаю скролл в начало страницы. Если этого не сделать, то тогда при переходах у меня будет некорректно выстраиваться позиция скролла.
  const [isFiltred, setIsFiltred] = useState<boolean>(false)

  //! Беру лейблы всех итемов             | items.map((item) => item.labels)
  //! Собираю их в один массив            | .flat()
  //! Оставляю только уникальные значения | new Set()
  //! Превращаю Set коллекцию в массив    | Array.from()
  const labels = useMemo(
    () => Array.from(new Set(items.map((item) => item.labels).flat())),
    [items]
  )

  const getFiltredItems = useCallback(
    (label: string) => {
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
    },
    [items]
  )

  return (
    <main className={className + ' ' + styles.product}>
      <h1 className={styles.product__title}>{title}</h1>
      <Filters
        filtredLabels={labels}
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
