import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";
import Loading from "./../components/locading/Loading";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  const [token, setToken] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [productsCounter, setProductsCounter] = useState(
    getStoredProductsCounter()
  );
  const [productsQuantity, setProductsQuantity] = useState(
    getStoredProductsQuantity()
  );
  const [userId, setUserId] = useState(getStoredUserId());
  const [loading, setLoading] = useState(false);

  // Load token from cookies
  useEffect(() => {
    const value = Cookies.get("token");
    if (value) {
      setToken(value);
    } else {
      setToken(false);
    }
  }, []);

  // Update productCardCounter and save it to local storage
  function getStoredProductsCounter() {
    const storedCounter = localStorage.getItem("productsCounter");
    return storedCounter ? JSON.parse(storedCounter) : 0;
  }

  function getStoredProductsQuantity() {
    const storedQuantity = localStorage.getItem("productsQuantity");
    return storedQuantity ? JSON.parse(storedQuantity) : {};
  }

  function getStoredUserId() {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? JSON.parse(storedUserId) : false;
  }

  useEffect(() => {
    localStorage.setItem("productsCounter", JSON.stringify(productsCounter));
  }, [productsCounter]);

  useEffect(() => {
    localStorage.setItem("productsQuantity", JSON.stringify(productsQuantity));
  }, [productsQuantity]);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  async function getWishList() {
    if (token) {
      const [data, errorMessage] = await getData("/api/v1/wishlist/", {
        headers: {
          token: token,
        },
      });

      if (data?.data) {
        setWishList(data?.data);
      } else {
        setWishList([]);
        console.log(errorMessage);
      }
    }
  }

  // Load wishList data
  useEffect(() => {
    if (token) {
      getWishList();
    }
  }, [token]);

  // You can include other shared state and functions here

  return (
    <MainContext.Provider
      value={{
        token,
        setToken,
        wishList,
        setWishList,
        cartProducts,
        setCartProducts,
        productsCounter,
        setProductsCounter,
        productsQuantity,
        setProductsQuantity,
        userId,
        setUserId,
        loading,
        setLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}