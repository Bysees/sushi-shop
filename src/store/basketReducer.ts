import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type addItemType = {
  id: number
  price: number
}

type RemoveItemType = addItemType

export type ItemsType = {
  id: null | number
  price: number
  count: number
}

export type InitialStateType = {
  totalCount: number
  amount: number
  items: ItemsType[]
  fetchedItems: any[]
}

const initialState: InitialStateType = {
  totalCount: 0,
  amount: 0,
  items: [],
  fetchedItems: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<addItemType>) => {
      const hasItem = state.items.find((item) => {
        if (item.id === action.payload.id) {
          item.price += action.payload.price
          item.count += 1
          return item
        }
        return null
      })

      if (!hasItem) {
        state.items.push({
          id: action.payload.id,
          price: action.payload.price,
          count: 1,
        })
      }
      //! Возможно имеет смысл вынести логику с добавлением / удалением amount и totalCount
      //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
      state.amount = state.items.reduce((acum, item) => acum + item.price, 0)
      state.totalCount = state.items.reduce(
        (acum, item) => acum + item.count,
        0
      )
    },
    removeItem: (state, action: PayloadAction<RemoveItemType>) => {
      state.items.forEach((item) => {
        if (item.id === action.payload.id && item.count !== 0) {
          item.price -= action.payload.price
          item.count -= 1
          //! Возможно имеет смысл вынести логику с добавлением / удалением amount и totalCount
          //! в отдельные экшены, но эта логика будет использоваться только тут, и короче пока не знаю.
          state.amount -= action.payload.price
          state.totalCount -= 1
        }
      })

      state.items = state.items.filter((item) => item.count !== 0)
    },
    getFetchedItems: (state, action) => {
      state.fetchedItems = action.payload
    },
  },
})

export const { addItem, removeItem, getFetchedItems } = basketSlice.actions
export default basketSlice.reducer
