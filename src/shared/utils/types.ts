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
