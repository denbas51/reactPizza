import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SortItem } from "../../assets/constans"

// type Sort = {
//   name: string
//   sortProp: "rating" | "title" | "price"
// }

interface filterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: SortItem
}

const initialState: filterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProp: "rating",
  },
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchValue, setCategoryId, setSort, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
