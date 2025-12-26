import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { createBaseQuery } from './apiConfig'

export type BaseQueryType = ReturnType<typeof createBaseQuery>

export const TAG_TYPES = {
  PRODUCTS: 'Products' as const,
} as const

export type TagTypes = (typeof TAG_TYPES)[keyof typeof TAG_TYPES]

export const REDUCER_PATH = 'productsApi' as const
export type ReducerPath = typeof REDUCER_PATH

export type ApiEndpointBuilder = EndpointBuilder<
  BaseQueryType,
  TagTypes,
  ReducerPath
>
