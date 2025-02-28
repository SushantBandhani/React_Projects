import react from 'react'
import {BrowserRouter as Router, Routes,Route,Navigate} from "react-router-dom"
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'

const App=()=>{
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Home />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/expense" element={<Expense />}></Route>
      </Routes>

    </Router>
  </div>
}

export default App


const Root=()=>{
  // Check if token exist in local storage
  const isAuthenticated=!!localStorage.getItem("token");

  // Redirect to dashboard if aurthenticated otherwise to login
  return isAuthenticated?(<Navigate to="/dashboard" />) : (<Navigate to="login" />)
}