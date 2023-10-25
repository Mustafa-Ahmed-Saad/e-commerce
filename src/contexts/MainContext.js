import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

// start get local storage functions -------------------------------------------------------
function getStoredProductsCounter() {
  const storedCounter = localStorage.getItem("productsCounter");
  return storedCounter ? JSON.parse(storedCounter) : 0;
}

function getStoredMainColor() {
  const storedMainColor = localStorage.getItem("main-color");
  return storedMainColor ? JSON.parse(storedMainColor) : false;
}

function getStoredAllAppProducts() {
  const storedAllAppProducts = localStorage.getItem("allAppProducts");
  return storedAllAppProducts ? JSON.parse(storedAllAppProducts) : [];
}

function getStoredMode() {
  const storedMode = localStorage.getItem("mode");
  return storedMode ? JSON.parse(storedMode) : false;
}

function getStoredWishList() {
  const storedWishList = localStorage.getItem("wishList");
  return storedWishList ? JSON.parse(storedWishList) : [];
}

function getStoredProductsQuantity() {
  const storedQuantity = localStorage.getItem("productsQuantity");
  return storedQuantity ? JSON.parse(storedQuantity) : {};
}

function getStoredUserId() {
  const storedUserId = localStorage.getItem("userId");
  return storedUserId ? JSON.parse(storedUserId) : false;
}

function getStoredToken() {
  const userToken = Cookies.get("token");
  // return userToken ? JSON.parse(userToken) : false;
  return userToken ? userToken : false;
}
// end get local storage functions -------------------------------------------------------

export default function MainContextProvider({ children }) {
  const [token, setToken] = useState(getStoredToken);
  const [wishList, setWishList] = useState(getStoredWishList);
  const [mainColor, setMainColor] = useState(getStoredMainColor);
  const [mode, setMode] = useState(getStoredMode);
  const [productsCounter, setProductsCounter] = useState(
    getStoredProductsCounter
  );
  const [productsQuantity, setProductsQuantity] = useState(
    getStoredProductsQuantity
  );
  const [allAppProducts, setAllAppProducts] = useState(getStoredAllAppProducts);
  const [userId, setUserId] = useState(getStoredUserId);
  const [loading, setLoading] = useState(false);

  // Load token from cookies and wishlist
  useEffect(() => {
    if (token) {
      getWishList(token);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("productsCounter", JSON.stringify(productsCounter));
  }, [productsCounter]);

  useEffect(() => {
    localStorage.setItem("main-color", JSON.stringify(mainColor));
  }, [mainColor]);

  useEffect(() => {
    localStorage.setItem("productsQuantity", JSON.stringify(productsQuantity));
  }, [productsQuantity]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("allAppProducts", JSON.stringify(allAppProducts));
  }, [allAppProducts]);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  async function getWishList(token) {
    console.log("!" + (wishList.length > 0) + "........");
    if (!(wishList.length > 0)) {
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
