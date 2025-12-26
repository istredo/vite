import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './productCard.module.css'
import { useAppSelector, type Product } from '../../shared'
import { addToCart } from '../../entities/cart/cartSlice'
import { selectCartItemById } from '../cart/cartSelectors'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const dispatch = useDispatch()
  const cartItem = useAppSelector((state) =>
    selectCartItemById(state, product.id),
  )

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    })
  }

  const handleAddToCart = useCallback(() => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
      }),
    )
  }, [dispatch, product])

  return (
    <div className={styles.product_card}>
      <div className={styles.header}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.id}>#{product.id}</span>
      </div>

      <div className={styles.content}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading='lazy'
          />
        )}
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        {cartItem ? (
          <div className={styles.cartControls}>
            <Link to='/cart' className={styles.viewCartButton}>
              В корзине: {cartItem.quantity} шт.
            </Link>
            <Link to='/cart' className={styles.goToCartButton}>
              Перейти
            </Link>
          </div>
        ) : (
          <button onClick={handleAddToCart} className={styles.button}>
            В корзину
          </button>
        )}
      </div>
    </div>
  )
})
