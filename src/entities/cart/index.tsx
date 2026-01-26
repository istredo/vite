import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCart, clearCart } from './cartSlice'
import styles from './cart.module.css'
import { CartItem } from '../../features'
import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalItems,
  selectIsCartOpen,
} from './cartSelectors'
import { Link } from 'react-router-dom'

export const Cart = memo(() => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const totalItems = useSelector(selectCartTotalItems)
  const isOpen = useSelector(selectIsCartOpen)

  const handleClose = () => {
    dispatch(closeCart())
  }

  const handleClearCart = () => {
    if (window.confirm('Очистить всю корзину?')) {
      dispatch(clearCart())
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleCheckout = () => {
    alert('Функционал оформления заказа в разработке')
    handleClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className={styles.overlay}
        onClick={handleOverlayClick}
        role='presentation'
      />

      <aside className={styles.cartSidebar}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>
            Корзина
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </h2>

          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label='Закрыть корзину'
          >
            ×
          </button>
        </div>

        <div className={styles.cartContent}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyMessage}>Корзина пуста</p>
              <p className={styles.emptyHint}>Добавьте товары из каталога</p>
              <Link
                to='/'
                className={styles.browseButton}
                onClick={handleClose}
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                ))}
              </div>

              <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                  <span>Товары ({totalItems}):</span>
                  <span>{total.toFixed(2)} ₽</span>
                </div>
                <div className={styles.summaryRow}>
                  <strong>Итого:</strong>
                  <strong>{total.toFixed(2)} ₽</strong>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.cartFooter}>
          {items.length > 0 && (
            <button onClick={handleClearCart} className={styles.clearButton}>
              Очистить корзину
            </button>
          )}

          <Link to='/' className={styles.continueButton} onClick={handleClose}>
            Продолжить покупки
          </Link>

          {items.length > 0 && (
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Оформить заказ
            </button>
          )}
        </div>
      </aside>
    </>
  )
})
