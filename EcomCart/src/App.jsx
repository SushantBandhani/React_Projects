import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./404";
import OrderSuccessPage from "./OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import { ProtectedAdmin } from "./features/auth/components/ProtectedAdminComponent";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home></Home>,
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>,
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <CartPage></CartPage>,
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout></Checkout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <ProtectedRoute>
        <ProductDetailsPage></ProductDetailsPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <ProtectedRoute>
        <OrderSuccessPage></OrderSuccessPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <UserOrders></UserOrders>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfilePage></UserProfilePage>
      </ProtectedRoute>
    ),
  },
  {
    path: "/logout",
    element: (
      <ProtectedRoute>
        <Logout></Logout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ProtectedRoute>
        <ForgotPasswordPage></ForgotPasswordPage>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="App">
      <RecoilRoot>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </RecoilRoot>
    </div>
  );
}

export default App;
