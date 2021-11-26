import {
  IDataItemWithKey,
  IDataItem,
  IDataItems,
  getKeys,
  fetchedItemsWithKeys,
  IProductItemsState,
} from '../types/productItems'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { uniqueId } from 'lodash'
import { RootState } from '../store'

function getCopyItemsWithKeys(items: IDataItem[]): IDataItemWithKey[] {
  return items.map((item): IDataItemWithKey => {
    return { ...item, key: uniqueId('key_') }
  })
}

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get<IDataItems<IDataItem>>(`/api/items`)
      const itemsWithKeys = {} as fetchedItemsWithKeys

      getKeys(response.data).forEach((key) => {
        itemsWithKeys[key] = getCopyItemsWithKeys(response.data[key])
      })

      return itemsWithKeys
    } catch (err) {
      // return rejectWithValue(err.response.data)
      return rejectWithValue(err)
    }
  }
)

const initialState: IProductItemsState<IDataItemWithKey> = {
  items: {
    rolls: [],
    sushi: [],
  },
  infoItemId: null,
}

const productItemsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    //! Добавить Type для экшена!!!
    getInfoItemId: (state, action) => {
      state.infoItemId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
    })
    //! Здесь можно обработать ошибку
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.log('Произошла ошибка, информация тут: ', action)
    })
  },
})

//? selectors
export const getItems = (state: RootState) => state.product.items
export const actions = productItemsSlice.actions

export default productItemsSlice.reducer
