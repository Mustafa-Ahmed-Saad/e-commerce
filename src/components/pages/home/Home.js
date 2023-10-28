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

  const toggleSearchLoading = (value) => {
    setSearchLoading(value);
  };

  async function getProducts() {
    const [data, errorMessage] = await getData("/api/v1/products");

    if (data?.data) {
      setProducts(data?.data);
      setProductsToShow(data?.data);
      setAllAppProducts(data?.data);
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
  async function getWishList(token) {
    if (!(wishList?.length > 0)) {
      // if no wish list
      const [data, errorMessage] = await getData("/api/v1/wishlist/", {
        headers: {
          token: token,
        },
      });

      if (data?.data) {
        const newWishlist = data?.data.map(({ id }) => {
          return id;
        });
        console.log("home.js getWishkist", newWishlist);
        setWishList(newWishlist);
      } else {
        console.log(errorMessage);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
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
