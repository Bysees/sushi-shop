import styles from './ProductItems.module.scss'
import List from '../../common/List'
import { FC, useEffect, useState } from 'react'
import ProductItem from './ProductItem/ProductItem'
import { cloneDeep } from 'lodash'
import ProductItemInfo from './ProductItemInfo/ProductItemInfo'
import { IDataItemWithKey } from '../../../App'

interface IProductItems {
  items: IDataItemWithKey[]
  className?: string
  isViewingInfo: number | null
  setIsViewingInfo: (value: number | null) => void
  isFiltred: boolean
  setIsFiltred: (value: boolean) => void
}

const ProductItems: FC<IProductItems> = ({
  items,
  className,
  isViewingInfo,
  setIsViewingInfo,
  isFiltred,
  setIsFiltred,
}) => {
  //! keyInfo нужен для того, чтобы обозначить компонент, который мы сейчас просматриваем ProductItemInfo.
  const keyInfo = 'key_info'

  const [cloneItems, setCloneItems] = useState<IDataItemWithKey[]>([])
  useEffect(() => {
    setCloneItems(cloneDeep(items))
  }, [items])

  const isShowInfoItem = (id: number) => {
    cloneItems.forEach((item, index) => {
      if (item.key === keyInfo) {
        removeInfo(index)
      }
    })
    if (isViewingInfo !== id) {
      showInfo(id)
    }
  }

  function showInfo(id: number) {
    setIsViewingInfo(id)
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

  function removeInfo(itemInfoIndex: number) {
    setIsViewingInfo(null)
    setCloneItems(cloneItems.filter((item, index) => index !== itemInfoIndex))
  }

  return (
    <div className={className}>
      <List
        className={styles.list}
        items={cloneItems}
        renderItem={(item, index) => {
          if (item.key !== keyInfo) {
            return (
              <ProductItem
                key={item.key}
                className={styles.list__item}
                isViewingInfo={isViewingInfo}
                structure={item.structure}
                getInfoItemId={isShowInfoItem}
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
              setIsFiltred={setIsFiltred}
              isFiltred={isFiltred}
              key={item.key}
              className={styles.list__item_info}
              itemIndex={index}
              removeInfo={removeInfo}
              img={item.img}
              structure={item.structure}
              labels={item.labels}
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
