import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { sushiData } from './data/data'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.headerContainer} />
      <ProductPage
        title={'Суши всех видов'}
        items={sushiData}
        className={styles.mainContainer}
      />
      <Footer className={styles.footerContainer} />
    </div>
  )
}

export default App
