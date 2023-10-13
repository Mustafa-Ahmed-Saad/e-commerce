import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { useContextMain } from "../../../contexts/MainContext";

import { deleteData, getData, postData } from "../../../helper/api";

export default function WishList() {
  // TODO: get wishList from context and show them
  // TODO: when click on addToCart add this product to cart
  // TODO: when click on deleteFromWishlist we will call api and thien id success set state of context wishlist

  const { token, wishList, setWishList, setCartProducts, setProductsCounter } =
    useContextMain();

  const [allProductInWishList, setAllProductInWishList] = useState([]);

  async function addToCart(id) {
    // TODO: check if in product card list increase it's countaty by 1 only
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
      // TODO: don't forget to make context for cart product counter to put it on cart icon in nav bar
      // show Tost "product add to cart success"
      console.log(data?.data);
      // here also return totalprice in (data?.data?.totalCartPrice)
      setCartProducts(data?.data?.products);
      setProductsCounter(data?.data?.products.length);
    } else {
      console.log(errorMessage);
    }
  }

  async function deleteFromWishList(id) {
    const [data, errorMessage] = await deleteData(`/api/v1/wishlist/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      //     TODO: setWishlistContext and if wishlist handel
      let oldWishlist = [...wishList];
      const newWishlist = oldWishlist.filter((product) => {
        if (data?.data.includes(product.id)) {
          return product;
        }
      });
      console.log(newWishlist);
      setAllProductInWishList(newWishlist);
      setWishList(newWishlist);
    } else {
      console.log(errorMessage);
    }
  }

  async function getWishList(id) {
    const [data, errorMessage] = await getData(`/api/v1/wishlist`, {
      headers: { token: token },
    });

    if (data?.data) {
      //     TODO: setWishlistContext and if wishlist handel
      setAllProductInWishList(data?.data);
      setWishList(data?.data);
    } else {
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <div className="container bg-body-tertiary p-5 my-5">
      <h2 className="fw-bold mb-4">My wish List</h2>

      {allProductInWishList?.map(({ title, price, imageCover, id }) => (
        <div className="row my-4 mainShadow rounded-3 transtion-5" key={id}>
          <div className="col-2">
            <img className="w-100" src={imageCover} alt="product-img" />
          </div>
          <div className="col-10">
            <div className="row h-100 align-items-center justify-content-between">
              <div className="col-10">
                <h3 className="fs-5 fw-bold mb-2">{title}</h3>
                <div className="text-main fw-bold mb-1">{price} EGP</div>
                <button
                  className="btn border-0 ps-0 text-danger"
                  onClick={() => {
                    deleteFromWishList(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> remove
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-outline-main"
                  onClick={() => {
                    addToCart(id);
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
