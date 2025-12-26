import { Select, useAppDispatch, useAppSelector } from '../../shared'
import { setSortBy } from '../../widgets/products/productSlice'
import styles from './filters.module.css'
export const Filters = () => {
  const dispatch = useAppDispatch()

  const { sortBy } = useAppSelector((state) => state.product)

  const sortOptions = [
    { value: 'name', label: 'По названию (А-Я)' },
    { value: '-name', label: 'По названию (Я-А)' },
    { value: 'price', label: 'По цене (возрастание)' },
    { value: '-price', label: 'По цене (убывание)' },
  ]

  return (
    <div className={styles.sort}>
      <Select
        label='Сортировка:'
        value={sortBy}
        onChange={(value) => dispatch(setSortBy(value))}
        options={sortOptions}
        id='sort'
      />
    </div>
  )
}
