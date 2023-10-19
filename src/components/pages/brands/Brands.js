import React, { useEffect, useState } from "react";
import { useContextMain } from "../../../contexts/MainContext";
import { getData } from "../../../helper/api";
import BrandCard from "../../brandCard/BrandCard";
import Loading from "../../locading/Loading";
import PopUp from "../../popUp/PopUp";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [poPupBrand, setPoPupBrand] = useState(null);
  const { loading, setLoading } = useContextMain();

  const handleClose = () => setShowPopUp(false);
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
    getBrands();
  }, []);

  let ui = <Loading />;

  if (!loading) {
    ui = (
      <>
        <div className="container">
          <h2 className="fw-bold text-main text-center my-5">All brands</h2>
          <div className="row g-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="col-12 col-md-6 col-lg-4 col-xl-3"
              >
                <BrandCard
                  brandDetails={brand}
                  handleShow={handleShow}
                  handleClose={handleClose}
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
      </>
    );
  }

  return ui;
}
