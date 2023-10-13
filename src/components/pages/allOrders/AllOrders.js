import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";

export default function AllOrders() {
  const { userId } = useContextMain();
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    if (userId) {
      console.log("userId", userId);
      const [data, errorMessage] = await getData(
        `/api/v1/orders/user/${userId}`
      );

      if (data) {
        console.log(data);
        setOrders(data);
      } else {
        console.log(errorMessage);
      }
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div className="container">
        {orders.map(
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
              className="row border border-2 border-success rounded-5 my-5 pt-3 px-5 bg-light"
            >
              {/* `id: {id}
            cartItems: "TODO: i will show all produt in cartItems array
            (count,price,product{(imageCover, title)})" user:"TODO: i will show
            user info (name,emailphone)" isDelivered : {isDelivered}
            isPaid: {isPaid}
            paymentMethodType: {paymentMethodType}
            totalOrderPrice:{totalOrderPrice}
            taxPrice:{taxPrice}
            shippingPrice:{shippingPrice}
            date: {createdAt}
            ` */}
              <div className="col-12">
                <div className="fs-2 fw-bold">
                  <p className="d-inline-block text-start w-75">
                    order id: {id}{" "}
                  </p>

                  <p className="d-inline-block text-end w-25">
                    <span className="text-main"> {index + 1}</span>
                    {" / "}
                    {orders.length}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div>date: {createdAt}</div>
                    <div>paymentMethodType: {paymentMethodType}</div>
                    <div>isPaid: {isPaid ? "yes" : "no"}</div>
                    <div>isDelivered: {isDelivered ? "yes" : "no"}</div>
                    <div>
                      taxPrice:{" "}
                      <span className="text-main fw-bold">{taxPrice} EGP</span>
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
                  <div className="border border-1 border-success rounded-4 p-3 bg-white">
                    <div>name: {user.name}</div>
                    <div>email: {user.email}</div>
                    <div>phone: {user.phone}</div>
                  </div>
                </div>
                <div className="border border-2 border-secondary border-start-0 border-end-0 border-bottom-0 py-4 my-2">
                  {cartItems.map(
                    ({ count, price, product: { imageCover, title, id } }) => (
                      <div
                        key={id}
                        className="row bg-body-secondary rounded-4 p-3 mb-2 align-items-center"
                        style={{ height: "160px" }}
                      >
                        <div className="col-2">
                          <img
                            className="w-100 object-fit-contain object-position-center"
                            height={"100px"}
                            src={imageCover}
                            alt="product-img"
                          />
                        </div>
                        <div className="col-7">
                          <div className="fw-bold">{title}</div>
                          <div className="text-secondary">id: {id}</div>
                        </div>
                        <div className="col-3 text-end">
                          <div className="text-main fw-bold">{price} EGP</div>
                          <div className="text-secondary">Qty: {count}</div>
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
    </>
  );
}
