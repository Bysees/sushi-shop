import { FC, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { IDataItemWithKey } from '../../../store/types/productItems'
import ItemInfo from '../../../components/common/ItemInfo/ItemInfo'
import styles from './ProductPageItemInfo.module.scss'
import cn from 'classnames'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface IProductPageItemInfo {
  items: IDataItemWithKey[]
}

const ProductPageItemInfo: FC<IProductPageItemInfo> = ({ items }) => {
  const { push } = useHistory()
  const { path } = useRouteMatch()
  const [isUnmounting, setIsUnmounting] = useState<boolean>(false)
  const infoItemId = useTypedSelector((state) => state.product.infoItemId)

  function toCorrectUrl(path: string) {
    const index = path.indexOf(':')
    return path.slice(0, index - 1)
  }

  //! Если получать item через find, то он будет равен либо undefined либо object и из-за этого нихуя никуда не передать, т.к. нужно именно object, потом разобраться как можно будет это обойти.
  //const item = items.find((item) => item.id === params.id)

  const item = items.filter((item) => item.id === infoItemId)[0]
  const closeItem = () => push(toCorrectUrl(path))
  const onUnmountAnimation = () => setIsUnmounting(true)

  return (
    <div
      onTransitionEnd={closeItem}
      className={cn(styles.wrapper, isUnmounting && styles.wrapper_unmount)}>
      <div
        onTransitionEnd={(e) => e.stopPropagation()}
        className={styles.container}>
        <ItemInfo
          removeItem={onUnmountAnimation}
          key={item.key}
          img={item.img}
          structure={item.structure}
          labels={item.labels}
          title={item.title}
          price={item.price}
          id={item.id}
        />
      </div>
    </div>
  )
}

export default ProductPageItemInfo
