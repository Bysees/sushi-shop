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
      renderItem={(ingredient, index) => {
        const lastIngredientIndex = ingredients.length - 1
        if (lastIngredientIndex !== index) {
          return (
            <li className={styles.ingredients__item} key={ingredient}>
              {ingredient},
            </li>
          )
        }
        return <li key={ingredient}>{ingredient}.</li>
      }}
    />
  )
}

export default IngredientsItemsInfo
