import { Route, Routes } from 'react-router-dom'
import { Header, Products } from '../../widgets'
import { RouterSync } from '../../shared'
import { Cart } from '../../entities'
import { useUrlSync } from '../../shared'

export const Layout = () => {
  useUrlSync()
  return (
    <>
      <RouterSync />
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/catalog' element={<Products />} />
        <Route path='/category/:category' element={<Products />} />
      </Routes>
      <Cart />
    </>
  )
}
