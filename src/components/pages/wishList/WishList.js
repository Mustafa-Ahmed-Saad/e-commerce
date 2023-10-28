import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { useContextMain } from "../../../contexts/MainContext";

import { deleteData, getData, postData } from "../../../helper/api";
import SEO from "../../../helper/SEO";
import { notify } from "../../../helper/toastFire";
import Loading from "../../locading/Loading";

export default function WishList() {
  const [products, setProducts] = useState([]);

  const { token, loading, setLoading, setWishList, setProductsCounter } =
    useContextMain();

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

  async function deleteFromWishList(id) {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/wishlist/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      // TODONOW: id data?.data is array of wishlist ids delete the 7 line and setWishlist(data?.data)

      const newProducts = products.filter((product) => {
        if (data?.data.includes(product.id)) {
          return product;
        }
      });
      setProducts(newProducts);
      setWishList(data?.data);
      toast.dismiss(tLoading);
      notify("success", `${data?.message}`);
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
    }
  }

  async function getWishList(id) {
    setLoading(true);
    const [data, errorMessage] = await getData(`/api/v1/wishlist`, {
      headers: { token: token },
    });

    if (data?.data) {
      console.log(data);
      const newWishlist = data?.data.map(({ id }) => {
        return id;
      });
      setProducts(data?.data);
      setWishList(newWishlist);
    } else {
      console.log(errorMessage);
    }
    setLoading(false);
  }

  useEffect(() => {
    getWishList();
  }, []);

  let ui = <Loading />;
  if (!loading) {
    ui =
      products?.length > 0 ? (
        <div
          className="container bg-body-tertiary p-5 my-5 wow fadeInLeft"
          data-wow-offset="10"
          data-wow-delay="0.2s"
          data-wow-iteration="1"
        >
          <h2 className="fw-bold mb-4">My wish List</h2>

          {products?.map(({ title, price, imageCover, id }) => (
            <div
              key={id}
              className="row my-4 bg-body-tertiary mainShadow rounded-3 transtion-5 flex-column flex-sm-row"
            >
              <div className="col-12 col-sm-2">
                <img className="w-100" src={imageCover} alt="product-img" />
              </div>
              <div className="col-12 col-sm-10">
                <div className="row h-100 align-items-center justify-content-between flex-column flex-sm-row">
                  <div className="col-12 col-sm-10">
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
                  <div className="col-12 col-sm-2 text-end">
                    <button
                      style={{ minWidth: "64px" }}
                      className="btn btn-outline-main"
                      onClick={() => {
                        addToCart(id);
                      }}
                    >
                      <span className="d-none d-lg-inline-block text-nowrap">
                        add to cart
                      </span>
                      <span className="d-lg-none">
                        <span className="fs-3">+</span>
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-main fa-lg"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not add any product to your wish list{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      );
  }
  return (
    <>
      <SEO
        title="Wish List"
        description="Wishlist Products"
        facebookType="wishlist"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
