import { memo } from 'react'
import { useDispatch } from 'react-redux'
import styles from './productCard.module.css'
import { Button, useAppSelector } from '../../shared'
import { addToCart, toggleCart } from '../../entities/cart/cartSlice'
import { selectCartItemById } from '../cart/cartSelectors'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export const ProductCard = memo(
  ({ id, name, description, price, category, image }: ProductCardProps) => {
    const dispatch = useDispatch()
    const cartItem = useAppSelector((state) => selectCartItemById(state, id))

    const formatPrice = (price: number): string => {
      return price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
      })
    }

    const handleAddToCart = () => {
      dispatch(
        addToCart({
          id: id,
          name: name,
          price: price,
          image: image,
          quantity: 1,
          category: category,
        }),
      )
    }
    const handleClick = () => {
      dispatch(toggleCart())
    }

    return (
      <div className={styles.product_card}>
        <div className={styles.header}>
          <span className={styles.category}>{category}</span>
          <span className={styles.id}>#{id}</span>
        </div>

        <div className={styles.content}>
          {image && (
            <img
              src={image}
              alt={name}
              className={styles.image}
              loading='lazy'
            />
          )}
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          {cartItem ? (
            <div className={styles.cartControls}>
              <div className={styles.inCart}>
                В корзине: {cartItem.quantity} шт.
              </div>
              <button onClick={handleClick} className={styles.goToCartButton}>
                Перейти
              </button>
            </div>
          ) : (
            <Button onClick={handleAddToCart}>В корзину</Button>
          )}
        </div>
      </div>
    )
  },
)
