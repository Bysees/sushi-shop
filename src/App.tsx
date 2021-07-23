import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { Redirect, Route } from 'react-router-dom'
import Basket from './components/Basket/Basket'
import { useEffect } from 'react'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useTypedDispatch } from './hooks/useTypedDispatch'
import { fetchItems, getItems } from './store/reducers/productItems'
import { IDataItems, IDataItemWithKey } from './store/types/productItems'

const App = () => {
  const items = useTypedSelector(getItems)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  //! Пока такого типа проверка, потом сдеать нормальную
  if (!items.rolls.length) {
    return <div style={{ flex: '1 0 auto' }}>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      <Route exact path='/'>
        <Redirect to='/sushi' />
      </Route>

      <Header className={styles.headerContainer} />
      <Route path='/basket'>
        <Basket className={styles.mainContainer} />
      </Route>

      {getProductItems(items).map((item) => {
        return (
          <Route key={item.path} path={item.path}>
            <ProductPage
              title={item.title}
              items={item.items}
              className={styles.mainContainer}
            />
          </Route>
        )
      })}

      <Footer className={styles.footerContainer} />
    </div>
  )
}

function getProductItems(items: IDataItems<IDataItemWithKey>) {
  interface IproductItem {
    title: string
    path: string
    items: IDataItemWithKey[]
  }

  const productItems: IproductItem[] = []
  let title: string = ''
  let path: string = ''
  let item: keyof IDataItems<IDataItemWithKey>

  for (item in items) {
    if (item === 'sushi') {
      title = 'Суши всех видов'
      path = '/sushi'
    }
    if (item === 'rolls') {
      title = 'Роллы с новым вкусом'
      path = '/rolls'
    }
    productItems.push({
      title,
      path,
      items: items[item],
    })
  }

  return productItems
}

export default App
