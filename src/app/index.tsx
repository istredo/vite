import { Provider } from 'react-redux'
import { Cart } from '../entities'
import { Layout } from '../pages'
import './App.css'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}
