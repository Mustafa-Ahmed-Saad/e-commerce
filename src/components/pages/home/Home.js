import React, { useState } from "react";
import ShowProducts from "../../showProducts/ShowProducts";
import HomeResponsiveSlider from "../../homeResponsiveSlider/HomeResponsiveSlider";
import MainSlider from "../../mainSlider/MainSlider";
import SearchHome from "../../searchHome/SearchHome";
import { useContextMain } from "../../../contexts/MainContext";
import Loading from "../../locading/Loading";
import SearchLoading from "../../searchLoading/SearchLoading";
import SEO from "../../../helper/SEO";
import {
  useGetCategories,
  useGetProducts,
  useGetWishListProducts,
} from "../../../helper/hooks/asyncFunction";

export default function Home() {
  // TODO: dont forget add load in this project

  const [searchLoading, setSearchLoading] = useState(false);
  const { loading } = useContextMain();

  const { categories } = useGetCategories();
  const { products, productsToShow, setProductsToShow } = useGetProducts();

  // we don't need wishListProducts or setWishListProducts we need to get wishlistProduct and setWishlist by wishlistProduct id
  useGetWishListProducts("onlyOne");

  const toggleSearchLoading = (value) => {
    setSearchLoading(value);
  };

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }

  // return
  let ui = <Loading />;
  if (!loading) {
    ui = (
      <>
        <SEO
          title="Home"
          description="Ecommerce App For View And Purchase Products"
          facebookType="website"
          twitterType="summary"
        />

        <MainSlider />
        <HomeResponsiveSlider categories={categories} />
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
