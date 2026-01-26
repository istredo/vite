import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createParamsSerializer } from '../utils/paramsSerializer'
import { REDUCER_PATH, TAG_TYPES } from './api.types'

export const createBaseQuery = () => {
  const paramsSerializer = createParamsSerializer()

  return fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    paramsSerializer,
  })
}

export const apiConfig = {
  tagTypes: Object.values(TAG_TYPES) as [typeof TAG_TYPES.PRODUCTS],
  reducerPath: REDUCER_PATH,
  baseQuery: createBaseQuery(),
}
