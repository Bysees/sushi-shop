import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC, useEffect, useState } from 'react'
import ProductItems from './ProductItems/ProductItems'
import {
  getItemsWithKey,
  fetchItems,
  removeItems,
} from '../../store/itemsReducer'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IDataItem } from '../../types/dataItem'

interface IProductPage {
  itemsName: string
  title: string
  className?: string
}

export interface IDataItemWithKey extends IDataItem {
  key: string
}

const ProductPage: FC<IProductPage> = ({ title, itemsName, className }) => {
  //? При перепрыгивании с Суши на Роллы, номера ключей не пересоздаются, а вычисляются относительно предыдущих, это не то как я хотел. Да и вообще что-то тут не чисто. Не ясно почему не ухожу в бесконечный луп, если каждый раз возвращается новый объект в itemsWithKeys и useEffect как-бы должен на это реагировать.
  const itemsWithKeys = useTypedSelector(getItemsWithKey)

  const [currentItems, setCurrentItems] = useState<IDataItemWithKey[]>([])

  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(fetchItems(itemsName))
    return () => {
      dispatch(removeItems())
    }
  }, [dispatch, itemsName])

  useEffect(() => {
    console.log('render')

    setCurrentItems(itemsWithKeys)
  }, [itemsWithKeys])

  //! Нужно для того, чтобы переключать класс в profileItem, для наложение стилей.
  const [isViewingInfo, setIsViewingInfo] = useState<number | null>(null)

  //! Нужно, чтобы в случае размонтирования profileInfoItem посредством фильтрации массива (переключения на другую вкладку),
  //! позиция страницы должна сместиться в 0 (то есть вверх страницы).
  const [isFiltred, setIsFiltred] = useState<boolean>(false)

  const getFiltredItems = (label: string) => {
    setIsViewingInfo(null)
    setIsFiltred(true)
    if (label === 'ВСЕ') {
      setCurrentItems(itemsWithKeys)
      return
    }

    if (label === 'ОСТРОЕ') label = 'hot'
    if (label === 'НОВИНКА') label = 'new'
    if (label === 'ХИТ') label = 'hit'
    if (label === 'ВЕГЕТАРИАНСКОЕ') label = 'vegan'

    const filtredItems = itemsWithKeys.filter((item) =>
      item.labels.includes(label)
    )
    setCurrentItems(filtredItems)
  }

  if (!currentItems.length) {
    return <div style={{ flex: '1 0 auto' }}>Loading...</div>
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
