export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export interface PaginatedResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
  limit: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
  category: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface ServerProductsResponse {
  first: number | null
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Product[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pages: number
  nextPage: number | null
  prevPage: number | null
}

export interface GetProductsParams {
  category?: string
  sortBy?: string
  page?: number
  limit?: number
  search?: string
}
