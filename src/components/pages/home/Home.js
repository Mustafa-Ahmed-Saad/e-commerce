import React, { useEffect, useState } from "react";
import ShowProducts from "../../showProducts/ShowProducts";
import HomeResponsiveSlider from "../../homeResponsiveSlider/HomeResponsiveSlider";
import MainSlider from "../../mainSlider/MainSlider";
import SearchHome from "../../searchHome/SearchHome";
import { getData } from "../../../helper/api";
import WishListContextProvider from "../../../contexts/WishListContext";

export default function Home() {
  // TODO: dont forget add load in this project

  const [products, setProducts] = useState([]);

  async function getProducts() {
    const [data, errorMessage] = await getData("/api/v1/products");

    if (data?.data) {
      setProducts(data?.data);
    } else {
      setProducts([]);
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    // TODO: uncomment this
    // getProducts();
  }, []);

  return (
    <WishListContextProvider>
      <MainSlider />
      <HomeResponsiveSlider />
      <SearchHome />
      <ShowProducts products={products} />
    </WishListContextProvider>
  );
}
