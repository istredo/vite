import { useAppDispatch, useAppSelector } from '../../shared'
import { setCategory } from '../../widgets/products/productSlice'
import styles from './category.module.css'
export const Category = () => {
  const dispatch = useAppDispatch()
  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory))
  }
  const { category } = useAppSelector((state) => state.product)
  return (
    <div className={styles.filter}>
      <label htmlFor='category'>Категория: </label>
      <select
        id='category'
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value='all'>Все товары</option>
        <option value='food'>Еда</option>
        <option value='clothes'>Одежда</option>
        <option value='electronics'>Электроника</option>
      </select>
    </div>
  )
}
