import { FC } from 'react'
import List from '../../../../common/List'
import styles from './IngredientsItemsInfo.module.scss'

interface IIngredientsItemsInfo {
  ingredients: string[]
  className?: string
}

const IngredientsItemsInfo: FC<IIngredientsItemsInfo> = ({
  ingredients,
  className,
}) => {
  return (
    <List
      className={className + ' ' + styles.ingredients}
      items={ingredients}
      renderItem={(desc, index, array) => {
        if (array?.length === undefined) return
        if (array?.length - 1 !== index) {
          return (
            <li className={styles.ingredients__item} key={desc}>
              {desc},
            </li>
          )
        }
        return <li key={desc}>{desc}.</li>
      }}
    />
  )
}

export default IngredientsItemsInfo
