import React, { useState } from "react";
import SearchHome from "../../searchHome/SearchHome";
import ShowProducts from "../../showProducts/ShowProducts";
import { useContextMain } from "../../../contexts/MainContext";
import Loading from "../../locading/Loading";
import SEO from "../../../helper/SEO";

import { useGetProducts } from "../../../helper/hooks/asyncFunction";
import SearchLoading from "../../searchLoading/SearchLoading";

export default function Products() {
  const [searchLoading, setSearchLoading] = useState(false);
  const { loading } = useContextMain();
  const { products, productsToShow, setProductsToShow } = useGetProducts();

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

  const toggleSearchLoading = (value) => {
    setSearchLoading(value);
  };

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
        <SearchHome
          products={products}
          setProductsToShow={changeProduct}
          toggleSearchLoading={toggleSearchLoading}
        />
        {searchLoading ? (
          <SearchLoading />
        ) : (
          <ShowProducts products={productsToShow} />
        )}
      </>
    );
  }

  return ui;
}
