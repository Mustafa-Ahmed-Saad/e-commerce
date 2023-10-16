import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import { getData, postData } from "../../../../helper/api";
import { notify } from "../../../../helper/toastFire";
import Loading from "../../../locading/Loading";
import ProductSlider from "../../../productSlider/ProductSlider";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [isloved, setIsLoved] = useState(false);
  const { id } = useParams();
  const {
    token,
    wishList,
    loading,
    setLoading,
    setCartProducts,
    setProductsCounter,
  } = useContextMain();

  function isIdExistInContextWishList(ProductId) {
    let isExistInOldWishList = false;
    wishList.forEach((wishlistProduct) => {
      if (wishlistProduct.id === ProductId) {
        isExistInOldWishList = true;
        return;
      }
    });

    return isExistInOldWishList;
  }

  async function handelLove(id) {
    // TODO: check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (isIdExistInContextWishList(id)) {
      notify("success", "product already exist in wish list");
    } else {
      let tLoading = notify("loading", `loading...`);
      const [data, errorMessage] = await postData(
        "/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      // TODO: conteniue
      if (data?.data) {
        //   put data?.data in local storage wishList (setState of wishlist context)
        toast.dismiss(tLoading);
        notify("success", `${data?.message}`);
        setIsLoved(true);
        // TODO: and set setWishListProductIds of localstorage context by data?.data
      } else {
        //   show tost message "sorry something wrong happen please try but product in wishlist later"
        toast.dismiss(tLoading);
        notify("error", `Opps ${errorMessage}`);
      }
    }
  }

  async function addToCart(id) {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await postData(
      "/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    if (data?.data?.products) {
      // make like wishList an create context for product cart and set this peoduct context from here
      toast.dismiss(tLoading);
      notify("success", `${data?.message}`);
      // here also return totalprice in (data?.data?.totalCartPrice)
      setCartProducts(data?.data?.products);
      setProductsCounter(data?.data?.products.length);
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
    }
  }

  async function getProduct() {
    setLoading(true);

    const [data, errorMessage] = await getData("/api/v1/products/" + id);

    if (data?.data) {
      setProduct(data?.data);
      if (isIdExistInContextWishList(data?.data?.id)) {
        setIsLoved(true);
      }
    } else {
      console.log(errorMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <div className="container my-5 pb-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 col-lg-4">
            {/* TODO: product slider here and remove this img*/}
            {/* <img
            className="w-100"
            src={productDetails.imageCover}
            alt="product-img"
          /> */}
            <ProductSlider imgUrls={product?.images} />
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <h2>{product?.title}</h2>
            <p>{product?.description}</p>

            <div className="d-flex justify-content-between my-4">
              <div>{product?.price} EGP</div>
              <div>
                <FontAwesomeIcon className="text-warning" icon={faStar} />
                {product?.ratingsAverage}
              </div>
            </div>

            <div className="d-flex justify-content-between ">
              <button
                className="btn btn-main w-75"
                onClick={() => {
                  addToCart(product?.id);
                }}
              >
                + Add
              </button>

              <div>
                {/* TODO:handel whenclick Love icon and handel when show all product to make the product in wish list is hart is red */}
                <FontAwesomeIcon
                  className={`d-inline-block ms-auto fa-xl cursor-pointer ${
                    isloved ? "text-danger" : null
                  }`}
                  icon={faHeart}
                  onClick={() => {
                    handelLove(product?.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return ui;
}
