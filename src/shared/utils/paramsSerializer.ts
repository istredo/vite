import type { GetProductsParams } from './types'

export const createParamsSerializer = () => {
  return (params: GetProductsParams): string => {
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
            handleSortByParam(value, searchParams)
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
  }
}

const handleSortByParam = (value: string, searchParams: URLSearchParams) => {
  const sortMap: Record<string, string> = {
    name: 'name',
    '-name': '-name',
    price: 'price',
    '-price': '-price',
  }

  const sortValue = sortMap[value]
  if (sortValue) {
    searchParams.append('_sort', sortValue)
  }
}
