import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import { deleteData, getData, putData } from "../../../helper/api";
import SEO from "../../../helper/SEO";
import { notify } from "../../../helper/toastFire";
import Loading from "../../locading/Loading";

export default function Cart() {
  const {
    token,
    productsCounter,
    setProductsCounter,
    productsQuantity,
    setProductsQuantity,
    setUserId,
  } = useContextMain();

  const navigate = useNavigate();
  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartId, setCartId] = useState(0);
  let [reqInterval, setReqInterval] = useState(false);
  const { loading, setLoading } = useContextMain();

  async function deleteFromCart(id, index, oldQuantity) {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/cart/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      toast.dismiss(tLoading);
      notify("success", "product deleted successfully from cart");
      setAllProductsInCart(data?.data?.products);
      setProductsCounter((prev) => prev - 1);
      setTotalCartPrice(data?.data?.totalCartPrice);

      const pq = { ...productsQuantity };
      delete pq[id];
      setProductsQuantity(pq);
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      if (oldQuantity) {
        const nProducts = [...allProductsInCart];
        nProducts[index].count = oldQuantity;
        setAllProductsInCart(nProducts);
        // TODO: show toast "soorry somthing rong"
      }
    }
  }

  async function getCartProducts() {
    setLoading(true);
    const [data, errorMessage] = await getData(`/api/v1/cart`, {
      headers: { token: token },
    });

    if (data?.data?.products) {
      setCartId(data?.data?._id);
      setAllProductsInCart(data?.data?.products);
      setProductsCounter(data?.data?.products.length || 0);
      setTotalCartPrice(data?.data?.totalCartPrice);
      setUserId(data?.data?.cartOwner);
    } else {
      // TODO: show tost
      console.log(errorMessage);
    }
    setLoading(false);
  }

  function handleCheckOut() {
    navigate(`/check-out/${cartId}`);
  }

  async function clearAllProductsFromCart() {
    setLoading(true);
    const [data, errorMessage] = await deleteData(`/api/v1/cart`, {
      headers: { token: token },
    });

    console.log("delete all cart products", data);

    if (data?.message === "success") {
      setAllProductsInCart([]);
      setProductsCounter(0);
      setTotalCartPrice(0);
    } else {
      console.log(errorMessage);
    }
    setLoading(false);
  }

  async function updateProductQuantity(productId, count, index) {
    // TODO: TOST MESSAGE IF ERROR
    if (count < 0) {
      count = 0;
    }

    const newProducts = [...allProductsInCart];
    newProducts[index].count = count;
    setAllProductsInCart(newProducts);

    if (reqInterval) {
      clearTimeout(reqInterval);
    }

    setReqInterval(
      setTimeout(async () => {
        if (count <= 0) {
          deleteFromCart(productId, index, productsQuantity[productId]);
        } else {
          let tLoading = notify("loading", `loading...`);
          const [data, errorMessage] = await putData(
            `/api/v1/cart/${productId}`,
            {
              count,
            },
            {
              headers: {
                token: token,
              },
            }
          );

          if (data?.data) {
            toast.dismiss(tLoading);
            notify("success", "Successfully");
            setTotalCartPrice(data?.data?.totalCartPrice);
            setAllProductsInCart(data?.data?.products);
            // TODO: check it ishow setProductsCounter here or not
            // setProductsCounter(data?.numOfCartItems);

            // TODO: delete local storage of productsQuantity after chick out

            const oldQuantity = { ...productsQuantity };
            oldQuantity[productId] = count;
            setProductsQuantity(oldQuantity);
          } else {
            toast.dismiss(tLoading);
            notify("error", `Opps ${errorMessage}`);
            const newProducts = [...allProductsInCart];

            newProducts[index].count = productsQuantity[productId];
            setAllProductsInCart(newProducts);
          }
        }
      }, 1000)
    );
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  //   -----------------------------------------------------------------------------------

  let ui = <Loading />;

  if (!loading) {
    ui =
      allProductsInCart?.length > 0 ? (
        <div className="container bg-body-tertiary p-5 my-5">
          <div className="row mb-4 justify-content-between align-align-items-start p-3 rounded-3">
            <div className="col-12 col-sm-6">
              <h2 className="fw-bold mb-4">Cart Shop</h2>
            </div>
            <div className="col-12 text-start col-sm-6 text-sm-end">
              <button
                className="btn btn-main btn-lg fw-bold"
                onClick={handleCheckOut}
              >
                check out
              </button>
            </div>
          </div>
          <div className="row justify-content-between align-items-center p-3 bg-body-secondary rounded-3">
            <div className="col-12 col-sm-6 fs-4 fw-bold">
              total price: <span className="text-main">{totalCartPrice}</span>{" "}
            </div>
            <div className="col-12 col-sm-6 text-sm-end fs-4 fw-bold">
              <span className="d-none d-md-inline-block">total number of</span>{" "}
              items:{" "}
              <span className="text-main">
                {productsCounter >= 0 ? productsCounter : 0}
              </span>
            </div>
          </div>

          {allProductsInCart?.map(
            ({ product: { title, imageCover, id }, price, count }, index) => (
              <div
                key={id}
                className="row bg-body-tertiary my-4 mainShadow rounded-3 transtion-5 flex-column flex-md-row wow fadeInLeft"
                data-wow-offset="200"
                data-wow-delay="0.2s"
                data-wow-iteration="1"
              >
                <div className="col-12 col-md-2">
                  <img className="w-100" src={imageCover} alt="product-img" />
                </div>
                <div className="col-12 col-md-10">
                  <div className="row h-100 align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-12 col-sm-11  col-md-10">
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
                    <div className="col-12 col-sm-1 col-md-2 d-flex align-items-center justify-content-center flex-row flex-sm-column-reverse flex-lg-row">
                      <button
                        className="btn btn-outline-main"
                        onClick={() => {
                          updateProductQuantity(id, count - 1, index);
                        }}
                      >
                        -
                      </button>
                      <span className="mx-3">{count}</span>
                      <button
                        className="btn btn-outline-main"
                        onClick={() => {
                          updateProductQuantity(id, count + 1, index);
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
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not add any product to your cart{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      );
  }

  return (
    <>
      <SEO
        title="Cart"
        description="Cart Products"
        facebookType="product.group"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
