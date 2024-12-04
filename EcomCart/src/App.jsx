import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Checkout from './pages/Checkout'
import CartPage from './features/components/CartPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}>        </Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route path="/cartPage" element={<CartPage></CartPage>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/productDetails" element={<ProductDetailsPage></ProductDetailsPage>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
