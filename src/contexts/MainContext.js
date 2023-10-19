import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";
import jwt_decode from "jwt-decode";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [wishList, setWishList] = useState(getStoredWishList());
  const [mode, setMode] = useState(getStoredMode());
  const [productsCounter, setProductsCounter] = useState(
    getStoredProductsCounter()
  );
  const [productsQuantity, setProductsQuantity] = useState(
    getStoredProductsQuantity()
  );
  const [allAppProducts, setAllAppProducts] = useState(
    getStoredAllAppProducts()
  );
  const [userId, setUserId] = useState(getStoredUserId());
  const [loading, setLoading] = useState(false);

  // Update productCardCounter and save it to local storage
  function getStoredProductsCounter() {
    const storedCounter = localStorage.getItem("productsCounter");
    return storedCounter ? JSON.parse(storedCounter) : 0;
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

  // Load token from cookies and wishlist
  useEffect(() => {
    if (token) {
      //  decode token
      const decoded = jwt_decode(token);
      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // Calculate the difference between expiration and current timestamps
      const timeDifferenceSeconds = decoded.exp - currentTimestamp;
      // Calculate the time difference in days
      const timeDifferenceDays = Math.ceil(
        timeDifferenceSeconds / (60 * 60 * 24)
      );
      Cookies.set("token", token, { expires: timeDifferenceDays }); // Expires in ... days
      getWishList(token);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("productsCounter", JSON.stringify(productsCounter));
  }, [productsCounter]);

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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
