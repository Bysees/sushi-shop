import { IDataItemWithKey, IDataItem, IDataItems } from '../types/productItems'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { uniqueId } from 'lodash'
import { RootState } from '../store'

type fetchedItemsWithKeys = Record<
  keyof IDataItems<IDataItemWithKey>,
  IDataItemWithKey[]
>

export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>

function getCopyItemsWithKeys(items: IDataItem[]): IDataItemWithKey[] {
  return items.map((item): IDataItemWithKey => {
    return { ...item, key: uniqueId('key_') }
  })
}

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get<IDataItems<IDataItem>>(
        `http://localhost:3001/api/items`
      )

      const itemsWithKeys: fetchedItemsWithKeys = {
        rolls: [],
        sushi: [],
      }

      getKeys(response.data).forEach((key) => {
        itemsWithKeys[key] = getCopyItemsWithKeys(response.data[key])
      })

      return itemsWithKeys
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const initialState: IDataItems<IDataItemWithKey> = {
  rolls: [],
  sushi: [],
}

const productItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.rolls = action.payload.rolls
      state.sushi = action.payload.sushi
    })
    //! Здесь можно обработать ошибку
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.log('Произошла ошибка, информация тут: ', action)
    })
  },
})

//? it selector
export const getItems = ({ items }: RootState) => items

export default productItemsSlice.reducer
