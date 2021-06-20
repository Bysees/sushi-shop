import { FC, useEffect, useRef, useState } from 'react'
import { Idata } from '../../../../data/data'
import styles from './ProductItemInfo.module.scss'
import LabelsItemInfo from './LabelsItemInfo/LabelsItemInfo'
import StructureItemsInfo from './StructureItemsInfo/StructureItemsInfo'
import IngredientsItemsInfo from './IngredientsItemsInfo/IngredientsItemsInfo'
import cn from 'classnames'
import Rouble from '../../../common/Rouble'
import ButtonOrder from '../../../common/ButtonOrder'

interface IProductItemInfo extends Idata {
  className?: string
  removeInfo: (index: any) => void
  itemIndex: any
}

const ProductItemInfo: FC<IProductItemInfo> = ({
  img,
  title,
  price,
  structure,
  labels,
  className,
  id,
  removeInfo,
  itemIndex,
}) => {
  const itemInfoRef = useRef<HTMLLIElement | null>(null)

  const [isUnmounting, setIsUnmounting] = useState<boolean>(false)

  const onTransitionHandler = () => {
    removeInfo(itemIndex)
  }

  useEffect(() => {
    let itemOffset: any
    if (itemInfoRef.current?.offsetTop !== undefined) {
      itemOffset = itemInfoRef.current?.offsetTop
    }
    let itemHeightHalf: any
    if (itemInfoRef.current?.clientHeight !== undefined) {
      itemHeightHalf = itemInfoRef.current?.offsetHeight / 2
    }
    let windowHeightHalf = document.documentElement.clientHeight / 2

    let scrollTo = itemOffset - windowHeightHalf + itemHeightHalf
    window.scrollTo(0, scrollTo)
  })

  return (
    <li
      ref={itemInfoRef}
      onTransitionEnd={onTransitionHandler}
      className={cn(
        className,
        styles.item,
        isUnmounting && styles.item_unmount
      )}>
      <div className={styles.item__img}>
        <img src={img} alt='sushi-sake' />
      </div>
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
          onTransitionEnd={(e) => e.stopPropagation()}
          className={styles.item__btnOrder}>
          <ButtonOrder children={'Заказать'} big />
        </div>
      </div>
    </li>
  )
}

export default ProductItemInfo
