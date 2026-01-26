import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from './redux'

export const useUrlSync = () => {
  const [isUrlUpdateEnabled, setIsUrlUpdateEnabled] = useState(false)
  const location = useLocation()

  const { category, sortBy, currentPage } = useAppSelector(
    (state) => state.product,
  )
  const isCartOpen = useAppSelector((state) => state.cart.isOpen)

  useEffect(() => {
    const timer = setTimeout(() => setIsUrlUpdateEnabled(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const updateUrl = useCallback(() => {
    if (!isUrlUpdateEnabled) return

    const params: Record<string, string> = {}

    if (location.pathname !== '/cart') {
      if (category !== 'all') params.category = category
      if (sortBy !== 'name') params.sort = sortBy
      if (currentPage !== 1) params.page = currentPage.toString()
    }

    if (isCartOpen) {
      params.cart = 'open'
    }

    const searchParams = new URLSearchParams(window.location.search)
    const currentParams = Object.fromEntries(searchParams.entries())

    if (JSON.stringify(currentParams) !== JSON.stringify(params)) {
      const newSearch = new URLSearchParams(params).toString()
      const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`

      window.history.replaceState({}, '', newUrl)
    }
  }, [
    location.pathname,
    category,
    sortBy,
    currentPage,
    isCartOpen,
    isUrlUpdateEnabled,
  ])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])
}
