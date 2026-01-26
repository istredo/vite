import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type {
  GetProductsParams,
  ProductsResponse,
  ServerProductsResponse,
} from '../utils/types'
import { transformProductsResponse } from '../utils/responseTransformers'
import { API_TAG_IDS, TAG_TYPES } from './api.types'

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
          ...result.products.map(({ id }) => {
            return {
              type: TAG_TYPES.PRODUCTS,
              id,
            }
          }),
          { type: TAG_TYPES.PRODUCTS, id: API_TAG_IDS.LIST },
        ]
      : [{ type: TAG_TYPES.PRODUCTS, id: API_TAG_IDS.LIST }],
}
