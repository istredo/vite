import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '../utils/types'

interface GetProductsParams {
  category?: string
  sortBy?: string
  page?: number
  limit?: number
  search?: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pages: number
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          switch (key) {
            case 'page':
              searchParams.append('_page', String(value))
              break
            case 'limit':
              searchParams.append('_per_page', String(value))
              break
            case 'sortBy':
              if (value === 'name') {
                searchParams.append('_sort', 'name')
              } else if (value === '-name') {
                searchParams.append('_sort', '-name')
              } else if (value === 'price') {
                searchParams.append('_sort', 'price')
              } else if (value === '-price') {
                searchParams.append('_sort', '-price')
              }
              break
            case 'category':
              if (value !== 'all') {
                searchParams.append('category', value)
              }
              break
            default:
              searchParams.append(key, String(value))
          }
        }
      })

      return searchParams.toString()
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: (params) => ({
        url: '/products',
        params,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        if (Array.isArray(response)) {
          return {
            products: response,
            total: response.length,
            page: 1,
            pages: 1,
          }
        } else {
          return {
            products: response.data || [],
            total: response.items || 0,
            page: response.page || 1,
            pages: response.pages || 1,
          }
        }
      },
      providesTags: ['Products'],
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
