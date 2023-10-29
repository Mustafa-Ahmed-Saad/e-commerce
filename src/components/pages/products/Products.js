import React, { useEffect, useState } from "react";
import SearchHome from "../../searchHome/SearchHome";
// import { myProducts } from "../../damyData/damyData";
import ShowProducts from "../../showProducts/ShowProducts";
import { getData } from "../../../helper/api";
import { useContextMain } from "../../../contexts/MainContext";
import Loading from "../../locading/Loading";
import SEO from "../../../helper/SEO";

import { useFetchProducts } from "../../../helper/hooks/asyncFunction";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const { loading, setLoading } = useContextMain();
  const { fetchProducts } = useFetchProducts();

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

  async function getProducts() {
    setLoading(true);
    const products = await fetchProducts();
    setProducts(products);
    setProductsToShow(products);
    setLoading(false);

    // setLoading(true);
    // const [data, errorMessage] = await getData("/api/v1/products");

    // if (data?.data) {
    //   setProducts(data?.data);
    //   setProductsToShow(data?.data);
    //   setAllAppProducts(data?.data);
    // } else {
    //   setProducts([]);
    //   setProductsToShow([]);
    //   console.log(errorMessage);
    // }
    // setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <>
        <SEO
          title="Products"
          description="All Products"
          facebookType="website"
          twitterType="summary"
        />
        <SearchHome products={products} setProductsToShow={changeProduct} />
        <ShowProducts products={productsToShow} />
      </>
    );
  }

  return ui;
}
