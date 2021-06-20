import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { Idata } from './data/data'
import { cloneDeep, uniqueId } from 'lodash'
import { Route } from 'react-router-dom'
import Basket from './components/Basket/Basket'
import { useEffect, useState } from 'react'
import axios from 'axios'

//! Добавляю key_ для каждого объекта, чтобы можно было выводить инфмормационнаый блок суши и добавлять его в массив без конфилкта кеев, если использовать id будет конфилкт, т.к. объект нужно продублировать.
//? В будущем имеет смысл вынести куда-нибудь эту логику, мб в селектор или делать это где-то в редаксе, но не тут же.
const getCopyItemsWithKeys = (items: Idata[]) => {
  const copyItems = cloneDeep(items)
  copyItems.forEach((item) => (item.key = uniqueId('key_')))
  return copyItems
}

const App = () => {
  const [sushi, setSushi] = useState<Idata[]>([])

  useEffect(() => {
    const getSushi = async () => {
      const response = await axios.get('http://localhost:3001/api/sushi')
      console.log(response.data)
      setSushi(response.data)
    }
    getSushi()
  }, [])

  const sushiDataWithKeys = getCopyItemsWithKeys(sushi)

  if (!sushiDataWithKeys.length) return <div>Loading...</div>

  return (
    <div className={styles.wrapper}>
      <Header className={styles.headerContainer} />
      <Route path='/basket'>
        <Basket className={styles.mainContainer} />
      </Route>
      <Route exact path='/'>
        <ProductPage
          title={'Суши всех видов'}
          items={sushiDataWithKeys}
          className={styles.mainContainer}
        />
      </Route>
      <Footer className={styles.footerContainer} />
    </div>
  )
}

export default App
