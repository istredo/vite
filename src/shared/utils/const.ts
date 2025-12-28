export const SORT_OPTIONS = [
  { value: 'name', label: 'По названию (А-Я)' },
  { value: '-name', label: 'По названию (Я-А)' },
  { value: 'price', label: 'По цене (возрастание)' },
  { value: '-price', label: 'По цене (убывание)' },
]
export const PRODUCT_VALUES = {
  ALL: 'all',
  FOOD: 'food',
  CLOTHES: 'clothes',
  ELECTRONICS: 'electronics',
}

export const PRODUCT_LABELS = {
  ALL: 'Все товары',
  FOOD: 'Еда',
  CLOTHES: 'Одежда',
  ELECTRONICS: 'Электроника',
}

export const CATEGORY_OPTIONS = [
  { value: PRODUCT_VALUES.ALL, label: PRODUCT_LABELS.ALL },
  { value: PRODUCT_VALUES.FOOD, label: PRODUCT_LABELS.FOOD },
  { value: PRODUCT_VALUES.CLOTHES, label: PRODUCT_LABELS.CLOTHES },
  { value: PRODUCT_VALUES.ELECTRONICS, label: PRODUCT_LABELS.ELECTRONICS },
]
