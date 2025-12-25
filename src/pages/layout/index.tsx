import { Route, Routes } from 'react-router-dom'
import { Header, Products } from '../../widgets'

export const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/catalog' element={<Products />} />
        <Route path='/category/:category' element={<Products />} />
      </Routes>
    </>
  )
}
