import React from 'react'
import styles from '../../widgets/products/products.module.css'

interface ProductsHeaderProps {
  totalItems: number
  category: string
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  totalItems,
  category,
}) => {
  const getCategoryLabel = (cat: string): string => {
    const labels: Record<string, string> = {
      food: 'Еда',
      clothes: 'Одежда',
      electronics: 'Электроника',
      all: 'Все товары',
    }
    return labels[cat] || cat
  }

  return (
    <div className={styles.header}>
      <h1>Каталог товаров</h1>
      <div className={styles.paginationInfo}>
        <span>Найдено товаров: {totalItems}</span>
        {category !== 'all' && (
          <span> • Категория: {getCategoryLabel(category)}</span>
        )}
      </div>
    </div>
  )
}
