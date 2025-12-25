import { useAppDispatch, useAppSelector } from '../../shared'
import { setSortBy } from '../../widgets/products/productSlice'
import styles from './filters.module.css'
export const Filters = () => {
  const dispatch = useAppDispatch()
  const handleSortChange = (newSort: string) => {
    dispatch(setSortBy(newSort))
  }
  const { sortBy } = useAppSelector((state) => state.product)

  return (
    <div className={styles.sort}>
      <label htmlFor='sort'>Сортировка: </label>
      <select
        id='sort'
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value='name'>По названию (А-Я)</option>
        <option value='-name'>По названию (Я-А)</option>
        <option value='price'>По цене (возрастание)</option>
        <option value='-price'>По цене (убывание)</option>
      </select>
    </div>
  )
}
