import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params, { rejectWithValue }) => {
    const { order, category, search, currentPage, newSort } = params
    try {
      const { data } = await axios.get(
        `https://630dd63eb37c364eb70c9cc4.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${newSort}&order=${order}${search}`
      )
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  status: "loading",
  error: "",
}

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = []
      state.status = "loading"
      state.error = ""
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"
      state.error = ""
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.items = []
      state.status = "error"
      state.error = action.payload
    },
  },
})

export const {} = pizzaSlice.actions

export default pizzaSlice.reducer
