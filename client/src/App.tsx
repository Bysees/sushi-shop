import { Header, ProductPage, Footer, Advertisement } from './components'
import './reset-styles.css'
import styles from './App.module.scss'
import Basket from './components/Basket/Basket'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useTypedDispatch } from './hooks/useTypedDispatch'
import { fetchItems, getItems } from './store/reducers/productItems'
import Loader from './components/Loader/Loader'
import { getProductItems } from './routes/productOptions'
import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  const items = useTypedSelector(getItems)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  if (!items.sushi.length) return <Loader />

  return (
    <div className={styles.wrapper}>
      <Header className={styles.headerContainer} />
      <Switch>
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
      </Switch>
      <Advertisement />
      <Footer className={styles.footerContainer} />
    </div>
  )
}

export default App
