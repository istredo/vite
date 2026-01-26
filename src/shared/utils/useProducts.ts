import { useEffect } from 'react'
import { useGetProductsQuery } from '../../shared/api/productsApi'
import { useAppSelector } from '../../shared'

export const useProducts = () => {
  const { category, sortBy, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.product,
  )

  const queryParams = {
    category: category !== 'all' ? category : undefined,
    sortBy,
    page: currentPage,
    limit: itemsPerPage,
  }

  const { data, isLoading, error } = useGetProductsQuery(queryParams)

  useEffect(() => {
    console.log('Products debug:', {
      category,
      sortBy,
      currentPage,
      itemsPerPage,
      data,
      isLoading,
      error,
    })
  }, [category, sortBy, currentPage, itemsPerPage, data, isLoading, error])

  return {
    products: data?.products || [],
    totalItems: data?.total || 0,
    totalPages: data?.pages,
    isLoading,
    error,
  }
}
