import { RootState } from './../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getKeys } from './productItems'
import { IBasketItem } from '../../components/Basket/BasketItems/BasketItem/BasketItem'

type addItemType = {
  id: string
  price: number
}

type SubtractItemType = addItemType
type RemoveItemType = { id: string }

type ItemsType = {
  id: null | string
  totalPrice: number
  count: number
}

export type BasketState = {
  totalCount: number
  amount: number
  items: ItemsType[]
}

const initialState: BasketState = {
  totalCount: 0,
  amount: 0,
  items: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<addItemType>) => {
      const hasItem = state.items.find((item) => {
        if (item.id === action.payload.id) {
          item.totalPrice += action.payload.price
          item.count += 1
          return item
        }
        return null
      })

      if (!hasItem) {
        state.items.push({
          id: action.payload.id,
          totalPrice: action.payload.price,
          count: 1,
        })
      }
      //! Возможно имеет смысл вынести логику с добавлением / удалением amount и totalCount
      //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
      state.amount = state.items.reduce(
        (acum, item) => acum + item.totalPrice,
        0
      )
      state.totalCount = state.items.reduce(
        (acum, item) => acum + item.count,
        0
      )
    },
    subtractItem: (state, action: PayloadAction<SubtractItemType>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload.id && item.count !== 0) {
          item.totalPrice -= action.payload.price
          item.count -= 1
          //! Возможно имеет смысл вынести логику с добавлением / удалением amount и totalCount
          //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
          state.amount -= action.payload.price
          state.totalCount -= 1
        }
      })

      state.items = state.items.filter((item) => item.count !== 0)
    },
    removeItem: (state, action: PayloadAction<RemoveItemType>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload.id) {
          console.log(item.totalPrice)
          state.amount -= item.totalPrice
        }
      })
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
  },
})

//? selector
export const getOrderedItems = ({ basket, items }: RootState) => {
  const basketOrderItems: IBasketItem[] = []

  //? Ахуенно я сделал кончено тройную вложенность, теперь надо думать как это преобразовать.
  //! Обязательно разобраться как оптимизировать эти циклы и уменьшить сложность выполнения!
  getKeys(items).forEach((key) => {
    basket.items.forEach((orderItem) => {
      items[key].forEach((item) => {
        if (orderItem.id === item.id) {
          basketOrderItems.push({
            id: orderItem.id,
            totalPrice: orderItem.totalPrice,
            count: orderItem.count,
            price: item.price,
            img: item.img,
            title: item.title,
          })
        }
      })
    })
  })

  return basketOrderItems
}

export const getAmount = ({ basket }: RootState) => basket.amount

export const { addItem, subtractItem, removeItem } = basketSlice.actions
export default basketSlice.reducer
