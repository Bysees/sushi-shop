import { FC, useEffect, useRef, useState } from 'react'
import styles from './ProductItemInfo.module.scss'
import LabelsItemInfo from './LabelsItemInfo/LabelsItemInfo'
import StructureItemsInfo from './StructureItemsInfo/StructureItemsInfo'
import IngredientsItemsInfo from './IngredientsItemsInfo/IngredientsItemsInfo'
import cn from 'classnames'
import Rouble from '../../../common/Rouble'
import ButtonOrder from '../../../common/ButtonOrder'
import { IDataItemWithKey } from '../../ProductPage'
import ImgItem from '../../../common/ImgItem/ImgItem'
import { useOrderCount } from '../../../../hooks/useOrderCount'

interface IProductItemInfo extends IDataItemWithKey {
  className?: string
  removeInfo: (index: number) => void
  itemIndex: number
  isFiltred: boolean
  setIsFiltred: (value: boolean) => void
}

const ProductItemInfo: FC<IProductItemInfo> = ({
  img,
  title,
  price,
  structure,
  labels,
  className,
  removeInfo,
  itemIndex,
  isFiltred,
  setIsFiltred,
  id,
}) => {
  const itemInfoRef = useRef<HTMLLIElement | null>(null)

  const [orderedItemCount, setOrderItemCount] = useOrderCount(id, price)

  const [isUnmounting, setIsUnmounting] = useState<boolean>(false)
  const onTransitionHandler = () => removeInfo(itemIndex)

  useEffect(() => {
    if (itemInfoRef.current) {
      const itemOffset = itemInfoRef.current.offsetTop
      const itemHeightHalf = itemInfoRef.current.offsetHeight / 2
      const windowHeightHalf = document.documentElement.clientHeight / 2
      const scrollTo = itemOffset - windowHeightHalf + itemHeightHalf
      window.scrollTo(0, scrollTo)
    }
  })

  useEffect(() => {
    return () => {
      if (isFiltred) {
        window.scrollTo(0, 0)
        setIsFiltred(false)
      }
    }
  }, [isFiltred, setIsFiltred])

  return (
    <li
      ref={itemInfoRef}
      onTransitionEnd={onTransitionHandler}
      className={cn(
        className,
        styles.item,
        isUnmounting && styles.item_unmount
      )}>
      <ImgItem
        info
        className={styles.item__img}
        img={img}
        orderedItemCount={orderedItemCount}
      />
      <div className={styles.item__description}>
        <div
          onTransitionEnd={(e) => e.stopPropagation()}
          className={styles.item__btnRemove}>
          <button onClick={() => setIsUnmounting(true)}></button>
        </div>
        {!!labels.length && (
          <LabelsItemInfo className={styles.item__labels} labels={labels} />
        )}
        <div className={styles.item__title}>{title}</div>
        <IngredientsItemsInfo
          className={styles.item__ingredients}
          ingredients={structure.ingredients}
        />
        <StructureItemsInfo
          className={styles.item__structures}
          structure={structure}
        />
        <div className={styles.item__price}>
          {price} <Rouble />
        </div>
        <div
          onClick={setOrderItemCount}
          onTransitionEnd={(e) => e.stopPropagation()}
          className={styles.item__btnOrder}>
          <ButtonOrder children={'Заказать'} big />
        </div>
      </div>
    </li>
  )
}

export default ProductItemInfo
