import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { Route } from 'react-router-dom'
import Basket from './components/Basket/Basket'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.headerContainer} />
      <Route path='/basket'>
        <Basket items={[]} className={styles.mainContainer} />
      </Route>
      <Route exact path='/'>
        <div
          style={{ textAlign: 'center', fontSize: '3rem', marginTop: 50 }}
          className={styles.mainContainer}>
          Главная
        </div>
      </Route>
      <Route path='/sushi'>
        <ProductPage
          title={'Суши всех видов'}
          itemsName={'sushi'}
          className={styles.mainContainer}
        />
      </Route>
      <Route path='/rolls'>
        <ProductPage
          title={'Роллы всех видов'}
          itemsName={'rolls'}
          className={styles.mainContainer}
        />
      </Route>
      <Footer className={styles.footerContainer} />
    </div>
  )
}

export default App
