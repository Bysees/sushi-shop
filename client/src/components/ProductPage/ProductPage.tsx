import styles from './ProductPage.module.scss'
import Filters from './Filters/Filters'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import ProductItems from './ProductItems/ProductItems'
import { IDataItemWithKey, labelsType } from '../../store/types/productItems'
import { Route, useRouteMatch, Switch } from 'react-router'
import ProductPageItemInfo from './ProductPageItemInfo/ProductPageItemInfo'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { setInfoItemId } from '../../store/actions/productItems'

interface IProductPage {
  items: IDataItemWithKey[]
  title: string
  className?: string
}

const ProductPage: FC<IProductPage> = ({ title, items, className }) => {
  const [currentItems, setCurrentItems] = useState<IDataItemWithKey[]>(items)
  const { path } = useRouteMatch()

  //? При переходе по вкладкам, открывает страницу сверху.
  useEffect(() => window.scrollTo(0, 0), [])

  //? Нужно для того, чтобы переключать класс в profileItem, для наложение стилей.
  const infoItemId = useTypedSelector((state) => state.product.infoItemId)

  //? Если переключаю фильтр (перехожу на другую позицию например 'ХИТ') и в этот момент у меня открыт ProfileItemInfo, то тогда если isFiltred = true, смещаю скролл в начало страницы. Если этого не сделать, то при переходах у меня будет некорректно выстраиваться позиция скролла.
  const [isFiltred, setIsFiltred] = useState<boolean>(false)

  //! Беру лейблы всех итемов             | items.map((item) => item.labels)
  //! Собираю их в один массив            | .flat()
  //! Оставляю только уникальные значения | new Set()
  //! Превращаю Set коллекцию в массив    | Array.from()
  const labels: labelsType[] = useMemo(
    () => Array.from(new Set(items.map((item) => item.labels).flat())),
    [items]
  )

  const getFiltredItemsByLabel = useCallback(
    (label) => {
      setInfoItemId(null)
      setIsFiltred(true)
      if (label === 'all') {
        setCurrentItems(items)
      } else {
        const filtredItems = items.filter((item) => item.labels.includes(label))
        setCurrentItems(filtredItems)
      }
    },
    [items]
  )

  return (
    <main className={className + ' ' + styles.product}>
      <Switch>
        <Route key={path} exact path={path}>
          <div className={styles['product__animation-wrapper']}>
            <h1 className={styles.product__title}>{title}</h1>
            <Filters
              filtredLabels={labels}
              getFiltredItems={getFiltredItemsByLabel}
              className={styles.product__filters}
            />
            <ProductItems
              setIsFiltred={setIsFiltred}
              isFiltred={isFiltred}
              infoItemId={infoItemId}
              setInfoItemId={setInfoItemId}
              items={currentItems}
              className={styles.product__items}
            />
          </div>
        </Route>
        <Route key={path + '/:name'} path={`${path}/:name`}>
          <ProductPageItemInfo items={currentItems} />
        </Route>
      </Switch>
    </main>
  )
}

export default ProductPage
