export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
}

export interface PaginatedResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
  limit: number
}
