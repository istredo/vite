import React, { useCallback, useEffect, useState } from 'react'
import { ProductCard } from '../../entities'
import styles from './products.module.css'
import { useGetProductsQuery } from '../../shared/api/productsApi'
import { setCurrentPage } from './productSlice'
import { useAppDispatch, useAppSelector } from '../../shared'
import { RouterSync } from './RouterSync'
export const Products: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isUrlUpdateEnabled, setIsUrlUpdateEnabled] = useState(false)

  const { category, sortBy, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.product,
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsUrlUpdateEnabled(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const updateUrl = useCallback(() => {
    if (!isUrlUpdateEnabled) return

    const params: Record<string, string> = {}
    if (category !== 'all') params.category = category
    if (sortBy !== 'name') params.sort = sortBy
    if (currentPage !== 1) params.page = currentPage.toString()

    const searchParams = new URLSearchParams(window.location.search)
    const currentParams = Object.fromEntries(searchParams.entries())

    if (JSON.stringify(currentParams) !== JSON.stringify(params)) {
      const newSearch = new URLSearchParams(params).toString()
      window.history.replaceState({}, '', `?${newSearch}`)
    }
  }, [category, sortBy, currentPage, isUrlUpdateEnabled])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])

  const { data, isLoading, error } = useGetProductsQuery({
    category: category !== 'all' ? category : undefined,
    sortBy,
    page: currentPage,
    limit: itemsPerPage,
  })

  useEffect(() => {
    console.log('Products debug:', {
      category,
      sortBy,
      currentPage,
      itemsPerPage,
      data,
      isLoading,
      error,
    })
  }, [category, sortBy, currentPage, data, isLoading, error])

  const handleNextPage = () => {
    if (data && currentPage < data.pages) {
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

  const products = data?.products || []
  const totalItems = data?.total || 0

  console.log('Rendering products:', products)

  return (
    <>
      <RouterSync />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Каталог товаров</h1>

          <div className={styles.paginationInfo}>
            <span>Найдено товаров: {totalItems}</span>
            {category !== 'all' && (
              <span> • Категория: {getCategoryLabel(category)}</span>
            )}
          </div>
        </div>

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
              {products.map((product) => {
                console.log('Rendering product:', product)
                return <ProductCard key={product.id} product={product} />
              })}
            </div>

            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                ← Назад
              </button>

              <span className={styles.pageInfo}>
                Страница {currentPage} из {data?.pages || 1}
              </span>

              <button
                className={styles.paginationButton}
                onClick={handleNextPage}
                disabled={!data || currentPage >= data.pages}
              >
                Вперед →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    food: 'Еда',
    clothes: 'Одежда',
    electronics: 'Электроника',
    all: 'Все товары',
  }
  return labels[category] || category
}
