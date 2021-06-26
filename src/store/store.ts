import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './basketReducer'
import itemsReducer from './itemsReducer'

const store = configureStore({
  reducer: {
    basket: basketReducer,
    items: itemsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
