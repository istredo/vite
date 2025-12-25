import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
  category: string
  sortBy: string
  currentPage: number
  searchQuery: string
  itemsPerPage: number
}

const initialState: ProductState = {
  category: 'all',
  sortBy: 'name',
  currentPage: 1,
  searchQuery: '',
  itemsPerPage: 12,
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      state.currentPage = 1
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    clearFilters(state) {
      state.category = 'all'
      state.sortBy = 'name'
      state.currentPage = 1
      state.searchQuery = ''
    },
    setFiltersFromUrl(
      state,
      action: PayloadAction<{
        category: string
        sort: string
        page: string
        search: string
      }>,
    ) {
      state.category = action.payload.category
      state.sortBy = action.payload.sort
      state.currentPage = parseInt(action.payload.page) || 1
      state.searchQuery = action.payload.search
    },
  },
})

export const {
  setCategory,
  setSortBy,
  setCurrentPage,
  setSearchQuery,
  clearFilters,
  setFiltersFromUrl,
} = productSlice.actions

export default productSlice.reducer
