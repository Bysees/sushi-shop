import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { Route } from 'react-router-dom'
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
      <Header className={styles.headerContainer} />
      <Route path='/basket'>
        <Basket className={styles.mainContainer} />
      </Route>
      <Route exact path='/'>
        <div
          style={{ textAlign: 'center', fontSize: '3rem', marginTop: 50 }}
          className={styles.mainContainer}>
          Главная
        </div>
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
  let key: keyof IDataItems<IDataItemWithKey>

  for (key in items) {
    if (key === 'sushi') {
      title = 'Суши всех видов'
      path = '/sushi'
    }
    if (key === 'rolls') {
      title = 'Роллы с новым вкусом'
      path = '/rolls'
    }
    productItems.push({
      title,
      path,
      items: items[key],
    })
  }

  return productItems
}

export default App
