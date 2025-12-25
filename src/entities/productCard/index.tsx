import React from 'react'
import styles from './productCard.module.css'
import type { Product } from '../../shared'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    })
  }

  return (
    <div className={styles.product_card}>
      <div className={styles.header}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.id}>#{product.id}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <button className={styles.button}>В корзину</button>
      </div>
    </div>
  )
}
