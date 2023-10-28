import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import { getData, postData } from "../../../../helper/api";
import SEO from "../../../../helper/SEO";
import { notify } from "../../../../helper/toastFire";
import Loading from "../../../locading/Loading";
import ProductSlider from "../../../productSlider/ProductSlider";

export default function Product() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const {
    token,
    wishList,
    setWishList,
    loading,
    setLoading,
    setProductsCounter,
  } = useContextMain();

  async function handelLove(id) {
    // TODO: check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (wishList.includes(id)) {
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
        setWishList(data?.data);
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
    ui = product ? (
      <div className="overflow-x-hidden">
        <div className="container my-5 pb-5">
          <div className="row align-items-center">
            <div
              className="col-12 col-md-6 col-lg-4 wow fadeInLeft"
              data-wow-offset="10"
              data-wow-delay="0.9s"
              data-wow-iteration="1"
            >
              <ProductSlider imgUrls={product?.images} />
            </div>
            <div
              className="col-12 col-md-6 col-lg-8 wow fadeInRight"
              data-wow-offset="10"
              data-wow-delay="0.2s"
              data-wow-iteration="1"
            >
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
                      wishList.includes(product?.id) ? "text-danger" : null
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
      </div>
    ) : (
      <div className="container text-center mt-5 fw-bold">
        sorry product not found see <Link to={"/home"}>All Product</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={product?.title || "product"}
        description={`Product ${product?.description}`}
        facebookType="product"
        twitterType="summary"
      />
      {ui};
    </>
  );
}
