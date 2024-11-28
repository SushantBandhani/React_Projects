import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}>        </Route>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/Signup" element={<SignupPage></SignupPage>}>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
