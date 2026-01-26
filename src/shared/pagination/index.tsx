import React from 'react'
import styles from '../../widgets/products/products.module.css'

interface PaginationProps {
  currentPage: number
  totalPages?: number
  onNextPage: () => void
  onPrevPage: () => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => (
  <div className={styles.pagination}>
    <button
      className={styles.paginationButton}
      onClick={onPrevPage}
      disabled={currentPage === 1}
    >
      ← Назад
    </button>

    <span className={styles.pageInfo}>
      Страница {currentPage} из {totalPages || 1}
    </span>

    <button
      className={styles.paginationButton}
      onClick={onNextPage}
      disabled={!totalPages || currentPage >= totalPages}
    >
      Вперед →
    </button>
  </div>
)
