import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  setCategory,
  setSortBy,
  setCurrentPage,
} from '../../widgets/products/productSlice'
import { closeCart, openCart } from '../../entities/cart/cartSlice'

export const RouterSync = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const category = searchParams.get('category') || 'all'
    const sortBy = searchParams.get('sort') || 'name'
    const page = parseInt(searchParams.get('page') || '1', 10)

    dispatch(setCategory(category))
    dispatch(setSortBy(sortBy))
    dispatch(setCurrentPage(page))

    const cartParam = searchParams.get('cart')

    if (cartParam === 'open') {
      if (location.pathname === '/cart') {
        navigate('/')
      } else {
        dispatch(openCart())
      }
    } else {
      dispatch(closeCart())
    }
  }, [dispatch, location, navigate])

  return null
}
