import React, { useEffect, useState } from "react";
import SearchHome from "../../searchHome/SearchHome";
// import { myProducts } from "../../damyData/damyData";
import ShowProducts from "../../showProducts/ShowProducts";
import { getData } from "../../../helper/api";

export default function Products() {
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
    getProducts();
  }, []);

  return (
    <>
      <SearchHome />
      <ShowProducts products={products} />
    </>
  );
}
