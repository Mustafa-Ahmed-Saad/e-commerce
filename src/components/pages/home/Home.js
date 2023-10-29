import React, { useEffect, useState } from "react";
import ShowProducts from "../../showProducts/ShowProducts";
import HomeResponsiveSlider from "../../homeResponsiveSlider/HomeResponsiveSlider";
import MainSlider from "../../mainSlider/MainSlider";
import SearchHome from "../../searchHome/SearchHome";
import { getData } from "../../../helper/api";
import { useContextMain } from "../../../contexts/MainContext";
import Loading from "../../locading/Loading";
import SearchLoading from "../../searchLoading/SearchLoading";
import SEO from "../../../helper/SEO";
import {
  useFetchProducts,
  useGetWishListHook,
} from "../../../helper/hooks/asyncFunction";

export default function Home() {
  // TODO: dont forget add load in this project

  const [searchLoading, setSearchLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const {
    loading,
    setLoading,
    setAllAppProducts,
    token,
    setWishList,
    wishList,
  } = useContextMain();

  const { fetchProducts } = useFetchProducts();
  const { getWishListHook } = useGetWishListHook();

  const toggleSearchLoading = (value) => {
    setSearchLoading(value);
  };

  async function getProducts() {
    setLoading(true);
    const products = await fetchProducts();
    setProducts(products);
    setProductsToShow(products);
    setLoading(false);
  }

  function changeProduct(newProduct) {
    setProductsToShow(newProduct);
  }
  async function getWishList(token) {
    if (!(wishList?.length > 0)) {
      // if no wish list
      const data = await getWishListHook();
      console.log(data); // data?.data
    }
  }

  useEffect(() => {
    getProducts();

    if (token) {
      getWishList(token);
    }
  }, []);

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
        <HomeResponsiveSlider />
        <SearchHome
          products={products}
          setProductsToShow={changeProduct}
          toggleSearchLoading={toggleSearchLoading}
        />
        {searchLoading ? (
          <SearchLoading />
        ) : productsToShow.length > 0 ? (
          <ShowProducts products={productsToShow} />
        ) : (
          <div className="container text-center fw-bold">
            no product to show
          </div>
        )}
      </>
    );
  }

  return ui;
}
