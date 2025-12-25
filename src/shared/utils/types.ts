export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
}

export interface ApiResponse {
  products: Product[]
}
