import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GetProductsParams, ProductsResponse } from '../utils/types'
import { transformProductsResponse } from '../utils/responseTransformers'
import { productsEndpointsConfig } from './productsEndpoints'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    paramsSerializer: (params: GetProductsParams) => {
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
      query: productsEndpointsConfig.query,
      transformResponse: transformProductsResponse,
      providesTags: productsEndpointsConfig.providesTags,
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
