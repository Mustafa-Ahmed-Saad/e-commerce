import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Cookies from "js-cookie";
import { getData } from "../helper/api";

import rootReducer from "./rootReducer";
import { getFromLocalStorage } from "../helper/localStorage";
import useLocalStorage from "use-local-storage";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

const initialState = {
  loading: false,
  mainColor: getFromLocalStorage("main-color") || "#0dba0d",
  allAppProducts: getFromLocalStorage("allAppProducts") || [],
};

export default function MainContextProvider({ children }) {
  // ------------------------------
  const [state, dispatch] = useReducer(rootReducer, initialState);
  // ------------------------------

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
  const [mode, setMode] = useLocalStorage("mode", false);
  const [productsQuantity, setProductsQuantity] = useLocalStorage(
    "productsQuantity",
    {}
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
    if (token) {
      getWishList(token);
    }
  }, [token]);

  // You can include other shared state and functions here
  return (
    <MainContext.Provider
      value={{
        // loading,
        ...state,
        dispatch,
        // setLoading,

        token,
        setToken,
        mode,
        setMode,

        userId,
        setUserId,
        wishList,
        setWishList,
        productsQuantity,
        setProductsQuantity,

        productsCounter,
        setProductsCounter,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
