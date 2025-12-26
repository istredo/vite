import { useCallback, useEffect, useState } from 'react'

export const useUrlSync = (
  params: { category: string; sortBy: string; currentPage: number },
  delay = 100,
) => {
  const [isUrlUpdateEnabled, setIsUrlUpdateEnabled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsUrlUpdateEnabled(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const updateUrl = useCallback(() => {
    if (!isUrlUpdateEnabled) return

    const { category, sortBy, currentPage } = params
    const newParams: Record<string, string> = {}

    if (category !== 'all') newParams.category = category
    if (sortBy !== 'name') newParams.sort = sortBy
    if (currentPage !== 1) newParams.page = currentPage.toString()

    const searchParams = new URLSearchParams(window.location.search)
    const currentParams = Object.fromEntries(searchParams.entries())

    if (JSON.stringify(currentParams) !== JSON.stringify(newParams)) {
      const newSearch = new URLSearchParams(newParams).toString()
      window.history.replaceState({}, '', `?${newSearch}`)
    }
  }, [params, isUrlUpdateEnabled])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])
}
