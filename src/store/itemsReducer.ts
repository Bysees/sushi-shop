import { IDataItem } from './../types/dataItem'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { getFetchedItems } from './basketReducer'
import { uniqueId } from 'lodash'
import { IDataItemWithKey } from '../components/ProductPage/ProductPage'
import { RootState } from './store'

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (fetchName: string, thunkAPI) => {
    try {
      const response = await axios.get<IDataItem[]>(
        `http://localhost:3001/api/${fetchName}`
      )
      console.log(thunkAPI.requestId)
      // thunkAPI.dispatch(getFetchedItems(response.data))
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

type currentItemsType = {
  fetchedItems: IDataItem[]
}

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    fetchedItems: [],
  } as currentItemsType,
  reducers: {
    removeItems: (state) => {
      state.fetchedItems = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.fetchedItems = action.payload
    })
    //! Здесь можно обработать ошибку
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.log('Произошла ошибка, информация тут: ', action)
    })
  },
})

//?

function getCopyItemsWithKeys(items: IDataItem[]): IDataItemWithKey[] {
  return items.map((item): IDataItemWithKey => {
    return { ...item, key: uniqueId('key_') }
  })
}

const getItems = (state: RootState) => state.items.fetchedItems

export const getItemsWithKey = createSelector(getItems, (items) =>
  getCopyItemsWithKeys(items)
)

//?

export const { removeItems } = itemsSlice.actions
export default itemsSlice.reducer
