import { FC } from 'react'
import styles from './IngredientsItemsInfo.module.scss'

interface IIngredientsItemsInfo {
  ingredients: string[]
  className?: string
}

const IngredientsItemsInfo: FC<IIngredientsItemsInfo> = ({
  ingredients,
  className,
}) => {
  const ingredientsText = ingredients.map((item, index) => {
    const lastIngredientIndex = ingredients.length - 1
    if (lastIngredientIndex !== index) {
      return (
        <span key={item} className={styles.ingredients__item}>
          {item},
        </span>
      )
    }
    return <span key={item}>{item}.</span>
  })

  return (
    <div className={className + ' ' + styles.ingredients}>
      {ingredientsText}
    </div>
  )
}

export default IngredientsItemsInfo
