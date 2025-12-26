import { Select, useAppDispatch, useAppSelector } from '../../shared'
import { setCategory } from '../../widgets/products/productSlice'
import styles from './category.module.css'
export const Category = () => {
  const dispatch = useAppDispatch()

  const { category } = useAppSelector((state) => state.product)

  const categoryOptions = [
    { value: 'all', label: 'Все товары' },
    { value: 'food', label: 'Еда' },
    { value: 'clothes', label: 'Одежда' },
    { value: 'electronics', label: 'Электроника' },
  ]
  return (
    <div className={styles.filter}>
      <Select
        label='Категория:'
        value={category}
        onChange={(value) => dispatch(setCategory(value))}
        options={categoryOptions}
        id='category'
      />
    </div>
  )
}
