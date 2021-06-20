import styles from './ProductItems.module.scss'
import List from '../../common/List'
import { FC, useEffect, useState } from 'react'
import ProductItem from './ProductItem/ProductItem'
import { cloneDeep } from 'lodash'
import { Idata } from '../../../data/data'
import ProductItemInfo from './ProductItemInfo/ProductItemInfo'

interface IProductItems {
  className: string
  items: Idata[]
}

const ProductItems: FC<IProductItems> = ({ items, className }) => {
  //! keyInfo нужен для того, чтобы обозначить компонент, который мы сейчас просматриваем ProductItemInfo.
  const keyInfo = 'key_info'

  const [cloneItems, setCloneItems] = useState<Idata[]>([])
  useEffect(() => {
    setCloneItems(cloneDeep(items))
  }, [items])

  //! Нужно для того, чтобы переключать класс в profileItem, для наложение стилей.
  const [isViewingInfo, setIsViewingInfo] = useState<number | null>(null)

  const getInfoItemId = (id: number) => {
    let itemInfoIndex
    let hasItemInfo = false
    let equalInfoItemId = false

    cloneItems.forEach((item, index) => {
      if (item.key === keyInfo) {
        hasItemInfo = true
        itemInfoIndex = index
        equalInfoItemId = item.id === id
      }
    })

    if (hasItemInfo) {
      removeInfo(itemInfoIndex)
    }

    if (!hasItemInfo || (hasItemInfo && !equalInfoItemId)) {
      showInfo(id)
    }
  }

  function showInfo(id: number) {
    setIsViewingInfo(id)
    let itemInfoIndex: any
    let itemInfo: Idata
    setCloneItems((cloneItems: any) => {
      let copyItems = [...cloneItems]
      cloneItems.forEach((item: any, index: any) => {
        if (item.id === id) {
          itemInfo = { ...item, key: keyInfo }
          itemInfoIndex = index + 1
        }
      })
      copyItems.splice(itemInfoIndex, 0, itemInfo)
      return copyItems
    })
  }

  function removeInfo(itemInfoIndex: number | undefined) {
    setIsViewingInfo(null)
    setCloneItems(
      cloneItems.filter((item: any, index: any) => index !== itemInfoIndex)
    )
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
                isViewingInfo={isViewingInfo}
                className={styles.list__item}
                structure={item.structure}
                getInfoItemId={getInfoItemId}
                id={item.id}
                labels={item.labels}
                key={item.key}
                img={item.img}
                title={item.title}
                price={item.price}
              />
            )
          }
          return (
            <ProductItemInfo
              className={styles.list__item_info}
              key={item.key}
              itemIndex={index}
              removeInfo={removeInfo}
              img={item.img}
              structure={item.structure}
              labels={item.labels}
              id={item.id}
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
