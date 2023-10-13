import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound/NotFound";
import Register from "../pages/register/Register";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import VerifyCode from "../pages/verifyCode/VerifyCode";
import Products from "../pages/products/Products";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Test from "../test/Test";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Product from "../pages/products/product/Product";
import SubCategory from "../pages/categories/subCategory/SubCategory";
import WishList from "../pages/wishList/WishList";
import Cart from "../pages/cart/Cart";
import CheckOut from "../pages/checkOut/CheckOut";
import AllOrders from "../pages/allOrders/AllOrders";

export const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // redirect
      { path: "", element: <Navigate to={"home"} /> }, // redirect to /home

      // TODO: protect another pages not home only
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:id",
        element: (
          <ProtectedRoute>
            <SubCategory />
          </ProtectedRoute>
        ),
      },

      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "check-out/:id",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },

      // TODO: handel when user pass ForgetPassword can access VerifyCode and when pass ForgetPassword and VerifyCode can access ResetPassword and make context for each state of this three pages
      // TODO: and setTime out when verify-code send to the email and after this time make state of access this page false and clear this sitTimeout and if pass all three pages successfully and change her password successfully clear all setTime and make all state access of this pages false
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "reset-password", element: <ResetPassword /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "test", element: <Test /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
