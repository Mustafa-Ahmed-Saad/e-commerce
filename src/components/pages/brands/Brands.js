import React, { useEffect, useState } from "react";
import { getData } from "../../../helper/api";
import BrandCard from "../../brandCard/BrandCard";
import PopUp from "../../popUp/PopUp";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [poPupBrand, setPoPupBrand] = useState(null);

  const handleClose = () => setShowPopUp(false);
  const handleShow = (brand) => {
    setPoPupBrand(brand);
    setShowPopUp(true);
  };

  async function getBrands() {
    const [data, errorMessage] = await getData("/api/v1/brands");

    if (data?.data) {
      setBrands(data?.data);
    } else {
      setBrands([]);
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="fw-bold text-main text-center my-5">All brands</h2>
        <div className="row g-4">
          {brands.map((brand) => (
            <div className="col-3" key={brand._id}>
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
        handleShow={handleShow}
        handleClose={handleClose}
        poPupBrand={poPupBrand}
      />
    </>
  );
}
