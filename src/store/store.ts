import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './basketReducer'

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
