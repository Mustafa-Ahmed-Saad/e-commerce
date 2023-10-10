import { createHashRouter, Navigate } from "react-router-dom";
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
import WishListContextProvider from "../../contexts/WishListContext";

export const routers = createHashRouter([
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
      { path: "brands", element: <Brands /> },

      { path: "products", element: <Products /> },
      { path: "products/:id", element: <Product /> },

      { path: "categories", element: <Categories /> },
      { path: "categories/:id", element: <SubCategory /> },

      {
        path: "wishList",
        element: (
          <WishListContextProvider>
            <WishList />
          </WishListContextProvider>
        ),
      },

      { path: "forget-password", element: <ForgetPassword /> },
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
