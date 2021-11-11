import { FC, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { IDataItemWithKey } from '../../../store/types/productItems'
import ItemInfo from '../../../components/common/ItemInfo/ItemInfo'
import styles from './ProductPageItemInfo.module.scss'
import cn from 'classnames'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { setInfoItemId } from '../../../store/actions/productItems'

interface IProductPageItemInfo {
  items: IDataItemWithKey[]
}

const ProductPageItemInfo: FC<IProductPageItemInfo> = ({ items }) => {
  const { push } = useHistory()
  const { path } = useRouteMatch()
  const [isUnmounting, setIsUnmounting] = useState<boolean>(false)
  const infoItemId = useTypedSelector((state) => state.product.infoItemId)

  //? При переходе по вкладкам, открывает страницу сверху.
  useEffect(() => window.scrollTo(0, 0), [])

  function toCorrectUrl(path: string) {
    const index = path.indexOf(':')
    return path.slice(0, index - 1)
  }

  //! Если получать item через find, то он будет равен либо undefined либо object и из-за этого нихуя никуда не передать, т.к. нужно именно object, потом разобраться как можно будет это обойти.
  //const item = items.find((item) => item.id === params.id)

  let item = items.filter((item) => item.id === infoItemId)[0]

  //! временная хуйня потом удалить
  //? Если перезагрузить страницу, в то время когда открыт этот компонент, то будет выдавать ошибку, так как всё зануляется, поэтому временно использую моковый итем для такого случая. В дальнейшем надо будет персистить данные.
  if (!item) {
    item = items.map((item, index) => {
      if (index === 1) {
        return item
      }
      return item
    })[0]
  }
  //! временная хуйня потом удалить

  const closeItem = () => {
    setInfoItemId(null)
    push(toCorrectUrl(path))
  }
  const onUnmountAnimation = () => setIsUnmounting(true)

  return (
    <div
      onTransitionEnd={closeItem}
      className={cn(styles.page, isUnmounting && styles.page_unmount)}>
      <div
        className={styles.page__wrapper}
        onTransitionEnd={(e) => e.stopPropagation()}>
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
