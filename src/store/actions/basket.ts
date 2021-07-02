import { actions } from '../reducers/basket'
import store from '../store'

export const addItem = (id: string, price: number) => {
  store.dispatch(actions.addItem({ id, price }))
}

export const subtractItem = (id: string, price: number) => {
  store.dispatch(actions.subtractItem({ id, price }))
}

export const removeItem = (id: string) => {
  store.dispatch(actions.removeItem({ id }))
}
