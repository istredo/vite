import { memo } from 'react'
import {
  CATEGORY_OPTIONS,
  Select,
  useAppDispatch,
  useAppSelector,
} from '../../shared'
import { setCategory } from '../../widgets/products/productSlice'
import styles from './category.module.css'
export const Category = memo(() => {
  const dispatch = useAppDispatch()

  const { category } = useAppSelector((state) => state.product)

  return (
    <div className={styles.filter}>
      <Select
        label='Категория:'
        value={category}
        onChange={(value) => dispatch(setCategory(value))}
        options={CATEGORY_OPTIONS}
        id='category'
      />
    </div>
  )
})
