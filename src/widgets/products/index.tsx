import React, { useState, useEffect } from 'react'
import axios, { type AxiosResponse } from 'axios'
import { ProductCard } from '../../entities'
import type { Product } from '../../shared'
import styles from './products.module.css'

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response: AxiosResponse<Product[]> = await axios.get(
        'http://localhost:3001/products',
      )
      setProducts(response.data)
    } catch (err) {
      setError('Ошибка загрузки товаров')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.container}>
      <h1>Каталог товаров</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
