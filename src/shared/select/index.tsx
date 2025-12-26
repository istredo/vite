import type { ChangeEvent } from 'react'
import styles from './select.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  id?: string
}

export const Select = ({
  label,
  value,
  onChange,
  options,
  id = 'select',
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={styles.selectContainer}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
