import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../entities/cart/cart.module.css'
import { removeFromCart, updateQuantity } from '../../entities/cart/cartSlice'

interface CartItemProps {
  id: string
  name: string
  price: number
  image?: string
  quantity: number
}

export const CartItem = memo<CartItemProps>(
  ({ id, name, price, image, quantity }) => {
    const dispatch = useDispatch()

    const handleIncrement = () => {
      dispatch(updateQuantity({ id, quantity: quantity + 1 }))
    }

    const handleDecrement = () => {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }))
    }

    const handleRemove = () => {
      dispatch(removeFromCart(id))
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(e.target.value) || 0
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
    const totalPrice = price * quantity

    return (
      <div className={styles.cartItem}>
        {image && (
          <img
            src={image}
            alt={name}
            className={styles.cartItemImage}
            loading='lazy'
          />
        )}

        <div className={styles.cartItemDetails}>
          <h4 className={styles.cartItemName}>{name}</h4>
          <p className={styles.cartItemPrice}>
            {price.toFixed(2)} ₽ × {quantity}
          </p>
          <p className={styles.cartItemTotal}>
            Итого: {totalPrice.toFixed(2)} ₽
          </p>
        </div>

        <div className={styles.cartItemActions}>
          <div className={styles.quantityControls}>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className={styles.quantityButton}
              aria-label='Уменьшить количество'
            >
              −
            </button>

            <input
              type='number'
              min='1'
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
              aria-label='Количество товара'
            />

            <button
              onClick={handleIncrement}
              className={styles.quantityButton}
              aria-label='Увеличить количество'
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className={styles.removeButton}
            aria-label='Удалить товар'
          >
            ×
          </button>
        </div>
      </div>
    )
  },
)
