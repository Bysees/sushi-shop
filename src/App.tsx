import { Header, ProductPage, Footer } from './components'
import styles from './App.module.scss'
import { IDataItem } from './types/dataItem'
import { uniqueId } from 'lodash'
import { Route } from 'react-router-dom'
import Basket from './components/Basket/Basket'
import { useEffect, useState } from 'react'
import axios from 'axios'

//! Добавляю key_ для каждого объекта, чтобы можно было выводить инфмормационный блок суши и добавлять его в массив без конфилкта кеев, если использовать id будет конфилкт, т.к. объект нужно продублировать.
//? В будущем имеет смысл вынести куда-нибудь эту логику, мб в селектор или делать это где-то в редаксе, но не тут же.
export interface IDataItemWithKey extends IDataItem {
  key: string
}

function getCopyItemsWithKeys(items: IDataItem[]): IDataItemWithKey[] {
  return items.map((item): IDataItemWithKey => {
    return { ...item, key: uniqueId('key_') }
  })
}

const App = () => {
  const [sushi, setSushi] = useState<IDataItem[]>([])
  const [sushiDataWithKeys, setSushiDataWithKey] = useState<IDataItemWithKey[]>(
    []
  )

  useEffect(() => {
    const getSushi = async () => {
      const response = await axios.get<IDataItem[]>(
        'http://localhost:3001/api/sushi'
      )
      setSushi(response.data)
    }
    getSushi()
  }, [])

  useEffect(() => {
    if (sushi.length) {
      setSushiDataWithKey(getCopyItemsWithKeys(sushi))
    }
  }, [sushi])

  //@ts-ignore
  window.sushi = sushi
  //@ts-ignore
  window.sushiDataWithKeys = sushiDataWithKeys

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
