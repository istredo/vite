import { Filters, Category } from '../../features'
import { Button, useAppDispatch } from '../../shared'
import { clearFilters } from '../products/productSlice'

export const Header = () => {
  const dispatch = useAppDispatch()

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }
  return (
    <header>
      <Filters />
      <Category />
      <Button onClick={handleClearFilters}>Очистить фильтры</Button>
    </header>
  )
}
