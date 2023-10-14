import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import { getData, postData } from "../../../../helper/api";
import ProductSlider from "../../../productSlider/ProductSlider";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [isloved, setIsLoved] = useState(false);
  const { id } = useParams();
  const { token, wishList } = useContextMain();

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
    // TODO: change hart icon to red and render and call api
    console.log(id);

    // TODO: check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (isIdExistInContextWishList(id)) {
      // TODO: show tost "product already exist in wish list"
      console.log("product already exist in wish list");
    } else {
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
        //   show tost message data?.message
        console.log(data?.data);
        setIsLoved(true);
        // TODO: and set setWishListProductIds of localstorage context by data?.data
      } else {
        //   show tost message "sorry something wrong happen please try but product in wishlist later"
        console.log(errorMessage);
      }
    }
  }

  async function getProduct() {
    const [data, errorMessage] = await getData("/api/v1/products/" + id);

    if (data?.data) {
      setProduct(data?.data);
    } else {
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (isIdExistInContextWishList(id)) {
      setIsLoved(true);
    }
  }, []);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-4">
          {/* TODO: product slider here and remove this img*/}
          {/* <img
            className="w-100"
            src={productDetails.imageCover}
            alt="product-img"
          /> */}
          <ProductSlider imgUrls={product?.images} />
        </div>
        <div className="col-8">
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
            <button className="btn btn-main w-75">+ Add</button>

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
