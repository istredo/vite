import { useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../shared/utils/redux'
import { setFiltersFromUrl } from './productSlice'

export const RouterSync: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    const sort = searchParams.get('sort') || 'name'
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''

    dispatch(
      setFiltersFromUrl({
        category,
        sort,
        page,
        search,
      }),
    )
  }, [location.search, dispatch])
  return null
}
