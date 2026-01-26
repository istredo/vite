import type { ProductsResponse, ServerProductsResponse } from './types'

export const calculateCurrentPage = (
  response: ServerProductsResponse,
): number => {
  if (response.prev !== null) {
    return response.prev + 1
  }

  if (response.next !== null) {
    return response.next - 1
  }

  return 1
}

export const transformProductsResponse = (
  response: ServerProductsResponse,
): ProductsResponse => {
  const currentPage = calculateCurrentPage(response)

  return {
    products: response.data || [],
    total: response.items || 0,
    page: currentPage,
    pages: response.pages || 1,
    nextPage: response.next,
    prevPage: response.prev,
  }
}
