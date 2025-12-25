import { Filters, Sort } from '../../features'
import { Button } from '../../shared'

export const Header = () => {
  const clearFilters = () => {
    console.log('clearFilters ')
  }
  return (
    <header>
      <Filters />
      <Sort />
      <Button onClick={clearFilters}>Очистить фильтры</Button>
    </header>
  )
}
