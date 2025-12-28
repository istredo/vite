import React from 'react'
import styles from '../../widgets/products/products.module.css'

interface ProductsHeaderProps {
  totalItems: number
  category: string
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  totalItems,
}) => {
  return (
    <div className={styles.header}>
      <h1>Каталог товаров</h1>
      <div className={styles.paginationInfo}>
        <span>Найдено товаров: {totalItems}</span>
      </div>
    </div>
  )
}
