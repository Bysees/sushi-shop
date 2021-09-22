import { FC, useEffect, useRef, useState } from 'react'
import styles from './ProductItemInfo.module.scss'
import cn from 'classnames'
import { IDataItemWithKey } from '../../../../store/types/productItems'
import ItemInfo from '../../../common/ItemInfo/ItemInfo'

interface IProductItemInfo extends IDataItemWithKey {
  className?: string
  removeInfo: () => void
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
  isFiltred,
  setIsFiltred,
  id,
}) => {
  const itemInfoRef = useRef<HTMLLIElement | null>(null)

  const [isUnmounting, setIsUnmounting] = useState<boolean>(false)
  const onUnmountAnimation = () => setIsUnmounting(true)

  //! В некоторых случаях срабатывают оба useEffecta и важно чтобы этот отработал первый...
  useEffect(() => {
    if (isFiltred) {
      window.scrollTo(0, 0)
      setIsFiltred(false)
    }
  }, [isFiltred, setIsFiltred])

  useEffect(() => {
    //! Центрирует по середине экрана появившийся данный компонент.
    //? Потом мб переписать в декларативную функцию
    if (itemInfoRef.current) {
      const itemOffset = itemInfoRef.current.offsetTop
      const itemHalfHeight = itemInfoRef.current.offsetHeight / 2
      const windowHeightHalf = document.documentElement.clientHeight / 2
      const headerHeight = 60
      const scrollTo =
        itemOffset + itemHalfHeight - windowHeightHalf + headerHeight
      window.scrollTo(0, scrollTo)
    }
    //! id в зависимости нужно для того, что если при открытом компоненте мы октрываем инфо другого компонента, то этот компонент как-бы не умирает, а лишь получает новые данные, и из-за этого useEffect не отрабатывает и мы получаем некорректное положение.
  }, [id])

  return (
    <li
      ref={itemInfoRef}
      onTransitionEnd={removeInfo}
      className={cn(
        className,
        styles.item_mount,
        isUnmounting && styles.item_unmount
      )}>
      <div onTransitionEnd={(e) => e.stopPropagation()}>
        <ItemInfo
          id={id}
          title={title}
          structure={structure}
          labels={labels}
          img={img}
          price={price}
          removeItem={onUnmountAnimation}
        />
      </div>
    </li>
  )
}

export default ProductItemInfo
