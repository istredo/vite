import React from 'react'
import { ProductCard } from '../../entities'
import styles from './products.module.css'
import { useProductsPagination } from '../../shared'

export const Products: React.FC = () => {
  const {
    products,
    loading,
    error,
    currentPage,
    paginationInfo,
    nextPage,
    prevPage,
  } = useProductsPagination()

  if (loading && products.length === 0) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Каталог товаров</h1>
        <div className={styles.paginationInfo}>
          <span>
            Страница {currentPage} из {paginationInfo.pages}
          </span>
          <span>Всего товаров: {paginationInfo.items}</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>Товары не найдены</p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={prevPage}
              disabled={!paginationInfo.prev}
            >
              ← Назад
            </button>

            <span className={styles.pageInfo}>
              Страница {currentPage} из {paginationInfo.pages}
            </span>

            <button
              className={styles.paginationButton}
              onClick={nextPage}
              disabled={!paginationInfo.next}
            >
              Вперед →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
