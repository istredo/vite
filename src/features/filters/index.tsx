import {
  Select,
  SORT_OPTIONS,
  useAppDispatch,
  useAppSelector,
} from '../../shared'
import { setSortBy } from '../../widgets/products/productSlice'
import styles from './filters.module.css'
export const Filters = () => {
  const dispatch = useAppDispatch()

  const { sortBy } = useAppSelector((state) => state.product)

  return (
    <div className={styles.sort}>
      <Select
        label='Сортировка:'
        value={sortBy}
        onChange={(value) => dispatch(setSortBy(value))}
        options={SORT_OPTIONS}
        id='sort'
      />
    </div>
  )
}
