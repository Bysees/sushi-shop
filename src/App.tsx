import { Header, ProductPage, Footer, Advertisement } from './components'
import './reset-styles.css'
import styles from './App.module.scss'
import { Redirect, Route, Switch } from 'react-router-dom'
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
  if (!items.sushi.length) {
    return <div style={{ flex: '1 0 auto' }}>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      <Header className={styles.headerContainer} />

      <Switch>
        <Route path='/basket'>
          <Basket className={styles.mainContainer} />
        </Route>
        {/* //! массив */}
        {/* {getProductItems(items).map((item) => {
          return (
            <Route key={item.path} path={item.path}>
              <ProductPage
                title={item.title}
                items={item.items}
                className={styles.mainContainer}
              />
            </Route>
          )
        })} */}
        {/* //! не массив */}
        <Route key={'rolls'} path={'/rolls'}>
          <ProductPage
            title={'Роллы'}
            items={items.rolls}
            className={styles.mainContainer}
          />
        </Route>
        <Route key={'sushi'} path={'/sushi'}>
          <ProductPage
            title={'Суши'}
            items={items.sushi}
            className={styles.mainContainer}
          />
        </Route>
        <Redirect to='/sushi' />
      </Switch>
      <Advertisement />
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
