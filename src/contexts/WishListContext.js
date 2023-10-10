import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../helper/api";
import { useContextAuth } from "./AuthContext";

const WishListContext = createContext();

export function useContextWishList() {
  return useContext(WishListContext);
}

export default function WishListContextProvider({ children }) {
  const { token } = useContextAuth();
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  async function getWishList() {
    if (token) {
      // TODO: getWishList and call api ...
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

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContext.Provider>
  );
}
