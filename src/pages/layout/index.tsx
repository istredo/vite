import { Route, Routes } from 'react-router-dom'
import { Header, Products } from '../../widgets'
import { RouterSync } from '../../widgets/products/RouterSync'
import { Cart } from '../../entities'

export const Layout = () => {
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
