import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './reducers/basket'
import productItemsReducer from './reducers/productItems'

const store = configureStore({
  reducer: {
    basket: basketReducer,
    items: productItemsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
