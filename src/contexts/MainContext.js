import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";

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

  useEffect(() => {
    localStorage.setItem("productsCounter", JSON.stringify(productsCounter));
  }, [productsCounter]);

  async function getWishList() {
    if (token) {
      // TODO: getWishList and call API...
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
