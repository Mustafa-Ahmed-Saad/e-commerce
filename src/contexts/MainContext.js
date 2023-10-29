import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";
import useLocalStorage from "use-local-storage";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  // start use Cookies
  const [token, setToken] = useState(
    Cookies.get("token") ? Cookies.get("token") : false
  );

  // start useLocalStorage
  const [wishList, setWishList] = useLocalStorage("wishList", []);
  const [productsCounter, setProductsCounter] = useLocalStorage(
    "productsCounter",
    0
  );
  const [mainColor, setMainColor] = useLocalStorage("main-color", "#0dba0d");
  const [mode, setMode] = useLocalStorage("mode", false);
  const [productsQuantity, setProductsQuantity] = useLocalStorage(
    "productsQuantity",
    {}
  );
  const [allAppProducts, setAllAppProducts] = useLocalStorage(
    "allAppProducts",
    []
  );
  const [userId, setUserId] = useLocalStorage("userId", false);

  async function getWishList(token) {
    if (!(wishList?.length > 0)) {
      // if no wish list in localStorage
      const [data, errorMessage] = await getData("/api/v1/wishlist/", {
        headers: {
          token: token,
        },
      });

      if (data?.data) {
        const newWishlist = data?.data.map(({ id }) => {
          return id;
        });
        setWishList(newWishlist);
      } else {
        console.error(errorMessage);
      }
    }
  }

  // Load token from cookies and wishlist
  useEffect(() => {
    console.log("if token from Main conrtext", token);
    if (token) {
      getWishList(token);
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
        productsCounter,
        setProductsCounter,
        productsQuantity,
        setProductsQuantity,
        userId,
        setUserId,
        loading,
        setLoading,
        allAppProducts,
        setAllAppProducts,
        mode,
        setMode,
        mainColor,
        setMainColor,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
