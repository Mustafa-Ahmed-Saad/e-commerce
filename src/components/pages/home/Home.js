import React, { useEffect, useState } from "react";
import ShowProducts from "../../showProducts/ShowProducts";
import HomeResponsiveSlider from "../../homeResponsiveSlider/HomeResponsiveSlider";
import MainSlider from "../../mainSlider/MainSlider";
import SearchHome from "../../searchHome/SearchHome";
import { getData } from "../../../helper/api";
import { useContextMain } from "../../../contexts/MainContext";
import Loading from "../../locading/Loading";

export default function Home() {
  // TODO: dont forget add load in this project

  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const { loading, setLoading } = useContextMain();

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
    setLoading(false);
  }

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  // return
  let ui = <Loading />;
  if (!loading) {
    ui = (
      <>
        <MainSlider />
        <HomeResponsiveSlider />
        <SearchHome products={products} setProductsToShow={changeProduct} />
        <ShowProducts products={productsToShow} />
      </>
    );
  }

  return ui;
}
