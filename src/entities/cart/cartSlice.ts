import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from '../../shared'

const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      return Array.isArray(parsedCart.items) ? parsedCart.items : []
    }
  } catch (error) {
    console.error('Ошибка загрузки корзины из localStorage:', error)
  }
  return []
}

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
}

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify({ items }))
  } catch (error) {
    console.error('Ошибка сохранения корзины в localStorage:', error)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      saveCartToStorage(state.items)
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCartToStorage(state.items)
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)

        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        }
        saveCartToStorage(state.items)
      }
    },

    clearCart: (state) => {
      state.items = []
      saveCartToStorage(state.items)
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },

    openCart: (state) => {
      state.isOpen = true
    },

    closeCart: (state) => {
      state.isOpen = false
    },

    restoreCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  restoreCart,
} = cartSlice.actions

export default cartSlice.reducer
