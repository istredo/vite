import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store/store'

const selectCartState = (state: RootState) => state.cart

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items,
)

export const selectCartItemById = (state: RootState, itemId: string) => {
  return selectCartItems(state).find((item) => item.id === itemId)
}

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
)

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
)

export const selectIsCartOpen = createSelector(
  [selectCartState],
  (cart) => cart.isOpen,
)
