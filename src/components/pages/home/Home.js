import React, { useEffect, useState } from "react";
import ShowProducts from "../../showProducts/ShowProducts";
import HomeResponsiveSlider from "../../homeResponsiveSlider/HomeResponsiveSlider";
import MainSlider from "../../mainSlider/MainSlider";
import SearchHome from "../../searchHome/SearchHome";
import { getData } from "../../../helper/api";

export default function Home() {
  // TODO: dont forget add load in this project

  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);

  async function getProducts() {
    const [data, errorMessage] = await getData("/api/v1/products");

    if (data?.data) {
      setProducts(data?.data);
      setProductsToShow(data?.data);
    } else {
      setProducts([]);
      setProductsToShow([]);
      console.log(errorMessage);
    }
  }

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <MainSlider />
      <HomeResponsiveSlider />
      <SearchHome products={products} setProductsToShow={changeProduct} />
      <ShowProducts products={productsToShow} />
    </>
  );
}
