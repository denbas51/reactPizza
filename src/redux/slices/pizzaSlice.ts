import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

type FetchPizzasArgs = {
  order: string
  category: string
  search: string
  currentPage: number
  newSort: string
}

type FetchTodosError = {
  message: string
}

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  FetchPizzasArgs,
  { rejectValue: FetchTodosError }
>("pizza/fetchPizzas", async (params, thunkApi) => {
  const { order, category, search, currentPage, newSort } = params
  try {
    const { data } = await axios.get<PizzaItem[]>(
      `https://630dd63eb37c364eb70c9cc4.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${newSort}&order=${order}${search}`
    )
    return data
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch todos.",
    })
  }
})

export type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: "loading" | "success" | "error"
  error: any
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
  error: "",
}

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = []
      state.status = "loading"
      state.error = ""
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
      state.error = ""
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
      state.status = "error"
      state.error = action.payload
    })
  },
})

export const {} = pizzaSlice.actions

export default pizzaSlice.reducer
