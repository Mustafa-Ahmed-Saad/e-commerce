import React, { useEffect, useState } from "react";
import SearchHome from "../../searchHome/SearchHome";
// import { myProducts } from "../../damyData/damyData";
import ShowProducts from "../../showProducts/ShowProducts";
import { getData } from "../../../helper/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SearchHome products={products} setProductsToShow={changeProduct} />
      <ShowProducts products={productsToShow} />
    </>
  );
}
