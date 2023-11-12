import React, { useState } from "react";
import appStore from "../../Assets/Images/appleAppStore.webp";
import googlePlay from "../../Assets/Images/googlePlay.webp";
import amazonPay from "../../Assets/Images/amazonPay.webp";
import PayPal from "../../Assets/Images/PayPal.webp";
import masterCard from "../../Assets/Images/masterCard.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Footer() {
  const [inputValue, setInputValue] = useState("");

  // handel submit function
  function handelSubmit() {
    console.log(inputValue);
  }

  // write handelChange function to handle input change
  function handelChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="py-5 mt-5 bg-body-tertiary border-1 border-top border-success">
      <div className="container">
        <h4>Get the FreshCart app</h4>
        <p>
          we will send you a link, open it on your phone to download the app.
        </p>
        <div className="row border border-1 border-start-0 border-end-0 border-top-0 pb-4">
          <div className="col-12 col-lg-9">
            <input
              className="form-control mb-2"
              type="email"
              placeholder="Email..."
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>
          <div className="col-12 col-lg-3">
            <button className="btn btn-main" onClick={handelSubmit}>
              Share App Link
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 col-sm-6">
            <span className="me-4 fw-bold text-secondary">payment partner</span>
            <div className="d-lg-inline-block">
              <LazyLoadImage
                effect="blur"
                width={"70px"}
                className="me-3"
                src={amazonPay}
                alt="amazonPay"
              />
              <LazyLoadImage
                effect="blur"
                width={"50px"}
                className="me-3"
                src={PayPal}
                alt="PayPal"
              />
              <LazyLoadImage
                effect="blur"
                width={"30px"}
                src={masterCard}
                alt="masterCard"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 mt-4 m-sm-0 text-sm-end">
            <span className="text-secondary fw-bold">
              Get deliveries with freshCart
            </span>
            <div className="d-sm-inline-block">
              <LazyLoadImage
                effect="blur"
                width={"100px"}
                className="mx-2"
                src={appStore}
                alt="app-store"
              />
              <LazyLoadImage
                effect="blur"
                width={"100px"}
                src={googlePlay}
                alt="google-play"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
