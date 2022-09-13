import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchValue, setCategoryId, setSort, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
