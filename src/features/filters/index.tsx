export const Filters = () => {
  return (
    <select>
      <option value='name'>По названию (А-Я)</option>
      <option value='-name'>По названию (Я-А)</option>
      <option value='price'>По цене (возрастание)</option>
      <option value='-price'>По цене (убывание)</option>
    </select>
  )
}
