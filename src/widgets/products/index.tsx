import React from 'react'
import { ProductCard } from '../../entities'
import styles from './products.module.css'
import {
  Pagination,
  ProductsHeader,
  useAppDispatch,
  useAppSelector,
  useUrlSync,
} from '../../shared'
import { setCurrentPage } from './productSlice'
import { useProducts } from '../../shared/utils/useProducts'

export const Products: React.FC = () => {
  const dispatch = useAppDispatch()

  const { category, currentPage } = useAppSelector((state) => state.product)

  useUrlSync()

  const { products, totalItems, totalPages, isLoading, error } = useProducts()

  const handleNextPage = () => {
    if (totalPages && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  if (error) {
    console.error('Products API error:', error)
    return <div className={styles.error}>Ошибка при загрузке товаров</div>
  }

  return (
    <div className={styles.container}>
      <ProductsHeader totalItems={totalItems} category={category} />

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>Товары не найдены</p>
          <p className={styles.emptyHint}>
            Попробуйте изменить фильтры или выбрать другую категорию
          </p>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </>
      )}
    </div>
  )
}
