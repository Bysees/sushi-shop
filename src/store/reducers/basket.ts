import { IDataItemWithKey } from './../types/productItems'
import { RootState } from './../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  addItemType,
  BasketState,
  orderedItemType,
  RemoveItemType,
  SubtractItemType,
} from '../types/basket'

const initialState: BasketState = {
  totalCount: 0,
  amount: 0,
  orderedItems: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<addItemType>) => {
      const hasItem = state.orderedItems.find((item) => {
        if (item.id === action.payload.id) {
          item.totalPrice += action.payload.price
          item.count += 1
          return item
        }
        return null
      })

      if (!hasItem) {
        state.orderedItems.push({
          id: action.payload.id,
          totalPrice: action.payload.price,
          count: 1,
        })
      }
      //! Возможно имеет смысл вынести логику с добавлением / убавлением amount и totalCount
      //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
      state.amount = state.orderedItems.reduce(
        (acum, item) => acum + item.totalPrice,
        0
      )
      state.totalCount = state.orderedItems.reduce(
        (acum, item) => acum + item.count,
        0
      )
    },
    subtractItem: (state, action: PayloadAction<SubtractItemType>) => {
      state.orderedItems.forEach((item) => {
        if (item.id === action.payload.id && item.count !== 0) {
          item.totalPrice -= action.payload.price
          item.count -= 1
          //! Возможно имеет смысл вынести логику с добавлением / убавлением amount и totalCount
          //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
          state.amount -= action.payload.price
          state.totalCount -= 1
        }
      })

      state.orderedItems = state.orderedItems.filter((item) => item.count !== 0)
    },
    removeItem: (state, action: PayloadAction<RemoveItemType>) => {
      state.orderedItems.forEach((item) => {
        if (item.id === action.payload.id) {
          state.amount -= item.totalPrice
          state.totalCount -= item.count
        }
      })
      state.orderedItems = state.orderedItems.filter(
        (item) => item.id !== action.payload.id
      )
    },
  },
})

//? selectors

export const getOrderedItems = ({
  basket: { orderedItems },
  items,
}: RootState): orderedItemType[] => {
  //! Возможно сделать 2 вложенных цикла гораздо лучше чем все эти копии, сортировки и сомнительный while, но пока оставлю так.
  const resultItems = [] as orderedItemType[]

  const itemsCopy: IDataItemWithKey[] = Object.values(items).flat().concat()
  const orderedItemsCopy = orderedItems.concat()

  const sortById = (a: { id: string }, b: { id: string }) => {
    return a.id < b.id ? -1 : 1
  }

  itemsCopy.sort(sortById)
  orderedItemsCopy.sort(sortById)

  let i = 0
  let o = 0
  while (itemsCopy.length > i && orderedItemsCopy.length > o) {
    if (itemsCopy[i].id !== orderedItemsCopy[o].id) {
      i++
    }
    if (itemsCopy[i].id === orderedItemsCopy[o].id) {
      resultItems.push({
        'totalPrice': orderedItemsCopy[o].totalPrice,
        'count': orderedItemsCopy[o].count,
        'price': itemsCopy[i].price,
        'img': itemsCopy[i].img,
        'title': itemsCopy[i].title,
        'id': itemsCopy[i].id,
      })
      i = 0
      o++
    }
  }

  return resultItems
}

export const getOrderedItemsCount = (
  { basket: { orderedItems } }: RootState,
  id: string
) => {
  let count = 0
  orderedItems.forEach((order) => {
    if (order.id === id) {
      count = order.count
    }
  })

  return count
}

export const actions = basketSlice.actions
export default basketSlice.reducer
