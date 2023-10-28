import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";
import SEO from "../../../helper/SEO";
import BrandCard from "../../brandCard/BrandCard";
import BrandCardLoading from "../../brandCardLoading/BrandCardLoading";
import Loading from "../../locading/Loading";
import PopUp from "../../popUp/PopUp";
import WOW from "wow.js";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [poPupBrand, setPoPupBrand] = useState(null);
  const { loading, setLoading } = useContextMain();
  const [pageOpened, setPageOpened] = useState(false);
  const [brandCardLoading, setBrandCardLoading] = useState(false);

  const handleClose = () => {
    setShowPopUp(false);
  };
  const setBrandCardLoadingFromChild = (value) => {
    setBrandCardLoading(value);
  };

  const handleShow = (brand) => {
    setPoPupBrand(brand);
    setShowPopUp(true);
  };

  async function getBrands() {
    setLoading(true);

    const [data, errorMessage] = await getData("/api/v1/brands");

    if (data?.data) {
      setBrands(data?.data);
    } else {
      setBrands([]);
      console.log(errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!pageOpened) {
      // هذا يتحقق من أن الصفحة لم تتم فتحها بعد
      setPageOpened(true);
      // يمكنك هنا تنفيذ الانيميشن wow
    }

    getBrands();
  }, [pageOpened]);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <>
        <div className="container">
          <h2 className="fw-bold text-main text-center my-5">All brands</h2>
          <div
            className="row g-4 wow fadeInUp"
            data-wow-offset="10"
            data-wow-delay="0.2s"
            data-wow-iteration="1"
          >
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <BrandCard
                  brandDetails={brand}
                  handleShow={handleShow}
                  handleClose={handleClose}
                  setBrandCardLoading={setBrandCardLoadingFromChild}
                />
              </div>
            ))}
          </div>
        </div>
        <PopUp
          show={showPopUp}
          handleClose={handleClose}
          poPupBrand={poPupBrand}
        />
        {brandCardLoading ? <BrandCardLoading /> : null}
      </>
    );
  }

  return (
    <>
      <SEO
        title="Brands"
        description="All Brands"
        facebookType="website"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
