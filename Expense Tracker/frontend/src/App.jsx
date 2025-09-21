import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/useContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
        <Toaster
          position="top-center" // ← This controls the position
          toastOptions={{
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </>
  );
};

export default App;

const Root = () => {
  // Check if token exist in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if aurthenticated otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="login" />
  );
};
