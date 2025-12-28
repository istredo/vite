import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store/store'

export const selectCartState = (state: RootState) => state.cart
export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartItemById = (state: RootState, itemId: string) => {
  return selectCartItems(state).find((item) => item.id === itemId)
}

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity
    return total + (isNaN(itemTotal) ? 0 : itemTotal)
  }, 0),
)

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    return total + (isNaN(item.quantity) ? 0 : item.quantity)
  }, 0),
)

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen
