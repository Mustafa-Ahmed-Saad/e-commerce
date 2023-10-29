import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";
import SEO from "../../../helper/SEO";
import Loading from "../../locading/Loading";
import WOW from "wow.js";
import { useFetchAllOrders } from "../../../helper/hooks/asyncFunction";

export default function AllOrders() {
  const { userId, loading, setLoading } = useContextMain();
  const [orders, setOrders] = useState([]);
  const { fetchAllOrders } = useFetchAllOrders();

  async function getAllOrders() {
    if (userId) {
      setLoading(true);
      console.log("userId", userId);
      const data = await fetchAllOrders(userId);
      setOrders(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui =
      orders?.length > 0 ? (
        <div className="container">
          {orders?.map(
            (
              {
                id,
                cartItems,
                isDelivered,
                isPaid,
                paymentMethodType,
                totalOrderPrice,
                user,
                taxPrice,
                shippingPrice,
                createdAt,
              },
              index
            ) => (
              <div
                key={id}
                className="border border-1 border-success rounded-5 my-5 pt-3 px-5 order-bg-color wow slideInUp"
                data-wow-offset="10"
                data-wow-delay="0.3s"
                data-wow-iteration="1"
              >
                <div>
                  <div className="row fs-2 fw-bold flex-column-reverse flex-sm-row">
                    <div className="col-12 col-sm-8">
                      <p className="d-inline-block text-start">
                        order id: {id}
                      </p>
                    </div>

                    <div className="col-12 col-sm-4">
                      <p className="d-inline-block text-end">
                        <span className="text-main"> {index + 1}</span>
                        {" / "}
                        {orders.length}
                      </p>
                    </div>
                  </div>
                  <div className="row flex-column-reverse flex-md-row">
                    <div className="col-12 col-md-8">
                      <div>date: {createdAt}</div>
                      <div>paymentMethodType: {paymentMethodType}</div>
                      <div>isPaid: {isPaid ? "yes" : "no"}</div>
                      <div>isDelivered: {isDelivered ? "yes" : "no"}</div>
                      <div>
                        taxPrice:{" "}
                        <span className="text-main fw-bold">
                          {taxPrice} EGP
                        </span>
                      </div>
                      <div>
                        shippingPrice:{" "}
                        <span className="text-main fw-bold">
                          {shippingPrice} EGP
                        </span>
                      </div>
                      <div>
                        total Order Price:{" "}
                        <span className="text-main fw-bold">
                          {totalOrderPrice} EGP
                        </span>
                      </div>
                    </div>
                    <div
                      className="col-12 col-md-4 border border-1 border-success rounded-4 p-3 bg-order-owner align-self-baseline mb-4 mb-md-0"
                      style={{ "--bs-border-opacity": ".5" }}
                    >
                      <div>
                        <span className="fw-bold">name:</span>
                        <span className="text-break"> {user.name}</span>
                      </div>
                      <div>
                        <span className="fw-bold">email:</span>

                        <span className="text-break"> {user.email}</span>
                      </div>
                      <div>
                        <span className="fw-bold">phone:</span>
                        <span className="text-break"> {user.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-2 border-secondary border-start-0 border-end-0 border-bottom-0 py-4 my-2">
                    {cartItems.map(
                      ({
                        count,
                        price,
                        product: { imageCover, title, id },
                      }) => (
                        <div
                          key={id}
                          className="row bg-body-secondary rounded-4 p-3 mb-2 align-items-center"
                        >
                          <div className="col-12 col-lg-2">
                            <img
                              className="w-100 object-fit-contain object-position-center"
                              height={"100px"}
                              src={imageCover}
                              alt="product-img"
                            />
                          </div>
                          <div className="col-12 col-lg-7">
                            <div className="fw-bold">{title}</div>
                            <div className="text-secondary mx-2">
                              <span className="fw-bold">id:</span>
                              <span className="text-break">{id}</span>
                            </div>
                          </div>
                          <div className="row align-items-center px-0 col-12 col-lg-3 text-end flex-column-reverse flex-sm-row-reverse flex-lg-column">
                            <div className="col-12 col-sm-6 col-lg-12 text-start text-sm-end text-main fw-bold">
                              {price} EGP
                            </div>
                            <div className="col-12 col-sm-6 col-lg-12 text-start text-lg-end text-secondary my-2">
                              <span className="bg-dark-subtle py-1 px-2 rounded-3">
                                Qty: {count}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not have any order{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      );
  }

  return (
    <>
      <SEO
        title="Orders"
        description="All Orders"
        facebookType="article"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
