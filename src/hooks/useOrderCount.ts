import { useTypedSelector } from './useTypedSelector'
import { useTypedDispatch } from './useTypedDispatch'
import { addItem } from '../store/reducers/basket'

//! Подумать над тем, можно ли сделать данный хук таким, чтобы использовать его во всех компонентах.
//! То есть добавить сюда substrucItem, removeItem, либо же вообще убрать этот хук и вынести всю хуйню в селектор? Подумать короч.
export const useOrderCount = (
  id: string,
  price: number
): [number, () => void] => {
  const dispatch = useTypedDispatch()

  const orderCount = useTypedSelector(({ basket: { items } }) => {
    //! Вот такой вот уродливый цикл, чтобы типизация работала. Потом наверное переделать.
    let count = 0
    let i = 0
    while (i < items.length) {
      if (items[i].id === id) {
        count = items[i].count
        break
      }
      i++
    }

    return count
  })

  const addOrderCount = () => {
    dispatch(addItem({ id: id, price: price }))
  }

  return [orderCount, addOrderCount]
}
