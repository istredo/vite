import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CartButton.module.css'
import { selectCartTotalItems } from '../../entities/cart/cartSelectors'
import { toggleCart } from '../../entities/cart/cartSlice'

export const CartButton = memo(() => {
  const dispatch = useDispatch()
  const totalItems = useSelector(selectCartTotalItems)

  const handleClick = () => {
    dispatch(toggleCart())
  }

  return (
    <button
      className={styles.cartButton}
      onClick={handleClick}
      aria-label='Открыть корзину'
    >
      <span className={styles.cartIcon}>🛒</span>
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </button>
  )
})
