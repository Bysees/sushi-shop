import { actions } from '../reducers/productItems'
import store from '../store'

export const setInfoItemId = (id: string | null) => {
  store.dispatch(actions.getInfoItemId(id))
}
