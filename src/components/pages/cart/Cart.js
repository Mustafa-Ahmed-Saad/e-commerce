import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { deleteData, getData } from "../../../helper/api";

export default function Cart() {
  // TODO: set cartProducts and setCartProducts in context
  // TODO: delete setProductCardCounter and productCardCounter from context and inested them use cartProducts and setCartProducts
  // -----------------------------------------------------------------

  // TODO: i stoped here in this component i want to handel when click + (increase product cuntty by 1) and - (decrease ....)

  const {
    token,
    cartProducts,
    setCartProducts,
    setProductsCounter,
    productsCounter,
  } = useContextMain();

  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  async function deleteFromCart(id) {
    const [data, errorMessage] = await deleteData(`/api/v1/cart/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      //     TODO: setWishlistContext and if wishlist handel
      console.log("delete from cart", data?.data);
      setAllProductsInCart(data?.data?.products);
      setProductsCounter((prev) => prev - 1);
      setTotalCartPrice(data?.data?.totalCartPrice);

      //   const newAllProductsInCart = oldCartProducts.filter((product) => {

      // });
      //   console.log(newCartProducts);
      //   setAllProductsInCart(newCartProducts);
      //   setCartProducts(newCartProducts);
      //   setProductsCounter(newCartProducts.length);
    } else {
      console.log(errorMessage);
    }
  }

  async function getCartProducts() {
    const [data, errorMessage] = await getData(`/api/v1/cart`, {
      headers: { token: token },
    });

    console.log("search on total", data);

    if (data?.data?.products) {
      // TODO: setWishlistContext and if wishlist handel
      setAllProductsInCart(data?.data?.products);
      setCartProducts(data?.data?.products);
      setProductsCounter(data?.data?.products.length);
      setTotalCartPrice(data?.data?.totalCartPrice);
    } else {
      console.log(errorMessage);
    }
  }

  async function handleCheckOut(selectedProducts) {
    console.log(selectedProducts);
  }

  async function clearAllProductsFromCart() {
    const [data, errorMessage] = await deleteData(`/api/v1/cart`, {
      headers: { token: token },
    });

    console.log("delete all cart products", data);

    if (data?.message === "success") {
      // TODO: setWishlistContext and if wishlist handel
      setAllProductsInCart([]);
      setCartProducts([]);
      setProductsCounter(0);
      setTotalCartPrice(0);
    } else {
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  //   -----------------------------------------------------------------------------------

  return (
    <div className="container bg-body-tertiary p-5 my-5">
      <div className="row mb-4 justify-content-between align-align-items-start p-3 rounded-3">
        <div className="col-9">
          <h2 className="fw-bold mb-4">Cart Shop</h2>
        </div>
        <div className="col-3 text-end">
          <button
            className="btn btn-main btn-lg fw-bold"
            onClick={() => {
              handleCheckOut(allProductsInCart);
            }}
          >
            check out
          </button>
        </div>
      </div>
      <div className="row justify-content-between align-items-center p-3 bg-body-secondary rounded-3">
        <div className="col-7 fs-4 fw-bold">
          total price: <span className="text-main">{totalCartPrice}</span>{" "}
        </div>
        <div className="col-5 text-end fs-4 fw-bold">
          total number of items:{" "}
          <span className="text-main">{productsCounter}</span>
        </div>
      </div>

      {allProductsInCart?.map(
        ({ product: { title, imageCover, id }, price, count }) => (
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
                      deleteFromCart(id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} /> remove
                  </button>
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-outline-main"
                    onClick={() => {
                      console.log(id);
                    }}
                  >
                    -
                  </button>
                  <span className="mx-3">{count}</span>
                  <button
                    className="btn btn-outline-main"
                    onClick={() => {
                      console.log(id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      <div className="text-center mt-5">
        <button
          className="btn btn-outline-danger btn-lg fw-bold"
          onClick={clearAllProductsFromCart}
        >
          <span className="me-2">clear all</span>{" "}
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
