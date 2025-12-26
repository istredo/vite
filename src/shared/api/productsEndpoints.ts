import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type {
  GetProductsParams,
  ProductsResponse,
  ServerProductsResponse,
} from '../utils/types'
import { transformProductsResponse } from '../utils/responseTransformers'

export type ProductsEndpointConfig = {
  query: (params: GetProductsParams) => {
    url: string
    params: GetProductsParams
  }
  transformResponse: (response: ServerProductsResponse) => ProductsResponse
  providesTags: (
    result?: ProductsResponse,
    error?: FetchBaseQueryError,
    arg?: GetProductsParams,
  ) => Array<{ type: 'Products'; id?: string | number }>
}

export const productsEndpointsConfig: ProductsEndpointConfig = {
  query: (params: GetProductsParams) => ({
    url: '/products',
    params,
  }),
  transformResponse: transformProductsResponse,
  providesTags: (result) =>
    result
      ? [
          ...result.products.map(({ id }) => ({
            type: 'Products' as const,
            id,
          })),
          { type: 'Products' as const, id: 'LIST' },
        ]
      : [{ type: 'Products' as const, id: 'LIST' }],
}
