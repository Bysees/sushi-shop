import styles from './ProductItems.module.scss'
import List from '../../common/List'
import { FC, useEffect, useState } from 'react'
import ProductItem from './ProductItem/ProductItem'
import { cloneDeep } from 'lodash'
import ProductItemInfo from './ProductItemInfo/ProductItemInfo'
import { IDataItemWithKey } from '../../../store/types/productItems'

interface IProductItems {
  items: IDataItemWithKey[]
  className?: string
  infoItemId: string | null
  setInfoItemId: (id: string | null) => void
  isFiltred: boolean
  setIsFiltred: (isFiltred: boolean) => void
}

const ProductItems: FC<IProductItems> = ({
  items,
  className,
  infoItemId,
  setInfoItemId,
  isFiltred,
  setIsFiltred,
}) => {
  //? keyInfo нужен для того, чтобы обозначить компонент, который мы сейчас 'просматриваем' в ProductItemInfo.
  const keyInfo = 'key_info'
  const [cloneItems, setCloneItems] = useState<IDataItemWithKey[]>(items)

  useEffect(() => {
    setCloneItems(cloneDeep(items))
  }, [items])

  function toggleInfoItem(id: string) {
    cloneItems.forEach((item, index) => {
      if (item.key === keyInfo) {
        removeInfo()
      }
    })
    if (infoItemId !== id) {
      showInfo(id)
    }
  }

  function showInfo(id: string) {
    setInfoItemId(id)
    setCloneItems((cloneItems) => {
      const copyItems = [...cloneItems]
      cloneItems.forEach((item, index) => {
        if (item.id === id) {
          const itemInfo = { ...item, key: keyInfo }
          const itemInfoIndex = index + 1
          copyItems.splice(itemInfoIndex, 0, itemInfo)
        }
      })
      return copyItems
    })
  }

  function removeInfo() {
    setInfoItemId(null)
    setCloneItems(cloneDeep(items))
  }

  return (
    <div className={className + ' ' + styles.wrapper}>
      <List
        className={styles.list}
        items={cloneItems}
        renderItem={(item, index) => {
          if (item.key !== keyInfo) {
            return (
              <ProductItem
                key={item.key}
                className={styles.list__item}
                infoItemId={infoItemId}
                structure={item.structure}
                toggleInfoItem={toggleInfoItem}
                id={item.id}
                labels={item.labels}
                img={item.img}
                title={item.title}
                price={item.price}
              />
            )
          }
          return (
            <ProductItemInfo
              key={item.key}
              className={styles.list__item_info}
              setIsFiltred={setIsFiltred}
              isFiltred={isFiltred}
              removeInfo={removeInfo}
              img={item.img}
              structure={item.structure}
              labels={item.labels}
              title={item.title}
              price={item.price}
              id={item.id}
            />
          )
        }}
      />
    </div>
  )
}

export default ProductItems
