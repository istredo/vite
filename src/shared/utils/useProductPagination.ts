import { useState, useEffect } from 'react'
import axios, { type AxiosResponse } from 'axios'
import type { Product } from '../../shared'

interface ProductsResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Product[]
}

interface UseProductsPaginationReturn {
  products: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  paginationInfo: {
    prev: number | null
    next: number | null
    pages: number
    items: number
  }
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}

export const useProductsPagination = (): UseProductsPaginationReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginationInfo, setPaginationInfo] = useState({
    prev: null as number | null,
    next: null as number | null,
    pages: 1,
    items: 0,
  })

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true)
      const response: AxiosResponse<ProductsResponse> = await axios.get(
        `http://localhost:3001/products?_page=${page}&_per_page=15`,
      )

      const { data, prev, next, pages, items } = response.data
      setProducts(data)
      setPaginationInfo({ prev, next, pages, items })
      setError(null)
    } catch (err) {
      setError('Ошибка загрузки товаров')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
  }, [currentPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationInfo.pages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const nextPage = () => {
    if (paginationInfo.next) {
      setCurrentPage(paginationInfo.next)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevPage = () => {
    if (paginationInfo.prev) {
      setCurrentPage(paginationInfo.prev)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    products,
    loading,
    error,
    currentPage,
    paginationInfo,
    goToPage,
    nextPage,
    prevPage,
  }
}
