import { Link, useLocation } from 'react-router-dom'
import { Filters, Category } from '../../features'
import { Button, useAppDispatch } from '../../shared'
import { clearFilters } from '../products/productSlice'
import { CartButton } from '../../shared/cartButton'
import styles from './Header.module.css'

export const Header = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const isCatalogPage = ['/', '/catalog', '/category'].some((path) =>
    location.pathname.startsWith(path),
  )

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to='/' className={styles.logo}>
            Магазинус
          </Link>
        </div>

        {isCatalogPage && (
          <div className={styles.centerSection}>
            <div className={styles.filtersWrapper}>
              <Filters />
              <Category />
              <Button onClick={handleClearFilters}>Очистить фильтры</Button>
            </div>
          </div>
        )}

        <CartButton />
      </div>
    </header>
  )
}
